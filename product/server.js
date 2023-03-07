import app from './src/app.js';
import db from './src/config/dbConnect.js';

const port = process.env.PORT || 3002;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o mongoDB feita com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
