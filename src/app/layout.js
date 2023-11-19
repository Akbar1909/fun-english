import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { AllProviders } from "@/providers";
import { MainLayoutHeader } from "@/components/MainLayoutHeader";
import { Box, Container } from "@mui/material";

export const metadata = {
  title: "English Ambulance",
  description: "Created by Someone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <AllProviders>
          <Container maxWidth="auto">
            <MainLayoutHeader />
            <Box sx={{ my: { xs: 8, sm: 9 } }}>{children}</Box>
          </Container>
        </AllProviders>
      </body>
    </html>
  );
}
