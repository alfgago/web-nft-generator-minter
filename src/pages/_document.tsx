/* eslint-disable @next/next/no-sync-scripts */
import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
  } from "next/document"
  import { ServerStyleSheet } from "styled-components"
  
  export default class MyDocument extends Document {
    
    render() {
      return (
        <Html>
          <Head>
            <meta charSet="utf-8" />
          </Head>
          <body>
            <Main />
            <NextScript />
            <div id="portal" />
          </body>
        </Html>
      )
    }

    static getInitialProps = async (ctx: DocumentContext) => {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
    
        try {
          ctx.renderPage = () =>
            originalRenderPage({
              enhanceApp: (App) => (props) =>
                sheet.collectStyles(<App {...props} />),
            })
    
          const initialProps = await Document.getInitialProps(ctx)
          return {
            ...initialProps,
            styles: [
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>,
            ],
          }
        } finally {
          sheet.seal()
        }
      }
  }
  