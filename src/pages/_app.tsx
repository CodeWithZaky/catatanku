import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main
          className={clsx(
            GeistSans.className,
            "flex min-h-screen flex-col md:container",
          )}
        >
          <Navbar />
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
