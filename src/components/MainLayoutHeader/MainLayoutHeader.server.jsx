import Link from "next/link";
import { Typography, Container, Toolbar, AppBar } from "@mui/material";
import LogoutButton from "./LogoutButton.client";
import LoginButton from "./LoginButton.client";

async function MainLayoutHeader() {
  return (
    <AppBar color="default" position="absolute">
      <Container
        maxWidth="auto"
        sx={{ backgroundColor: "common.white", boxShadow: "none" }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography color={"primary.light"} variant="h1" noWrap component="a">
            <Link href="/">English Metro🚈</Link>
          </Typography>

          <LogoutButton />
          <LoginButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainLayoutHeader;
