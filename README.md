# serverless-express-lambda-cdk
An express serverless lambda project configured with typescript deployed with AWS CDK

This stack deploys:
- CI/CD pipeline
- Staging and Prod environment
- lambda function with serverless-express
- Error alarm with pipeline rollback functionality

### Tutorial
https://medium.com/itnext/building-a-ci-cd-pipeline-for-a-serverless-express-application-with-aws-cdk-1d3c842ea1ff

### Setup
#### Install deps
```
cd deployment
npm install
```

#### Setup configuration
https://github.com/ColeMurray/serverless-express-lambda-cdk/blob/main/deployment/bin/config.ts

```

export const config = {
  codeRepository: "<YOUR REPO HERE>",
  codeBranch: "main",
  connectionArn: "<YOUR CODE COMMIT CONNECTION ARN HERE>",
  preprodAccount: {
    account: "<YOUR PREPROD ACCOUNT ID HERE>",
    region: "<YOUR PREPROD REGION HERE>"
  },
  prodAccount: {
    account: "<YOUR PROD ACCOUNT ID HERE>",
    region: "<YOUR PROD REGION HERE>"
  },
  crossEnvDeployment: false
}
```

#### AWS Credentials
Ensure your aws credentials are available in the environment
```
export AWS_ACCESS_KEY_ID=<value>
export AWS_SECRET_ACCESS_KEY_ID=<value>
```

### Synth
`cdk synth`

### Deploy
`cdk deploy`
