//console.log("hi from app.js!");

window.addEventListener('load',()=> {
    document.getElementById('button-matcha').addEventListener('click', () => {
        let numberCups = document.getElementById('number-matcha').value;
        console.log(numberCups);


// creating the object
        let obj = {"number" : numberCups};

// stringify the data?, and the server side will parse the data
        let jsonData =  JSON.stringify(obj);

//fetch to a route command, headers contain meta data, request of the body is important
        fetch('/numberCups', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => console.log(data));

// 2. in the index.js file (back end) need to add a route on the server, that is listening for a POST request

    })

    document.getElementById('get-tracker').addEventListener('click', ()=> { 
//get info on ALL the matchas jan drank so far
// 1. make a fetch request of type POST so that we can send (numberCups) info to the server in the app.js file (public/front)
        fetch('/getCups')
        .then(resp=> resp.json())
        .then(data => {
            document.getElementById('matcha-info').innerHTML = '';           
            
            console.log(data.data);
            
            //const cups = data.data;
            
            for(let i=0;i< data.data.length;i++){
                let string = data.data[i].date + " : " + data.data[i].matcha;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('matcha-info').appendChild(elt);

    
        }
    })
    .catch(err => console.error("Fetch network error:", err));

            })
        })
