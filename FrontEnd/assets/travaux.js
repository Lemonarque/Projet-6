/*let projets
fetch("http://localhost:5678/api/works")
.then(res => res.json())*/
const token = localStorage.getItem("token")
let bouttonT = document.querySelector("#trieT")
let modifier = document.querySelector(".Modifier")
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
function showprojet(a){
    
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
function showprojets2(a){

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
function trieprojets(a){
    for(let i =0;i<a.length; i++){

        let trie = a[i]
        const flex = document.querySelector(".trier")
        let boutton = document.createElement("button")
        boutton.innerText = trie.name
        if(trie.id == 1){
            boutton.setAttribute("id","trieO")
        }
        if(trie.id == 2){
            boutton.setAttribute("id","trieA")
        }
        if(trie.id == 3){
            boutton.setAttribute("id","trieHR")
        }
        flex.appendChild(boutton)
    }

}
async function listtriage(){
    const res = await fetch("http://localhost:5678/api/categories")
    const triages = await res.json()
    return triages
}
async function getprojets(){
    const res  = await fetch("http://localhost:5678/api/works")
    const projets = await res.json()
    console.log(projets.length)
    return projets
}
async function delprojets(i){
    const res  = await fetch("http://localhost:5678/api/works/"+ i,{method:"DELETE",headers: { Authorization: `Bearer ${token}`}})
}
let listprojets = getprojets()
console.log(listprojets)
async function filter(){
    const listprojets = await getprojets()
    showprojets(listprojets)
    bouttonT.addEventListener("click",() =>{
        const section = document.querySelector(".gallery")
        section.innerHTML = ""
        console.log(listprojets.length)
        for (let i = 0; i<listprojets.length; i+1){
            console.log(listprojets[i]) 
            showprojet(listprojets[i])
            i+=1 
        }
        console.log(bouttonT.innerText)
    })
    const listbouton = await listtriage()
    const bouttonfinal = await trieprojets(listbouton)
    let bouttonO = document.querySelector("#trieO")
    bouttonO.addEventListener("click",() =>{
        const section = document.querySelector(".gallery")
        section.innerHTML = ""
        for (let i = 0; i<listprojets.length; i+1){
            if(bouttonO.innerText == listprojets[i].category.name){
                console.log(listprojets[i]) 
            showprojet(listprojets[i])
            }
            i+=1 
        }
    })
    let bouttonA = document.querySelector("#trieA")
    bouttonA.addEventListener("click",() =>{
        const section = document.querySelector(".gallery")
        section.innerHTML = ""
        for (let i = 0; i<listprojets.length; i+1){
            if(bouttonA.innerText == listprojets[i].category.name){
                console.log(listprojets[i]) 
            showprojet(listprojets[i])
            }
            i+=1 
        }
    })
    let bouttonHR = document.querySelector("#trieHR")
    bouttonHR.addEventListener("click",() =>{
        const section = document.querySelector(".gallery")
        section.innerHTML = ""
        for (let i = 0; i<listprojets.length; i+1){
            if(bouttonHR.innerText == listprojets[i].category.name){
                console.log(listprojets[i]) 
            showprojet(listprojets[i])
            }
            i+=1 
        }
    })
}
filter()

async function showmodal(){
    const listprojets = await getprojets()
    showprojets2(listprojets)
    for(let i = 0; i<listprojets.length;i+=1){
        console.log(i)
        let deltouchs = document.getElementById("del"+i)
        console.log(deltouchs)
        let poc = document.getElementById(listprojets[i].id)
        console.log(poc)
        deltouchs.addEventListener("click",() => {delprojets(poc.id)})
    }
}
showmodal()
async function addWork(event) {
    event.preventDefault();

    const title = document.querySelector("#text").value;
    const categoryId = document.querySelector("#list").value;
    const image = document.querySelector("#file").files[0];


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
}
const btnAjouterProjet = document.querySelector(".send");
btnAjouterProjet.addEventListener("click", addWork);
