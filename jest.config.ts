import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  globals: {
    extensionsToTreatAsEsm: ['.ts', '.js']
  },

  preset: 'ts-jest',
};

export default config;
