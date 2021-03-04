const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'q0';
        var msg = {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "0123456789"
        };

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

        console.log(`Sent: ${JSON.stringify(msg)}`);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 1000);
});