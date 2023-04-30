import '../styles/globals.css';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider attribute="class">
       
      <div className="font-sans antialiased text-gray-900 dark:text-white">
      <div className="top-left">QuizMe.ai</div>
        {mounted && <Component {...pageProps} />}
        <div className="bottom-middle"> <a href = "">Created by Daniel Anapolsky</a></div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
