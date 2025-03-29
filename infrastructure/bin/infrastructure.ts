#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AppRunnerStack } from '../lib/app-runner-stack';
import { CDKContext } from '../lambda-layer/types';

const app = new cdk.App();

export const getContext = async (app: cdk.App): Promise<CDKContext> => {
  return new Promise(async (resolve, reject) => {
    try {
      const env = app.node.tryGetContext('env');
      const { account, region, CMS_BASE_URL: cmsBaseUrl } = app.node.tryGetContext(env);
      const cmsReadApiKey = app.node.tryGetContext('CMS_READ_API_KEY');

      if (cmsBaseUrl === undefined || cmsBaseUrl.length === 0) {
        throw new Error('Please provide cms base url');
      }

      if (cmsReadApiKey === undefined || cmsReadApiKey.length === 0) {
        throw new Error('Please provide cms read api key');
      }

      return resolve({
        account,
        region,
        environment: env,
        cmsBaseUrl,
        cmsReadApiKey
      });
    } catch (error) {
      console.error(error);
      return reject();
    }
  });
};

const createStacks = async () => {
  const context = await getContext(app);
  new AppRunnerStack(app, `apprunnerstack-${context.region}-${context.environment}`, {
    env: {
      account: context.account,
      region: context.region
    },
    cmsBaseUrl: context.cmsBaseUrl,
    cmsReadApiKey: context.cmsReadApiKey,
  });
}

createStacks();
