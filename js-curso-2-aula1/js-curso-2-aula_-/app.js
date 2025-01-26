let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function colocarTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mostrarMensagemInicial(){
    colocarTextoNaTela('h1', 'Jogo do número secreto');
    colocarTextoNaTela('p', 'Escolha um número de 1 a 10');
}

mostrarMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log(numeroAleatorio);
    if(chute == numeroAleatorio){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemAcerto = `Voce acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        colocarTextoNaTela('h1', 'Você ganhou');
        colocarTextoNaTela('p', mensagemAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroAleatorio){
        colocarTextoNaTela('p', 'O número secreto é menor');
        limparCampo();
    } else {
        colocarTextoNaTela('p', 'O número secreto é maior');
        limparCampo();
    }
    tentativas++;
}

function gerarNumeroAleatorio(){
    let numeroAleatorio = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    } 
    if (listaDeNumerosSorteados.includes(numeroAleatorio)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroAleatorio);
        console.log(listaDeNumerosSorteados);
        return numeroAleatorio;
    }
}

function limparCampo(){
 let campo = document.querySelector('input');
 campo.value = '';   
}

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mostrarMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}