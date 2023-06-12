const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Projeto Store Manager de Fernanda Macêdo escutando na porta ${PORT}`);
});
