import ReactQueryProvider from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider/ThemeProvider";
import { ToastContainer } from "react-toastify";

export const AllProviders = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
