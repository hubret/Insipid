function Calendar(name){
	this.name = name;
	this.year = [];
	
	this.addYear = function (year){
		this.year[year] = new Year();
	}
	
	this.removeYear = function(year){
		this.year[year] = undefined;
	}
}

function Year(){
	this.month = [];
	
	this.addMonth = function(month){
		this.month[month] = new Month();
	}
	
	this.removeMonth = function(month){
		this.month[month] = undefined;
	}
	
	this.removeAll = function(){
		this.month = [];
	}
}

function Month(){
	this.day = [];
	
	this.addDay = function(day, memo){
		this.day[day] = new Day(memo);
	}
	
	this.removeDay = function(day){
		this.day.splice(day, 1);
	}
	
	this.removeAll = function(){
		this.day = [];
	}
}

function Day(memo){
	this.memo = memo;
}