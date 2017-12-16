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
		importBox.style.opacity = 1;
		importBox.style.pointerEvents = 'auto';
	}else{
		importBox.style.top = '-10%';
		importBox.style.opacity = 0;
		importBox.style.pointerEvents = 'none';
	}

	if (exporting){
		exportBox.style.top = 0;
		exportBox.style.opacity = 1;
		exportBox.style.pointerEvents = 'auto';
	}else{
		exportBox.style.top = '-10%';
		exportBox.style.opacity = 0;
		exportBox.style.pointerEvents = 'none';
	}
}

//put temporary calendar data into global calendar variable
function merge(cal){
	
	//gotta check if the subobjects already exist.
	
	//logic flow improvements...
	for(var y in cal.year){
		if(calendar.year[y]){
			for(var m in cal.year[y].month){
				if(calendar.year[y].month[m]){
					for(var d in cal.year[y].month[m].day){
						if(calendar.year[y].month[m].day[d]){							
							calendar.year[y].month[m].day[d].memo += "\n" + cal.year[y].month[m].day[d].memo;
						}else{
							calendar.year[y].month[m].day[d] = cal.year[y].month[m].day[d];
						}
					}
				}else{
					calendar.year[y].month[m] = cal.year[y].month[m];
				}
			}
		}else{
			calendar.year[y] = cal.year[y];
		}
	}
	
	//also update the exporter
	document.getElementById('exporter').value = objectToPT(calendar);
}

//autosave textarea entries to calendar variable.
function autosave(){
	for(var d = 0; d < cal_days_in_month[workingDate.getMonth()]; d++){
				
		try{
			var value = document.getElementById("t" + (d+1)).value;
			var y = workingDate.getFullYear();
			var m = workingDate.getMonth();
			
			console.log(value.length);
			
			//only save boxes with more than nothing
			if(value.length != 0){
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
				document.getElementById("f" + (d+1)).innerHTML = format(nl2br(value));
			}else{		
				console.log("WORKING");
				calendar.year[y].month[m].removeDay(d);
				document.getElementById("f" + (d+1)).innerHTML = "";
			}
			
		}catch(err){
			
		}
	}
	//also update the exporter
	document.getElementById('exporter').value = objectToPT(calendar);
}

function jump(){
	workingDate = currentDate;
	document.getElementById('loc').innerHTML = workingDate.getFullYear() + ' ' + cal_months_labels[workingDate.getMonth()];
	render(workingDate);
	repopulate(calendar);
}

function nl2br(s){
	return s.replace(/(?:\r\n|\r|\n)/g, '<br/>');
}

function format(s){
	
	var output = "";
	
	var colors = {
		0: "#000", //black
		1: "#00A", //dark blue
		2: "#0A0", //dark green
		3: "#0AA", //dark aqua
		4: "#A00", //dark red
		5: "#A0A", //dark purple
		6: "#FA0", //gold
		7: "#AAA", //gray
		8: "#555", //dark gray
		9: "#55F", //blue
		a: "#5F5", //green
		b: "#5FF", //aqua
		c: "#F55", //red
		d: "#F5F", //magenta
		e: "#FF5", //yellow
		f: "#FFF" //white
	}
			
		var groups = s.split(/(?=&[a-fA-F0-9])/g);

		for(i in groups){
			if(groups[i].substr(0,1) == "&"){
				var c = groups[i].substr(1,1);
				output += ("<span style='color:" + colors[c] + "'>" + groups[i].substring(2) + "</span>");
			}else{
				output += groups[i].substring(0);
			}
			
		}
		
	return output;
}

updateView();

document.getElementById('loc').innerHTML = workingDate.getFullYear() + ' ' + cal_months_labels[workingDate.getMonth()];