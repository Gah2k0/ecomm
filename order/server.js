import dotenv from 'dotenv';
import app from './src/app.js';
import db from './src/config/dbConnect.js';

dotenv.config();

const port = process.env.PORT || 3003;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o mongoDB feita com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
