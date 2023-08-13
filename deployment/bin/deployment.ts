#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {BackendPipelineStack} from '../lib/pipeline';
import {config} from "./config"



const app = new cdk.App();
new BackendPipelineStack(app, 'BackendPipelineStack', {
    env: { 
        account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION 
    },
    repoName: config.codeRepository,
    branch: config.codeBranch,
    connectionArn: config.connectionArn,
    preprodAccount: config.preprodAccount,
    prodAccount: config.prodAccount,
    crossEnvDeployment: config.crossEnvDeployment
});
