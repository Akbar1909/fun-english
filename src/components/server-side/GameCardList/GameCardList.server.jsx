import Link from "next/link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const GameCardList = () => {
  const games = [
    {
      id: 1,
      title: "Word Tetris",
      image: "",
      color: "primary.main",
      href: "/games/word-tetris",
    },
  ];

  return (
    <Stack direction="row" alignItems="center">
      {games.map((game) => (
        <Link key={game.id} href={game.href}>
          <Box
            sx={{
              width: "180px",
              py: "20px",
              height: "60px",
              backgroundColor: game.color,
              color: "colors.white",
              textAlign: "center",
              borderRadius: "6px",
            }}
          >
            <Typography variant="h3">{game.title}</Typography>
          </Box>
        </Link>
      ))}
    </Stack>
  );
};

export default GameCardList;
