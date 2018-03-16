let express = require('express');
let app = express(); 
const PORT = process.env.PORT || 2001; 

let bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public')); 

let equationHistory = [];

//send client.js equation history (called in readyNow and after POST)
app.get('/history', (req, res) => {
    res.send(equationHistory); 
})


//take in POST from client and route to correct equation function
//add .result and push entire object to equationHistory
app.post('/history', (req, res) => {
    let input = req.body
    let x = parseFloat(input.x);
    let y = parseFloat(input.y);
    let operator = input.operator;

    if (operator === "+") {
        let answer = addition(x, y)
            if (answer%1 === 0){
                input.result = answer;
                equationHistory.push(input); 
            } else {
                answer = answer.toFixed(3);
                input.result = answer;
                equationHistory.push(input); 
            }

    } else if (operator === "-") {
        let answer = subtraction(x, y)
            if (answer%1 === 0){
                input.result = answer;
                equationHistory.push(input); 

            } else {
                answer = answer.toFixed(3);
                input.result = answer;
                equationHistory.push(input); 
            } 

    } else if (operator === "*") {
        let answer = multiplication(x, y)
            if (answer%1 === 0){
                input.result = answer;
                equationHistory.push(input); 

            } else {
                answer = answer.toFixed(3);
                input.result = answer;
                equationHistory.push(input); 
            }

    } else if (operator === "/") {
        let answer = division(x, y)
            if (answer%1 === 0){
                input.result = answer;
                equationHistory.push(input); 

            } else {
                answer = answer.toFixed(3);
                input.result = answer;
                equationHistory.push(input); 
            }
    }
    console.log("equationHistory:", equationHistory);
    res.sendStatus(200); 

})





function addition (x, y) {
    return x + y; 
}
function subtraction (x, y) {
    return x - y; 
}
function multiplication (x, y) {
    return x * y; 

}
function division (x, y) {
    return x / y; 
}








//spin up the server
app.listen(PORT, () => {
    console.log('server is running on port' + PORT);
    
})



//end 