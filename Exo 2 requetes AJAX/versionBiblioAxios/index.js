let tab = document.getElementById("tab");
let trieVal = true;
let jsonURL ='http://dummy.restapiexample.com/api/v1/employees';
let arrayJN;

axios.get(jsonURL)
.then(response=>{
    arrayJN = response.data;
    if(arrayJN!=null){
        creatTable(arrayJN.data);
    }
});


function creatTable(arrayJN){
    if(arrayJN.length>0){
        console.log(arrayJN);
        let newTR =document.createElement('tr');
        tab.appendChild(newTR);
        let newTRBoth =document.createElement('tr');

        const euro = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        });
        for(let a in arrayJN[0]){
    
            var newTH =document.createElement('th');
            if(a!="profile_image"){
                var newTH =document.createElement('th');
                var newTDboth =document.createElement('td');

                switch (a) {
                    case "id":
                        newTH.textContent = "EID";
                        newTDboth.textContent =arrayJN.length;
                        newTR.appendChild(newTH);   
                        newTRBoth.appendChild(newTDboth);                   
                        break;
                    case "employee_name":
                        newTH.textContent = "Full Name";
                        newTR.appendChild(newTH);           
                        //newTRBoth.colSpan =2;
                        newTRBoth.appendChild(newTDboth); 
                        newTDboth =document.createElement('td');     
                        newTRBoth.appendChild(newTDboth); 
                        break;
                    case "employee_salary":
                        newTH.textContent = "Monthly salary";
                        let newBtnTrie =document.createElement('button');
                        newBtnTrie.textContent = "Trie";
                        newTH.appendChild(newBtnTrie);
                        newBtnTrie.addEventListener('click',function(){                
                                if(trieVal == true){
                                        trieVal=false;
                                        arrayJN = arrayJN.sort((a,b)=>{
                                        return b.employee_salary- a.employee_salary;
                                    });
                                }
                                else{
                                        trieVal=true;
                                        arrayJN = arrayJN.sort((a,b)=>{
                                        return a.employee_salary- b.employee_salary;
                                    });
                                }
                    /////////////////////////////////
                    removeTab(arrayJN);
                        });
                        newTDboth.textContent = euro.format(calculTotSal(arrayJN)); 
                        newTRBoth.appendChild(newTDboth);           
                        break;
                    case "employee_age":
                        newTH.textContent = "Year of birth";
                        newTDboth.colSpan =2;
                        newTRBoth.appendChild(newTDboth);           
                        break;
                    default:
                        break;
                }
                newTR.appendChild(newTH);           
            }
        
        }

        let newTHA =document.createElement('th');
        newTHA.textContent = "Actions";
        newTR.appendChild(newTHA);
        
        cel= newTR.insertCell(2);           
        cel.textContent ="Email";
        cel.className  ="cel";
        
        tab.appendChild(newTRBoth);
        

        for (let index = 0; index < arrayJN.length; index++) {
            CreateRow(arrayJN ,index,newTRBoth);
        }
    }
}

function CreateRow(arrayJN ,index,newTRBoth){
    let date = new Date();
    date = date.getFullYear();
    let t;

    newTR = document.createElement('tr');
    tab.insertBefore(newTR,newTRBoth);

    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });
        for(let val in arrayJN[index]) {
        //    console.log(arrayJN[index][val]);

            if("employee_age"==val){
                t= date -arrayJN[index]["employee_age"]
                newTD = document.createElement('td');
                newTD.textContent =date-arrayJN[index][val];
                newTR.appendChild(newTD);
            }
            else if("employee_name"==val){
                newTD = document.createElement('td');
                newTD.textContent = arrayJN[index][val];
                newTR.appendChild(newTD);

                str = arrayJN[index][val].toLocaleLowerCase();
                strSplit= str.split(" ");
                if(arrayJN.length>0){
                    cel= newTR.insertCell(2);
                    cel.textContent =(str[0]+"."+strSplit[1]+"@email.com");
                    cel.className  ="cel";
                }

            }
            else if("employee_salary"==val){
                newTD = document.createElement('td');
                newTD.textContent = euro.format(arrayJN[index][val]/12);
                newTR.appendChild(newTD);
            }
            else if("profile_image"!=val){
                    newTD = document.createElement('td');
                    newTD.textContent = arrayJN[index][val];
                    newTR.appendChild(newTD);
            }

        }
        let newBtnClone =document.createElement('button');
        newBtnClone.textContent = "Duplicate";
        newTR.appendChild(newBtnClone);

        let newBtnDelete =document.createElement('button');
        newBtnDelete.textContent = "Delete";
        newTR.appendChild(newBtnDelete);

        newBtnClone.addEventListener('click', function (){
            index = this.parentNode.rowIndex;
       //     CreateRow(arrayJN,index-1);
            arrayJN.push(arrayJN[index-1]);
            removeTab(arrayJN);
        });
        newBtnDelete.addEventListener('click',function (){
            index = this.parentNode.rowIndex;
            row = this.parentNode;
            btnDelete(arrayJN,index,row);
        });
}


function btnDelete(arrayJN,index,row){
    arrayJN.splice(index-1, 1);
   // tab.removeChild(row);
   removeTab(arrayJN);
}
function calculTotSal(arrayJN){
    let totSal=0;

    for (let index = 0; index < arrayJN.length; index++) {                
             totSal+= arrayJN[index]["employee_salary"]/12;
    }
    return totSal;
}

function removeTab(arrayJN){
    console.log(arrayJN.length);
    while(tab.hasChildNodes()){
        tab.removeChild(tab.firstChild);
    }
    creatTable(arrayJN);
    if(arrayJN.length==0){
        alert("Tableau vide");
    }
}