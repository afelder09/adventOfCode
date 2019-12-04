const inputHigh = 562041;
const inputLow = 108457;

const convertNumberToCharArray = (number: number): number[] => {
    return number.toString().split('').map((char) => parseInt(char));
}

const checkTwoDigitsAreTheSame = (number: number): boolean => {
    let result = false;
    const charArray = convertNumberToCharArray(number);
    for(let i = 0; i < charArray.length - 1; i++) {
        if(charArray[i] === charArray[i+1]) {
            const totalRepeating = charArray.filter((char) => char === charArray[i])
            if(totalRepeating.length===2) {
                result = true;
            }
        }
    }
    return result;
}

const checkAcendingNumber = (number: number): boolean => {
    let result = true;
    const charArray = convertNumberToCharArray(number);
    for(let i = 0; i < charArray.length - 1; i++) {
        if(charArray[i] > charArray[i+1]) {
            result = false;
        }
    }
    return result;
}


let found: boolean = false;

let passwords: number[] = [];

for(let answer = inputLow; answer <= inputHigh; answer++ ) {
    if(answer <= inputHigh) {
        if(checkTwoDigitsAreTheSame(answer)) {
            if(checkAcendingNumber(answer)) {
                passwords.push(answer)
            }
        }
    }
}

console.log(passwords.length)