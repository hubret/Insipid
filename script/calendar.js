function Calendar(date) {
	
	const cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	this.month = date.getMonth();
	this.year = date.getFullYear();
	
	var startingDay = new Date(this.year, this.month, 1).getDay();
	var monthLength = cal_days_in_month[this.month];

	if (this.month == 1) { // February only!
		if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
			monthLength = 29;
		}
	}

	this.drawGrid = function(){

		console.log(this.month);
		
		var grid = document.createElement('div');
		grid.className = 'grid';

		// fill in the days
		var dn = 1;
		// this loop is for is weeks (rows)
		for (var i = 0; i < 6; i++) {
			
			

			var row = document.createElement('div');
			row.className = 'row';

			// this loop is for weekdays (cells)
			for (var j = 0; j < 7; j++) { 
				
				var day = document.createElement('div');
				day.className = 'day';
				
				//fill in day numbers
				if (dn <= monthLength && (i > 0 || j >= startingDay)) {
					var ta = document.createElement('textarea');
					var n = document.createElement('span');
					var nt = document.createTextNode(dn);
					ta.id = "d" + dn;
					n.appendChild(nt);
					day.appendChild(ta);
					day.appendChild(n);
					dn++;
				}else{
					day.className += ' padded';
				}
				row.appendChild(day);
			}
			grid.appendChild(row);

			// stop making rows if we've run out of days
			if (day > monthLength) {
				break;
			}

		}


		document.getElementById('container').appendChild(grid);

	}
}