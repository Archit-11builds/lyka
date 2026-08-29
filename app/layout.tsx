import "./globals.css";
import { SiteProvider } from "@/components/SiteProvider";
import { Shell } from "@/components/Shell";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "LYKA — The Anik Dossier",
  description: "A wildly unnecessary cinematic archive of Anik.",
  icons: { icon: "/lyka-favicon.svg" }
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><SiteProvider><Shell>{children}</Shell></SiteProvider><Analytics /></body></html>;
}
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}