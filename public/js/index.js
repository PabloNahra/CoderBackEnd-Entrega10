const socket = io()

console.log("hola - desde Frontend")

// Enviamos un mensaje al Server socket.io
socket.emit('message', 'Hola desde cliente')

const button = document.getElementById('sendInfo')
const input = document.getElementById('inputInfo')
const p = document.getElementById('outputInfo')

button.addEventListener('click', event => {
    socket.emit('message', input.value)
})

socket.on('messages', data => {
    p.innerHTML = `
        <ul>
            ${data.map(d => `<li>${d.id} ${d.data}</li>`)}
        </ul>
    `
})


/*
// Recibimos los mensajes del servidor
socket.on('recibe_uno', data => {
    console.log(data)
})

socket.on('reciben_todos_menos_uno', data => {
    console.log(data)
})

socket.on('reciben_todos', data => {
    console.log(data)
})
*/