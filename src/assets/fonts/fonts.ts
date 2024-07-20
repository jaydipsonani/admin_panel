import { Inter } from "next/font/google";
import localFont from "next/font/local";

const interRegular = Inter({
  style: ["normal"],
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-regular",
});

const interMedium = Inter({
  style: ["normal"],
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-medium",
});

const interSemiBold = Inter({
  weight: ["600"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-semibold",
});

const interBold = Inter({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-bold",
});

const kabutHitamRegular = localFont({
  src: "./Kabut-Hitam.ttf",
  display: "swap",
  variable: "--font-kabutHitam-regular",
});

export {
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
  kabutHitamRegular,
};
