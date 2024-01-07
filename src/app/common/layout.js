import MainLayoutHeader from "@/components/MainLayoutHeader/MainLayoutHeader.server";
import { Box, Container } from "@mui/material";
import EmptyFolderView from "@/components/EmptyFolderView";
import AuthChecker from "@/components/AuthChecker/AuthChecker";
import { Suspense } from "react";

export const metadata = {
  title: "English Ambulance",
  description: "Created by Someone",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <Container
          maxWidth="auto"
          sx={{
            backgroundColor: "common.white",
            height: "auto",
            minHeight: "100vh",
          }}
        >
          <Box>{children}</Box>
        </Container>
      </body>
    </html>
  );
}
