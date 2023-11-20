import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function MainLayoutHeader() {
  return (
    <AppBar position="fixed">
      <Container
        maxWidth="auto"
        sx={{ backgroundColor: "common.white", boxShadow: "none" }}
      >
        <Toolbar disableGutters>
          <Link href="/">
            <Typography
              color={"primary.light"}
              variant="h3"
              noWrap
              component="a"
            >
              English Metro🚈
            </Typography>
          </Link>

          {/* <MobileMenuIcon /> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainLayoutHeader;
