import serverlessExpress from '@vendia/serverless-express';
import {app} from './app';

let serverlessExpressInstance: any;

async function setup (event: any, context: any) {
  serverlessExpressInstance = serverlessExpress({ app })
  return serverlessExpressInstance(event, context)
}

export function handler (event: any, context: any) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

  return setup(event, context)
}

