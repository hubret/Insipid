var startup = true;

//set up drop zone listeners
var dropZone = document.getElementById('dropzone');
var drop = document.getElementById('drop');

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

//drop handler
function handleFileSelect(evt) {
	
	evt.stopPropagation();
	evt.preventDefault();

	var file = evt.dataTransfer.files[0];
	var reader = new FileReader();

	reader.onload = function(progressEvent){		
		
		var lines = this.result.split('\n');
		var raw = [];
		
		for(var line = 0; line < lines.length; line++){
			raw.push(lines[line]);
		}
		console.log(raw);
		createMemos(raw);
		
		//remove prompt
		if(startup){
			dropZone.removeChild(drop);
			dropZone.style.zIndex = 0;
			startup = false;
		}
		
	};
	reader.readAsText(file);
}

//on drag over
function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

