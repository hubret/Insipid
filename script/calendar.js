function Calendar(name){
	this.name = name;
	this.year = {};
	
	this.addYear = function (year){
		this.year[year] = new Year();
	}
	
	this.removeYear = function(year){
		delete this.year[year];
	}
}

function Year(){
	this.month = {};
	
	this.addMonth = function(month){
		this.month[month] = new Month();
	}
	
	this.removeMonth = function(month){
		delete this.month[month];
	}
	
	this.removeAll = function(){
		this.month = [];
	}
}

function Month(){
	this.day = {};
	
	this.addDay = function(day, memo){
		this.day[day] = new Day(memo);
	}
	
	this.removeDay = function(day){
		delete this.day[day];
	}
	
	this.removeAll = function(){
		this.day = [];
	}
}

function Day(memo){
	this.memo = memo;
}