calculator = new Array();

calculator['expression'] = "";
calculator['answer'] = "";

cal_history = new Array();
cal_history_id = 0;
cal_history_text = "<font color=#012345>This is a Web Calculator based on Javascript, here will shows you the history of input.<br>  *  source code: https://github.com/ukari/jscalculator<p align=\"right\">-Muromi Ukari</p></font>";

calculator['buttons'] =
	[['(', 'left_quote'], 	[')', 'right_quote'], 	['%', 'mod'], 	['/', 'divide'],
	['7', 'seven'], 	['8', 'eight'], 	['9', 'nine'], 	['*', 'multiply'],
	['4', 'four'], 		['5', 'five'], 		['6', 'six'], 	['+', 'add'],
	['1', 'one'], 		['2', 'two'], 		['3', 'three'], ['-', 'minus'],
	['0', 'zero'], 		['.', 'point'], 	['^', 'power'], ['←', 'delete'],
	['↑', 'previous'], 	['↓', 'next'], 		['c', 'clear'], ['=', 'evaluation']];
calculator['html'] = "";
calculator['css'] = "";
calculator['diameter'] = 2;//vw

for (i in calculator['buttons']) {
	calculator['html'] += "<div class=\"cal_button\" id=\""+calculator['buttons'][i][1]+"\" onclick='calculator_button_listener("+i+");'>"+calculator['buttons'][i][0]+"</div>\n";
	calculator['css'] += "div#"+calculator['buttons'][i][1]+"{top: "+(2+2*parseInt(i/4))*calculator['diameter']+"vw; left:"+(2+2*(i%4))*calculator['diameter']+"vw;}\n";
}

function calculator_button_listener(id)
{
	screen_text = document.getElementById("screen_text");
	screen = document.getElementById("screen");
	cal_history_screen_text = document.getElementById("cal_history_screen_text");
	if (id < 19) {
		calculator['expression'] += calculator['buttons'][id][0];
		refreshExpressionModeScreen();
	} else if (calculator['buttons'][id][1] == "delete") {
		calculator['expression'] = calculator['expression'].substring(0, calculator['expression'].length - 1);
		refreshExpressionModeScreen();
	} else if (calculator['buttons'][id][1] == "previous") {
		//calculator['expression'];
		cal_history_id -= 1;
		if (cal_history_id < 0) {
			cal_history_id = 0;
		}
		refreshcal_historyEquationModeScreen(cal_history_id);
	} else if (calculator['buttons'][id][1] == "next") {
		//calculator['expression']
		cal_history_id += 1;
		if (cal_history_id >= cal_history.length) {
			cal_history_id = cal_history.length - 1;
		}
		refreshcal_historyEquationModeScreen(cal_history_id);
	} else if (calculator['buttons'][id][1] == "clear") {
		calculator['expression'] = "";
		refreshExpressionModeScreen();
	} else if (calculator['buttons'][id][1] == "evaluation") {
		refreshAnswerModeScreen();
	}
}

function refreshExpressionModeScreen()
{
	screen_text.innerHTML = calculator['expression'];
	screen = document.getElementById("screen");
	if (calculator['expression'].length <= 30){
		screen_text.style.fontSize = "5vh";
	} else {
		screen_text.style.fontSize = "2.5vh";
		screen.scrollTop = "100000";
	}
	screen_text.innerHTML = calculator['expression'];
}

function refreshcal_historyEquationModeScreen(id)
{
	screen_text.innerHTML = calculator['expression'];
	calculator['expression'] = cal_history[cal_history_id];
	screen_text.innerHTML = calculator['expression'];
}

function refreshAnswerModeScreen()
{
	screen_text.style.fontSize = "5vh";
	cal_history.push(calculator['expression']);
	cal_history_id = cal_history.length;

	if ((calculator['expression'] == calculator['answer']) && calculator['expression'] != "") {
		return;
	}

	calculator['answer'] = quoteProcess(calculator['expression']);
	cal_history_text += calculator['expression'] + " = " + calculator['answer'] + "<br>";
	cal_history_screen_text.innerHTML = cal_history_text;
	if (calculator['answer'] == null){
		calculator['answer'] = "input error";
		calculator['expression'] = "";
		screen_text.innerHTML = calculator['answer'];
		return;
	}else if(calculator['answer'] == "NaN"){
		calculator['expression'] = "";
	}else{
		calculator['expression'] = calculator['answer'];
	}
	screen_text.innerHTML = calculator['expression'];
}
document.write("<style type=\"text/css\">"+calculator['css']+"</style>");

cal_keyboard = document.getElementById("keyboard");
cal_keyboard.innerHTML = calculator['html'];
cal_history_screen_text = document.getElementById("cal_history_screen_text");
cal_history_screen_text.innerHTML = cal_history_text;
