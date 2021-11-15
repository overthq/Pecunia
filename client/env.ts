import Constants from 'expo-constants';

const localhostString = (extension: string) =>
  `http://${Constants.manifest?.debuggerHost
    ?.split(':')
    .shift()
    ?.concat(`:${extension}`)}`;

const ENV = {
  dev: {
    apiUrl: localhostString('5000')
  },
  staging: {
    apiUrl: 'https://'
  },
  prod: {
    apiUrl: 'https://'
  }
};

const getEnvVars = (env?: keyof typeof ENV) =>
  env ? ENV[env] : ENV.dev || ENV.staging;

export default getEnvVars(
  Constants.manifest?.releaseChannel as keyof typeof ENV | undefined
);
