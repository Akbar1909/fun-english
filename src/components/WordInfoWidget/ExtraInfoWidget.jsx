import { Box, Stack, Typography, List, ListItem } from "@mui/material";

const ExtraInfoWidget = ({ title, list, sx }) => {
  return (
    <Box
      sx={[
        {
          borderRadius: "12px",
          p: 1,
          backgroundColor: (theme) => theme.palette.warning.light,
          fontWeight: "bold",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography sx={{ fontStyle: "italic" }}>{title}</Typography>
      <List dense>
        {list.map((item, i) => (
          <ListItem sx={{ width: "fit-content", px: 2, mb: 0.5 }} key={i}>
            {item}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExtraInfoWidget;
