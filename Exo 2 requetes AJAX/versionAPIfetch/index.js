let contentPost = document.getElementById("content");


fetch("https://arfp.eu/dataset/voyages.json")
.then(response => {
    if(response.ok){
        response.json()
       .then((data)=>{
        console.log(data);
        for(let a of data)
        {
            createPost(a);
        }
       });
 
    }
    else{
        console.log("error");
    }
});

function createPost(data){
    let newDiv =document.createElement('div');
    newDiv.classList.add("divElem");
    contentPost.appendChild(newDiv);

    let newh =document.createElement('h3');
    newh.textContent = data["titre"];
    newDiv.appendChild(newh);

    let divMid =document.createElement('div');
    newDiv.appendChild(divMid);

    let newimg =document.createElement('img');
    newimg.src = "https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg";
    divMid.appendChild(newimg);

    let newArt =document.createElement('article');
    newArt.textContent = data["description"];
    divMid.appendChild(newArt);

    let newDivBas =document.createElement('div');
    newDivBas.classList.add("bas");
    divMid.appendChild(newDivBas);

    let newBtn =document.createElement('button');
    newBtn.textContent = "Lire la suite";
    newDivBas.appendChild(newBtn);

}
/*
    <div class='divElem'>
        <h3>test</h3>
        <div>
            <img src="https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg">
            <article>zaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaddzaddzazad</article>
            <div class="bas">
                <button>Lire la suite</button>
            </div>
        </div>
    </div>
*/