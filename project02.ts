import * as readline from "readline-sync"

//making deficulty level values to store in there variable.
enum DificultyLevel { //enumeration: It’s a way to group related values together and give them easy names.Think of it like a list of choices you want to use in your program.
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
} 


//making difLevelConfig object that will manage by giving each level its related way in the game, like which dif has how much attempts, and it has a min and max no in between computer will pick a number
// since this will have this all ways as data type and the data type will made by gnerics and named as record
const difLevelConfig: Record<DificultyLevel, {min: number, max: number, atempts: number}> = { //since the difLevelConfig is managing the dificulty options and the record will have the things that this object will contain to manage the game according to the each option as choices
    [DificultyLevel.Easy] : { //sinc now working on easy opton by making another object for easy, and now making how the game will manage if easy will be selected
        min: 1,
        max: 10,
        atempts: 7
    },
    [DificultyLevel.Medium] : {
        min: 1,
        max: 50,
        atempts: 5
    },
    [DificultyLevel.Hard] : {
        min: 1,
        max: 100,
        atempts: 3
    }
} 


// giving dificulties options to chooose
function selectDificulty(): DificultyLevel {
    const options = Object.values(DificultyLevel) //taking and storing the values of the keys from the enum object. Object.values(DificultyLevel) will give: ["Easy", "Medium", "Hard"] This is stored in the variable options.
    const index = readline.keyInSelect(options, "Choose your dificulty level: ", {cancel: false}) //readline.keyInSelect(...) shows the options as a small menu in the console.Example: hoose your dificulty level: [1] Easy [2] Medium [3] Hard

    return options[index] as DificultyLevel //as DificultyLevel tells TypeScript: “This string is definitely one of the enum values (Easy, Medium, Hard).”
}


// the game point where it will pick number and user guess it
function getRandomNumber (min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1)+min) //the value in form that it will return will be as nearest integer when it is in point form, and when it pick a number like 0.5 it willdo the cal according to the dif level min and max number and then it will multiply by it so we will get the number from the min to max of that dif level not from 0.0-1, acctuly it is a formula to have this range that we want,
}


///now for playing the game as pper the round number
function playRound(round: number, dificulty: DificultyLevel): GameResult { //this function will have the round number that it will record and on which dif the round is on. so the dif parameter will have the type as the enum func that have the options and the function will have the gameresult as type to return in those thing as what that object contain.
    const {min, max, atempts} = difLevelConfig[dificulty]; //since why we donot declare constant all together in enum? bcz these const only have to work within the funnct. and each const will have there respective valye so we will asign them together. the difLevelConfig[dificulty] the difLvelConfig contains lists so we gave it a list type thenwe are deciding which list it will get from the func, so we gave it the dificulty parameter. it will work as when the parameter gets the dif by the enum func it eill give it to the config function and the list acc to that dif will get the values of each const and give every value to there resp const.
    //now picking the number afterselecting the dif level
    const randomnum = getRandomNumber(min, max) //taking the values by the const that have values by the dif config func
    let remainAttempts = atempts //this will work with the attempt the remains to guess
    //games started here
    console.log(`\nRound: ${round} - Dificulty ${dificulty}`)
    console.log(`\ni have choosen a number between ${min} to ${max} | You have ${atempts} atempts | GOOD LUCK!`)

    //playing the game till the attempts finished,
    while(remainAttempts>0) { //sentinal typpe of loop, continue till it become false
        const guess = parseInt(readline.question(`\nEnter your guess: `))

        if (guess === randomnum) { //checking if guess is same, low or high
            console.log("\n**CONGRATULATION** YOU WON THIS ROUND!")
            return {
                round,
                dificulty,
                atemptUsed : atempts - remainAttempts + 1,
                success : true,
                score : 10
            }
        } else if (guess>randomnum) {
            console.log("number is too high")
        } else {console.log("number is too low")}

        remainAttempts -- //minus the attempt before going to the next round
    }

    console.log("\nOUT OF ATEMPTS.")

    return {
        round, //parameter
        dificulty, //parameter
        atemptUsed: atempts, //this function's const 
        success: false, //the GameResult's property so it must return with value
        score: 0 //the GameResult's property so it must return with value
    }
}


//now making blue print, so we will get to knoe how many rounds we took, on which dif we had played etc as a End result
interface GameResult {
    round : number,
    dificulty : DificultyLevel,
    atemptUsed : number,
    success : boolean,
    score : number
}

//will understand
function main(): void {
    console.log("WELCOME TO THE MULTI ROUND GUESSING GAME")
    let round = 1
    const results: GameResult[] = []
    let playagain: string | boolean = true

    while(playagain) {
        const dificulty = selectDificulty()
        const result = playRound(round, dificulty)
        results.push(result)
        const totalscore = results.reduce((sum, r) => sum+r.score, 0) 
        console.log(`current score: ${totalscore}`)

        playagain = readline.keyInYN("\ndo you want to play again? ")
        round++
    }

    console.log("\nGame Summary: ")
    results.forEach((res)=>{console.log(`Round ${res.round} | Difficulty ${res.dificulty} | ${res.success ? "Win": "Lose"} | Attempts : ${res.atemptUsed} | Score : ${res.score}`)})
    const finalScore = results.reduce((sum,r)=> sum + r.score, 0)
    console.log(`Final Score for all the rounds: ${finalScore}`)
    console.log("\nThank You for Playing") 

}

main()