
import pageInputs from "../data/pageInputs.json";

function FAQ() {
  const faqData = pageInputs.find((item) => item.identifier === "faq");
  if (!faqData) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Container>
    );
  }
  return (
  <Container sx={{ py: 6, background: faqData.themeColor, backgroundImage: `url(${faqData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: faqData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{faqData.title}</Typography>
      <Typography variant="body1" gutterBottom>{faqData.description}</Typography>
      <Typography variant="body1">Q: Do you ship live fish?<br />A: Yes, we ship live fish with special care.<br /><br />Q: What payment methods do you accept?<br />A: All major credit cards and UPI.<br /><br />Q: Can I return a product?<br />A: Yes, see our return policy for details.</Typography>
    </Container>
  );
}

export default FAQ;
