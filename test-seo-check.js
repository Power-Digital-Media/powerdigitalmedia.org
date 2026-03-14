const http = require("http");
const req = http.request("http://localhost:3000/api/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
}, (res) => {
    let body = "";
    res.on("data", d => body += d);
    res.on("end", () => console.log(JSON.parse(body)));
});
req.write(JSON.stringify({ url: "https://libertyassurance.com" }));
req.end();
