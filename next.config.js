// const removeImports = require("next-remove-imports")()

const DFXWebPackConfig = require("./dfx.webpack.config")
DFXWebPackConfig.initCanisterIds()

module.exports = {
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
        source: "/newmeeting",
        destination: "/"
      },
      {
        source: "/beamout/:path*",
        destination: "/"
      },
      {
        source: "/meeting/:path*",
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
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marketplacecontent.zoom.us",
        port: "",
        pathname: "/zoom_marketplace/img/**"
      }
    ]
  }
}
