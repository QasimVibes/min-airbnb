import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: '16kb', extended: true }))
app.use(express.static('public'))
app.use(cookiesParser())



import listing from './routes/listing.routes.js'
import user from './routes/user.routes.js'
import wishlist from './routes/wishlist.routes.js'

app.use('/api/v1/listings', listing)
app.use('/api/v1/users', user)
app.use('/api/v1/wishlist', wishlist)



app.use('*', (err, req, res, next) => {
    res.status(err.code || 500).json({ message: err.message || 'Something went wrong', success: false })
})


export default app