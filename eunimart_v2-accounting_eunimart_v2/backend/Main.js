const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4010;
app.use(express.static(path.join(__dirname, "dist")));
app.get("/creditNote", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("/debitNote", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
// app.get("/cycleCount", function (req, res) {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.listen(port, () => {
  console.log("server listening on port " + port);
});
