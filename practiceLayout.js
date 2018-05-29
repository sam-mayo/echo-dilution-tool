// Array of plate map objects
var arrPlateMaps = [
	{
		name: "E30",
		fileCreator: function() {
			fileCreatorE30();
		},
	},
	{
		name: "B52",
		fileCreator: function() {
			fileCreatorB52();
		},
	},
	{
		name: "C4",
		fileCreator: function() {
			fileCreatorC4();
		},
	},
	{
		name: "A4",
		fileCreator: function() {
			fileCreatorA4();
		},
	},
];

function menuPopulate() {
	// Grab the <select> element with the id plateMaps
	var list = document.getElementById('plateMaps');

	// For each element in the plate maps array, create an option for the <select> element and populate it with a plate map name
	arrPlateMaps.forEach(function(item) {
		var option = document.createElement('option');
		option.value = item.name;
		option.innerHTML = item.name;
		list.appendChild(option);
	});
}

function displayPlateMap() {
	var selection = document.getElementById("plateMaps");
	var displayZone = document.getElementById("displayZone");
	displayZone.innerHTML = selection.value;
}

// File creator functions

function fileCreatorE30() {
	console.log("Creating E30 files...");
}

function fileCreatorB52() {
	console.log("Creating B52 files...");
}

function fileCreatorC4() {
	console.log("Creating C4 files...");
}

function fileCreatorA4() {
	console.log("Creating A4 files...");
}

arrPlateMaps[2].fileCreator();
