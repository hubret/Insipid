function Memo(date, memo){
	this.date = date;
	this.memo = memo;
}

function createMemos(raw){
	
	var attributes = ['date', 'memo'];
	
	var date, memo;
	
	var currentKey;
	var newKey;
	var value;
	
	
	for (var i = 0; i < raw.length; i++) {
		
		newKey = false;
		
		//skip lines starting with '//' and empty lines
		if (raw[i].substring(0, 2) === '//' || raw[i].length == 1 || raw[i].length == 0) continue;
		
		//go through each attribute and see if line begins with its declaration
		for (var j = 0; j < attributes.length; j++) {
			if (raw[i].substring(0, attributes[j].length + 1) === attributes[j] + ':') {

				//once key has been found, update $currentKey, and get the line's value
				currentKey = attributes[j];
				value = raw[i].substring(currentKey.length + 1, raw[i].length);
				value = value.trim();
				newKey = true;
				break;
			}
		}

		//if key wasn't found, continue adding to the previously acquired attribute
		if (!newKey) {
			value = value + raw[i] + "\n";
		}

		//assign value to attribute for slide
		switch (currentKey) {
			case 'date':
				memos.push(new Memo(date, memo));
				date = value;
				break;
			case 'memo':
				memo = value;
				break;
		}
	}
	memos.push(new Memo(date, memo));
	memos.splice(0, 1);
	
	loadMemos();
}

function loadMemos(){
	for(var i = 0; i < memos.length; i++){
		
		var md = new Date(parseInt(memos[i].date));
		console.log(memos[i].date);
		if(md.getMonth() === current.getMonth()){
			console.log("match!");
			document.getElementById("d" + md.getDate()).value = memos[i].memo;
		}
	}
}