const express = require('express');
const app= express();
const path = require('path');
const port = process.env.PORT || 4018;
app.use(express.static(path.join(__dirname , 'dist')));
app.get("/inventoryAdjustment", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  app.get("/inventory", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  app.get("/pickList", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  app.get("/cycleCount", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

app.listen(port,()=>{
});