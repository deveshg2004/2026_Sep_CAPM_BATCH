console.log('1. 🚀 Timer Starts....');

setTimeout(() => {
    console.log('3. ⏰ 5 seconds have passed! This code inside the setTimeout callback is now running.');
}, 5000);

setTimeout(() => {
    console.log('4. ⚡ Even with a 0ms delay, It executes after the main synchronous code finishes.');
}, 0);

console.log('2. 🏎️ The main script continues executing immediately without waiting for the timers.');