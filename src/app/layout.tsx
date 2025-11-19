import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientThemeProvider from "@/components/ClientThemeProvider";

export const metadata = {
  title: "Portfolio Dr. Cristian Gomez",
  description: "Personal portfolio in Next.js + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var shouldBeDark = theme === 'dark' || !theme;
                  var root = document.documentElement;
                  if (shouldBeDark) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                  } else {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
          suppressHydrationWarning
        />
      </head>
      <body className="dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:text-white text-gray-900 transition-colors duration-300">
        <ClientThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
