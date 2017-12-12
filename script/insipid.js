const cal_months_labels = ['January', 'February', 'March', 'April',
			   'May', 'June', 'July', 'August', 'September',
			   'October', 'November', 'December'];

var memos = [];

var current = new Date();

var c = new Calendar(current);
c.drawGrid();

document.getElementById('title').innerHTML = "<span>insipid</span> - " + cal_months_labels[current.getMonth()] + " " + current.getDate() + ", " + current.getFullYear();