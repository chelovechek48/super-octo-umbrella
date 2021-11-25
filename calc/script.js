sign__lock = false;
kol__sqrt = 0;
calc__key = '+';
calc__keyy = '*';
kol__operation = 0;
equal__sigh = 0;
kol__dot = 0;
kol__sign = 0;
kol__percent = 0;

num1 = 0;
num2 = false;
count = '';
storage__item__old = ' ';
function calc(calc__button) {
	var calc__text = document.querySelector('.calc__value').value;
	var calc__value = '';
	switch (calc__button) {
		case 'reset':
			document.querySelector('.calc__value').value = 0;
			document.querySelector('.calc__value2').value = '';
			num1 = 0;
			kol__dot = 0;
			count = '';
			calc__key = '+';
			calc__keyy = '*';
			break
		case '=':
			if (count.indexOf('0') != -1 ||
				count.indexOf('1') != -1 ||
				count.indexOf('2') != -1 ||
				count.indexOf('3') != -1 ||
				count.indexOf('4') != -1 ||
				count.indexOf('5') != -1 ||
				count.indexOf('6') != -1 ||
				count.indexOf('7') != -1 ||
				count.indexOf('8') != -1 ||
				count.indexOf('9') != -1   ) {
				if (equal__sigh == 0) {
					document.querySelector('.calc__value').value = document.querySelector('.calc__value2').value;
					if (num2 == false) {
						count += 0;
					}
					storage__item = count+'='+document.querySelector('.calc__value2').value;
					if (storage__item != storage__item__old) {
						LocalStorageAppend(storage__item);
						LocalStorage();
						count = document.querySelector('.calc__value2').value;
						storage__item__old = storage__item;
					}
					equal__sigh ++;
				}
			}
			calc__key = '+';
			calc__keyy = '*';
			num1 = 0;
			num2 = false;
			break
		case '+': case '-': case '*': case '/':
			if (count[(count.length)-1] == '.') {
				count = count.slice(0, count.length-1);
			}
			num1 = document.querySelector('.calc__value2').value;
			if (num1 == '') {
				document.querySelector('.calc__value2').value = '0';
				count += '0';
			}
			document.querySelector('.calc__value').value = calc__button;
			calc__key = calc__button;
			calc__keyy = '*';
			equal__sigh = 0;
			kol__dot = 0;
			count__last = count.slice(count.length-2, count.length-1);
			if (kol__sign != 0) {
				count = count.slice(0, count.length-1);
				if (kol__percent != 0) {
					count = count.replace('%','');
					count += '%';
				}
				count = count.slice(0, count.length-1)+count__last;
			}
			count += calc__button;
			kol__sign ++;
			break

		case '^':
			num1 = document.querySelector('.calc__value2').value;
			if (num1 == '') {
				document.querySelector('.calc__value2').value = '0';
				count += '0';
			}
			document.querySelector('.calc__value').value = '^';
			calc__key = '**';
			calc__keyy = '**';
			equal__sigh = 0;
			kol__dot = 0;
			if (kol__sign != 0) {
				count = count.slice(0, count.length-1);
			}
			count += calc__button;
			kol__sign ++;
			break
		case '√':
			num1 = document.querySelector('.calc__value2').value;
			if (num1 == '') {
				num1 = 1;
			}
			document.querySelector('.calc__value').value = num1 + '√';
			calc__key = '√';
			equal__sigh = 0;
			kol__dot = 0;
			if (kol__sign != 0) {
				count = count.slice(0, count.length-1);
			}
			count += calc__button;
			kol__sign ++;
			break
		case '%':
			if (document.querySelector('.calc__value').value.indexOf('%') == -1) {
				document.querySelector('.calc__value').value += '%';
				if (document.querySelector('.calc__value').value == '0%') {
					count += '0';
				}
				if (calc__key == '√') {
					calc__value = count.replace('√','')/100;
				}
				else if (calc__key != '√' && count.indexOf(calc__key) == -1) {
					calc__value = count.replace('√','')/100;
				}
				else {
					switch (calc__key) {
						case '+': case '-':
							calc__value = parse(num1+calc__key+(num1/100)*num2.replace('%',''));
							break
						case '*': case '/':
							calc__value = parse(num1+calc__key+(num2/100));
							break
					}
				}
				document.querySelector('.calc__value2').value = calc__value;
				equal__sigh = 0;
				kol__dot = 0;
				if (kol__sign != 0) {
					count = count.slice(0, count.length-1);
				}
				count += calc__button;
				kol__sign ++;
				kol__percent ++;
				break
			}
			break

		case 0: case 1: case 2: case 3: case 4: 
		case 5:case 6: case 7: case 8: case 9: case '.':
			if (document.querySelector('.calc__value').value.indexOf('%') == -1) {
				if (kol__dot > 0 && calc__button == '.') {
				}
				else {
					if (document.querySelector('.calc__value').value == '0' ||
						document.querySelector('.calc__value').value == '+' ||
						document.querySelector('.calc__value').value == '-' ||
						document.querySelector('.calc__value').value == '*' ||
						document.querySelector('.calc__value').value == '/' ||
						document.querySelector('.calc__value').value == '^' ||
						document.querySelector('.calc__value').value == '√' ||
						document.querySelector('.calc__value').value == '%'   ) {
						if (calc__button != '.') {
							document.querySelector('.calc__value').value = calc__button;
						} else {
							document.querySelector('.calc__value').value = '0.';
							count += '0';
						}
					}
					else {
						document.querySelector('.calc__value').value += calc__button;
					}
					num2 = document.querySelector('.calc__value').value;
					switch (calc__key) {
						case '+': case '-': case '*': case '/':
							calc__value = parse(num1 + calc__key + num2);
							break

						case '**':
							calc__value = parse(num1**num2);
							break

						case '√':
							num2 = num2.slice(num2.indexOf('√')+1,num2.length);
							calc__value = parse('('+num1+')'+calc__keyy+'Math.sqrt('+num2+')');
							break
					}

					document.querySelector('.calc__value2').value = calc__value;
					equal__sigh = 0;
					
				}
				
				if (calc__button == '.' && kol__dot > 0) {
				} else {
					count += calc__button;
				}
				if (calc__button == '.') {
					kol__dot ++;
				}
				kol__sign = 0;
				break
			}
	}
}

function parse(str) {
	return Function(`'use strict'; return (${str})`)()
}

var visited = 'false';
try {
	visited = localStorage.getItem('visit');
} catch {}

if (visited == 'true') {
	arrStorage = localStorage.getItem('arr');
	arr = [];
	let index1 = 0;
	for (let index = 0; index < arrStorage.length; index ++) {
		if (arrStorage[index] == ',') {
			arr.push(arrStorage.slice(index1,index));
			index1 = index+1;
		}
		else if (index == arrStorage.length-1) {
			arr.push(arrStorage.slice(index1,arrStorage.length));
		}
	}
	localStorage.setItem('arr', arr);
}
else {
	localStorage.setItem('visit', 'true');
	var arr = [];
	localStorage.setItem('arr', arr);
}

/*
localStorage.clear();
*/

LocalStorage();
function LocalStorage() {
	const StorageClear = document.querySelectorAll('.calc__storage__items li');
	for (let index = 0; index < StorageClear.length; index ++) {
		StorageClear[index].remove();
	}
	while (arr.length > 100) {
		arr.shift();
	}
	for (let index = 0; index < arr.length; index ++) {
		const storage__items = document.querySelector('.calc__storage__items');    
		const li = document.createElement('li');
		li.textContent = arr[index];
		li.appendChild(document.createElement('div'));
		storage__items.prepend(li);
	}
}

function LocalStorageAppend(Append) {
	arr.push(Append);
	while (arr.length > 100) {
		arr.shift();
	}
	localStorage.setItem('arr', arr);
}

