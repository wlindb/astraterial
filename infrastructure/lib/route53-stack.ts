import { Stack, StackProps } from "aws-cdk-lib";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { Route53StackProps } from "../lambda-layer/types";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";

export class Route53Stack extends Stack {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: Route53StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.domain
    });

    // Create an ACM certificate
    this.certificate = new Certificate(this, "Certificate", {
      domainName: props.domain,
      validation: CertificateValidation.fromDns(hostedZone),
    });
  }
}
