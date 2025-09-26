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
function main(): void { // this function doesn’t return anything, it just runs the game logic.
    console.log("WELCOME TO THE MULTI ROUND GUESSING GAME")
    let round = 1 // Keeps track of the current round number. Starts from 1.
    const resultsRecord: GameResult[] = [] // Creates an empty list (array) to store results of each round. GameResult[] means this array will contain objects of type GameResult.
    let playagain: string | boolean = true // A variable to control whether the player wants to continue. At first it’s true (so the game runs at least once).Later, it will be updated based on user’s input (Yes/No).
    // let currentTotalScore = 0 //if we dont make the current score and dont use reduce there

    while(playagain) { // A sentinal Loop, As long as playagain = true, the game continues. the increase of round, and the change in result records will be inside the while
        const Userdificulty = selectDificulty() // this is the first thing the game will ask. so it call this func to work first and what the user answer, will store in the variable
        const roundResult = playRound(round, Userdificulty) // now after user select the dif, the game starts by play round func's mathedalogy. since it requires the parameters so we gave it the const which holds results as an argument to it. and it will return in form of object and store in the variable.
        resultsRecord.push(roundResult) // since the result record is as const so we will push it into it. now the round result will go and saved innto the results Record so the list will contain the roundResult Data

        // currentTotalScore += roundResult.score // if we already declared the total score outside the loop and dont use reduce func
        const currentScore = resultsRecord.reduce( (sum, resultsRecordElement) => sum + resultsRecordElement.score, 0) // IN-LINE FUNC: have one parameter as sum containing its first value as 0 and the second para will be the list's ele [ , , , ] and the iteration through the elements of list will containue till the last element of the list. since this is the reduce fun's method. REDUCE FUNC: conntain 2 parameters, one as calc and second as a variable where the values after calculation will be saved. so we gave it its initial value 0 to store in it so that if the result record only contain one score so that will remain the same as zero add in it. but if the result record have more than one scores in it so the first score will be add in zero and save in the sum variabl (changing from 0 -> first score) then the iteration through the list continues and the 2nd score will be as the ele and sum have the first score and both will be add so 2 scores get summed and store in the total score.EXAMPLE OF CALC: the inline func's calc after => is to add sum containing value with the resultRecord list containing 'score' in it, so it will add 0 + 10, 10 + 10 etc 
        console.log(`current score: ${currentScore}`)

        playagain = readline.keyInYN("\ndo you want to play again? ") // since the keyInYN will give ans in true or false so if the user pick Y the ans will be true and stored in the playagain variable
        round++ // thhe round variable that already have value 1, will be ++ 1->2 but when the sentinal loop go and check the playagain variable's value so if it becomes false, the loop ended and the program comes outside the while block and the increased round remain in the loop but vanished as, and the outside the while where the round variable is created and have the fixed value will still stored as 1.

    }//Loop/Round EEnded

    console.log("\nGame Summary: ")
    resultsRecord.forEach((res)=>{console.log(`Round ${res.round} | Difficulty ${res.dificulty} | ${res.success ? "Win": "Lose"} | Attempts : ${res.atemptUsed} | Score : ${res.score}`)}) // since the for each loop will go on each element of the list and prinft it but as each element of the list is also an object so we uses ${} to take the obbject's element to print in our console , so the 1st elemt of the list (obbj) will print its elemt in form that we gave it in our console, when the all elements we take to print by res.round res.score etc and it completes every elemets that we make it print, it will move to the second eeemt and to the same as res is the elemt but we used res. to take the elemts's element
    //     comment this out: if we already declared the total score outside the loop so we can use it as it is and only print.
    const totalScore = resultsRecord.reduce((sum,r)=> sum + r.score, 0) // Since the current score is holding the total of every score the results record have or will have, and to shhow the user every time when he lose or win and we tell him if he wants to play agaiin. but the total score at the end will again cal (duw to, not using the current score is that, it is inside the looop ) similarly as current score and will only show once when we said No to play again and we get our full summary of the game will the total scores
    console.log(`Your Score for all the rounds: ${totalScore}`)
    console.log("\nThank You for Playing") 

}

main()