import { config, STS } from "aws-sdk";

config.update({ region: "eu-west-1" });

const sts = new STS({ apiVersion: "2011-06-15" });

type Access = "read_only" | "developer" | "admin";
type AccountName = keyof typeof accounts;
const accounts = {
  platform: { account: "760097843905" },
  workflow: { account: "299497370133" },
  storage: { account: "975596993436" },
  experience: { account: "130871440101" },
  data: { account: "964279923020" },
  digitisation: { account: "404315009621" },
  reporting: { account: "269807742353" },
  catalogue: { account: "756629837203" },
};

async function getCreds(name: AccountName, access: Access = "read_only") {
  const role = {
    RoleArn: `arn:aws:iam::${accounts[name].account}:role/${name}-${access}`,
    RoleSessionName: `${name}-${access}`,
  };
  const data = await sts.assumeRole(role).promise();
  const credentials = {
    accessKeyId: data.Credentials!.AccessKeyId,
    secretAccessKey: data.Credentials!.SecretAccessKey,
    sessionToken: data.Credentials!.SessionToken,
  };
  return credentials;
}

export { getCreds };
