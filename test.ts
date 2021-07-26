import { getCreds } from "./sts";

async function run() {
  const creds = await getCreds("platform", "developer");
}

run();
