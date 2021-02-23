const mongoose = require('mongodb');
const { DB_URL, APP_PORT } = require('./config');

const { createApp } = require('./app.js')

mongoose.connect(DB_URL, { useUnifiedTopology: true })
.then(() => createApp())
.then(app => app.listen(APP_PORT))
.then(() => console.log('Hello Movie!'))
.catch(console.error)

