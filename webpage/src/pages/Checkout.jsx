

function Checkout() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", phone: "", payment: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const checkoutData = pageInputs.find((item) => item.identifier === "checkout");
  if (!checkoutData) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Container>
    );
  }
  if (submitted) {
    return (
      <Container sx={{ py: 6, background: checkoutData.themeColor, backgroundImage: `url(${checkoutData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Typography variant="h4" gutterBottom>Order Confirmed!</Typography>
        <Typography>Thank you for your purchase, {form.name || "Customer"}.</Typography>
      </Container>
    );
  }
  return (
    <Container sx={{ py: 6, maxWidth: 500, background: checkoutData.themeColor, backgroundImage: `url(${checkoutData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Typography variant="h4" gutterBottom>{checkoutData.title}</Typography>
      <Typography variant="body1" gutterBottom>{checkoutData.description}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Payment Option" name="payment" value={form.payment} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" color="primary">Place Order</Button>
      </form>
    </Container>
  );
}

export default Checkout;
