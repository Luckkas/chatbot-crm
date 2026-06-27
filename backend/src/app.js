const path = require('path');
const express = require('express');

const dashboardRoutes = require('./routes/dashboardRoutes');
const healthRoutes = require('./routes/healthRoutes');
const menuRoutes = require('./routes/menuRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const conversaRoutes = require('./routes/conversaRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');
const logRoutes = require('./routes/logRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboardRoutes);
app.use('/api', healthRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/conversas', conversaRoutes);
app.use('/api/mensagens', mensagemRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/webhook', webhookRoutes);

app.use((req, res) => {
  res.status(404).render('pages/not-found', {
    title: 'Pagina nao encontrada'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;

  res.status(status).json({
    erro: error.message || 'Erro interno do servidor'
  });
});

module.exports = app;
