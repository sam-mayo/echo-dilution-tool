// DECLARATIONS

// Initial parameters
var dilutionFactor = 2;
var dilutionPoints = 10;
var targetVolume = 100;
var stockConc = 10;
var adjStockConc = 10;

// Output arrays
var arrTargetConcs = [];
var arrDispenseVols = [];
var arrDmsoVols = [];
var arrAdjStockConcs = [];

// MAIN SCRIPT

// Create target concentrations array
for (i=0;i<dilutionPoints;i++) {
	arrTargetConcs[i] = stockConc / Math.pow(2,i);
}

// Create dispense volume list
for (i=0;i<dilutionPoints;i++) {
	findSuitableDispenseVol(i);
}

//console.log(arrDispenseVols);
//console.log(arrAdjStockConcs);

// FUNCTIONS

// Recursive function to find best dispense volume
function findSuitableDispenseVol (ctr) {
	var adjFactor = adjStockConc / stockConc; //factor that multiplies the dispense volume to a value that can be divisible by 2.5
	var adjTargetVolume = targetVolume / adjFactor;
	var tempDispenseVol = +((adjTargetVolume / Math.pow(2,ctr)).toFixed(2));
	if (tempDispenseVol % 2.5 === 0) {
		arrDispenseVols[ctr] = tempDispenseVol;
		arrAdjStockConcs[ctr] = adjStockConc;
	} else {
		adjStockConc = adjStockConc / 10;
		findSuitableDispenseVol(ctr);
	}
}

// Find closest number to n divisible by m
// Only works with positive numbers, but that's nbd
function findClosestNumber(n,m) {
	var q, n1, n2;
	q = n / m;
	n1 = m * Math.floor(q);
	n2 = m * Math.ceil(q);

	if (Math.abs(n-n1) < Math.abs(n-n2)) {
		return n1;
	} else {
		return n2;
	}
}

console.log(findClosestNumber(16.25,2.5));