var columns = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
var rows =  ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];

var columnDelimiter = ',';
var lineDelimiter = '\n';

rows.forEach(function(row) {
	let str = "";
	columns.forEach(function(column) {
		str = str + row + column + columnDelimiter;
	});
	//str = str + lineDelimiter;
	console.log(str)
});