import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AllProviders } from "@/providers";
import { MainLayoutHeader } from "@/components/MainLayoutHeader";
import { Box, Container } from "@mui/material";

config.autoAddCss = false;
export const metadata = {
  title: "English Ambulance",
  description: "Created by Someone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <AllProviders>
          <Container
            maxWidth="auto"
            sx={{
              backgroundColor: "common.white",
              height: "auto",
              minHeight: "100vh",
              p: 0,
            }}
          >
            <MainLayoutHeader />
            <Box
              sx={{
                my: { xs: 8, sm: 9 },
              }}
            >
              {children}
            </Box>
          </Container>
          <footer>Footer</footer>
        </AllProviders>
      </body>
    </html>
  );
}
