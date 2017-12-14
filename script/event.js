//set up drop zone listeners
var dropZone = document.getElementById('dropzone');

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

//easy clickout of dialog boxes
importBox.addEventListener('click', closeImportBox, false);
exportBox.addEventListener('click', closeExportBox, false);

//drop handler
function handleFileSelect(evt) {

	evt.stopPropagation();
	evt.preventDefault();

	var file = evt.dataTransfer.files[0];
	var reader = new FileReader();

	reader.onload = function(progressEvent){
		
		var raw = this.result;
		
		var cal = ptToObject(raw);
		merge(cal);
		populate(cal);
	};
	reader.readAsText(file);
}

function importHandler(){
	var cal = ptToObject(document.getElementById('importer').value);
	document.getElementById('importer').value = "";
	merge(cal);
	populate(cal);
	importing = false;
	updateView();
}

function ptToObject(pt){
	
	//temporary variable to hold data to load
	//grab name from pt later.
	var c = new Calendar('default');
	
	//healthy pt -> data object translation. handles translation to temporary object only.
	//does not populate the gui: passed off resulting object to populate() in render.js
	//also does not append data to global calendar variable
	var years = pt.split("year:");
	years.splice(0, 1); //remove blank item before first split
	for(var y in years){
		var year = years[y].replace(/\s+/, "").substr(0,4);
		c.addYear(year);
		var months = years[y].split("month:");
		months.splice(0, 1);
		for(var m in months){
			var month = months[m].replace(/\s+/, "").substr(0,2);
			c.year[year].addMonth(month);
			var days = months[m].split("day:");
			days.splice(0, 1);
			for(var d in days){
				var day = days[d].replace(/\s+/, "").substr(0,2);
				c.year[year].month[month].addDay(day, days[d].split("memo:")[1].replace(/^\s+|\s+$/g, ""));
			}
		}
	}
	
	return c;
}

function objectToPT(cal){
	
	var f = "";
	
	for(var y in cal.year){
		f = f + "year: " + y + "\n";
		for(var m in cal.year[y].month){
			f = f + "month: " + m + "\n";
			for(var d in cal.year[y].month[m].day){
				f = f + "day: " + d + "\n" + "memo:\n" + cal.year[y].month[m].day[d].memo + "\n";
			}
		}
	}
	
	return f;
}

//on drag over
function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

//clickout functions
function closeImportBox(evt){
	if(evt.target !== importBox)
		return;
	
	importing = false;
	updateView();
}

function closeExportBox(evt){
	if(evt.target !== exportBox)
		return;
	
	exporting = false;
	updateView();
}

//track keyboard input
window.onload = function(){
	document.onkeydown = function(e){
		key = code(e);
		
		console.log(key);
		
		//left or up
		if (key == 37 || key == 38){
			//prev month
			if(workingDate.getMonth() == 0){
				workingDate = new Date(workingDate.getFullYear() - 1, 11, 1);
			}else{
				workingDate = new Date(workingDate.getFullYear(), workingDate.getMonth() - 1, 1);
			}
			document.getElementById('loc').innerHTML = workingDate.getFullYear() + ' ' + cal_months_labels[workingDate.getMonth()];
			render(workingDate);
			populate(calendar);
		}
		
		//right or down
		if (key == 39 || key == 40){
			//next month
			if(workingDate.getMonth() == 11){
				workingDate = new Date(workingDate.getFullYear() + 1, 0, 1);
			}else{
				workingDate = new Date(workingDate.getFullYear(), workingDate.getMonth() + 1, 1);
			}
			document.getElementById('loc').innerHTML = workingDate.getFullYear() + ' ' + cal_months_labels[workingDate.getMonth()];
			render(workingDate);
			populate(calendar);
		}	
	};
};

//get keycode
function code(e) {
	e = e || window.event;
	return(e.keyCode || e.which);
}