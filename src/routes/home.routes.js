import { Router } from 'express'
import { ProdManager } from '../ProductManager.js'

const homeRoutes = Router()

homeRoutes.get('/', async (req, res) => {
    res.render('home')
})

export default homeRoutes