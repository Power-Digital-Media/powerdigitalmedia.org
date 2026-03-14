const https = require("https");
const cheerio = require("cheerio");

https.get("https://libertyassurance.com/", { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0", "Accept": "text/html" } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log("Redirecting to: " + res.headers.location);
        return;
    }
    let data = "";
    res.setEncoding("utf8");
    res.on("data", d => data += d);
    res.on("end", () => {
        const $ = cheerio.load(data);
        const scripts = $("script[type=\"application/ld+json\"]");
        console.log("Found " + scripts.length + " ld+json scripts");
        scripts.each((i, el) => {
            const content = $(el).html();
            console.log("--- Script " + i + " ---");
            console.log(content.trim().substring(0, 200) + "...");
            try {
                JSON.parse(content);
                console.log("JSON.parse: OK");
            } catch (e) {
                console.log("JSON.parse: ERROR - " + e.message);
            }
        });
    });
});
