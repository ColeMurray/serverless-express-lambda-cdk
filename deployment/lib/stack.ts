import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {ApprovedNodeLambda} from "./constructs/approvedNodeLambdaConstruct";
import {Cors, LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";

export interface DeploymentStackProps extends StackProps {
  envVars?: Record<string, string>,
}

export class DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: DeploymentStackProps) {
    super(scope, id, props);

    const serverFunction = new ApprovedNodeLambda(this, 'backend-server', {
      codeDir: '../source/',
      description: 'backend server lambda function',
      handler: 'src/lambdaServer.handler',
      runtimeEnvironment: props.envVars ?? {}
    });

    const api = new RestApi(this, 'api', {
      restApiName: 'BackendApi',
      description: 'Api gateway for backend api',
      binaryMediaTypes: ['*/*']
    });

    api.root.addProxy({
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      defaultIntegration: new LambdaIntegration(serverFunction.lambda, {
        proxy: true
      }),

    });
  }
}