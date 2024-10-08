import React from "react";
import AuthLayout from "@/components/modules/authLayout";
import Head from "next/head";
import LoginSection from "@/components/rendering/auth/loginSection";
import { parseCookies } from "nookies";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>WaoSim | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconIcon.svg" />
      </Head>
      <main>
        <AuthLayout>
          <LoginSection />
        </AuthLayout>{" "}
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;

  const cookies = parseCookies({ req });

  if (cookies?.waotoken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: cookies?.waotoken || "",
    },
  };
}
