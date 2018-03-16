class Equation {
    constructor (xIn, yIn, operatorIn){
        this.x = xIn;
        this.y= yIn;
        this.operator = operatorIn; 
    }
}


$(document).ready(readyNow); 

function readyNow () {
    engageClickHandlers (); 
    getHistory();
}

function engageClickHandlers () {
    $('#submitButton').on('click', submitClicked); 
}

function submitClicked () {
    let xInput = $('#xInput').val();
    let yInput = $('#yInput').val();
    let operatorInput = $('input[name=operatorSel]:checked').val();
    console.log('submit clicked:', xInput, yInput, operatorInput);
    inputToClass(xInput, yInput, operatorInput); 

}

function inputToClass(xIn, yIn, operatorIn) {
    let newEquation = new Equation (xIn, yIn, operatorIn); 
    console.log(newEquation);
    
}





function appendToTable() {
    // let xInput = $('#xInput').val();
    // let yInput = $('#yInput').val();
    // let operatorInput = $('input[name=operatorSel]:checked').val();
    // let result = 11; 
    let tr = $('<tr></tr>')
    tr.append('<td>' + xInput + '</td>');
    tr.append('<td>' + operatorInput + '</td>');
    tr.append('<td>' + yInput + '</td>');
    tr.append('<td>' + result + '</td>');
    $("#tableTarget").append(tr); 
}


//.ajax function to get array of past equations from server
function getHistory() {
    $('#tableTarget').empty(); 
    $.ajax ({
        type: 'GET',
        url: '/history',
    }).done(function (response){
        console.log('GET request complete: ', response);
        appendToTable(response);
    })

}
