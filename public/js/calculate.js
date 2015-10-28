function quoteProcess(expression)
{
	if (expression == null||expression == "") {
		result = "0".valueOf().toString();
		return result;
	}
	invaild_quote_pattern = new RegExp('\\d\\(|\\)\\d');
	invaild_quote_test = invaild_quote_pattern.test(expression);
	if (invaild_quote_test == true) {
		result = null;
		return result;
	}

	right_quotes = expression.match(/\)/g);
	left_quotes = expression.match(/\(/g);
	if ((right_quotes == null ^ left_quotes == null) != 0) {
		result = null;
		return null;
	}else if (right_quotes != null && left_quotes != null && right_quotes.length != left_quotes.length) {
		result = null;
		return null;
	}

	right_quote = expression.indexOf(')');
	left_quote = expression.lastIndexOf('(',right_quote);
	if (right_quote > -1 && left_quote > -1) {
		quote_remove = expression.substring(left_quote + 1, right_quote);
		if (quote_remove == null||quote_remove.length == 0) {
			result = "0".valueOf().toString();
			return result;
		}
		quote_remove = calculate(quote_remove);
		expression = expression.substring(0, left_quote) + quote_remove + expression.substring(right_quote + 1);
//		console.log("expression:"+expression);
		expression = quoteProcess(expression);
		if (expression == null) {
			result = null;
			return result;
		}
		right_quote = expression.indexOf(')');
		left_quote = expression.lastIndexOf('(',right_quote);
//		console.log("r:"+right_quote+" l:"+left_quote);
	}
	if(left_quote == -1&&right_quote == -1&&expression.indexOf('(') == -1&&expression.indexOf(')') == -1){
		result = calculate(expression);
		if (result == null) {
			return result;
		}
	}else{
		result = null;
		return result;
	}
//	console.log("result="+result);
	return result;
}

function calculate(equation)
{
	if (equation == null) {
		result = "0".valueOf().toString();
		return result;
	}

	if (equation == ".") {
		result = "0".valueOf().toString();
		return result;
	}

	reversed_equation = reverseString(equation);
	number = reversed_equation.split(/\+(?=\d)|\-(?=\d)|\*|\/|\%|\^/g);
	number = removeArrayBlank(number);
	number = reverseArrayElements(number);

	operator = reversed_equation.match(/\+(?=\d)|\-(?=\d)|\*|\/|\%|\^/g);

	store_operator = new Array();
	store_number = new Array();

	if (operator != null && number.length - operator.length != 1) {
//		console.log(number+"operator != null && number.length - operator.length != 1 ");
//		console.log(operator+"operator != null && number.length - operator.length != 1 ");
		return null;
	}

//	console.log(number);
//	console.log(operator);
	while (number.length > 1 && operator.length >= 0) {
		tail_number = number.pop();
		if (isNaN(tail_number)) {
//			console.log(isNaN(tail_number)+"not a number");
			return null;
		}
		tail_operator = operator.pop();
//		console.log(number);
//		console.log(operator);
		tail_operator_priority = operatorPriority(tail_operator);
		if (operator.length == 0) {
			previous_operator = null;
			previous_operator_priority = -1;
		} else {
			previous_operator = operator[operator.length - 1];
			previous_operator_priority = operatorPriority(previous_operator);
		}
		if (isOperator(tail_operator)) {
			if (number.length >= 1 && (operator.length >= 0) && (tail_operator_priority >= previous_operator_priority)) {
				previous_number = number.pop();
				if (isNaN(previous_number)) {
//					console.log(isNaN(previous_number)+"not a number");
					return null;
				}
				baseCalculateResult = baseCalculate(previous_number, tail_operator, tail_number);
				number.push(baseCalculateResult);
//				console.log(number);
				while (store_number.length != 0 && store_operator.length != 0) {
					number.push(store_number.pop());
					operator.push(store_operator.pop());
//					console.log(number);
				}
			} else {
				store_operator.push(tail_operator);
				store_number.push(tail_number);
			}

		}
	}
	return number[0];
}

function reverseString(string)
{
	string = string.split("").reverse().join("");
	return string;
}

function reverseArrayElements(array)
{
	safe_array = array.slice();
	for (i in safe_array) {
		safe_array[i] = reverseString(safe_array[i]);
	}
	return safe_array;
}


function removeArrayBlank(array)
{
	safe_array = array.slice();
	for (blank_num = 0,tail = 0,i = 0;i < safe_array.length;i++) {

		if (safe_array[i].length == 0)
			blank_num++;
		else {
			safe_array[tail] = safe_array[i];
			tail++;
		}
	}
	safe_array.length -= blank_num;
	return safe_array;
}



function isOperator(symbol)
{
	return operatorPriority(symbol) != null;
}

function operatorPriority(operator)
{
	operatorPriorityTable = Array();
	operatorPriorityTable['+'] = 2;
	operatorPriorityTable['-'] = 2;
	operatorPriorityTable['*'] = 3;
	operatorPriorityTable['/'] = 3;
	operatorPriorityTable['%'] = 3;
	operatorPriorityTable['^'] = 4;
	return operatorPriorityTable[operator];
}

function baseCalculate(numberB, operator, numberA)
{
	result = "0".valueOf().toString();
	numberA = parseFloat(numberA);
	numberB = parseFloat(numberB);
//	console.log(numberA+numberB);
	switch (operator) {
		case '+':
			result = (numberA + numberB);
			break;
		case '-':
			result = (numberA - numberB);
			break;
		case '*':
			result = (numberA * numberB);
			break;
		case '/':
			result = (numberA / numberB);
			break;
		case '%':
			result = (numberA % numberB);
			break;
		case '^':
			result = Math.pow(numberA, numberB);
			break;
		default:
			break;
	}
	result = result.toString();
	return result;
}
