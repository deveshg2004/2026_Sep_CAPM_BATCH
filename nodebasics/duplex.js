const { Duplex } = require('stream');

class UpperLogger extends Duplex {
    constructor(options) {
        super(options);
        this.readData = ['Hello from readable side!'];
    }

    _write(chunk, encoding, callback) {
        const transformed = chunk.toString().toUpperCase();
        console.log(`[Writable input] : ${transformed.trim()}`);
        callback();
    }

    _read(size) {
        if (this.readData.length > 0) {
            this.push(this.readData.shift() + '\n');
        } else {
            this.push(null);
        }
    }
}

const duplexStream = new UpperLogger();

duplexStream.on('data', (chunk) => {
    console.log(`[Readable Output] : ${chunk.toString().trim()}`);
});

duplexStream.on('end', () => {
    console.log('Readable side');
});

duplexStream.write('Test 1 \n');
duplexStream.write('Test 2 \n');
duplexStream.write('Test 3 \n');