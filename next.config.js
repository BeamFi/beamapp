const removeImports = require("next-remove-imports")()

const DFXWebPackConfig = require("./dfx.webpack.config")
DFXWebPackConfig.initCanisterIds()

module.exports = removeImports({
  webpack: (
    config,
    // eslint-disable-next-line no-unused-vars
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.experiments = {
      topLevelAwait: true
    }

    // Important: return the modified config
    return config
  },
  eslint: {
    dirs: ["pages", "ui"]
  },
  async rewrites() {
    return [
      {
        source: "/:path*.html",
        destination: "/:path*"
      },
      {
        source: "/getpaid",
        destination: "/"
      },
      {
        source: "/beamout/:path*",
        destination: "/"
      },
      {
        source: "/mybeams",
        destination: "/"
      },
      {
        source: "/mybeams/:path*",
        destination: "/"
      },
      {
        source: "/connect",
        destination: "/"
      }
    ]
  }
})
