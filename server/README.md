# Order Data Server

Included is a very simple Node.js server that utilizes express and socket.io to provide order data. Order data is streamed over a socket at predefined intervals based on the input in `./order-data.json`. Feel free to modify and extend this server to fit your needs - it's meant to provide a basic jumping-off point and lacks a lot of the bells and whistles that a production-ready web application might require :)

## Running the server

Simply run `npm install && npm start` to install the dependencies and start the server. This was built and tested with Node 12.

## The data

The data sent by the server will consist of a list of order objects. Order objects have the following format:

```json
{
    "customer": "Carla Garner",
    "destination": "61109 Alan Motorway, North Corey, CA 92789",
    "event_name": "CREATED",
    "id": "d0791ce1",
    "item": "Caesar salad",
    "price": 4692,
    "sent_at_second": 6
}
```
