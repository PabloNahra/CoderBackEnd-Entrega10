const socket = io()

console.log("Desde la Home")

const p = document.getElementById('outputProd')

// Enviamos un mensaje al Server socket.io
io.emit('message', 'Page: home')

socket.on('homeProd', data => {
    console.log('innerHTML')
    p.innerHTML = `
        <ul>
            ${data.map(d => `<li>${d.title}</li>`)}
        </ul>
        `
})


/*
socket.on('homeProd', data => {
    console.log('innerHTML')
    p.innerHTML = `
        <ul>
            ${data.map(d => `<li>${d.title}</li>`)}
        </ul>
    `
})
*/

/*
socket.on('homeProd2', data => {
    console.log(data)
})
*/

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