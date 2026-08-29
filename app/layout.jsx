import { Analytics } from '@vercel/analytics/react';
import { SiteProvider } from '../components/SiteProvider';
import { Shell } from '../components/Shell';
import './globals.css';
export const metadata={title:'LYKA — Anik Field System',description:'A highly unnecessary interactive archive of Anik.',icons:{icon:'/lyka-favicon.svg'}};
export default function RootLayout({children}){return <html lang="en"><body><SiteProvider><Shell>{children}</Shell></SiteProvider><Analytics/></body></html>}
