const socket = io()

console.log("Desde Real Time Products 3")

const button = document.getElementById('sendInfo')
const buttonBaja = document.getElementById('sendBaja')

const p = document.getElementById('outputRealTimeProd')

const inputTitle = document.getElementById('inputTitle')
const inputDescription = document.getElementById('inputDescription')
const inputCode = document.getElementById('inputCode')
const inputPrice = document.getElementById('inputPrice')
const inputStock = document.getElementById('inputStock')
const inputCategory = document.getElementById('inputCategory')

const idBaja = document.getElementById('idBaja')



button.addEventListener('click', event => {
    socket.emit('altaProd', {title: inputTitle.value, description: inputDescription.value,
    code: inputCode.value, price: inputPrice.value, stock: inputStock.value, 
    category: inputCategory.value})

    // Limpiar los valores de los inputs
    inputTitle.value = '';
    inputDescription.value = '';
    inputCode.value = '';
    inputPrice.value = '';
    inputStock.value = '';
    inputCategory.value = '';
})

socket.on('realTimeProd', data => {
    console.log('innerHTML - realTimeProd')
    p.innerHTML = `
        <ul>
            ${data.map(d => `<li>Id: ${d.id} - Title: ${d.title}</li>`)}
        </ul>
        `
})


// Baja por id
buttonBaja.addEventListener('click', event => {
    event.preventDefault()
    socket.emit('bajaProd', {id: idBaja.value})

    // Limpiar los valores del form
    idBaja.value = '';
    
})


