const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  if (operator === '+') {
    result = Number(n1) + Number(n2);
  }
  if (operator === '-') {
    result = Number(n1) - Number(n2);
  }
  if (operator === '*') {
    result = Number(n1) * Number(n2);
  }
  if (operator === '/') {
    result = Number(n1) / Number(n2);
  }
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  return String(result);
}

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      if (firstOperend.textContent !== '0') {
        secondOperend.textContent = buttonContent;
      } else {
        firstOperend.textContent = buttonContent;
      }
      // console.log('숫자 ' + buttonContent + ' 버튼');
    }

    if (action === 'operator') {
      operator.textContent = buttonContent;
      // console.log('연산자 ' + buttonContent + ' 버튼');
    }

    if (action === 'decimal') {
      // console.log('소수점 버튼');
    }

    if (action === 'clear') {
      firstOperend.textContent = '0';
      operator.textContent = '+';
      secondOperend.textContent = '0';
      calculatedResult.textContent = '0';
      // console.log('초기화 버튼');
    }

    if (action === 'calculate') {
      calculatedResult.textContent = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent);
      // console.log('계산 버튼');
    }
  }
});


// ! Advanced Challenges, Nightmare를 위한 코드입니다. 도전하신다면 주석을 해제하세요.
const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  const buttonContainerArray = buttons.children;
  // ! 위 코드는 수정하지 마세요.

  if (target.matches('button')) {
    for (let i = 0; i < buttonContainerArray.length; i++) {
      const childrenArray = buttonContainerArray[i].children;
      for (let j = 0; j < childrenArray.length; j++) {
        childrenArray[j].classList.remove('isPressed');
      }
    }

    if (action === 'number') {
      if (display.textContent === '0' || previousKey === 'operator' || previousKey === 'calculate') {
        display.textContent = buttonContent; //지금 누른 버튼을 화면에 보이게 한다.
      } else {//0도 아니고 이전키가 연산자가 이니고, 이전키가 enter가 아니면
        display.textContent = display.textContent + buttonContent; //좀 전 키에 지금 누른키를 더해 화면에 나타나게 한다.
      }
      previousKey = 'number'; //직전키에 action 넘버를 할당. 
    }

    if (action === 'operator') { //클릭된 HTML 엘리먼트의 클래스 네임이 'operator'일때 분기
      //.button__row > .isPressed { (css에 있는 코드)
      // background-color: #00da75;
      // }
      target.classList.add('isPressed'); //isPressed 클래스를 추가하자.      
      //왜? 마우스로 연산자 클릭하면 버튼 색상이 바뀌도록 css스타일을 적용함
      
      //첫번째 숫자 & 누른 연산자 & action 연산자가 아니고? & 이전키가 enter가 아니면 
      if (firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate') {
        // 연산자에 따라 첫번째 숫자와 현재보여지는 숫자르 계산
        display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
      }
      firstNum = display.textContent; //지금 화면에 보이는 숫자를 firstNum에 할당
      operatorForAdvanced = buttonContent; //지금 누른 연산자 버튼을 operatorForAdvanced에 할당
      previousKey = 'operator';
    }

    if (action === 'decimal') { // 클릭된 html 엘리먼트의 클래스 네임이 decimal 일때 
      // 현재 보여지는 화면에 점이 없고 & 이전키가 연산자가 아니면 
      if (!display.textContent.includes('.') && previousKey !== 'operator') {
        display.textContent = display.textContent + '.'; //현재 보여지느 값 + 점
      } else if (previousKey === 'operator') { // 이전키가 연산자이면 
        display.textContent = '0.'; // 화면에 0.나오게 한다
      } // 현재 보여지는 화면에 점이 있으면 
      previousKey = 'decimal'; //action decimal을 previousKey에 할당. decimal 처음으로 가서 조건에 맞게 리턴
      // console.log(previousKey + '여기'); // 무조건 'decimal 여기' 
    }

    if (action === 'clear') {
      firstNum = undefined;
      operatorForAdvanced = undefined;
      previousNum = undefined;
      previousKey = 'clear';
      display.textContent = '0';
    }

    if (action === 'calculate') {
      if (firstNum) { //firstNum === true
        if (previousKey === 'calculate') { // 이전키가 enter이면  
          //연산자에 따라 현재 보이지는 숫자와 previousNum(secondNum)을 계산 
          display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum);
        } else { // 이전키가 enter가 아니면 
          previousNum = display.textContent; //지금 보이는 화면에 숫자가 previousNum이다.
          // console.log(previousNum + '여기'); // 9+ 8 = 17 enter 누를 때 '8여기'가 나온다.
          //연산자에 따라 첫번째 숫자와 현재 보이지는 숫자 계산해서 화면에 보이게 한다. 
          display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
        }
      }
      previousKey = 'calculate';
    }
  }
});
