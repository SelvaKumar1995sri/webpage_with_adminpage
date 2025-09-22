
import pageInputs from "../data/pageInputs.json";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function About() {
  const aboutData = pageInputs.find((item) => item.identifier === "about");
  if (!aboutData) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Container>
    );
  }
  return (
    <Container sx={{ py: 6, background: aboutData.themeColor, backgroundImage: `url(${aboutData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: aboutData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{aboutData.title}</Typography>
      <Typography 
        variant="body1" 
        component="div"
        dangerouslySetInnerHTML={{ __html: aboutData.description }}
      />
    </Container>
  );
}

export default About;
