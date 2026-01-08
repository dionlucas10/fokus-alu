const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const pausar = document.querySelector('.app__card-primary-button-icon');
const tempoNaTela = document.querySelector('#timer');


const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioZerar = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intevaloId = null;


musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    foc
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    botoes.forEach((botao) => {
        botao.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
Faça uma pausa longa.<br><strong class="app__title-strong">Recarregue suas energias!</strong>`;;
            break;
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        // audioZerar.play();
        alert('O tempo acabou!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    // console.log('Temporizador: ' + tempoDecorridoEmSegundos);
    mostrarTempo();

}
startPauseBt.addEventListener('click', iniciar);

function iniciar(){
    if (intevaloId){
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    intevaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    pausar.setAttribute('src', './imagens/pause.png');
}

function zerar(){
    clearInterval(intevaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    pausar.setAttribute('src', './imagens/play_arrow.png');
    intevaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    })
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();