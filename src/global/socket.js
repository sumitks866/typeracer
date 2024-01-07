import socketIOClient from 'socket.io-client'

export const endpoint = 'https://typeracer-server-engq.onrender.com'
export const socket = socketIOClient(endpoint,{transports: ['websocket', 'polling', 'flashsocket']})
