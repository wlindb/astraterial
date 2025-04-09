import { Service, Source } from "@aws-cdk/aws-apprunner-alpha";
import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Repository, TagStatus } from "aws-cdk-lib/aws-ecr";
import { DockerImageAsset, Platform } from "aws-cdk-lib/aws-ecr-assets";
import { DockerImageName, ECRDeployment } from "cdk-ecr-deployment";
import { Construct } from "constructs";
import { AppRunnerStackProps } from "../lambda-layer/types";


export class AppRunnerStack extends Stack {
  public readonly service: Service;

  constructor(scope: Construct, id: string, props: AppRunnerStackProps) {
    super(scope, id, props);

    const dockerImageAsset = new DockerImageAsset(this, 'nextjs-docker-image', {
      directory: 'client',
      platform: Platform.LINUX_AMD64,
      buildArgs: {
        CMS_BASE_URL: props.cmsBaseUrl,
        CMS_READ_API_KEY: props.cmsReadApiKey,
        ENVIRONMENT: props.environment,
        NEXT_PUBLIC_BASE_URL: `https://${props.domain}`,
      },
    });

    const repository = new Repository(this, 'client-repository', {
      repositoryName: 'client-repository',
      removalPolicy: RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });

    repository.addLifecycleRule({
      tagStatus: TagStatus.ANY,
      maxImageCount: 5,
    });

    repository.addLifecycleRule({
      tagStatus: TagStatus.UNTAGGED,
      maxImageAge: Duration.days(1),
    });

    // Push image to ECR repository
    new ECRDeployment(this, 'ecr-deployment', {
      src: new DockerImageName(dockerImageAsset.imageUri),
      dest: new DockerImageName(`${repository.repositoryUri}:latest`),
    });

    this.service = new Service(this, 'apprunner-service', {
      serviceName: 'client',
      source: Source.fromEcr({
        repository: repository,
        imageConfiguration: {
          port: 3000,
        },
      }),
      autoDeploymentsEnabled: true,
    });
  }
}
