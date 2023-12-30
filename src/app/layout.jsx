import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AllProviders } from "@/providers/AllProviders";

config.autoAddCss = false;

export const metadata = {
  title: "English Ambulance",
  description: "Created by Someone",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
