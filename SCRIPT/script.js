let posts = document.querySelector(".posts");
const link = "https://api-rest-post-diegocandido.herokuapp.com";

window.onload = () => {
    document.body.style.background ="linear-gradient(180deg, #272942 0%, #101117 100%), #090909";
    fetch(link+"/postagens")
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            for (let i = 0; i < 6; i++) {
                
                criarCards(i,resp[i].title, resp[i].thumbImage, resp[i].description, resp[i].postDate, resp[i].profileName, resp[i].profileThumbImage);
            }
        });
}

let criarCards = (id,titulo, imagem, descricao, data, autora, autoraimg) => {
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");

    let cardContent = document.createElement("div");
    cardContent.setAttribute("class","card-content");

    let cardImg = document.createElement("img");
    cardImg.setAttribute("class","card-img");
    cardImg.setAttribute("src", link+""+imagem)

    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.appendChild(document.createTextNode(titulo));

    let btnLer = document.createElement("button");
    btnLer.setAttribute("class", "btn-ler");
    btnLer.appendChild(document.createTextNode("Ler"));

    btnLer.addEventListener("click", () => {
        detalhes(id);
    })

    posts.appendChild(cardBody);
    cardBody.appendChild(cardContent);
    cardBody.appendChild(btnLer);
    cardContent.appendChild(cardImg);
    cardContent.appendChild(cardTitle);

}

let detalhes = (id) =>{
    fetch(link+"/postagem/"+id)
        .then(resp => resp.json())
        .then(resp => {
            console.log("separador uau");
            console.log(resp);
            criarDetalhes(resp.title, resp.thumbImage, resp.description, resp.postDate, resp.profileName, resp.profileThumbImage);
    });
    console.log(id);
}

let wrapper = document.querySelector(".wrapper");
let header = document.querySelector("header");
let detalhesSection = document.querySelector(".detalhes");

let criarDetalhes = (titulo, imagem, descricao, data, autora, autoraimg) => {
    
    wrapper.style.animation = "fadeOut 1s ease-in-out";
    document.body.style.transition = "3s";
    document.body.style.background = "#090909";
    setTimeout(function(){
        
        wrapper.style.display = "none";
        wrapper.style.visibility = "hidden"; 
        header.style.background = "url("+link+""+imagem+")";
        header.style.backgroundPosition = "center";
        header.style.backgroundSize = "cover";
        header.style.height = "35.3125rem";

        let tituloDetalhe = document.createElement("h1");
        tituloDetalhe.setAttribute("class", "titulo-detalhe");
        tituloDetalhe.appendChild(document.createTextNode(titulo));

        detalhesSection.appendChild(tituloDetalhe);

    }, 600);
}

let homeBtn = () => {
    detalhesSection.innerHTML="";
    document.body.style.background ="linear-gradient(180deg, #272942 0%, #101117 100%), #090909";
    wrapper.style ="";
    header.style="";
}