const express = require('express');
const app= express();
const path = require('path');
const port = process.env.PORT || 4023;
app.use(express.static(path.join(__dirname , 'dist')));
app.get('/locations',function(req,res){
    res.sendFile(path.join(__dirname,'dist', 'index.html'));
})

app.listen(port,()=>{
    console.log("server listening on port "+port);
});