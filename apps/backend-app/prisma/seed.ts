import { user } from './seeds/user';

async function run() {
  await user();
}

run();
