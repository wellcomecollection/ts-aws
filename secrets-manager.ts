import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { AccountName, getCreds } from './sts';


export async function setEnvsFromSecrets(account: AccountName, secrets: Record<string, string>): Promise<void> {
  const credentials = await getCreds(account, 'developer');
  const secretsManagerClient = new SecretsManagerClient({
    credentials,
    region: 'eu-west-1',
  });

  const responses = await Promise.all(
    Object.values(secrets).map(secretId => {
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
    process.env[env] = val;
  }
}

