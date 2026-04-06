const elementosCelula = document.querySelectorAll("[data-celula]");
//o elementosCelula retorna uma nodeList, algo semelhante a um array, uma lista indexaos.

const tabuleiro = document.querySelector('.tabuleiro');
let msgVitoria = document.getElementById('mensagemVitoria');
let cxVitoria = document.querySelector('.mensagem');

let vezCirculo;

let  combinacaoVitoria = [
    [0,1,2],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
]

const comecaJogo = () => {
    for( const celula of elementosCelula){
        celula.addEventListener("click", cliqueJogo, {once:true});
    }

    vezCirculo = false;

    tabuleiro.classList.add("x")
}


const encerrarJogo = (empate)=>{
    if(empate){
        msgVitoria.innerText = "DEU VELHA!";
    }else{
        msgVitoria.innerHTML = vezCirculo? "<p> <strong>O</strong> VENCEU</p>": "<p> <strong>X</strong> VENCEU</p>";
    }


    cxVitoria.classList.add("mostrarMsg");
}

const trocarJogador = () =>{
    vezCirculo = !vezCirculo;
    tabuleiro.classList.remove("o","x");
    
    if(vezCirculo){
        tabuleiro.classList.add("o");
    }else{
        tabuleiro.classList.add("x");
    }

}

const verificarVitoria = (jogadorAtual) => {
    return combinacaoVitoria.some((combinacao) =>{
        return combinacao.every ((index) =>{
            return elementosCelula[index].classList.contains(jogadorAtual);
        });
    });
}

const cliqueJogo = (e) =>{

    //adiciona x ou o
    const celula = e.target;
    const classeAd = vezCirculo? 'o' :  'x';

    celula.classList.add(classeAd);

    //verificar vitoria
    const vitoria = verificarVitoria(classeAd);
    if(vitoria){
        encerrarJogo(false);
        //houve um vencedor
        return;
    }


    const empate = [...elementosCelula].every((celula) => celula.classList.contains("x")||celula.classList.contains("o"));
    if(empate){
        encerrarJogo(true);
    }
    //troca o jogador
    trocarJogador();
    // O trocarJogador() será executado somente se não houver um vencedor.
}

const reiniciar = () =>{
    for(const celula of elementosCelula){
    celula.classList.remove("x","o");
    }
    cxVitoria.classList.remove("mostrarMsg");

    comecaJogo();
   
}

comecaJogo();