


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
    // inputToClass(xInput, yInput, operatorInput); 
    postEquation(xInput, yInput, operatorInput);
}







function appendToTable(responseObject) {
    // let xInput = $('#xInput').val();
    // let yInput = $('#yInput').val();
    // let operatorInput = $('input[name=operatorSel]:checked').val();
    // let result = 11; 
    console.log(responseObject);
            

    // let tr = $('<tr></tr>')
    // tr.append('<td>' + xInput + '</td>');
    // tr.append('<td>' + operatorInput + '</td>');
    // tr.append('<td>' + yInput + '</td>');
    // tr.append('<td>' + result + '</td>');
    // $("#tableTarget").append(tr); 
}


//.ajax function to get array of past equations from server
//called in readyNow and postEquation 
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


// POST function for inputs from DOM
//called from submit Click
function postEquation (xIn, yIn, operatorIn) {
    let x = parseInt(xIn);
    let y = parseInt(yIn);
    let equationToSend = {x: x, y: y, operator: operatorIn}
    console.log("in postEquation, equationToSend: ", equationToSend)
    $.ajax({
        type: "POST",
        data: equationToSend,
        url: "/history",
    }).done(function(response){
        console.log("Post successful!");
        getHistory()
    }).fail(function(response){
        alert("something went wrong...")
    })
}




//if I want to use a class: 

// class Equation {
//     constructor (xIn, yIn, operatorIn){
//         this.x = xIn;
//         this.y= yIn;
//         this.operator = operatorIn; 
//     }
// }

// function inputToClass(xIn, yIn, operatorIn) {
//     let newEquation = new Equation (xIn, yIn, operatorIn); 
//     postEquation(newEquation);
// }