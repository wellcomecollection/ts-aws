import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";

type Access = "read_only" | "developer" | "admin";

const accounts = {
  platform: { account: "760097843905" },
  workflow: { account: "299497370133" },
  storage: { account: "975596993436" },
  experience: { account: "130871440101" },
  data: { account: "964279923020" },
  digitisation: { account: "404315009621" },
  reporting: { account: "269807742353" },
  catalogue: { account: "756629837203" },
  identity: { account: "770700576653" },
};

/**
 * @deprecated Do not use this package moving forward.
 */
export type AccountName = keyof typeof accounts;

const client = new STSClient({ apiVersion: "2011-06-15", region: "eu-west-1" });

/**
 * @deprecated Do not use this package moving forward.
 */
async function getCreds(name: AccountName, access: Access = "read_only") {
  const params = {
    RoleArn: `arn:aws:iam::${accounts[name].account}:role/${name}-${access}`,
    RoleSessionName: `${name}-${access}`,
  };
  const command = new AssumeRoleCommand(params);

  const data = await client.send(command);
  const credentials = {
    accessKeyId: data.Credentials!.AccessKeyId!,
    secretAccessKey: data.Credentials!.SecretAccessKey!,
    sessionToken: data.Credentials!.SessionToken!,
  };

  return credentials;
}

export { getCreds };
