// app/layout.js
import './globals.css';
import Script from 'next/script';
import LayoutChrome from '../components/LayoutChrome';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { OneSignalInit } from './OneSignal';
import { Suspense } from 'react';
import { THEME_STORAGE_KEY } from '../lib/theme';


export const metadata = {
  metadataBase: new URL("https://rocketsingh.app"),
  title: "RocketSingh | SuperFast Service",
  description: "RocketSingh is a superfast on demand home service.",
  keywords: "RocketSingh, SuperFast Service, On Demand Home Service, India",
  authors: [{ name: "RocketSingh" }],
  openGraph: {
    title: "RocketSingh | SuperFast Service",
    description: "RocketSingh is a superfast on demand home service.",
    url: "https://rocketsingh.app",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "RocketSingh | SuperFast Service",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RocketSingh | SuperFast Service",
    description: "RocketSingh is a superfast on demand home service.",
    images: ["/og/default.png"],
  },
};

export default function RootLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Start roadblock image download before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=document.cookie.match(/(?:^|; )roadblock_seen=([^;]*)/);var d=new Date();var key=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();if(c&&decodeURIComponent(c[1])===key)return;var m=['january','february','march','april','may','june','july','august','september','october','november','december'];var urls=['/roadblock/'+m[d.getMonth()]+'/'+d.getDate()+'.jpg','/roadblock/default/default.jpg'];urls.forEach(function(u){var l=document.createElement('link');l.rel='preload';l.as='image';l.href=u;document.head.appendChild(l);});}catch(e){}})();`,
          }}
        />

        <OneSignalInit />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','YOUR-GTM-ID');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <GoogleAnalytics />

        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=YOUR-GTM-ID"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Facebook Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
        
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
