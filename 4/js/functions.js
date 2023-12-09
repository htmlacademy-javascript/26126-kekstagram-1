//Функция для проверки, является ли строка палиндромом


const isPalindrome = (string) => {
  let newString = '';
  const lowStringNoSpace = string.toLowerCase().replaceAll(' ', '');
  for (let i = lowStringNoSpace.length - 1; i >= 0; i--) {
    newString += lowStringNoSpace[i];
  }
  if(newString === lowStringNoSpace) {
    return true;
  }
  return false;
};

isPalindrome('Лёша на полке клопа нашёл ');

/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN*/

const getCeilNumber = (data) => {
  let newStringNumber = '';
  const dataToString = String(data);
  const lowStringNoSpace = dataToString.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i <= lowStringNoSpace.length - 1; i++) {
    const floatNumber = parseFloat(lowStringNoSpace[i]);
    if(!isNaN(floatNumber)) {
      newStringNumber += floatNumber;
    }
  }
  const newNumber = parseFloat(newStringNumber);
  return newNumber;
};
getCeilNumber('1 кефир, 0.5 батона');

/*Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

Эта функция нам пригодится для формирования адресов файлов. Примеры её использования
Попробуйте не использовать при этом функцию padStart() =)
*/

const getAddressString = (initialString, minLength, addData) => {
  let firstAddingString = '';
  let addString = '';
  let newAddressString = '';
  firstAddingString = addData + initialString;

  if (firstAddingString.length <= minLength) {
    const foundSymbols = minLength - firstAddingString.length;
    for(let i = 0; i <= foundSymbols - 1; i++) {
      if(addData.length > 1){
        addString += addData[i] ;
      } else {
        addString += addData;
      }
    }
    newAddressString = addString + firstAddingString;
  }
  if (firstAddingString.length > minLength) {
    const dueLengthForAddData = minLength - initialString.length;
    addString = addData.slice(0, dueLengthForAddData);
    newAddressString = addString + initialString;
  }
  return newAddressString;
};

getAddressString('q', 4, 'we');

//Функция для проверки длины строки.
const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 10);

