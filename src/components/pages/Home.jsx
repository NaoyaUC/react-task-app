import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Home = () => {

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 2,
          boxShadow: 8,
          padding: 2,
          marginBottom: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          HOME
        </Typography>
      </Box>
    </Container>
  );
};
