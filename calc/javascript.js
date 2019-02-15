/* Amaair Javaid, ajavaid@ucalgary.ca 
 SENG 513 assignment 2, B02 */

document.addEventListener('DOMContentLoaded', function(){
  const calc = document.querySelector('.calc');
  const keys = calc.querySelector('.keys');
  const disp = calc.querySelector('.disp');
  const histDisp = calc.querySelector('.histDisp');

  var prevAction = "none";

  keys.addEventListener('click', e => {

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const dispContent = disp.textContent;

    if (!action) {
      console.log('number key');
      if (dispContent === '0') {
        disp.textContent = keyContent;
      } else {
        disp.textContent = dispContent + keyContent;
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if (action == prevAction){
        // do nothing
      }
      else if (
        action == 'subtract' &&
        prevAction != 'subtract'
      ){
        disp.textContent = dispContent + keyContent;
      }
      else if(
          prevAction === 'add' ||
          prevAction === 'subtract' ||
          prevAction === 'multiply' ||
          prevAction === 'divide'
      ) {
        disp.textContent = dispContent.slice(0, -1) + keyContent;
      }
      else {
        disp.textContent = dispContent + keyContent;
      }
    }

    if (action === 'del') {
      if (dispContent.length != 1){
        disp.textContent = dispContent.slice(0, -1);
      }
      else {
        disp.textContent = '0';
      }
    }

    if (action === 'clear') {
      if (dispContent === '0'){
        histDisp.textContent = "";
      }
      disp.textContent = '0';
    }

    if (action === 'decimal' && !dispContent.includes('.')) {
      console.log('decimal key!');
      disp.textContent = dispContent + '.';
    }

    if (action === 'calculate') {
      try {
        disp.textContent = eval(dispContent);
        histDisp.textContent = dispContent;
      }
      catch(err) {
        histDisp.textContent = "SYNTAX ERROR!";
      }
    }

    if (action === '(') {
      if (prevAction != '(') {
        disp.textContent = dispContent + '(';
      }
    }

    if (action === ')') {
      if (prevAction != ')') {
        disp.textContent = dispContent + ')';
      }
    }

    prevAction = action;
  })

})
