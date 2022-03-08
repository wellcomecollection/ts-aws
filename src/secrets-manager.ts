import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { getCreds } from "./sts";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type Credentials = Awaited<ReturnType<typeof getCreds>>;

export async function setEnvsFromSecrets(
  secrets: Record<string, string>,
  credentials?: Credentials
): Promise<void> {
  const secretsManagerClient = new SecretsManagerClient({
    credentials,
    region: "eu-west-1",
  });

  const responses = await Promise.all(
    Object.values(secrets).map((secretId) => {
      const command = new GetSecretValueCommand({
        SecretId: secretId,
      });
      return secretsManagerClient.send(command);
    })
  );

  const envs = Object.keys(secrets).map((env, i) => [
    env,
    responses[i].SecretString,
  ]);

  for (const [env, val] of envs) {
    if (env) {
      process.env[env] = val;
    }
  }
}
