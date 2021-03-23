
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
const over = document.querySelector(".again")
const winScreen = document.querySelector(".winner")
const playAgain = document.querySelector(".playagain")

//game constants
const nameArray = [];
const picArray = [];
const decoyNames = ["Past Rick", "Cop Rick", "Replacement Rick", "Insurance Rick", "Sales Rick", "Supervisor Rick", "Cool Rick", "Cowboy rick", "Tiny Rick", "Teacher Rick"]


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
let randChoice 
let userChoice = null;
let currentChoice = false;
let tempNameArray
let tempPicArray
let interval 




//event handelers

//hides display screen and unhides game screeen
// starts game
const startGame = () =>{
    currentScore = 0;
    gameIsLive = true;
    displayScreen.classList.add("hide")
    gameScreen.classList.remove("hide")
    gameOverScreen.classList.add("hide")
    levelUp()

    
}


//functions

//adds pic to the screen && adds the name to a button then removes that name && pic from their arrays
// creates a copy of decoy names..goes through each button and adds a decoy name then removes that name from the copied array so its not repeated.
const levelUp = ()=>{
    checkForWin();
    resetChoices();
    currentChoice = false;
    let tempDecoyNames = decoyNames.map((x) => x)
    randPic = Math.floor(Math.random() * picArray.length)
    randChoice = Math.floor(Math.random() * 4)
    currentPic.src = picArray[randPic]
    choices[randChoice].innerHTML = nameArray[randPic]
    nameArray.splice(randPic, 1)
    picArray.splice(randPic, 1)
    choices.forEach(function(choice){
        let randNum = Math.floor(Math.random() * tempDecoyNames.length)
        if(choice.innerHTML){
            return
        }else{
            choice.innerHTML = tempDecoyNames[randNum]
            tempDecoyNames.splice(randNum, 1)
        }
    })
    unBlurPicture()
    
}

//removes blur from picture 
//if blur is fully removed before correct guess is made, displays gameover screen
//if correct guess is made, does nothing.
const unBlurPicture = () =>{ 
    
        interval = setInterval(() => {
        blurryBlur.classList.remove(blurryBlur.classList[num])
        num = num - 1 
        if (blurryBlur.classList.length === 0 && currentChoice === false){
            gameScreen.classList.add("hide")
            gameOverScreen.classList.remove("hide")
            clearInterval(interval)
            gameIsLive = false;
            
        } else if(blurryBlur.classList.length === 0 && currentChoice === true){
            clearInterval(interval)
        }
    }, 200);
    
}
//resets the blur && clears interval
const blurPicture = ()=>{
    for(let i=1; i<25;i++){
        blurryBlur.classList.add(`b${i}`)
    }
        num = 25;
        clearInterval(interval)
        gameIsLive = false;
}
  //resets choices to nothing so they will chance each time
const resetChoices = () =>{
    choices.forEach(function(choice){
        choice.innerHTML = null;
        
    })
}

const checkForWin = () =>{
    if(currentScore === 5){
        score.innerHTML = "Wubba Lubba Dub Dub !!!";
        blurPicture()
    }
}



//event listeners
startButton.addEventListener('click', () =>{
    currentChoice = false;
    gameIsLive = true;
    blurPicture()
    startGame()
})
//if correct answer is clicked, correct gif shows, score increases by 1, goes to next level and blurs picture 
buttons.addEventListener('click',(e) =>{
    userChoice = e.target;
        if(userChoice.innerHTML === choices[randChoice].innerHTML){
            gameIsLive = true;
            currentScore++
            score.innerHTML = `score: ${currentScore}`;
            correctImg.src = "https://media3.giphy.com/media/Qs0QEnugOy0xIsFkpD/giphy.gif?cid=ecf05e47bc384g5m0ghjqua80ag5pfs8zh32r0r2hd5ccs9a&rid=giphy.gif"
            levelUp()
            blurPicture()
            
            
        }else{
            currentChoice = false;
            correctImg.src = "https://media1.giphy.com/media/JRsLN0zkMeR8ryVN2J/giphy.gif?cid=ecf05e477f27i20b14zsvybv0xq55sksxizz3yatrrcnjdr2&rid=giphy.gif"
        }
})

over.addEventListener('click', () =>{
    blurPicture()
    gameOverScreen.classList.add("hide")
    displayScreen.classList.add("hide")
    gameScreen.classList.remove('hide')
    correctImg.src = ""
    currentScore = 0;
    score.innerHTML = `score: ${currentScore}`;
    currentChoice = true;
    gameIsLive = false;
})

// playAgain.addEventListener('click', () =>{
//     blurPicture();
//     winScreen.classList.add("hide")
//     displayScreen.classList.add('hide')
//     gameScreen.classList.remove('.hide')
//     currentScore = 0
//     gameIsLive = false;
// })