import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "en" };
  }

  render() {
    const lang = this.props.locale;

    return (
      <Html lang={lang}>
        <Head>
          <link
            href="../assets/QDF_Favicon.ico"
            rel="icon"
            type="image/ico"
            sizes="16x16"
          />
          <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png" />
          <meta name="theme-color" content="#F8F3ED" />
        </Head>
        <body className="qdf-dokkan">
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
