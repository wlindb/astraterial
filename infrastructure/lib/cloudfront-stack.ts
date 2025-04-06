import { Stack } from "aws-cdk-lib";
import { CloudFrontStackProps } from "../lambda-layer/types";
import { Construct } from "constructs";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  HttpVersion,
  OriginProtocolPolicy,
  OriginRequestHeaderBehavior,
  OriginRequestPolicy,
  OriginRequestQueryStringBehavior,
  ViewerProtocolPolicy
} from "aws-cdk-lib/aws-cloudfront";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

export class CloudFrontStack extends Stack {
  public readonly distribution: Distribution;

  constructor(scope: Construct, id: string, props: CloudFrontStackProps) {
    super(scope, id, props);

    const appRunnerOrigin = new HttpOrigin(props.appRunnerServiceUrl, {
      protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
      httpPort: 80,
      httpsPort: 443,
    });

    // Create a custom origin request policy
    const customOriginRequestPolicy = new OriginRequestPolicy(
      this,
      "UserAgentRefererHeadersPolicy",
      {
        headerBehavior: OriginRequestHeaderBehavior.allowList(
          "User-Agent",
          "Referer",
        ),
        queryStringBehavior: OriginRequestQueryStringBehavior.all(),
      },
    );

    this.distribution = new Distribution(this, "CloudFrontDistribution", {
      defaultBehavior: {
        origin: appRunnerOrigin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originRequestPolicy: customOriginRequestPolicy,
        cachePolicy: CachePolicy.CACHING_DISABLED,
        allowedMethods: AllowedMethods.ALLOW_ALL,
      },
      domainNames: [props.domain],
      certificate: props.certificate,
      httpVersion: HttpVersion.HTTP3,
    });

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.domain
    });

    new ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
      recordName: props.domain,
    });
  }
}
