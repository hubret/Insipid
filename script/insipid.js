//globals and application state

var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var cal_months_labels = ['January', 'February', 'March', 'April',
			 'May', 'June', 'July', 'August', 'September',
			 'October', 'November', 'December'];

var currentDate = new Date();
var workingDate = currentDate;

var calendar = new Calendar('default');

var importing = false;
var exporting = false;

var importBox = document.getElementById("import");
var exportBox = document.getElementById("export");

//updates the state of the gui
function updateView(){
	if (importing){
		importBox.style.top = 0;
	}else{
		importBox.style.top = '-100%';
	}

	if (exporting){
		exportBox.style.top = 0;
	}else{
		exportBox.style.top = '-100%';
	}
}

//put temporary calendar data into global calendar variable
function merge(cal){
	//gotta check if the subobjects already exist.
	for(var y in cal.year){
		for(var m in cal.year[y].month){
			for(var d in cal.year[y].month[m].day){
				if(calendar.year[y]){
					if(calendar.year[y].month[m]){
						if(calendar.year[y].month[m].day[d]){							
							calendar.year[y].month[m].day[d].memo += "\n" + cal.year[y].month[m].day[d].memo;
						}else{
							calendar.year[y].month[m].day[d] = cal.year[y].month[m].day[d];
							break;
						}
					}else{
						calendar.year[y].month[m] = cal.year[y].month[m];
						break;
					}
				}else{
					calendar.year[y] = cal.year[y];
					break;
				}
			}
		}
	}
	//also update the exporter
	document.getElementById('exporter').value = objectToPT(calendar);
}

//autosave textarea entries to calendar variable.
function autosave(){
	for(var d = 0; d < cal_days_in_month[workingDate.getMonth()]; d++){
		
		/*if(document.getElementById("d" + (d+1)).value != ''){*/
		
		try{
			var value = document.getElementById("d" + (d+1)).value;
			var y = workingDate.getFullYear();
			var m = workingDate.getMonth();

			//only save boxes with more than nothing
			if(value != ""){
				if(calendar.year[y]){
					if(calendar.year[y].month[m]){
						if(calendar.year[y].month[m].day[d]){
							calendar.year[y].month[m].day[d].memo = value;
						}else{
							calendar.year[y].month[m].addDay(d, value);
						}
					}else{
						calendar.year[y].addMonth(m);
						calendar.year[y].month[m].addDay(d, value);
					}
				}else{
					calendar.addYear(y);
					calendar.year[y].addMonth(m);
					calendar.year[y].month[m].addDay(d, value);
				}
			}else{
				calendar.year[y].month[m].removeDay(d);
			}
		}catch(err){
			
		}
		
		
		/*}else{
			calendar.year[workingDate.getFullYear()].month[workingDate.getMonth()].day.splice(d,1);
		}*/
	}
	//also update the exporter
	document.getElementById('exporter').value = objectToPT(calendar);
}

function jump(){
	document.getElementById('loc').innerHTML = workingDate.getFullYear() + ' ' + cal_months_labels[workingDate.getMonth()];
	workingDate = currentDate;
	render(workingDate);
	populate(calendar);
}

updateView();

document.getElementById('loc').innerHTML = workingDate.getFullYear() + ' ' + cal_months_labels[workingDate.getMonth()];