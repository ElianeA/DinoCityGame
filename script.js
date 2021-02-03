const dino = document.querySelector('.dino');
const background = document.querySelector('.background');


let isJumping = false;
let isGameOver = false;
let position = 0;
var cont = 0;
let score = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) {
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);
            
            // Descendo
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 10;
                    dino.style.bottom = position + 'px';
                }
            }, 10);
        } else {
        //Subindo
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCarro() {
    const carro = document.createElement('div');
    let carroPosition = 1170;
    let randomTime = Math.random() * 4000;

    if(isGameOver) return;

    carro.classList.add('carro');
    background.appendChild(carro);
    carro.style.left = carroPosition + 'px';
    
    let leftTimer = setInterval(() => {
        if(carroPosition < -40) {
            //Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(carro);
            score += 10;
            document.querySelector('.pontuacao').innerHTML = "SCORE: " + score;
        } else if (carroPosition > 0 && carroPosition < 40 && position <40) {
            //Game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1><p>Parabéns sua pontuação foi: ' + score +'</p>';
            
        } else {
            carroPosition -= 10;
            carro.style.left = carroPosition + 'px';
        }
    }, 20)

    setTimeout(createCarro, randomTime);
}
createCarro();
document.addEventListener('keyup', handleKeyUp);