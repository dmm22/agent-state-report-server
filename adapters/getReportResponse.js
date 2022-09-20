const axios = require("axios")

const getReportResponse = async token => {
  const envelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.admin.ws.five9.com/">
    <soapenv:Header/>
    <soapenv:Body>
        <ser:getReportResultCsv>
            <identifier>${token}</identifier>
        </ser:getReportResultCsv>
    </soapenv:Body>
    </soapenv:Envelope>`

  const config = {
    method: "get",
    url: "https://api.five9.com:443/wsadmin/v12/AdminWebService",
    headers: {
      Authorization: "Basic Y29uZmlnYXBpQGRnYWF1dG8uY29tOkx1aXMxOTk4ISEh",
      "Content-Type": "text/plain",
      Cookie:
        "clientId=2BE9B03B5C074CF0A7CFEE5454F314FF; Authorization=Bearer-9c92d046-1e63-11ed-d0e0-b19e6490a345; apiRouteKey=SCLAPIRZX8; app_key=F9; farmId=82; uiRouteKey=SCLUIwj0UB",
    },
    data: envelope,
  }

  try {
    const response = await axios(config)
    const data = response?.data
    if (data) return data.split("<return>")[1].split("</return>")[0]
  } catch (err) {
    if (
      /Result is not ready due to process is not complete/.test(
        err?.response?.data
      )
    ) {
    } else console.log(false)
  }
}

module.exports = getReportResponse
