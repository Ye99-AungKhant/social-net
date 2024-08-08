const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

let users = {};
let onlineUser = []
let messageCounts = {};

const wss = new WebSocket.Server({
    server: app.listen(port, () => {
        console.log(`WebSocket server is running on ws://localhost:${port}`);
    })
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        switch (parsedMessage.type) {
            case 'login':
                users[parsedMessage.userId] = ws;
                ws.userId = parsedMessage.userId;

                if (ws.userId && !onlineUser.includes(ws.userId)) {
                    onlineUser.push(ws.userId)
                    ws.send(JSON.stringify({
                        type: 'onLineUser',
                        data: onlineUser
                    }))
                    console.log(onlineUser);
                }
                break;
            case 'message':
                const receiverWs = users[parsedMessage.receiverId];
                if (receiverWs) {
                    receiverWs.send(JSON.stringify({
                        type: 'message',
                        message: parsedMessage.message,
                        media: parsedMessage.media,
                        senderId: parsedMessage.senderId,
                        receiverId: parsedMessage.receiverId,
                        read: false
                    }));
                    console.log(parsedMessage);
                }

                // if (onlineUser.includes(parsedMessage.receiverId) && receiverWs) {
                //     receiverWs.send(JSON.stringify({
                //         type: 'message',
                //         message: parsedMessage.message,
                //         media: parsedMessage.media,
                //         senderId: parsedMessage.senderId,
                //         receiverId: parsedMessage.receiverId,
                //         read: true
                //     }));
                //     console.log(parsedMessage);

                // } else {
                //     if (receiverWs) {
                //         receiverWs.send(JSON.stringify({
                //             type: 'message',
                //             message: parsedMessage.message,
                //             media: parsedMessage.media,
                //             senderId: parsedMessage.senderId,
                //             receiverId: parsedMessage.receiverId,
                //             read: false
                //         }));
                //         console.log(parsedMessage);
                //     }

                // }

                if (!messageCounts[parsedMessage.senderId]) {
                    messageCounts[parsedMessage.senderId] = 0;
                }
                messageCounts[parsedMessage.senderId]++;

                // Broadcast the updated message count to all clients
                for (const userId in users) {
                    users[userId].send(JSON.stringify({
                        type: 'messageCount',
                        userId: parsedMessage.senderId,
                        count: messageCounts[parsedMessage.senderId],
                    }));
                }
                break;
            case 'setMessageCount':
                messageCounts[parsedMessage.userId] = 0
                console.log("set unread message count");
                break;

            case 'read':
                const senderWs = users[parsedMessage.senderId];
                if (senderWs) {
                    senderWs.send(JSON.stringify({
                        type: 'read',
                        receiverId: parsedMessage.receiverId,
                    }));
                }
                break;
            case 'newNoti':
                const postOwner = users[parsedMessage.postOwnerId]
                if (postOwner) {
                    postOwner.send(JSON.stringify({
                        type: 'newNoti',
                        postOwnerId: parsedMessage.postOwnerId
                    }))
                }
                break;
            // case 'onLineUser':
            //     users[parsedMessage.userId] = ws;
            //     ws.userId = parsedMessage.userId;
            //     if (ws.userId && !onlineUser.includes(ws.userId)) {
            //         onlineUser.push(ws.userId)
            //         ws.send(JSON.stringify({
            //             type: 'onLineUser',
            //             data: onlineUser
            //         }))
            //         console.log('onlineUser', onlineUser);
            //     } else {
            //         const index = onlineUser.indexOf(ws.userId);
            //         if (index > -1) {
            //             onlineUser.splice(index, 1)
            //         }
            //         ws.send(JSON.stringify({
            //             type: 'onLineUser',
            //             data: onlineUser
            //         }))
            //         console.log('onlineUser', onlineUser);
            //     }
            //     break;

            default:
                break;
        }
    });

    ws.on('close', () => {
        delete users[ws.userId];
    });
});
