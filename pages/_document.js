import React from 'react';

// eslint-disable-next-line @next/next/no-document-import-in-page
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

import theme from '../ui/styles/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html style={{ height: '-webkit-fill-available' }}>
        <Head>
          <meta httpEquiv="expires" content="-1" />
          <meta httpEquiv="cache-control" content="no-cache, no-store" />
          <meta property="og:image:width" content="1100" />
          <meta property="og:image:height" content="1100" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
            key="apple-touch-icon"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
            key="icon32"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
            key="icon16"
          />
          <link rel="manifest" href="/site.webmanifest" key="manifest" />
          <meta name="twitter:card" content="Beam" key="twittercard" />
          <meta
            name="twitter:site"
            content="@ContentFlyApp"
            key="twittersite"
          />
          <meta
            name="twitter:creator"
            content="@ContentFlyApp"
            key="twittercreator"
          />
          <meta property="og:url" content="http://dev.beamfi.app" key="ogurl" />
          <meta
            property="og:title"
            content="Beam Payment Protocol by Content Fly"
            key="ogtitle"
          />
          <meta
            property="og:description"
            content="A new Streaming Payment protocol with trustless escrow payment enables creators to receive a continuous stream of payment each minute in real time once a job starts instead of lump-sum payment."
            key="ogdesc"
          />
          <meta
            name="description"
            content="A new Streaming Payment protocol with trustless escrow payment enables creators to receive a continuous stream of payment each minute in real time once a job starts instead of lump-sum payment."
            key="desc"
          />
          <meta
            property="og:image"
            content="https://contentfly.app/assets/images/beamlogo-og.png"
            key="ogimage"
          />
        </Head>
        <body
          style={{ minHeight: '-webkit-fill-available', minHeight: '100vh' }}
        >
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript
            initialColorMode={theme.config.initialColorMode}
            storageKey="beam-color-mode"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
