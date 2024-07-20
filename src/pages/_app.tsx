import "../assets/styles/global.css";
import "../assets/styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-phone-number-input/style.css";
import Head from "next/head";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/modules/layouts";
import Script from "next/script";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App(props: any) {
  const { Component, pageProps, popup, router } = props;
  const { page } = pageProps;
  const pageKey = router.asPath;

  // useEffect(() => {
  //   scrollToTop();
  // }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1"
        />

        <meta name="theme-color" content="white" />
      </Head>
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="beforeInteractive"
      />
      <Layout page={pageProps} popup={popup} router={router}>
        <Component key={page?.uid} {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
