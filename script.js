/*==================================================
JORNAL GM
SCRIPT.JS - PARTE 1
==================================================*/



/*=========================
HEADER
=========================*/

const header = document.querySelector("#header") || document.querySelector("header");

if(header){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 80){

            header.classList.add("ativo");

        }else{

            header.classList.remove("ativo");

        }

    });

}


/*=========================
MENU MOBILE
=========================*/

const menuBtn = document.querySelector(".menu-mobile");
const menu = document.querySelector("nav");

function atualizarAlturaMobile(){
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

atualizarAlturaMobile();
window.addEventListener("resize", atualizarAlturaMobile);
window.addEventListener("orientationchange", atualizarAlturaMobile);

if(menuBtn && menu){

    menuBtn.setAttribute("aria-expanded", "false");

}


/*=========================
SLIDER HERO
=========================*/

const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicadores span");

let slideAtual = 0;

if(slides.length > 0 && indicadores.length > 0){

    function mostrarSlide(indice){

        slides.forEach((slide)=>{

            slide.classList.remove("ativo");

        });

        indicadores.forEach((bolinha)=>{

            bolinha.classList.remove("ativo");

        });

        slides[indice].classList.add("ativo");
        indicadores[indice].classList.add("ativo");

    }

    function proximoSlide(){

        slideAtual++;

        if(slideAtual >= slides.length){

            slideAtual = 0;

        }

        mostrarSlide(slideAtual);

    }

    setInterval(proximoSlide,5000);

    /*=========================
    CLIQUE NOS INDICADORES
    =========================*/

    indicadores.forEach((item,index)=>{

        item.addEventListener("click",()=>{

            slideAtual = index;

            mostrarSlide(slideAtual);

        });

    });

}


/*=========================
EFEITO NOS BOTÕES
=========================*/

const botoes = document.querySelectorAll(".btn, .botao");

botoes.forEach((botao)=>{

    botao.addEventListener("mouseenter",()=>{

        botao.style.transform="translateY(-6px) scale(1.03)";

    });

    botao.addEventListener("mouseleave",()=>{

        botao.style.transform="translateY(0) scale(1)";

    });

});


/*=========================
IMAGENS COM ZOOM
=========================*/

const imagens = document.querySelectorAll(".card img, .noticia img");

imagens.forEach((img)=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.08)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});
/*==================================================
SCRIPT.JS - PARTE 2
Scroll Reveal
Barra de Progresso
Botão Voltar ao Topo
==================================================*/


/*=========================
ANIMAÇÃO AO ROLAR
=========================*/

const elementos = document.querySelectorAll(
".card, .noticia, .mini-card, .categoria-card, .fade, .esquerda, .direita, .zoom"
);

function revelarElementos(){

    const alturaTela = window.innerHeight;

    elementos.forEach((elemento)=>{

        const topo = elemento.getBoundingClientRect().top;

        if(topo < alturaTela - 120){

            elemento.classList.add("ativo");

        }

    });

}

window.addEventListener("scroll", revelarElementos);
window.addEventListener("load", revelarElementos);
window.addEventListener("resize", revelarElementos);

revelarElementos();



/*=========================
BOTÃO VOLTAR AO TOPO
=========================*/

const botaoTopo = document.getElementById("topo");

if(botaoTopo){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 400){

            botaoTopo.style.display="flex";

            botaoTopo.style.alignItems="center";

            botaoTopo.style.justifyContent="center";

        }else{

            botaoTopo.style.display="none";

        }

    });

    botaoTopo.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}



/*=========================
BARRA DE PROGRESSO
=========================*/

const barra = document.getElementById("progresso");

if(barra){

    window.addEventListener("scroll",()=>{

        const alturaDocumento =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

        const porcentagem =
        (window.scrollY / alturaDocumento) * 100;

        barra.style.width = porcentagem + "%";

    });

}



/*=========================
ANIMAÇÃO DOS NÚMEROS
=========================*/

const numeros = document.querySelectorAll(".numero h2");

let animado = false;

function contar(){

    if(animado) return;

    numeros.forEach((numero)=>{

        const alvo = parseInt(numero.innerText);

        let atual = 0;

        const incremento = alvo / 80;

        const timer = setInterval(()=>{

            atual += incremento;

            if(atual >= alvo){

                numero.innerText = alvo + "+";

                clearInterval(timer);

            }else{

                numero.innerText = Math.floor(atual);

            }

        },20);

    });

    animado = true;

}

window.addEventListener("scroll",()=>{

    const estatisticas =
    document.querySelector(".estatisticas");

    if(!estatisticas) return;

    const topo =
    estatisticas.getBoundingClientRect().top;

    if(topo < window.innerHeight - 100){

        contar();

    }

});



/*=========================
EFEITO PARALLAX
=========================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    if(hero){

        hero.style.backgroundPositionY =
        window.scrollY * 0.4 + "px";

    }

});



/*=========================
ANIMAÇÃO DA LOGO
=========================*/

const logo = document.querySelector(".logo img");

if(logo){

logo.addEventListener("mouseenter",()=>{

    logo.style.transform="rotate(5deg) scale(1.08)";

});

logo.addEventListener("mouseleave",()=>{

    logo.style.transform="rotate(0deg) scale(1)";

});

}/*==================================================
SCRIPT.JS - PARTE 3
Pesquisa + Modo Escuro
==================================================*/


/*=========================
MODO ESCURO
=========================*/

const darkModeButtons = document.querySelectorAll(".dark-mode");

function atualizarIconesDarkMode(escuro){

    darkModeButtons.forEach((botao)=>{

        const icone = botao.querySelector("i");

        if(!icone) return;

        icone.classList.toggle("fa-moon", !escuro);
        icone.classList.toggle("fa-sun", escuro);

    });

}

if(darkModeButtons.length > 0){

    darkModeButtons.forEach((botaoDark)=>{

        botaoDark.addEventListener("click",()=>{

            const modoEscuro = document.body.classList.toggle("dark");

            atualizarIconesDarkMode(modoEscuro);

            localStorage.setItem("tema", modoEscuro ? "escuro" : "claro");

        });

    });

}

window.addEventListener("load",()=>{

    if(localStorage.getItem("tema")=="escuro"){

        document.body.classList.add("dark");

        atualizarIconesDarkMode(true);

    }else{

        atualizarIconesDarkMode(false);

    }

});


/*=========================
PESQUISA
=========================*/

const pesquisa = document.getElementById("pesquisa");

if(pesquisa){

pesquisa.addEventListener("keyup",()=>{

    let texto = pesquisa.value.toLowerCase();

    const cards = document.querySelectorAll(".card,.noticia");

    cards.forEach((card)=>{

        let titulo = card.innerText.toLowerCase();

        if(titulo.includes(texto)){

            card.style.display="";

        }else{

            card.style.display="none";

        }

    });

});

const botaoPesquisa = document.querySelector(".pesquisa button");

if(botaoPesquisa){

    botaoPesquisa.addEventListener("click",()=>{

        pesquisa.dispatchEvent(new Event("keyup"));

    });

}

}


/*=========================
ANIMAÇÃO DOS LINKS
=========================*/

const links = document.querySelectorAll("nav a");

links.forEach((link)=>{

    link.addEventListener("mouseenter",()=>{

        link.style.transform="translateY(-3px)";

    });

    link.addEventListener("mouseleave",()=>{

        link.style.transform="translateY(0px)";

    });

});


/*=========================
EFEITO NOS CARDS
=========================*/

const cardsTilt = document.querySelectorAll(".card");

cardsTilt.forEach((card)=>{

    card.addEventListener("mousemove",(e)=>{

        const x = e.offsetX;
        const y = e.offsetY;

        const rotacaoY = (x/card.clientWidth-0.5)*10;

        const rotacaoX = (y/card.clientHeight-0.5)*-10;

        card.style.transform=
        `perspective(900px)
        rotateY(${rotacaoY}deg)
        rotateX(${rotacaoX}deg)
        scale(1.02)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="perspective(900px) rotateX(0) rotateY(0) scale(1)";

    });

});


/*=========================
EFEITO NAS IMAGENS
=========================*/

const imagensGaleria = document.querySelectorAll(".grid-galeria img");

imagensGaleria.forEach((img)=>{

    img.addEventListener("mouseenter",()=>{

        img.style.filter="brightness(110%)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.filter="brightness(100%)";

    });

});


/*=========================
BOTÕES
=========================*/

const botoesAnimacao = document.querySelectorAll("button,.btn");

botoesAnimacao.forEach((botao)=>{

    botao.addEventListener("mouseenter",()=>{

        botao.style.transition=".3s";

        botao.style.transform="translateY(-4px)";

    });

    botao.addEventListener("mouseleave",()=>{

        botao.style.transform="translateY(0px)";

    });

});/*==================================================
SCRIPT.JS - PARTE 4 (FINAL)
Jornal GM 2026
==================================================*/


/*=========================
MENU MOBILE
=========================*/

const menuMobile = document.querySelector(".menu-mobile");
const menuNav = document.querySelector("nav");

if(menuMobile && menuNav){

menuMobile.addEventListener("click",(event)=>{

    event.stopPropagation();

    const abrir = !menuNav.classList.contains("ativo");

    menuNav.classList.toggle("ativo", abrir);

    menuMobile.classList.toggle("ativo", abrir);

    menuNav.style.right = abrir ? "0" : "-100%";

    menuMobile.setAttribute("aria-expanded", String(abrir));

});


document.addEventListener("click",(event)=>{

    if(window.innerWidth <= 992 && menuNav.classList.contains("ativo") &&

        !menuNav.contains(event.target) && !menuMobile.contains(event.target)){

        menuNav.classList.remove("ativo");

        menuMobile.classList.remove("ativo");

        menuNav.style.right = "-100%";

        menuMobile.setAttribute("aria-expanded", "false");

    }

});

window.addEventListener("resize",()=>{

    if(window.innerWidth > 992){

        menuNav.classList.remove("ativo");

        menuMobile.classList.remove("ativo");

        menuNav.style.right = "";

        menuMobile.setAttribute("aria-expanded", "false");

    }else if(!menuNav.classList.contains("ativo")){

        menuNav.style.right = "-100%";

    }

});

}


/*=========================
FECHAR MENU AO CLICAR
=========================*/

document.querySelectorAll("nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        if(menuNav && window.innerWidth <= 992){

            menuNav.classList.remove("ativo");

            menuNav.style.right="-100%";

            if(menuMobile){
                menuMobile.classList.remove("ativo");
                menuMobile.setAttribute("aria-expanded", "false");
            }

        }

    });

});


/*=========================
PESQUISA
SEM RESULTADOS
=========================*/

const campoPesquisa = document.getElementById("pesquisa");

if(campoPesquisa){

    campoPesquisa.addEventListener("keyup",()=>{

        const cards = document.querySelectorAll(".card,.noticia");

        let encontrados = 0;

        cards.forEach(card=>{

            const texto = card.innerText.toLowerCase();

            if(texto.includes(campoPesquisa.value.toLowerCase())){

                card.style.display="";

                encontrados++;

            }else{

                card.style.display="none";

            }

        });

        let aviso=document.getElementById("semResultado");

        if(!aviso){

            aviso=document.createElement("h2");

            aviso.id="semResultado";

            aviso.style.textAlign="center";

            aviso.style.margin="50px";

            aviso.style.color="#999";

            aviso.innerHTML="Nenhuma notícia encontrada.";

            document.body.appendChild(aviso);

        }

        aviso.style.display=(encontrados===0)?"block":"none";

    });

}

const curtirBotoes = document.querySelectorAll(".curtir");

curtirBotoes.forEach((botao)=>{

    botao.addEventListener("click",()=>{

        botao.classList.toggle("ativo");

        const icone = botao.querySelector("i");

        if(icone){

            icone.classList.toggle("fa-regular");
            icone.classList.toggle("fa-solid");

        }

    });

});


/*=========================
TEXTO DIGITANDO
=========================*/

const tituloHero=document.querySelector(".hero h1");

if(tituloHero){

const textoOriginal=tituloHero.innerText;

tituloHero.innerText="";

let letra=0;

function escrever(){

if(letra<textoOriginal.length){

tituloHero.innerHTML+=textoOriginal.charAt(letra);

letra++;

setTimeout(escrever,45);

}

}

setTimeout(escrever,700);

}


/*=========================
SCROLL SUAVE
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(item=>{

item.addEventListener("click",function(e){

e.preventDefault();

const destino=document.querySelector(this.getAttribute("href"));

if(destino){

destino.scrollIntoView({

behavior:"smooth"

});

}

});

});


/*=========================
LAZY LOADING
=========================*/

const imagensSite=document.querySelectorAll("img");

imagensSite.forEach(img=>{

img.loading="lazy";

});


/*=========================
ANO AUTOMÁTICO
=========================*/

const ano=document.getElementById("ano");

if(ano){

ano.innerHTML=new Date().getFullYear();

}


/*=========================
ANIMAÇÃO BOTÕES
=========================*/

document.querySelectorAll("button, .btn, .botao").forEach(btn=>{

    btn.addEventListener("mousedown",()=>{

        btn.style.transform="scale(.95)";

    });

    btn.addEventListener("mouseup",()=>{

        btn.style.transform="scale(1)";

    });

    btn.addEventListener("touchstart",()=>{

        btn.style.transform="scale(.95)";

    },{passive:true});

    btn.addEventListener("touchend",()=>{

        btn.style.transform="scale(1)";

    });

});


/*=========================
PRELOAD DAS IMAGENS
=========================*/

window.addEventListener("load",()=>{

document.querySelectorAll("img").forEach(img=>{

const nova=new Image();

nova.src=img.src;

});

});


/*=========================
CONSOLE
=========================*/

console.log("%cJornal GM 2026",
"color:red;font-size:30px;font-weight:bold;");

console.log("%cSite desenvolvido em HTML CSS JavaScript",
"color:#555;font-size:15px;");


