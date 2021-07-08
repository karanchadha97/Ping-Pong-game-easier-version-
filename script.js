var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
var ball = document.getElementById('ball');
var gameOn = false;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name = "Rod 1";
const rod2Name = "Rod 2";

let scoreRod1=0,
    scoreRod2=0,
    maxScore=0,
    movement,
    rod,
    ballSpeedX = 2,
    ballSpeedY = 2;

(function (){

    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if(rod == null || maxScore == null){
        alert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
        rod = "Rod1"
    }
    else{
        alert(rod + " has maximum score of " + maxScore * 100);
    }
})();
function resetBoard(rod){

    rod1.style.left = (windowWidth - rod1.offsetWidth)/2 + 'px';
    rod2.style.left = (windowWidth - rod2.offsetWidth)/2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth)/2 + 'px';

    if(rod == rod2Name){
        ball.style.top = rod1.offsetHeight + 'px';
    }
    else if(rod == rod1Name){
        ball.style.top = windowHeight - ball.offsetHeight - rod2.offsetHeight + 'px';
    }

    scoreRod1 = 0;
    scoreRod2 = 0;
    gameOn = false;
}
function storeWin(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }

    clearInterval(movement);
    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));
    resetBoard(rod);

}

window.addEventListener('keypress',function(event){

    let rodSpeed = 20;

    let rodRect = rod1.getBoundingClientRect();

   if(event.keyCode == 100 && ((rodRect.x + rodRect.width) < windowWidth)){
       rod1.style.left = (rodRect.x) + rodSpeed + 'px';
       rod2.style.left = rod1.style.left;
   }

   else if(event.keyCode == 97 && (rodRect.x > 0)){
       rod1.style.left = (rodRect.x) - rodSpeed + 'px';
       rod2.style.left = rod1.style.left;
   }
   if(event.keyCode == 13){

        if(!gameOn){

            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let rod1Height = rod1.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Height = rod2.offsetHeight;
            let rod2Width = rod2.offsetWidth;

            movement = setInterval(function(){

                ballX += ballSpeedX;
                ballY += ballSpeedY;

                rod1X = rod1.getBoundingClientRect().x;
                rod2X = rod2.getBoundingClientRect().x;
                
                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';

                if((ballX + ballDia) >= windowWidth || ballX <= 0)
                {
                    ballSpeedX = -ballSpeedX;
                }

                let ballPos = ballX + ballDia / 2;

                if(ballY <= rod1Height){

                    ballSpeedY = -ballSpeedY;
                  //  score++;

                    if((ballPos < rod1X) || ballPos > (rod1X + rod1Width)){
                        storeWin(rod2Name,scoreRod2);
                    }
                    else{
                        scoreRod1++;
                    }
                }

                else if((ballY + ballDia) >= (windowHeight - rod2Height)){
                    ballSpeedY = -ballSpeedY;

                    if((ballPos < rod2X) || ballPos > (rod2X + rod2Width)){
                        storeWin(rod1Name,scoreRod1);
                    }
                    else{
                        scoreRod2++;
                    }
                }

            },10);

        }

   }
});