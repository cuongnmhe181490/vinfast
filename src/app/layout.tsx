import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vf-silk-seven.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "VF Showcase Demo | Showroom số 3D VinFast",
    template: "%s | VF Showcase Demo",
  },
  description:
    "Website demo/portfolio giới thiệu các dòng xe VinFast bằng trải nghiệm showroom số 3D, dữ liệu có nguồn và cảnh báo xác thực rõ ràng.",
  openGraph: {
    title: "VF Showcase Demo",
    description:
      "Showroom số 3D demo cho người dùng tìm hiểu xe điện VinFast.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VF Showcase Demo",
    description:
      "Showroom số 3D demo cho người dùng tìm hiểu xe điện VinFast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
