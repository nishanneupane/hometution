import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR Home Tuition | Expert Tutors at Your Doorstep in Nepal",
  description:
    "Find the best home tutors in Nepal for all subjects & grades. HR Home Tuition connects you with qualified teachers for personalized learning at home or online. Trusted by parents & students.",
  keywords:
    "home tuition Nepal, private tutor Kathmandu, online tutor Nepal, personal tutoring, HR Home Tuition, home tutor Lalitpur, tuition classes Nepal, best tutor in Nepal, one-on-one teaching, group tuition Nepal, English tutor Nepal, math tutor Nepal, science tuition Nepal, qualified teachers Nepal, affordable home tuition",
  authors: [{ name: "HR Home Tuition" }],
  creator: "HR Home Tuition",
  publisher: "HR Home Tuition",
  applicationName: "HR Home Tuition",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hrhometuition.com"),
  openGraph: {
    title: "HR Home Tuition | Expert Tutors in Nepal",
    description:
      "Get top-rated tutors for home & online learning in Nepal. Personalized lessons for every student. Quality education made simple.",
    url: "https://hrhometuition.com",
    siteName: "HR Home Tuition",
    images: [
      {
        url: "/images/hrlogo.png", // local image in public folder
        width: 1200,
        height: 630,
        alt: "HR Home Tuition - Quality Education at Home",
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Home Tuition | Find the Best Tutors in Nepal",
    description:
      "Hire qualified tutors for personalized home & online tuition across Nepal. All subjects. All grades.",
    images: ["/images/hrlogo.png"], // local image
    creator: "@nishanneupane", // optional
  },
  alternates: {
    canonical: "https://hrhometuition.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

        <Script type="application/ld+json" id="home-json-ld">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "HR Home Tuition",
            "url": "https://hrhometuition.com",
            "logo": "https://hrhometuition.com/images/hrlogo.png",
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61566018680593",
              "https://www.instagram.com/hrhometuition"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+977-9767482282",
              "contactType": "Customer Service",
              "areaServed": "NP"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kathmandu",
              "addressCountry": "NP"
            }
          })}
        </Script>
      </body>
    </html>
  );
}
