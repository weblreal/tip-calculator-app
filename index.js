const inputBill = document.getElementById("input-bill")
const percentage1 = 0.05
const valueTip = document.getElementById("value-id")
const inputNumberOfPeople = document.getElementById("input-number-of-people")

function calculate() {
    const percentage = inputBill.value * percentage1 / inputNumberOfPeople.value
    console.log(percentage)
}