'strict mode';

const inputBill = document.querySelector('.input-bill');
const allInput = document.querySelectorAll('.input');
const customPercent = document.querySelector('.input-custom');
const numberOfPeople = document.querySelector('.input-number-of-people');
const valueTotal = document.querySelector('.value-total');
const valueTip = document.querySelector('.value-tip');
const percentages = document.querySelectorAll('.percentage');
const resetBtn = document.querySelector('.reset-btn');
const promptText = document.querySelectorAll('.prompt-text');

let activeValue, customValue;

const init = function () {
  // activeValue = customValue = 0;
  valueTip.textContent = valueTotal.textContent = '$0.00';
  inputBill.value = numberOfPeople.value = customPercent.value = '';
  hideMessage();
  btnReset();
  removePrompt();
};

// Helper function
const hideMessage = () => promptText.forEach(el => el.classList.add('hidden'));

const removePrompt = function () {
  allInput.forEach(el => el.classList.remove('prompt'));
};

const numberFormat = function (num) {
  return new Intl.NumberFormat('en-US').format(num);
};

const btnReset = () =>
  percentages.forEach(btn => btn.classList.remove('active'));

const calcTip = function (tip) {
  const tipPerPerson = Math.floor(
    Number((inputBill.value * tip) / numberOfPeople.value)
  );
  if (!tipPerPerson) return;
  const totalTip = tipPerPerson * numberOfPeople.value;
  valueTotal.textContent = `$${numberFormat(totalTip)}.00`;
  valueTip.textContent = `$${numberFormat(tipPerPerson)}.00`;
};

// Buttons
percentages.forEach(function (per) {
  per.addEventListener('click', function (e) {
    customPercent.value = '';
    btnReset();
    removePrompt();
    hideMessage();

    e.target.classList.toggle('active');
    activeValue = Number(per.value);

    if (!inputBill.value || !numberOfPeople.value) return;
    calcTip(Number(this.value));
  });
});

// custom input
// IMPLEMENT button switch active
customPercent.addEventListener('input', function (e) {
  console.log(e);
  btnReset();
  customValue = this.value / 100;
});

// all input
allInput.forEach(inp => {
  // hit enter to calculate
  inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      activeValue ? calcTip(activeValue) : calcTip(customValue);
    }
  });
  // trigger prompt if value <= 0
  inp.addEventListener('input', function (e) {
    if (this.value <= 0) {
      this.value = '';
      inp.classList.add('prompt');
      e.srcElement.nextElementSibling.classList.remove('hidden');
    }
    if (this.value || e.data === null) {
      removePrompt();
      e.srcElement.nextElementSibling.classList.add('hidden');
    }
  });
});

// reset btn
resetBtn.addEventListener('click', init);

window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && inputBill.value && numberOfPeople.value)
    activeValue ? calcTip(activeValue) : calcTip(customValue);

  if (e.key === 'Escape') init();
});
