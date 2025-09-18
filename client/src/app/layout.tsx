"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import ReactQueryProvider from "@/lib/react-query-provider";
// import Script from "next/script";
import { NotificationProvider } from "@/context/NotificationContext";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* <Script
          id="cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="b07886f0-52a9-47bc-b38a-fb4fd0b07451"
          data-blockingmode="auto"
          strategy="beforeInteractive" // <- ключове
        /> */}
      </head>
      <body style={{ margin: 0 }}>
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <NotificationProvider>
              <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
            </NotificationProvider>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
