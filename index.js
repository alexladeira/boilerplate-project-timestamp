const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date ? extractValidDate(req) : new Date();
  if (date == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  }
});

const extractValidDate = (req) =>
  req.params.date.indexOf("-") > 0
    ? new Date(req.params.date)
    : new Date(parseInt(req.params.date));

// Listen on port set in environment variable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
