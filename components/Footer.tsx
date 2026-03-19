export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm relative z-10">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-between gap-6 md:flex-row">
        
        {/* Left */}
        <div className="flex flex-col items-center md:items-start text-sm text-gray-500 dark:text-gray-400">
          <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            Leukemia Detector AI
          </p>
          <p>
            © {new Date().getFullYear()} All rights reserved. Powered by Gemini.
          </p>
        </div>

        {/* Right Links */}
        <div className="flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
          <a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </a>
          <a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            About the Model
          </a>
          <a href="/help" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Contact & Support
          </a>
        </div>
      </div>
    </footer>
  );
}
