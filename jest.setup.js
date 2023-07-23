import 'whatwg-fetch';
import 'setimmediate';
import { config } from 'dotenv';

// Load env variables in JEST
config({
  path: '.env.test',
});

// jest.mock('./src/helpers/getEnv', () => ({
//   getEnv: () => ({ ...process.env }),
// }));