const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const publicPath = path.join(__dirname,"../public");

const app = express();

app.use(express.static('public'));

// app.get('/',(req,res)=>{
//     res.send({todos});
// });

app.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});
