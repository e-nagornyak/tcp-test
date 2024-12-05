const express = require('express');
const bodyParser = require('body-parser');

const calculateCRC16 = require("./cr16.js")
const iconv = require('iconv-lite');
const net = require("net");

const app = express();
const SERVER_PORT = 3000;

const HOST = '192.168.1.111';
const PORT = 6666;
const client = new net.Socket()

// Middleware для парсингу тіла запиту
app.use(bodyParser.urlencoded({ extended: true }));

// Відображення форми
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Add data</h1>
        <form action="/submit" method="POST">
          <label for="command">Command:</label>
          <input type="text" id="command" name="command" required>
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `);
});

// Обробка POST-запиту
app.post('/submit', (req, res) => {
  let { command } = req.body;

  let message = ''

  const crc16 = calculateCRC16(command);
  console.log('crc16', crc16)

  const fullCommand = `\x02${command}#${crc16}\x03`
  console.log('fullCommand', fullCommand)

  const encodeCommand = iconv.encode(fullCommand, 'win1250')
  console.log('encodeCommand', encodeCommand)

  client.connect(PORT, HOST, () => {
    console.log('Connection established with cash register');

    client.write(encodeCommand, (res) => {
      console.log(`Command sent: ${fullCommand}`);
    });
  });

  client.on('data', (data) => {
    console.log('utf-8', iconv.decode(data, "utf-8"))
    console.log('w-1250', iconv.decode(data, "win1250"))
    console.log('isbuffer', Buffer.isBuffer(data))
    message = 'iconv.decode(data, "win1250")'
  });

  client.on('close', () => {
    console.log('З’єднання закрито');
  });

  client.on('error', (err) => {
    console.error(`Помилка: ${err.message}`);
  });

  res.send(`
    <html>
      <body>
        <h1>Processing results</h1>
        <p>${message}</p>
        <a href="/">Back</a>
      </body>
    </html>
  `);
});

app.listen(SERVER_PORT, () => {
  console.log(`The server is running on http://localhost:${SERVER_PORT}`);
});
