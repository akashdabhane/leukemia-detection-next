import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata = {
  title: "Leukemia Detector AI & Medical Assistant",
  description: "Advanced computational diagnostic platform for cellular anomaly detection. Utilizing cutting-edge AI to analyze blood smear images, providing accurate leukemia detection and personalized medical insights. Empowering healthcare professionals with rapid, reliable diagnostics for improved patient outcomes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:bg-indigo-500/50">
      <body className="bg-[#fcfcfd] dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-sans selection:bg-indigo-100">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main className="flex-1 px-4 py-12 md:px-8 mt-6">
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
              </div>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
