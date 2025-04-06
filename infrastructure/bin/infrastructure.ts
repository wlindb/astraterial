#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AppRunnerStack } from '../lib/app-runner-stack';
import { CDKContext } from '../lambda-layer/types';
import { CloudFrontStack } from '../lib/cloudfront-stack';
import { Route53Stack } from '../lib/route53-stack';

const app = new cdk.App();

export const getContext = async (app: cdk.App): Promise<CDKContext> => {
  return new Promise(async (resolve, reject) => {
    try {
      const env = app.node.tryGetContext('env');
      const { account, region, CMS_BASE_URL: cmsBaseUrl, domain } = app.node.tryGetContext(env);
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
        cmsReadApiKey,
        domain
      });
    } catch (error) {
      console.error(error);
      return reject();
    }
  });
};

const createStacks = async () => {
  const context = await getContext(app);
  const apprunner = new AppRunnerStack(app, `apprunnerstack-${context.region}-${context.environment}`, {
    env: {
      account: context.account,
      region: context.region
    },
    cmsBaseUrl: context.cmsBaseUrl,
    cmsReadApiKey: context.cmsReadApiKey,
  });

  const route53 = new Route53Stack(app, `route53stack-us-east-1-${context.environment}`,
    {
      env: {
        account: context.account,
        region: 'us-east-1'
      },
      domain: context.domain,
      crossRegionReferences: true,
    }
  );

  new CloudFrontStack(app, `cloudfrontstack-${context.region}-${context.environment}`,
    {
      env: {
        account: context.account,
        region: context.region
      },
      domain: context.domain,
      certificate: route53.certificate,
      appRunnerServiceUrl: apprunner.service.serviceUrl,
      crossRegionReferences: true,
    }
  );
}

createStacks();
