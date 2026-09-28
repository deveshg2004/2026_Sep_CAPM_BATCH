const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'message.txt');

fs.writeFileSync(filePath, 'This is callback example!');

console.log('1. 🚀 Application starts here...');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('❌ There is an error Error message :', err.message);
        return;
    }

    console.log('3. 📄 Callback Executed! File content:', data);

    fs.unlinkSync(filePath);
});

console.log('2. ⏳ Code after fs.readFile executes instantly while Node.js reads the file in the background.');