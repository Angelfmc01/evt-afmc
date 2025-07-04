import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()
app.use(express.json())
app.use(cors())

app.use(
    cors({
        origin: "https://localhost:4200"
    }))

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`)
})
