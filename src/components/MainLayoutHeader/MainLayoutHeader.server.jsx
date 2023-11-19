import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import MobileMenuIcon from "./MobileMenuIcon.client";

function MainLayoutHeader() {
  return (
    <AppBar position="fixed">
      <Container maxWidth="auto" sx={{ backgroundColor: "primary.light" }}>
        <Toolbar disableGutters>
          <Typography variant="h3" noWrap component="a">
            English Ambulance 🚑
          </Typography>

          {/* <MobileMenuIcon /> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainLayoutHeader;
