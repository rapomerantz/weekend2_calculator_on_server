let express = require('express');
let app = express(); 
const PORT = process.env.PORT || 2001; 

let bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public')); 















//spin up the server
app.listen(PORT, () => {
    console.log('server is running on port' + PORT);
    
})



//end 