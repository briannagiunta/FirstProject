
//HTML elements
const startButton = document.querySelector('.start');
const blurryBlur = document.querySelector("#blurbox");
const displayScreen = document.querySelector(".display-screen");
const gameScreen = document.querySelector(".game-screen");
const currentPic = document.querySelector("#pic");
const buttons = document.querySelector(".choices");
const choices = document.querySelectorAll("button");
const score = document.querySelector(".score");
const correctImg = document.querySelector(".correct")
const incorrectImg = document.querySelector('.incorrect')
const gameOverScreen = document.querySelector(".gameover")

//game constants
const nameArray = [];
const picArray = [];


//bank of ricks
class Ricks {
    constructor(name, pic){
        this.name = name,
        this.pic = pic
        nameArray.push(this.name)
        picArray.push(this.pic)
    }
} 

const rickSanchez = new Ricks("Rick Sanchez", "./assets/Rick_Sanchez.png");
const pickleRick = new Ricks("Pickle Rick", "./assets/pickleRick1.png");
const fascistRick = new Ricks("Fascist Rick", "./assets/facistrick.png");
const doofusRick = new Ricks("Doofus Rick", "./assets/Doofus_Rick.png");
const cronenbergRick = new Ricks("Cronenberg Rick", "./assets/cronenberg .png");



//game variables
let num = 25;
let gameIsLive = false;
let currentScore = 0;
let randPic 
let randChoice = Math.floor(Math.random() * 4)
let userChoice = null;
let currentChoice = false
let tempNameArray
let tempPicArray
let interval 




//event handelers

//hides display screen and unhides game screeen
// starts game
const startGame = () =>{
    gameIsLive = true;
    displayScreen.classList.add("hide")
    gameScreen.classList.remove("hide")
    levelUp()
    
}


//functions

//adds pic to the screen && adds the name to a button then removes that name from the name array
//goes through each button and adds a new name and removes that name from the array so its not repeated.
const levelUp = ()=>{
    resetChoices();
    tempNameArray = nameArray.map((x) => x)
    tempPicArray = picArray.map((x) => x)
    randPic = Math.floor(Math.random() * tempPicArray.length)
    currentPic.src = tempPicArray[randPic]
    choices[randChoice].innerHTML = tempNameArray[randPic]
    tempNameArray.splice(randPic, 1)
    tempPicArray.splice(randPic, 1)
    choices.forEach(function(choice){
        let randNum = Math.floor(Math.random() * tempNameArray.length)
        if(choice.innerHTML){
            return
        }else{
            choice.innerHTML = tempNameArray[randNum]
            tempNameArray.splice(randNum, 1)
        }
    })
    unBlurPicture()
}


const unBlurPicture = () =>{ 
        interval = setInterval(() => {
        blurryBlur.classList.remove(blurryBlur.classList[num])
        num = num - 1 
        if (blurryBlur.classList.length === 0 && currentChoice === false){
            clearInterval(interval)
            gameScreen.classList.add("hide")
            gameOverScreen.classList.remove("hide")
            gameIsLive = false;
        } else if(currentChoice === true){
            
        }
    }, 200);
    
}
//
const blurPicture = ()=>{
    for(let i=1; i<25;i++){
        blurryBlur.classList.add(`b${i}`)
    }
        num = 25;
        clearInterval(interval)
}
  

const resetChoices = () =>{
    choices.forEach(function(choice){
        choice.innerHTML = null;
        currentChoice = false;
    })
}



//event listeners
startButton.addEventListener('click', startGame)

buttons.addEventListener('click',(e) =>{
    userChoice = e.target;
        if(userChoice.innerHTML === choices[randChoice].innerHTML){
            currentScore++
            score.innerHTML = `score: ${currentScore}`;
            correctImg.src = "https://media3.giphy.com/media/Qs0QEnugOy0xIsFkpD/giphy.gif?cid=ecf05e47bc384g5m0ghjqua80ag5pfs8zh32r0r2hd5ccs9a&rid=giphy.gif"
            currentChoice = true;
            levelUp()
            blurPicture()
           
            
        }else{
            currentChoice = false;
            correctImg.src = "https://media1.giphy.com/media/JRsLN0zkMeR8ryVN2J/giphy.gif?cid=ecf05e477f27i20b14zsvybv0xq55sksxizz3yatrrcnjdr2&rid=giphy.gif"
        }
   
})