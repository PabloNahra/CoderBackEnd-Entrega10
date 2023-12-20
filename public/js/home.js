const socket = io()

const p = document.getElementById('outputProd')

socket.on('homeProd', data => {
    console.log('innerHTML')
    p.innerHTML = `
        <ul>
            ${data.map(d => `<li>Id: ${d.title} - Title: ${d.title}</li>`)}
        </ul>
        `
})