import express, { Request, Response } from "express"
import { registerBpm, getQueue, popBpm, getSong } from "./controller"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
  })
})

app.get("/register/:id", registerBpm)

app.get("/queue", getQueue)

app.get("/display", getSong)

app.post("/retrieve", popBpm)

app.listen(4000, () => {
  console.log("Listening on port 4000")
})
