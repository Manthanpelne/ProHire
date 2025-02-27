import { useTheme } from "@/contextApi/context";



export const LandingPage = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
   <>
      {/* <h1 className="text-3xl font-bold">Welcome to my Website</h1>

      <button
        onClick={toggleTheme}
        className="mt-6 px-6 w-[300px] py-3 rounded-lg text-lg font-semibold transition-all duration-300 border border-gray-400 shadow-md 
                     hover:shadow-lg hover:scale-105 
                     bg-gray-900 text-white dark:bg-gray-900 cursor-pointer dark:text-white"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button> */}
      </>
  );
};
