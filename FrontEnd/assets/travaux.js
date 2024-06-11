/*let projets
fetch("http://localhost:5678/api/works")
.then(res => res.json())*/
let bouttonT = document.querySelector("#trieT")

function showprojets(a){

    for(let i =0;i<a.length; i++){
        let projet = a[i]
        const section = document.querySelector(".gallery")
        let card = document.createElement("figure")
        let pict = document.createElement("img")
        pict.src = projet.imageUrl
        let ctext = document.createElement("figcaption")
        ctext.innerText = projet.category.name
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