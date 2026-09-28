const fs = require("fs");
const fileName = "sample.txt";
const writeStream = fs.createWriteStream(fileName);
for (let i = 1; i <= 100; i++) {
    writeStream.write(`This is line ${i}\n`);
}
writeStream.end();
writeStream.on("finish", () => {
    console.log("File created with 100 lines.\n");
    const readStream = fs.createReadStream(fileName, {
        encoding: "utf8"
    });
    readStream.on("data", (chunk) => {
        console.log(chunk);
    });
    readStream.on("end", () => {
        console.log("Finished reading the file.");
    });
    readStream.on("error", (error) => {
        console.error("Error reading file:", error);
    });
});
writeStream.on("error", (error) => {
    console.error("Error writing file:", error);
});