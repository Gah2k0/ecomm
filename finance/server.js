const app = require('./api/app.js');

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});