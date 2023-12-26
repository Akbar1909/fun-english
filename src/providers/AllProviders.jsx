import ReactQueryProvider from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider/ThemeProvider";
import { ToastContainer } from "react-toastify";
import NextAuthProvider from "./NextAuthProvider";

export const AllProviders = async ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
        <ToastContainer />
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
