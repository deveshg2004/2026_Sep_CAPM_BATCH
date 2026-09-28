const fs = require('fs');

const writer = fs.createWriteStream('output.txt', { encoding: 'utf-8' });

writer.write('Hello, world..!\n');
writer.write('This is the same for write stream demo');

writer.end('End write');

writer.on('finish', () => {
    console.log('All data written successfully..!');
});

writer.on('error', (err) => {
    console.error('Write error', err.message);
});