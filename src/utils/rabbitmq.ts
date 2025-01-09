import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

export async function consumeRabbitMQ() {
  let connection:any;
  let channel:any;

  try {
    connection = await amqp.connect(process.env.AMQP_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ for consumption');

    const exchange = 'userExchange';
    const queue = 'rabbit';
    const routingKey = 'userRoutingKey';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: true });

    await channel.bindQueue(queue, exchange, routingKey);

    channel.consume(
      queue,
      (msg:any) => {
        if (msg) {
          try {
            const messageContent = JSON.parse(msg.content.toString());
            console.log('Received message:', messageContent);

        
            channel.ack(msg);
          } catch (err) {
            console.error('Error parsing message:', err);
            channel.nack(msg); 
          }
        }
      },
      { noAck: false } 
    );

    console.log(`Waiting for messages in queue: ${queue}`);

  } catch (error) {
    console.error('Error in RabbitMQ receiver:', error);
  }

  process.on('SIGINT', async () => {
    console.log('Shutting down RabbitMQ consumer...');
    if (channel) {
      await channel.close();
    }
    if (connection) {
      await connection.close();
    }
    console.log('RabbitMQ connection closed.');
    process.exit(0);
  });
}