let resultValue='0';
let expressionValue="";
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
  if(target.classList.contains('number')){
    inputDigit(target.textContent);
    operatorEntered=false;
    minusEntered=false;
    updateResult();
    updateExpression();
    return;
  }
  if(target.classList.contains('point')){
    if(resultValue.includes('.')==false || operatorEntered==true){
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
    if(target.classList.contains('minus')){
      if(resultValue==='0' && minusEntered===false){
        inputMinus(target.textContent);
        updateResult();
        updateExpression();
        return;
      }
      else
      {
        console.log(operatorEntered);
        if(expressionValue==="" || operatorEntered===true)
        {
          return;
        }
        else
        {
          inputOperator(target.textContent);
          updateExpression();
          minusEntered=true;
          return;
        }
      }
    }
    else{
      if(expressionValue==="" || operatorEntered===true)
      {
        return;
      }
      else
      {
        inputOperator(target.textContent);
        updateExpression();
        minusEntered=false;
        return;
      }
    }
  }
  if(target.classList.contains('equals')){
    inputEquals();
    updateResult();
    return;
  }
}
//functions to update display
function updateResult() {
  const result = document.querySelector(".result")
  result.textContent = resultValue;
}
function updateExpression(){
  const expression = document.querySelector(".expression");
  expression.textContent = expressionValue;
}
//functions to handle various inputs
function inputDigit(input) {
  if(operatorEntered==true){
    resultValue=input;
    expressionValue+=input;
  }
  else{
    resultValue=resultValue === '0' ? input : resultValue + input;
    expressionValue=expressionValue === "" ? input : expressionValue + input;
  }
}
function inputOperator(input){
  console.log('inputOperator executed');
  operatorEntered=true;
  expressionValue+=input;
  resultValue='0';
  console.log(operatorEntered);
}
function inputMinus(input){
  console.log('inputMinus executed');
  if(operatorEntered==true){
    resultValue=input;
    expressionValue+=input;
  }
  else{
    resultValue=resultValue=== '0' ? input : resultValue + input;
    expressionValue+=input;
  }
}
function inputPoint(input){
  if(operatorEntered==true){
    resultValue=input;
    expressionValue+=input;
    operatorEntered=false;
  }
  else{
    resultValue=resultValue=== '0' ? input : resultValue + input;
    expressionValue+=input;
  }
}
function inputClear(){
  resultValue='0';
  expressionValue="";
}
function inputEquals(){
  if(equalsEntered===false)
  {
  resultValue=eval(expressionValue);
  expressionValue=resultValue;
  }
}
