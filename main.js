const readlineSync = require("readline-sync");

function calcScore(a, b) {
    let output = {
        correctPos: 0,
        incorrectPos: 0,
    };

    let visited = new Array(2)
        .fill(false)
        .map((el) => new Array(a.length).fill(false));

    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i]) {
            output.correctPos++;
            visited[0][i] = true;
            visited[1][i] = true;
        }
    }

    for (let i = 0; i < b.length; i++) {
        const idx = a.indexOf(b[i]);
        if (idx !== -1 && !visited[0][idx] && !visited[1][i]) {
            output.incorrectPos++;
            visited[1][i] = true;
            visited[0][idx] = true;
        }
    }

    return output;
}

function mastermind() {
    let code = new Array(4).fill(0).map((el) => Math.floor(Math.random() * 5) + 1);
    // console.log(code)
    
    console.log("M A S T E R M I N D");
    let count = 1;
    let win = false;
    while (count <= 10) {
        let answer = readlineSync.question(
            count + ") Guess the 4-digit code: ",
            {
                limit: [
                    "quit",
                    /^[1-5][1-5][1-5][1-5]$/,
                ],
                limitMessage:
                    'Enter 4-digit code in the range 1-5 or "quit" to exit',
            }
        );
        if (answer.toLowerCase() === "quit") break;
        if (answer === code.join("")) {
            win = true;
            break;
        }
        let ansArr = answer.split("").map((el) => parseInt(el));
        let score = calcScore(code, ansArr);
        console.log(
            `${score.correctPos} matching digit(s) in the correct position`
        );
        console.log(
            `${score.incorrectPos} matching digit(s) in the incorrect position`, "\n"
        );
        count++;
    }

    if (win) {
        console.log("\n\n----------YOU WIN----------");
        console.log("C O N G R A T U L A T I O N S")
    } else {
        console.log(`\n\nYou lost. The correct code is ${code.join("")}`);
    }
}

mastermind();
