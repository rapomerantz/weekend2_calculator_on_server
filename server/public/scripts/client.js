let operator; 

$(document).ready(readyNow); 

function readyNow () {
    engageClickHandlers (); 
    getHistory();
}

function engageClickHandlers () {
    // $('#submitButton').on('click', submitClicked); 
    $('#add').on('click', addClicked); 
    $('#subtract').on('click', subtractClicked);
    $('#multiply').on('click', multiplyClicked); 
    $('#divide').on('click', divideClicked); 
    $('#one').on('click', oneClicked); 
    $('#two').on('click', twoClicked);
    $('#three').on('click', threeClicked); 
    $('#four').on('click', fourClicked);
    $('#five').on('click', fiveClicked); 
    $('#six').on('click', sixClicked);
    $('#seven').on('click', sevenClicked); 
    $('#eight').on('click', eightClicked);  
    $('#nine').on('click', nineClicked);  
    $('#zero').on('click', zeroClicked); 
    $('#dot').on('click', dotClicked);    
    $('#equals').on('click', equalsClicked);
    $('#clearInputs').on('click', clearInputs);
    $('#clearHistory').on('click', clearHistoryClicked);
    $('#tableButtonDiv').on('click', '.tableValue', reuseEquation); 
    $('#clearButtonDiv').hide(); 
}

function reuseEquation() {
    let reuseX = ($(this).children().first().text());
    let reuseOperator = ($(this).children().first().next().text());
    let reuseY = ($(this).children().first().next().next().text());
    postEquation (reuseX, reuseY, reuseOperator);
}

//send the .text() from storeXP and inputP to the server
//clears stored values and operator with emptyInputs()
function equalsClicked() {
    if ($('#storeXP').text().length > 0 && $('#inputP').text().length > 0) {
        let xInput = $('#storeXP').text();
        let yInput = $('#inputP').text(); 
        let operatorInput = operator; 
        postEquation(xInput, yInput, operatorInput);
        clearInputs ()
        $('#clearButtonDiv').show();
    }
    else {
        alert("Did you input all the numbers?")
    }
}
//moves value of inputP to storeXP or triggers alert
function storeInputs () {
    if ($('#storeXP').text().length === 0){
            $('#storeXP').append($('#inputP').text());
            $('#inputP').text('');
    }
    else if ($('#storeXP').text().length > 0 && $('#inputP').text().length > 0) {
         alert('At this time we can only accept two(2) values. Please press EMPTY or =')       
    }   
}

function appendOperator() {
    $('#storeOperatorP').text(operator); 
}
function addClicked () {
    operator = "+"
    storeInputs ()
    appendOperator()
}
function subtractClicked () {
    operator = "-"
    storeInputs ()
    appendOperator()
}
function multiplyClicked () {
    operator = "*"
    storeInputs ()
    appendOperator()
}
function divideClicked () {
    operator = "/"
    storeInputs ()
    appendOperator()
}


function appendToTable(responseObject) {
    for (let each of responseObject) {
        let xInput = each.x;
        let yInput = each.y;
        let operatorInput = each.operator;
        let result = each.result; 
        let tr = $('<tr class="tableValue"></tr>')
        tr.append('<td>' + xInput + '</td>');
        tr.append('<td>' + operatorInput + '</td>');
        tr.append('<td>' + yInput + '</td>');
        tr.append('<td>=</td>');
        tr.append('<td>' + result + '</td>');
        $("#tableTarget").append(tr); 
    }
    if ($("#tableTarget").text()) {
        $('#clearButtonDiv').show(); 
    }
    
}

function oneClicked () {
    $('#inputP').append(1); 
}
function twoClicked() {
    $('#inputP').append(2); 
}
function threeClicked() {
    $('#inputP').append(3); 
}
function fourClicked() {
    $('#inputP').append(4); 
}
function fiveClicked () {
    $('#inputP').append(5); 
}
function sixClicked() {
    $('#inputP').append(6); 
}
function sevenClicked() {
    $('#inputP').append(7); 
}
function eightClicked() {
    $('#inputP').append(8); 
}
function nineClicked() {
    $('#inputP').append(9); 
}
function zeroClicked() {
    $('#inputP').append(0); 
}
function dotClicked() {
    $('#inputP').append("."); 
}
function clearInputs (){
    $('#storeXP').text("");
    $('#inputP').text("");    
    operator = "";
    appendOperator()
}




//.ajax function to get array of past equations from server
//called in readyNow and postEquation 
function getHistory() {
    $('#tableTarget').empty(); 
    $.ajax ({
        type: 'GET',
        url: '/history',
    }).done(function (response){
        // console.log('GET request complete: ', response);
        appendToTable(response);
    })

}

// POST function for inputs from DOM
//called from submit Click
function postEquation (xIn, yIn, operatorIn) {
    let x = parseFloat(xIn);
    let y = parseFloat(yIn);
    let equationToSend = {x: x, y: y, operator: operatorIn}
    $.ajax({
        type: "POST",
        data: equationToSend,
        url: "/history",
    }).done(function(response){
        getHistory()
    }).fail(function(response){
        alert("something went wrong...")
    })
}

//DELETE function ~ called from clear button 
function clearHistoryClicked () {
    $.ajax({
        url: '/history',
        type: 'DELETE',
        success: function(result) {
            $('#tableTarget').empty(); 
            $('#clearButtonDiv').hide();            
        }
    });
}
