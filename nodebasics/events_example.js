const EventEmitter = require('events');

class TicketSystem extends EventEmitter {
    buyTicket(customerName, concertName) {
        console.log(` 🎟️ Processing ticket purchase for ${customerName}...`);

        this.emit('ticketPurchased', customerName, concertName);
    }
}

const bookingSystem = new TicketSystem();

bookingSystem.on('ticketPurchased', (customer, concert) => {
    console.log(` 📩 [Email Service]: Sending confirmation email to ${customer} for the ${concert} concert.`);
});

bookingSystem.on('ticketPurchased', (customer) => {
    console.log(` 📊 [Analytics Service]: Updating ticket sales charts for customer: ${customer}.`);
});

console.log(' 🚀 Starting System...\n');

bookingSystem.buyTicket('Alice', 'Coldplay Live');

console.log('\n✅ System continues to handle other requests.');