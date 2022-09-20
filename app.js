const express = require("express")
const app = express()
const runReport = require("./adapters/runReport")
const getReportResponse = require("./adapters/getReportResponse")
const cors = require("cors")

app.use(cors())

app.get("/agent_state/:interval", async (req, res) => {
  const { start, end } = req.params
  const token = await runReport("dials", start, end)
  setTimeout(async () => {
    const reportResponse = await getReportResponse(token)
    res.json(
      reportResponse.split("\n").map(row => row.replace(/\r/, "").split(","))
    )
  }, 1000)
})

app.listen(5000, console.log("server started"))
