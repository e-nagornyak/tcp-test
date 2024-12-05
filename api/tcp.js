const net = require('net');
const iconv = require('iconv-lite'); // Для кодування Windows-1250









client.connect(PORT, HOST, () => {
    console.log('З’єднання встановлено з касою');

    // Відправляємо команди послідовно
	console.log(`Command befor ${fullCommand}`)
        client.write(bla2, (res) => {
console.log('res', res)
            console.log(`Команда відправлена: ${bla2}`);
    });
});

client.on('data', (data) => {
console.log('utf-8', iconv.decode(data, "utf-8"))
console.log('w-1250', iconv.decode(data, "win1250"))
console.log('isbuffer', Buffer.isBuffer(data))

//	console.log('error response', data)
//    const decodedData = iconv.decode(data, 'win1250'); // Розкодування відповіді з Windows-1250
   // console.log(`Отримано відповідь: ${decodedData}`);
});

client.on('close', () => {
    console.log('З’єднання закрито');
});

client.on('error', (err) => {
    console.error(`Помилка: ${err.message}`);
});
