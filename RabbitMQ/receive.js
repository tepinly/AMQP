const amqp = require('amqplib/callback_api');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'q0';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(`Awating messages in ${queue}`);

        channel.consume(queue, function (msg) {
            const message = JSON.parse(msg.content);

            con.connect(function (err) {
                if (err) throw err;

                var sql = `INSERT INTO users (name, email, phone) VALUES ("${message.name}", "${message.email}", ${parseInt(message.phone)})`;

                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(`Inserted ${message.name}'s data into "procrew" database`);
                });
            });
        }, {
            noAck: true
        });
    });
});