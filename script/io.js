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
		
		console.log(this.result);
		
		//load json into the global variable that
		//stores all of the current calendar's data
		current = JSON.parse(this.result);
		
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

