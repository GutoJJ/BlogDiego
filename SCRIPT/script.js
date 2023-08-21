let posts = document.querySelector(".posts");
const link = "https://api-rest-post-diegocandido.herokuapp.com";

window.onload = () => {
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
let bgBorrar = document.createElement("div");
bgBorrar.setAttribute("class", "bg-borrar");

let criarDetalhes = (titulo, imagem, descricao, data, autora, autoraimg) => {
    
    wrapper.style.animation = "fadeOut 0.8s ease-in-out";
    
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

        let descricaoDetalhe = document.createElement("p");
        descricaoDetalhe.setAttribute("class", "descricao-detalhe");
        descricaoDetalhe.appendChild(document.createTextNode(descricao));

        let autorDiv = document.createElement("div");
        autorDiv.setAttribute("class", "autor-div");

        let autorImg = document.createElement("div");
        autorImg.setAttribute("class","autor-img");

        let autorText = document.createElement("div");
        autorText.setAttribute("class" , "autor-text");

        let autorNome = document.createElement("p");
        autorNome.setAttribute("class","texto-branco");
        autorNome.appendChild(document.createTextNode("Criado por: "+autora));

        let dataPostagem = document.createElement("p");
        dataPostagem.setAttribute("class","texto-branco");
        dataPostagem.appendChild(document.createTextNode("Postado dia: "+data));

        autorDiv.appendChild(autorImg);
        autorDiv.appendChild(autorText);
        autorText.appendChild(autorNome);
        autorText.appendChild(dataPostagem);

        header.appendChild(bgBorrar);
        bgBorrar.appendChild(tituloDetalhe);
        bgBorrar.style.animation = "fadeIn 0.55s ease-in-out";
        detalhesSection.appendChild(descricaoDetalhe);
        detalhesSection.appendChild(autorDiv);

    }, 600);
}

let homeBtn = () => {
    bgBorrar.style.animation = "fadeOut 0.55s ease-in-out";
    setTimeout(function(){
        header.innerHTML="";
        detalhesSection.innerHTML="";
        wrapper.style ="";
        header.style="";
        bgBorrar.innerHTML ="";
    }, 500);
}