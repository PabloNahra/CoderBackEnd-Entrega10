import { Router } from 'express'

const realTimeProducts = Router()

realTimeProducts.get('/', async (req, res) => {
    res.render('realTimeProducts')
})

export default realTimeProducts