const express = require('express');

const app = express();

const publicPath = express.static('./dist');

app.use('/dist', publicPath);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

console.log('Starting server on port 5000!');
app.listen(process.env.PORT || 5000);
