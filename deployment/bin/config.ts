

export const config = {
  codeRepository: "<YOUR REPO HERE>",
  codeBranch: "master",
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