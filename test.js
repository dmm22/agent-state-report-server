const xml = `<?xml version='1.0' encoding='UTF-8'?>
<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
    <env:Header/>
    <env:Body>
        <ns2:runReportResponse xmlns:ns2="http://service.admin.ws.five9.com/">
            <return>095BE6486ACC24E04rt1.c.ie.o260BA@8pC028Fs5l4f4vF97c8m</return>
        </ns2:runReportResponse>
    </env:Body>
</env:Envelope>`

const x = xml.split("<return>")[1].split("</return>")[0]
console.log(x-)
