
import React from "react";
import pageInputs from "../data/pageInputs.json";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Contact() {
  const contactData = pageInputs.find((item) => item.identifier === "contact");
  if (!contactData) {
    return (
      <Container sx={{ py: 6, maxWidth: 500 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Container>
    );
  }
  return (
  <Container sx={{ py: 6, maxWidth: 500, background: contactData.themeColor, backgroundImage: `url(${contactData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: contactData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{contactData.title}</Typography>
      <Typography variant="body1" gutterBottom>{contactData.description}</Typography>
      <form>
        <TextField label="Name" fullWidth required sx={{ mb: 2 }} />
        <TextField label="Email" fullWidth required sx={{ mb: 2 }} />
        <TextField label="Message" fullWidth required multiline rows={4} sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" color="primary">Send</Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>Email: support@aquascape.com | Phone: +1-234-567-8901</Typography>
    </Container>
  );
}

export default Contact;
