import ReactQueryProvider from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider";

export const AllProviders = async ({ children }) => {
  const session = await getServerSession();
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
        <ToastContainer />
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
