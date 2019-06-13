let resultValue='0';
let expressionValue="";
let lastOperation="";
let operatorEntered=false;
let equalsEntered=false;
let minusEntered=false;
let buttons=document.querySelector(".buttons");
buttons.addEventListener('click', buttonPress);
updateResult();
updateExpression();
function buttonPress(e){
  const {target} = e;
  //exit if anything other than a button is clicked
  if (!target.matches('button')){
    return;
  }
  //conditions to handle various input cases. these point to functions further down the code.
  if(target.classList.contains('number')){
    inputDigit(target.textContent);
    operatorEntered=false;
    minusEntered=false;
    updateResult();
    updateExpression();
    return;
  }
  if(target.classList.contains('point')){
    if(resultValue.includes('.')===false || operatorEntered===true){
      inputPoint(target.textContent);
      updateResult();
      updateExpression();
      return;
    }
  }
  if(target.classList.contains('clear')){
    inputClear();
    updateResult();
    updateExpression();
    return;
  }
  if(target.classList.contains('operator')){
    //separate set of conditions for minus to be entered both for subtraction and for negative number entry
    if(target.classList.contains('minus')){
      //if an operator other than minus has been entered(resultValue resets to 0), or if the screen is blank and a minus is entered, it is treated as the sign of a negative number
      if(resultValue==='0' && minusEntered===false){
        inputMinus(target.value);
        updateResult();
        updateExpression();
        return;
       }
      //conditios to treat minus as an operator
      else
       {
         //if an operator has already been entered, or the expression is empty, exit.
        if(expressionValue==="" || operatorEntered===true)
        {
          return;
        }
        //treats minus like an operator and updates the expression but not the number being typed
        else
        {
          inputOperator(target.value);
          updateExpression();
          minusEntered=true;
          return;
        }
       }
      }
    //if the operator is not a minus sign
    else{
      if(expressionValue==="" || operatorEntered===true)
      {
        return;
      }
      else
      {
        inputOperator(target.value);
        updateExpression();
        minusEntered=false;
        return;
      }
    }
  }
  //runs function inputEquals, which calculates the result of the expression.
  if(target.classList.contains('equals')){
    inputEquals();
    updateResult();
    return;
  }
}
//function to update current number being typed. this area also displays the result when equals is pressed.
function updateResult() {
  const result = document.querySelector(".result")
  result.textContent = resultValue;
}
//function to update the expression being typed. all operators will be displayed here.
function updateExpression(){
  const expression = document.querySelector(".expression");
  expression.textContent = expressionValue.replace("/","÷").replace("*","×");
}
//function to handle digit input
function inputDigit(input) {
  //clears display if a digit is entered immediately after an expression is evaluated by pressing the equals button.
  if(equalsEntered===true)
  {
    inputClear();
    equalsEntered=false;
    lastOperation="";
  }
  if(operatorEntered===true){
    resultValue=input;
    expressionValue+=input;
    lastOperation+=input;
  }
  else{
    resultValue=resultValue === '0' ? input : resultValue + input;
    expressionValue=expressionValue === "" ? input : expressionValue + input;
    lastOperation=resultValue === '0' ? "":lastOperation + input;
  }
}
//function to handle operator input
function inputOperator(input){
  if(equalsEntered=true)
  {
    equalsEntered=false;
    lastOperation="";
  }
  operatorEntered=true;
  expressionValue+=input;
  resultValue='0';
  lastOperation+=input;
}
//function to handle minus input(if it is to be used as a negative sign)
function inputMinus(input){
  if(operatorEntered===true){
    resultValue=input;
    expressionValue+=input;
    lastOperation+=input;
  }
  else{
    resultValue=resultValue=== '0' ? input : resultValue + input;
    expressionValue+=input;
  }
}
//function to handle decimal point input
function inputPoint(input){
  //clears display if a point is entered right after a calculation is evaluated by pressing equals.
  if(equalsEntered===true)
  {
    inputClear();
    equalsEntered=false;
    lastOperation="";
  }
  if(operatorEntered===true){
    resultValue=input;
    expressionValue+=input;
    lastOperation+=input;
    operatorEntered=false;
  }
  else{
    resultValue+=input;
    expressionValue+=input;
  }
}
//function to clear the screen when the AC button is pressed.
function inputClear(){
  resultValue='0';
  expressionValue="";
}
//function to evaluate the expression when equals is pressed. also repeats the last performed operation when pressed repeaetedly.
function inputEquals(){
  if(equalsEntered===false)
  {
  console.log(lastOperation);
  resultValue=Math.round(eval(expressionValue)*(10**6))/(10**6).toString();
  expressionValue=resultValue;
  }
  if(equalsEntered===true)
  {
    resultValue=Math.round(eval(expressionValue+lastOperation)*(10**6))/(10**6).toString();
    expressionValue=resultValue;
  }
  equalsEntered=true;
}
//end of calculator. probably more complicated than it needs to be, but hey it works :D
