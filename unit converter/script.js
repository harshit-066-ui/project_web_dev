const numA = document.getElementById("len")
const numB = document.getElementById("vol")
const numC = document.getElementById("mas")
const x = document.getElementById("num")
function convert() {
    const value = Number(x.value)
    const round3 = num => Math.round(num * 1000) / 1000
    let resA = round3(value*3.281)
    let resA2 = round3(value*0.304)
    let resB = round3(value*0.264)
    let resB2 = round3(value*3.78)
    let resC = round3(value*2.204)
    let resC2 = round3(value*0.453)
    numA.innerHTML = value +" meters = "+ resA + " feet | " + value  +" feet = " + resA2 + " meters"
    numB.innerHTML = value +" liters = "+ resB + " gallons | " + value  +" gallons = " + resB2 + " liters"
    numC.innerHTML = value +" kilos = "+ resC + " pound | " + value  +" pound = " + resC2 + " kilos"
}