
import pageInputs from "../data/pageInputs.json";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Policy() {
  const policyData = pageInputs.find((item) => item.identifier === "policy");
  if (!policyData) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Container>
    );
  }
  return (
  <Container sx={{ py: 6, background: policyData.themeColor, backgroundImage: `url(${policyData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: policyData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{policyData.title}</Typography>
      <Typography variant="body1" gutterBottom>{policyData.description}</Typography>
      <Typography variant="body1">Shipping & Delivery: We ship all orders within 2 business days. Delivery times vary by location.<br /><br />Return & Refund: Returns accepted within 7 days of delivery. Please contact support for assistance.</Typography>
    </Container>
  );
}

export default Policy;
