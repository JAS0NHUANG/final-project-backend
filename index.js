const { createApp } = require('./app.js');
const { APP_PORT } = require('./config');

const startApp = async () => {
  try {
    const app = await createApp();
    await app.listen(APP_PORT);
    console.log('Hello Movie!');
  } catch(error) {
    console.log(error);
  }
}

startApp();
