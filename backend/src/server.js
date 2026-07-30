const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
