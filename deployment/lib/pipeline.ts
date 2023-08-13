import {BackendServiceStage} from "./stage";
import {ComputeType} from "aws-cdk-lib/aws-codebuild";
import {CodeBuildStep, CodePipeline, CodePipelineSource, ManualApprovalStep} from "aws-cdk-lib/pipelines";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";
import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";

interface PipelineStackProps extends StackProps {
  repoName: string,
  branch: string,
  connectionArn: string,
  preprodAccount: {account: string, region: string},
  prodAccount: {account: string, region: string},
  crossEnvDeployment?: boolean
}

export class BackendPipelineStack extends Stack {

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    let source = CodePipelineSource.connection(props.repoName, props.branch, {
      connectionArn: props.connectionArn
    });

    const synth = new CodeBuildStep('Synth', {
      input: source,
      commands: [
        'cd deployment/',
        'npm ci',
        'npm run build',
        'npx cdk synth'
      ],
      primaryOutputDirectory: 'deployment/cdk.out',
    });


    const pipeline = new CodePipeline(this, 'pipeline', {
      crossAccountKeys: props.crossEnvDeployment ?? false,
      synth: synth,
      selfMutation: true,
      codeBuildDefaults: {
        buildEnvironment: {
          privileged: true,
          computeType: ComputeType.MEDIUM
        },
        rolePolicy: [new PolicyStatement({
          resources: ["*"],
          actions: ["secretsmanager:GetSecretValue"]
        })]
      }
    });

    const preprod = new BackendServiceStage(this, 'PreProdBackend', {
      envVars: {}
    });

    pipeline.addStage(preprod);

    const prod = new BackendServiceStage(this, 'ProdBackend', {
      env: props.prodAccount,
    });

    pipeline.addStage(prod, {
      pre: [
        new ManualApprovalStep("Promote to Prod")
      ]
    });
  }
}