import express from 'express'
import handlebars from 'express-handlebars'
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'
import userRoutes from './routes/views.routes.js'
import { Server } from 'socket.io'
import homeRoutes from './routes/home.routes.js'
import { ProdManager } from './ProductManager.js'
import realTimeProducts from './routes/realTimeProducts.routes.js'


const PORT = 8080
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', 'src/views')
app.set('view engine', 'handlebars')

app.use('/', userRoutes)
app.use('/home', homeRoutes)
app.use('/realtimeproducts', realTimeProducts)

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor running on ${PORT}`)
})

// const socketServer
const io = new Server(httpServer)

const messages = []

// Pruebas de conexion cliente -> servidor
io.on('connection', async socket => {
  console.log('Nuevo cliente conectado 2')

  // recibiendo un mensaje del cliente  
  socket.on('message', data => {
    messages.push({id: socket.id, data })
    io.emit('messages', messages)
  })


  // enviando los productos a la home
  const productManager = new ProdManager('./products.json');
  let products = await productManager.getProducts();
  socket.emit('homeProd', products)
  io.emit('realTimeProd', products)

  // Recibo datos de alta de producto
  socket.on('altaProd', async data => {
    console.log('Alta de producto en server')
    console.log(data)
    console.log(data.title)
    console.log(data.description)
    console.log(data.code)
    console.log(data.price)
    console.log(data.stock)
    console.log(data.category)

    // creo el producto
    await productManager.addProduct(data)

    // Leo los productos
    let products = await productManager.getProducts();
    io.emit('realTimeProd', products)

  })


  // Recibo datos de baja de un producto (id)
  socket.on('bajaProd', async data => {
    console.log('Baja de producto en server')
    console.log(data)
    console.log(data.id)
    console.log(parseInt(data.id))

    // baja del producto
    await productManager.deleteProduct(data.id)

    // Leo los productos
    let products = await productManager.getProducts();
    io.emit('realTimeProd', products)

  })


})



