import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface StorageConfig {
  region?: string;
  bucket: string;
  endpoint?: string;
  forcePathStyle?: boolean;
}

export class StorageClient {
  private s3: S3Client;
  private bucket: string;

  constructor(config: StorageConfig) {
    this.bucket = config.bucket;
    this.s3 = new S3Client({
      region: config.region ?? process.env.AWS_REGION ?? "us-east-1",
      ...(config.endpoint && {
        endpoint: config.endpoint,
        forcePathStyle: config.forcePathStyle ?? true,
      }),
    });
  }

  async upload(
    key: string,
    body: Buffer | ReadableStream | string,
    contentType?: string,
  ): Promise<string> {
    const params: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ...(contentType && { ContentType: contentType }),
    };
    await this.s3.send(new PutObjectCommand(params));
    return key;
  }

  async download(key: string): Promise<ReadableStream | null> {
    const response = await this.s3.send(
      new GetObjectCommand({ Bucket: this.bucket, Key: key }),
    );
    return (response.Body as ReadableStream) ?? null;
  }

  async presignUpload(
    key: string,
    contentType: string,
    expiresIn = 3600,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });
    return getSignedUrl(this.s3, command, { expiresIn });
  }

  async presignDownload(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return getSignedUrl(this.s3, command, { expiresIn });
  }

  async delete(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }

  async list(prefix?: string): Promise<string[]> {
    const response = await this.s3.send(
      new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
      }),
    );
    return (response.Contents ?? []).map((item) => item.Key!).filter(Boolean);
  }
}
