//render (data object -> gui)

//requires a div #grid, a Date() currentDate

function render(date){
	
	var month = date.getMonth();
	var year = date.getFullYear();
	
	var start = new Date(year, month, 1).getDay();
	var length = cal_days_in_month[month];
	
	if (month == 1) { // February only!
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
			length = 29;
		}
	}
	
	var grid = document.getElementById('grid');
	grid.innerHTML = '';
	
	var dn = 1;
	
	//for each calendar row
	for (var i = 0; i < 6; i++) {
		var row = document.createElement('div');
		row.className = 'row';

		// this loop is for weekdays (cells)
		for (var j = 0; j < 7; j++) { 
			var day = document.createElement('div');
			day.className = 'day';

			//check if valid calendar cell
			if (dn <= length && (i > 0 || j >= start)) {
				var textarea = document.createElement('textarea');
				var format = document.createElement('div');
				var span = document.createElement('span');
				var text = document.createTextNode(dn);
				textarea.id = "t" + dn;
				textarea.onchange = autosave;
				format.id = "f" + dn;
				format.className = "format";
				
				//check if today
				if(dn == new Date().getDate() && workingDate.getMonth() == new Date().getMonth() && workingDate.getYear() == new Date().getYear()){
					day.className += ' today';
				}

				span.appendChild(text);
				day.appendChild(format);
				day.appendChild(textarea);
				day.appendChild(span);
				dn++;
			}else{
				day.className += ' padded';
			}
			row.appendChild(day);
		}
		grid.appendChild(row);

		// stop making rows if we've run out of days
		if (day > length) {
			break;
		}
	}
}

function repopulate(cal){
	try{
		var workingMonth = cal.year[workingDate.getFullYear()].month[workingDate.getMonth()];

		for(var d in workingMonth.day){
			//fill the editor for each day, preformat. then format thru autosave()
			document.getElementById("t" + (parseInt(d, 10)+1)).value = (workingMonth.day[d].memo);
			console.log(parseInt(d, 10)+1);
		}
		
	}catch(err){
		//just shut up lol
	}
	autosave();
}

render(workingDate);