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
    $('#equals').on('click', equalsClicked);
    $('#empty').on('click', emptyInputs);



    $('#clearButton').on('click', clearClicked); 
}

function oneClicked () {
    $('#inputP').append(1); 
}


function emptyInputs (){
    $('#storeXP').text("");
    $('#storeYP').text("");
    $('#inputP').text("");    
    operator = undefined;
}


//send the .text() from storeXP and storeYP to the server
//clears stored values and operator with emptyInputs()
function equalsClicked() {
    let xInput = $('#storeXP').text();
    let yInput = $('#storeXP').text(); 
    let operatorInput = operator; 
    postEquation(xInput, yInput, operatorInput);
    emptyInputs ()
}


//moves value of inputP to either storeXP or storeYP
//changes operator global var to "+"
function addClicked () {
    operator = "+"
    if ($('#storeXP').text().length === 0){
            $('#storeXP').append($('#inputP').text());
            $('#inputP').text('');
    } 
    else if ($('#storeXP').text().length > 0 && $('#storeYP').text().length === 0) {
            $('#storeYP').append($('#inputP').text());
            $('#inputP').text('');
    }
    else if ($('#storeXP').text().length > 0 && $('#storeYP').text().length > 0) {
            $('#inputP').text('');
            alert('Must CLEAR or run operation!')   
    }   
}


function subtractClicked () {
    let xInput = $('#xInput').val(); 
    let yInput = $('#yInput').val();
    let operatorInput = "-"; 
    postEquation(xInput, yInput, operatorInput);
    $('#xInput').val('');
    $('#yInput').val('');
}
function multiplyClicked () {
    let xInput = $('#xInput').val(); 
    let yInput = $('#yInput').val();
    let operatorInput = "*"; 
    postEquation(xInput, yInput, operatorInput);
    $('#xInput').val('');
    $('#yInput').val('');
}
function divideClicked () {
    let xInput = $('#xInput').val(); 
    let yInput = $('#yInput').val();
    let operatorInput = "/"; 
    postEquation(xInput, yInput, operatorInput);
    $('#xInput').val('');
    $('#yInput').val('');
}






function appendToTable(responseObject) {
    for (let each of responseObject) {
        let xInput = each.x;
        let yInput = each.y;
        let operatorInput = each.operator;
        let result = each.result; 
        let tr = $('<tr></tr>')
        tr.append('<td>' + xInput + '</td>');
        tr.append('<td>' + operatorInput + '</td>');
        tr.append('<td>' + yInput + '</td>');
        tr.append('<td>=</td>');
        tr.append('<td>' + result + '</td>');
        $("#tableTarget").append(tr); 
    }
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
function clearClicked () {
    $.ajax({
        url: '/history',
        type: 'DELETE',
        success: function(result) {
            $('#tableTarget').empty();             
        }
    });
}
