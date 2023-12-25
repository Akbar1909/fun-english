import ReactQueryProvider from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";

export const AllProviders = async ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
