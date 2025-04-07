import { StackProps } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

export type CDKContext = {
  account: string;
  region: string;
  environment: string;
  cmsBaseUrl: string;
  cmsReadApiKey: string;
  domain: string;
};

export interface AppRunnerStackProps extends StackProps {
  cmsBaseUrl: string;
  cmsReadApiKey: string;
  environment: string;
}

export interface CloudFrontStackProps extends StackProps {
  domain: string;
  certificate: Certificate;
  appRunnerServiceUrl: string;
}

export interface Route53StackProps extends StackProps {
  domain: string;
}
