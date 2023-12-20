import { Router } from 'express'

const userRoutes = Router()

userRoutes.get('/', (req, res) => {
    const testUser = {
      name: 'Hilda',
      last_name: 'Martinez'
    }
    res.render('index', testUser )
    // res.render('index', {testUser, title: 'Probando', style: 'index.css'})
  })

export default userRoutes
