import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useTheme } from "@/contextApi/context";
import React from "react";
import { Outlet } from "react-router-dom";



export const AppLayout = () => {

    const { darkMode } = useTheme();
  
    return (
      <main className={`relative min-h-screen flex flex-col transition-colors duration-500
        ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        
        {/* Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br
            ${darkMode ? "from-black via-gray-800 to-black" : "from-gray-200 via-white to-gray-100"}`}>
          </div>
          <div className={`absolute inset-0 w-full h-full opacity-60 [background-size:20px_20px]
            ${darkMode ? "bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)]" 
                       : "bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)]"}`}>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>

        
      </main>
      
    );
  };
  



