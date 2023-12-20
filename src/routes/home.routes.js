import { Router } from 'express'

const homeRoutes = Router()

homeRoutes.get('/', async (req, res) => {
    res.render('home')
})

export default homeRoutes