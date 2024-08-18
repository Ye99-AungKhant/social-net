import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';

export interface WebSocketContextType {
    ws: WebSocket | null;
    wsMessage: any;
    wsMessageCount: any;
    wsNoti: any;
    wsOnlineUser: any;
    wsReadMessage: any;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: any) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [wsMessage, setWsMessage] = useState<any>();
    const [wsMessageCount, setWsMessageCount] = useState<any>();
    const [wsNoti, setWsNoti] = useState<any>();
    const [wsOnlineUser, setWsOnlineUser] = useState<any>();
    const [wsReadMessage, setWsReadMessage] = useState<any>();
    const { authUser } = useAppSelector((state) => state.auth)

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080');

        websocket.onopen = () => {
            websocket.send(JSON.stringify({ type: 'login', userId: authUser?.id }));
            console.log('WebSocket connection established');
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        websocket.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            if (parsedMessage.type === 'message') {
                setWsMessage(parsedMessage)
            } else if (parsedMessage.type === 'messageCount') {
                setWsMessageCount(parsedMessage)
            } else if (parsedMessage.type === 'newNoti') {
                setWsNoti(parsedMessage)
            } else if (parsedMessage.type === 'onLineUser') {
                setWsOnlineUser(parsedMessage)

            } else if (parsedMessage.type === 'read') {
                setWsReadMessage(parsedMessage)
                console.log('read unread', parsedMessage);
            }
        };

        setWs(websocket);

        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, [authUser]);

    useEffect(() => {
        console.log('WS Provider Message received:', wsMessage);
    }, [wsMessage])

    return (
        <WebSocketContext.Provider value={{ ws, wsMessage, wsMessageCount, wsNoti, wsOnlineUser, wsReadMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
