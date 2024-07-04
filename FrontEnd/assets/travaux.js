/*let projets
fetch("http://localhost:5678/api/works")
.then(res => res.json())*/
const token = localStorage.getItem("token")
let bouttonT = document.querySelector("#trieT")
let modifier = document.querySelector(".Modifier")
let logout = document.querySelector(".logout")
let login = document.querySelector(".Login")
modifier.addEventListener("click",() => {
    let popup1 = document.querySelector(".modif-section")
    popup1.classList.remove("dispair")
    popup1.classList.add("appair")
})
let boutonpop = document.querySelector(".boutonpop")
boutonpop.addEventListener("click",() => {
    let popup2 = document.querySelector(".ajout-section")
    popup2.classList.remove("dispair2")
    popup2.classList.add("appair2")
})
let cross = document.querySelector(".cross")
cross.addEventListener("click",() => {
    let popup1 = document.querySelector(".modif-section")
    popup1.classList.add("dispair")
    popup1.classList.remove("appair")
})
let cross2 = document.querySelector(".cross2")
cross2.addEventListener("click", () => {
    console.log(cross2)
    let popup2 = document.querySelector(".ajout-section")
    popup2.classList.add("dispair2")
    popup2.classList.remove("appair2")
    let popup1 = document.querySelector(".modif-section")
    popup1.classList.add("dispair")
    popup1.classList.remove("appair")
})
let arrow = document.querySelector(".arrowL")
arrow.addEventListener("click",()=>{
    let popup2 = document.querySelector(".ajout-section")
    popup2.classList.add("dispair2")
    popup2.classList.remove("appair2")
})

function showprojets(a){

    for(let i =0;i<a.length; i++){
        let projet = a[i]
        const section = document.querySelector(".gallery")
        let card = document.createElement("figure")
        let pict = document.createElement("img")
        pict.src = projet.imageUrl
        let ctext = document.createElement("figcaption")
        ctext.innerText = projet.title
        section.appendChild(card)
        card.appendChild(pict)
        card.appendChild(ctext)
    }
}
let i =0
function previewprojet(a){
    
    let projet = a
    const section = document.querySelector(".gallery")
    let card = document.createElement("figure")
    let pict = document.createElement("img")
    pict.src = projet.imageUrl
    let ctext = document.createElement("figcaption")
    ctext.innerText = projet.title
    section.appendChild(card)
    card.appendChild(pict)
    card.appendChild(ctext)
}
function showtrash(a){

    for(let i =0;i<a.length; i++){
        let projet = a[i]
        const section = document.querySelector(".modifimg")
        let card = document.createElement("figure")
        let pict = document.createElement("img")
        let del = document.createElement("button")
        del.innerHTML = "<i class='fa-solid fa-trash-can'></i>"
        del.id = 'del'+i
        pict.id = projet.id
        pict.src = projet.imageUrl
        section.appendChild(card)
        card.appendChild(pict)
        card.appendChild(del)
    }
}
function filterProjet(a){
    for(let i =0;i<a.length; i++){

        let trie = a[i]
        const flex = document.querySelector(".trier")
        let boutton = document.createElement("button")
        boutton.innerText = trie.name
        if(trie.id == 1){
            boutton.setAttribute("id","trieO")
            boutton.setAttribute("class","trie")
        }
        if(trie.id == 2){
            boutton.setAttribute("id","trieA")
            boutton.setAttribute("class","trie")
        }
        if(trie.id == 3){
            boutton.setAttribute("id","trieHR")
            boutton.setAttribute("class","trie")
        }
        flex.appendChild(boutton)
    }

}
async function getfilter(){
    try{
        const res = await fetch("http://localhost:5678/api/categories")
        const triages = await res.json()
        return triages
    }catch{
        alert("Le server est actuellement en maintenance")
    }
}
async function getprojets(){
    try{
        const res  = await fetch("http://localhost:5678/api/works")
        const projets = await res.json()
        console.log(projets.length)
        return projets
    }catch{
        alert("Le serveur est actuellement indisponible")
    }
}
async function delprojets(i){
    try{
        const res  = await fetch("http://localhost:5678/api/works/"+ i,{method:"DELETE",headers: { Authorization: `Bearer ${token}`}})
        showprojets(listprojets)
    }catch{
        alert("le serveur est actuellement en maintenance")
    }
}
let listprojets = getprojets()
console.log(listprojets)
async function filter(){
    const listprojets = await getprojets()
    showprojets(listprojets)
    bouttonT.addEventListener("click",() =>{
        const allfilter = document.querySelectorAll(".trie")
        allfilter.forEach((element)=>{
            element.classList.remove("filterselected")
        })
        bouttonT.classList.add("filterselected")
        const section = document.querySelector(".gallery")
        section.innerHTML =""
        console.log(listprojets.length)
        for (let i = 0; i<listprojets.length; i+1){
            console.log(listprojets[i]) 
            previewprojet(listprojets[i])
            i+=1 
        }
    })
    const listbouton = await getfilter()
    filterProjet(listbouton)
    let bouttonO = document.querySelector("#trieO")
    bouttonO.addEventListener("click",() =>{
        const allfilter = document.querySelectorAll(".trie")
        allfilter.forEach((element)=>{
            element.classList.remove("filterselected")
        })
        bouttonO.classList.add("filterselected")
        const section = document.querySelector(".gallery")
        section.innerHTML = ""
        for (let i = 0; i<listprojets.length; i+1){
            if(bouttonO.innerText == listprojets[i].category.name){
                console.log(listprojets[i]) 
            previewprojet(listprojets[i])
            }
            i+=1 
        }
    })
    let bouttonA = document.querySelector("#trieA")
    bouttonA.addEventListener("click",() =>{
        const allfilter = document.querySelectorAll(".trie")
        allfilter.forEach((element)=>{
            element.classList.remove("filterselected")
        })
        bouttonA.classList.add("filterselected")
        const section = document.querySelector(".gallery")
        section.innerHTML = ""
        for (let i = 0; i<listprojets.length; i+1){
            if(bouttonA.innerText == listprojets[i].category.name){
                console.log(listprojets[i]) 
            previewprojet(listprojets[i])
            }
            i+=1 
        }
    })
    let bouttonHR = document.querySelector("#trieHR")
    bouttonHR.addEventListener("click",() =>{
        const allfilter = document.querySelectorAll(".trie")
        allfilter.forEach((element)=>{
            element.classList.remove("filterselected")
        })
        bouttonHR.classList.add("filterselected")
        const section = document.querySelector(".gallery")
        section.innerHTML = ""
        for (let i = 0; i<listprojets.length; i+1){
            if(bouttonHR.innerText == listprojets[i].category.name){
                console.log(listprojets[i]) 
                previewprojet(listprojets[i])
            }
            i+=1 
        }
    })
}
filter()

async function showmodal(){
    const listprojets = await getprojets()
    showtrash(listprojets)
    for(let i = 0; i<listprojets.length;i+=1){
        console.log(i)
        let deltouchs = document.getElementById("del"+i)
        console.log(deltouchs)
        let poc = document.getElementById(listprojets[i].id)
        console.log(poc)
        deltouchs.addEventListener("click",() => {delprojets(poc.id)})
    }
    showprojets(listprojets)
}
showmodal()
async function addWork(event) {
    event.preventDefault();

    const title = document.querySelector("#text").value;
    const categoryId = document.querySelector("#list").value;
    const image = document.querySelector("#file").files[0];
    let full = document.querySelector(".emptyimg")
    let empty = document.querySelector(".empty")
    

    if (title === "" || categoryId === "" || image === undefined) {
        alert("Merci de remplir tous les champs");
        return;
    } 
    else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        alert("Merci de choisir une catégorie valide");
        return;
        } 
    else {
        
        const formsend = new FormData();
        formsend.append("title", title);
        formsend.append("category", categoryId);
        formsend.append("image", image);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formsend,
        });
    }
    showprojets(listprojets)
    let popup2 = document.querySelector(".ajout-section")
    popup2.classList.add("dispair2")
    popup2.classList.remove("appair2")
    showmodal()
}
const btnAjouterProjet = document.querySelector(".send");
btnAjouterProjet.addEventListener("click", addWork);

logout.addEventListener("click",()=>{
    localStorage.clear()
    console.log(localStorage)
})

function connect(){
    if (localStorage.getItem("token")){
        const logoutbar=document.querySelector(".connect-bar")
        logout.classList.remove("delete")
        logoutbar.classList.remove("delete")
        modifier.classList.remove("delete")
        login.classList.add("delete")
    }
}
connect()
console.log(localStorage)

const fileInput = document.getElementById('file');
const imagePreview = document.getElementById('imagePreview');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const imageData = event.target.result;
    imagePreview.innerHTML = `<img src="${imageData}" alt="Preview" style="width: 40%; height: 100%; object-fit: contain;" />`;
  };
  reader.readAsDataURL(file);
  let empty = document.querySelector(".empty")
  empty.style.display = "none"
});