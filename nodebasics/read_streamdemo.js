const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sample.txt');

fs.writeFileSync(filePath, 'I am trying to read the stream for multiple times to check the efficiency\n'.repeat(1000));

const readableStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
    highWaterMark: 1024
});

let chunkCount = 0;

readableStream.on('data', (chunk) => {
    chunkCount++;
    console.log(`--- Received Chunk #${chunkCount} (${chunk.length} bytes) ---`);
    console.log(chunk.substring(0, 60) + '...\n');
});

readableStream.on('end', () => {
    console.log('✅ Finished reading all data from the stream.');
    fs.unlinkSync(filePath);
});

readableStream.on('error', (err) => {
    console.error(' An error occurred:', err.message);
});