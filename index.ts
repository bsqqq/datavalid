import express from 'express'
import { status, dvStatus, dvPfBasica, dvPfFacial, comparePW } from './app/controllers/appControllers'
import bodyParser from 'body-parser'
import "dotenv/config"

const app = express()

app.use(bodyParser.json({limit: '3mb'}))

app.get("/", status)

app.get("/dv-status", dvStatus)

app.post("/dv-pf-basica", dvPfBasica)

app.post("/dv-pf-facial", dvPfFacial)

app.post("/cmp-pw", comparePW)

app.listen(process.env.PORT, () => console.log(`running at ${process.env.PORT}`))