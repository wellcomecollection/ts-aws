import { getCreds } from './sts'

async function run () {
  await getCreds('platform', 'developer')
}

run()
