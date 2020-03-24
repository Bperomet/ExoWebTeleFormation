let topTab = document.getElementById("topTab");
let tab = document.getElementById("tab");

let sauvJson = 'sauvGame.json';
let b ='https://arfp.eu/dataset/cards.json';
let request = new XMLHttpRequest();
request.open('GET',b,true);
//let reponse = JSON.parse(request);

request.responseType ='json';

if (request != null) {

    request.onload = function(){
    let playeur = request.response;
   // const obj = JSON.parse(playeur);
    fillKeyTab(playeur);
}

request.send(null);
}


function fillKeyTab(jsonObj){
    let obj = Object.keys(jsonObj[0]);
    let newTD;

    let newTR =document.createElement('tr');
    tab.appendChild(newTR);

    for(let a of Object.keys(jsonObj[0])){
        let newTH =document.createElement('th');
        newTH.textContent = a;
        newTR.appendChild(newTH);
    }

   for (let index = 0; index < jsonObj.length; index++) {
    newTR = document.createElement('tr');
    tab.appendChild(newTR);

    for(let val in jsonObj[index]) {
        newTD = document.createElement('td');
        newTD.textContent = jsonObj[index][val];
        newTR.appendChild(newTD);
        }
   }
}
