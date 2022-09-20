const axios = require("axios")
const moment = require("moment")

const getReportTimes = interval => {
  let yesterdayStart = moment().subtract(1, "day").startOf("day").format()
  let yesterdayEnd = moment().subtract(1, "day").format()
  let todayStart = moment().startOf("day").format()
  let todayEnd = moment().format()
  let thisWeekStart = moment().startOf("week").format()
  let thisWeekEnd = moment().format()
  let lastWeekStart = moment().subtract(1, "week").startOf("week").format()
  let lastWeekEnd = moment().subtract(1, "week").endOf("week").format()
  let thisMonthStart = moment().startOf("month").format()
  let thisMonthEnd = moment().format()
  let lastMonthStart = moment().subtract(1, "month").startOf("month").format()
  let lastMonthEnd = moment().subtract(1, "month").endOf("month").format()

  switch (interval) {
    case "now":
      return { start: todayStart, end: todayEnd }
    case "yesterday":
      return { start: yesterdayStart, end: yesterdayEnd }
    case "this_week":
      return { start: thisWeekStart, end: thisWeekEnd }
    case "last_week":
      return { start: lastWeekStart, end: lastWeekEnd }
    case "this_month":
      return { start: thisMonthStart, end: thisMonthEnd }
    case "last_month":
      return { start: lastMonthStart, end: lastMonthEnd }
    default:
      return { start: todayStart, end: todayEnd }
  }
}

const getReportName = type => {
  switch (type) {
    case "dials":
      return "Outbound Agent State Report Test"
    case "agent_state":
      return "Auto Reports Reason Code Summary"
    default:
      return null
  }
}

const runReport = async (reportType, interval) => {
  const { start, end } = getReportTimes(interval)
  const envelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.admin.ws.five9.com/">
  <soapenv:Header/>
    <soapenv:Body>
     <ser:runReport>
        <folderName>Shared Reports</folderName>
        <reportName>${getReportName(reportType)}</reportName>
        <criteria>
           <time>
              <start>${start}</start>
              <end>${end}</end>
           </time>
        </criteria>
     </ser:runReport>
  </soapenv:Body>
    </soapenv:Envelope>`

  const config = {
    method: "get",
    url: "https://api.five9.com:443/wsadmin/v12/AdminWebService",
    headers: {
      Authorization: "Basic Y29uZmlnYXBpQGRnYWF1dG8uY29tOkx1aXMxOTk4ISEh",
      "Content-Type": "text/plain",
      Cookie:
        "Authorization=Bearer-9c92d046-1e63-11ed-d0e0-b19e6490a345; apiRouteKey=SCLAPIRZX8; app_key=F9; farmId=82; uiRouteKey=SCLUIwj0UB",
    },
    data: envelope,
  }

  try {
    const response = await axios(config)
    const token = response?.data.split("<return>")[1].split("</return>")[0]
    return token
  } catch (err) {
    console.log(err)
  }
}

module.exports = runReport
