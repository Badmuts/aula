import io from 'socket.io-client'

const ws = io()

ws.on('connect_error', (err) => {
    console.log('connect_error', err)
})

ws.on('connect', () => {
    console.log('connect')
})

ws.on('error', (err) => {
    console.log('ws error', err)
})

ws.on('reconnect', (attempt) => {
    console.log('reconnect attempt', attempt)
})

export default ws
