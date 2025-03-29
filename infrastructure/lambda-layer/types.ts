import { StackProps } from "aws-cdk-lib";

export type CDKContext = {
  account: string;
  region: string;
  environment: string;
  cmsBaseUrl: string;
  cmsReadApiKey: string;
};

export interface AppRunnerStackProps extends StackProps {
  cmsBaseUrl: string;
  cmsReadApiKey: string;
}
