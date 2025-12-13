const characters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R",
  "U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l",
  "m","n","o","p","q","r","t","u","v","w","x","y","z",
  "0","1","2","3","4","5","6","7","8","9",
  "!","@","$","%","^","&","*","(",")","-","_","=","+",
  "[","]","{","}",";",";",":","'","\"","<",">",",",".","?","/"
];

let one = document.getElementById("reso");
let two = document.getElementById("rest");

function generate() {
    let result = "";
    let resulti = "";

    for (let i = 0; i < 15; i++) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }

    for (let j = 0; j < 15; j++) {
        const jindex = Math.floor(Math.random() * characters.length);
        resulti += characters[jindex];
    }

    one.textContent = result;
    two.textContent = resulti;
}
