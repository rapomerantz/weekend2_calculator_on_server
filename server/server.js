let express = require('express');
let app = express(); 
const PORT = process.env.PORT || 2001; 

let bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public')); 


let equationHistory = [{x: '5', y: '6', operator: '+', result: '11'}];


//send client.js equation history (called in readyNow and after POST)
app.get('/history', (req, res) => {
    res.send(equationHistory); 
})












//spin up the server
app.listen(PORT, () => {
    console.log('server is running on port' + PORT);
    
})



//end 