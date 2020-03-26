let topTab = document.getElementById("topTab");
let tab = document.getElementById("tab");
let zoneCarte = document.getElementById("zoneCarte");


let sauvJson = 'sauvGame.json';
let b ='https://arfp.eu/dataset/cards.json';
let request = new XMLHttpRequest();
request.open('GET',b,true);
request.responseType ='json';

if (request != null) {
    request.onload = function(){
    let playeur = request.response;
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
   CreateCards(jsonObj , "attack");
   CreateCards(jsonObj , "armor");
   CreateCards(jsonObj , "played");
   CreateCards(jsonObj , "victory");
}

function CreateCards(jsonObj, str){
    let tritab;

    if (jsonObj[0][str]) {
        tritab= jsonObj.sort((a, b)=>{
            if (str ==="attack") {
                return  b.attack -a.attack;
            }
            else if (str ==="armor") {
                return  b.armor -a.armor;
            }
            else if (str ==="played") {
                return  b.played -a.played;
            }
            else if (str ==="victory") {
                return  b.victory -a.victory;
            }
            else{
                return b.level -a.level;
            }
        });

        let newDiv =document.createElement('div');
        newDiv.classList.add("carte");
        zoneCarte.appendChild(newDiv);

        let newct =document.createElement('div');
        newct.classList.add("carteTop");
        newDiv.appendChild(newct);

        let newpt =document.createElement('p');
        newpt.classList.add("lvl");
        newpt.textContent = tritab[0]["level"];
        newct.appendChild(newpt);

        let newti =document.createElement('div');
        newti.classList.add("topInfo");
        newct.appendChild(newti);

        let newhtop =document.createElement('h3');
        newhtop.textContent = tritab[0]["name"];
        newti.appendChild(newhtop);

        let newptd =document.createElement('p');
        newptd.textContent = "Played :"+tritab[0]["played"]+" | Victories : "+tritab[0]["victory"];
        newti.appendChild(newptd);

        let newpimg =document.createElement('img');
        newpimg.src = "https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg";
        newDiv.appendChild(newpimg);

        let newdivstts =document.createElement('div');
        newdivstts.classList.add("stats");
        newDiv.appendChild(newdivstts);

        let newh3Power =document.createElement('h3');
        newh3Power.textContent = "Power";
        newdivstts.appendChild(newh3Power);

        let newpPower =document.createElement('p');
        newpPower.classList.add("pPower");
        newpPower.textContent = tritab[0]["power"];
        newdivstts.appendChild(newpPower);

        let newh3Attack =document.createElement('h3');
        newh3Attack.textContent = "Attack";
        newdivstts.appendChild(newh3Attack);

        let newpAttack =document.createElement('p');
        newpAttack.classList.add("pAttack");
        newpAttack.textContent = tritab[0]["attack"];
        newdivstts.appendChild(newpAttack);

        let newh3Defence =document.createElement('h3');
        newh3Defence.textContent = "Defence";
        newdivstts.appendChild(newh3Defence);

        let newpDefence =document.createElement('p');
        newpDefence.classList.add("pDefence");
        newpDefence.textContent = tritab[0]["armor"];
        newdivstts.appendChild(newpDefence);

        let newdivbtm =document.createElement('div');
        newdivbtm.classList.add("btm");
        newDiv.appendChild(newdivbtm);
    }

}
