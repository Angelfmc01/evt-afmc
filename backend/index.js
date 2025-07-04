import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import router from './src/routes/index.routes.js'


const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()
app.use(express.json())
app.use(cors())

app.use(
    cors({
        origin: "http://localhost:4200"
    }))

app.use("/v1", router)

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`)
})
