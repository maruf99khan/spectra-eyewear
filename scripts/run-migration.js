const https = require("https")
const fs = require("fs")

const sql = fs.readFileSync(process.argv[2], "utf-8")
const token = process.argv[3]

const data = JSON.stringify({ query: sql })
const options = {
  hostname: "api.supabase.com",
  path: "/v1/projects/rnoczygnuilavokvsvdk/database/query",
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data),
  },
}

const req = https.request(options, (res) => {
  let body = ""
  res.on("data", (chunk) => (body += chunk))
  res.on("end", () => {
    console.log("Status:", res.statusCode)
    console.log("Response:", body || "(empty)")
  })
})
req.on("error", (e) => console.error("Error:", e.message))
req.write(data)
req.end()
