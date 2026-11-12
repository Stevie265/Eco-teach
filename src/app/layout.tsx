import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Nav, SiteFooter, TabBar } from "@/components/ui/Nav";
import { MotionProvider } from "@/components/motion/Motion";
import { RisoDefs } from "@/components/brand/RisoDefs";

export const metadata: Metadata = {
  title: {
    default: "Eco-teach: Understand the world that's changing our future",
    template: "%s · Eco-teach",
  },
  description:
    "An interactive learning platform for the Eco-Tech industry: energy, climate, technology, business models and the future of the home. Bite-sized, visual and grounded in credible sources.",
  openGraph: {
    title: "Eco-teach",
    description: "Understand the world that's changing our future. Interactive lessons on energy, climate tech and the future home.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f1e3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="grain flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <RisoDefs />
        <MotionProvider>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <TabBar />
        </MotionProvider>
      </body>
    </html>
  );
}
