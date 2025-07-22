"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import ReactQueryProvider from "@/lib/react-query-provider";
import { NotificationProvider } from "@/context/NotificationContext";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
