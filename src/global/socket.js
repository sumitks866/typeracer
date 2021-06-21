import socketIOClient from 'socket.io-client'

export const endpoint = 'https://typeracer-server.herokuapp.com/'
export const socket = socketIOClient(endpoint,{transports: ['websocket', 'polling', 'flashsocket']})