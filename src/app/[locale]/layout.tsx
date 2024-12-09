'use client';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import '@/styles/global.css';

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  }) {
  const [pathArray, setPathArray] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Code here only runs on the client (browser)
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.split('/');
      setPathArray(path);
    }
  }, []); // This effect runs only once, after the component mounts
  if (pathArray[1] === 'login' || pathArray[1] === 'register') {
    return (
      <html lang="en">
        <body suppressHydrationWarning>
          {props?.children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className="flex overflow-auto" suppressHydrationWarning>
          <div className={`h-screen min-w-${isSidebarOpen ? '80' : '20'} transition-all`}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
          <div className="flex w-full flex-col overflow-hidden">
            <div className="w-full overflow-hidden shadow-md">
              <Navbar />
            </div>
            <div className="overflow-auto p-4">
              {props?.children}
            </div>
          </div>

        </body>
      </html>
    );
  }
}
