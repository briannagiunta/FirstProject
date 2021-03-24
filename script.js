
//HTML elements
const startButton = document.querySelector('.start');
const blurryBlur = document.querySelector("#blurbox");
const displayScreen = document.querySelector(".display-screen");
const gameScreen = document.querySelector(".game-screen");
const currentPic = document.querySelector("#pic");
const buttons = document.querySelector(".choices");
const choices = document.querySelectorAll("button");
const score = document.querySelector("#score");
const correctImg = document.querySelector(".correct")
const incorrectImg = document.querySelector('.incorrect')
const gameOverScreen = document.querySelector(".gameover")
const over = document.querySelector(".again")
const winButton = document.querySelector(".winner")
const playAgain = document.querySelector(".playagain")
const timer = document.querySelector("#time")
const showMe = document.querySelector("#showme")
const themeSong = document.querySelector("#theme")


//game constants
const nameArray = [];
const picArray = [];
const decoyNames = ["Past Rick", "Cop Rick", "Replacement Rick", "Insurance Rick", "Sales Rick", "Supervisor Rick", "Cool Rick", "Cowboy rick", "Business Rick", "Teacher Rick", "Evil Rick", "Future Rick"]


//bank of ricks
class Ricks {
    constructor(name, pic){
        this.name = name,
        this.pic = pic,
        nameArray.push(this.name),
        picArray.push(this.pic)
    }
} 

const rickSanchez = new Ricks("Rick C-137", "./assets/Rick_Sanchez.png");
const pickleRick = new Ricks("Pickle Rick", "./assets/pickleRick1.png");
const fascistRick = new Ricks("Fascist Rick", "./assets/facistrick.png");
const doofusRick = new Ricks("Doofus Rick", "./assets/Doofus_Rick.png");
const cronenbergRick = new Ricks("Cronenberg Rick", "./assets/cronenberg .png");
const shrimpRick = new Ricks("Shrimp Rick", "./assets/shrimpRick-removebg-preview.png");
const tinyRick = new Ricks("Tiny Rick", "./assets/tinyRick-removebg-preview.png");
const toxicRick = new Ricks("Toxic Rick", "./assets/toxicrick.png");
const scientistRick = new Ricks("The Scientist Formally Known as Rick", "./assets/Scientist_Known_As_Rick_Sprite.PNG.png")
const rickDSanchez = new Ricks("Rick D Sanchez |||", "./assets/rickDsanchez3-removebg-preview.png")


//game variables
let num = 25;
let currentScore = 0;
let randPic 
let randChoice 
let userChoice = null;
let currentChoice = false;
let tempNameArray
let tempPicArray
let blurInterval 
let timeInterval
let time = 5


window.onload=()=>{
    themeSong.play();
}

//event handelers

//hides display screen and unhides game screeen
// starts game
const startGame = () =>{
    currentScore = 0;
    displayScreen.classList.add("hide")
    gameScreen.classList.remove("hide")
    gameOverScreen.classList.add("hide")
    timer.classList.remove("hide")
    resetArrays();
    themeSong.pause()
    showMe.play()
    setTimeout(() =>{
        levelUp()
        themeSong.play()
    },2000)
}


//functions

//adds pic to the screen && adds the name to a button then removes that name && pic from their arrays
// creates a copy of decoy names..goes through each button and adds a decoy name then removes that name from the copied array so its not repeated.
const levelUp = ()=>{
    resetChoices();
    unBlurPicture()
    currentChoice = false;
    let tempDecoyNames = decoyNames.map((x) => x)
    currentRound = Math.floor(Math.random() * tempPicArray.length)
    randChoice = Math.floor(Math.random() * 4)
    currentPic.src = tempPicArray[currentRound]
    choices[randChoice].innerHTML = tempNameArray[currentRound]
    tempNameArray.splice(currentRound, 1)
    tempPicArray.splice(currentRound, 1)
    choices.forEach(function(choice){
        let randNum = Math.floor(Math.random() * tempDecoyNames.length)
        if(choice.innerHTML){
            return
        }else{
            choice.innerHTML = tempDecoyNames[randNum]
            tempDecoyNames.splice(randNum, 1)
        }
    })
    
    
}

// removes blur from picture 
// if blur is fully removed before correct guess is made, displays gameover screen
// if correct guess is made, does nothing.
// changes timer to count down 5 seconds
const unBlurPicture = () =>{ 
        blurInterval = setInterval(() => {
        blurryBlur.classList.remove(blurryBlur.classList[num])
        num = num - 1 
        if (blurryBlur.classList.length === 0 && currentChoice === false){
            gameScreen.classList.add("hide")
            gameOverScreen.classList.remove("hide")
            clearInterval(blurInterval)
            
        } else{
            return
        }
    }, 200);
        timeInterval = setInterval(() =>{
            time--
            timer.innerHTML = `Timer: ${time}`
        },1000)
    }

    //resets the blur && clears interval
    const blurPicture = ()=>{
        for(let i=1; i<25;i++){
            blurryBlur.classList.add(`b${i}`)
        }
        num = 25;
        clearInterval(blurInterval)
        clearInterval(timeInterval)
        time= 5
        timer.innerHTML = "Timer: 5"
}
  //resets choices to nothing so they will chance each time
const resetChoices = () =>{
    choices.forEach(function(choice){
        choice.innerHTML = null;  
    })
}
//resets arrays for start over buttons
const resetArrays = () =>{
    tempNameArray = nameArray.map((x) => x)
    tempPicArray = picArray.map((x) => x)
}

const checkForWin = () =>{
    if(currentScore === 10){
        score.innerHTML = "We did it Morty! -burps- Alright, Im gonna go take a s#!t.";
        blurPicture()
        winButton.classList.remove("hide")
        timer.classList.add("hide")
        choices.forEach(function(choice){
            choice.innerHTML = "Wubba Lubba Dub Dub!"
        })
    } else{
        return
    }
}



//event listeners
startButton.addEventListener('click', () =>{
    currentScore = 0
    currentChoice = false;
    // blurPicture()
    startGame()
})
//if correct answer is clicked, correct gif shows, score increases by 1, goes to next level and blurs picture 
buttons.addEventListener('click',(e) =>{
    userChoice = e.target;
    if(userChoice.innerHTML === choices[randChoice].innerHTML){
        currentScore++
        score.innerHTML = `score: ${currentScore}`;
        correctImg.src = "https://media3.giphy.com/media/Qs0QEnugOy0xIsFkpD/giphy.gif?cid=ecf05e47bc384g5m0ghjqua80ag5pfs8zh32r0r2hd5ccs9a&rid=giphy.gif"
        blurPicture()
        levelUp()
    }else{
        currentChoice = false;
        correctImg.src = "https://media1.giphy.com/media/JRsLN0zkMeR8ryVN2J/giphy.gif?cid=ecf05e477f27i20b14zsvybv0xq55sksxizz3yatrrcnjdr2&rid=giphy.gif"
    }
    checkForWin();
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
    startGame();
    winButton.classList.add("hide")
})

winButton.addEventListener('click', () =>{
    blurPicture()
    gameOverScreen.classList.add("hide")
    displayScreen.classList.add("hide")
    gameScreen.classList.remove('hide')
    correctImg.src = ""
    currentScore = 0;
    score.innerHTML = `score: ${currentScore}`;
    currentChoice = true;
    startGame();
    winButton.classList.add("hide")
})

