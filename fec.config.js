/**
 * @type {import("webpack").Configuration}
 */
const config = {
  appUrl: '/staging/starter',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  // XXX(RobotSail): These values may conflict with how redhat-frontend-components-config handles reading the webpack config
  rootFolder: this.resolve(__dirname, '../'),
  deployment: process.env.BETA === 'true' ? 'preview/apps' : 'apps',
  /**
   * Change accordingly to your appname in package.json.
   * The `sassPrefix` attribute is only required if your `appname` includes the dash `-` characters.
   * If the dash character is present, you will have add a camelCase version of it to the sassPrefix.
   * If it does not contain the dash character, remove this configuration.
   */
  sassPrefix: '.trusted-artifact-signer, .trustedArtifactSigner',
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: true,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  _unstableHotReload: process.env.HOT === 'true',
  moduleFederation: {
    exclude: ['react-router-dom'],
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          requiredVersion: '^6.3.0',
        },
      },
    ],
  },
};

module.exports = config;
