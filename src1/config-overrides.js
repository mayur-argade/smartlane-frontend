const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = function override(config, env) {
  // Add WorkboxWebpackPlugin to generate service worker
  if (env === "production") {
    config.plugins.push(
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      })
    );
  }

  return config;
};
