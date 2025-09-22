
import pageInputs from "../data/pageInputs.json";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Blog() {
  const blogData = pageInputs.find((item) => item.identifier === "blog");
  if (!blogData) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Container>
    );
  }
  return (
  <Container sx={{ py: 6, background: blogData.themeColor, backgroundImage: `url(${blogData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: blogData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{blogData.title}</Typography>
      <Typography variant="body1">{blogData.description}</Typography>
      <Typography variant="body1">(Blog articles coming soon...)</Typography>
    </Container>
  );
}

export default Blog;
