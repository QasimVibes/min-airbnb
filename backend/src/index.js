import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
import app from './app.js'

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 5000

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port}`)
        })
        app.on('error', (error) => {
            console.log("Error in running server: ", error)
            throw error
        })
    })
    .catch((error) => {
        console.log("Erorr while connecting to database: ", error)
    })