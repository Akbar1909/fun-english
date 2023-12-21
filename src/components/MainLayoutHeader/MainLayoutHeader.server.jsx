import Link from "next/link";
import { Typography, Container, Toolbar, Stack, AppBar } from "@mui/material";

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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainLayoutHeader;
