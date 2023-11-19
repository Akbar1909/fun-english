import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastContainer } from "react-toastify";

export const AllProviders = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ToastContainer />
      <ThemeProvider>{children}</ThemeProvider>
    </ReactQueryProvider>
  );
};
