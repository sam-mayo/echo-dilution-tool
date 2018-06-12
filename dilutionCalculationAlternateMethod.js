// DECLARATIONS

// Initial parameters
var dilutionFactor = 2;
var dilutionPoints = 10;
var targetVolume = 100;
var stockConc = 10;
var i = 0;

// Output arrays
var arrTargetConcs = [];
var arrTargetDispVols = [];
var arrDispenseVols = [];
var arrDmsoVols = [];
var arrAdjStockConcs = [];
var arrPercentAcc = [];
var arrPercentAccCompare = [];
var arrFindDistinctElementsResults = [];

// MAIN SCRIPT

// Create target concentrations array
for (i=0;i<dilutionPoints;i++) {
	// For each dilution point, divide stockConc by dilutionFactor to the indexth power
	// This creates the ideal concentrations by dividing each subsequent concentration by dilutionFactor
	arrTargetConcs[i] = stockConc / Math.pow(dilutionFactor,i);
}

// Create target dispense volumes array
for (i=0;i<dilutionPoints;i++) {
	// For each dilution point, divide targetVolume by dilutionFactor to the indexth power
	// This creates the ideal dispense volumes by dividing each subsequent volume by dilutionFactor
	arrTargetDispVols[i] = targetVolume / Math.pow(dilutionFactor,i);
}

// Create dispense volume array
for (i=0;i<dilutionPoints;i++) {
	var tempVol = arrTargetDispVols[i]; // Grab the current element in arrTargetDispVols
	var recurCtr = 0; // Recursion counter
	var whileCtr = 0; // While counter
	var returns = findBestDispenseVol(tempVol,recurCtr); // Returns dispense volume divisible by 2.5 at the target concentration and the recursion counter as an array of values
	var returnVol = returns[0];
	recurCtr = returns[1];

	// returnVol cannot be larger than targetVolume, so returnVol is divided by 10 until less than targetVolume
	while (returnVol > targetVolume) {
		returnVol /= 10;
		whileCtr++;
	}

	// Array of unsuitable volumes for percent accuracy calculation
	arrPercentAccCompare[i] = returnVol;

	// Determines the concentration of the stock solution in the source plate
	// recurCtr counts how many times the volume was multiplied by 10 to get to a number divisible by 2.5
	// whileCtr counts how many times the volume is divided to get it under targetVolume
	// subtracting whileCtr from recurCtr provides the correct exponent
	arrAdjStockConcs[i] = stockConc / Math.pow(10,recurCtr-whileCtr);

	// Finds the closest number to the ideal dispense volume that is divisible by 2.5
	arrDispenseVols[i] = findClosestNumber(returnVol,2.5);
}

// Create DMSO dispense volume array
for (i=0;i<dilutionPoints;i++) {
	arrDmsoVols[i] = targetVolume - arrDispenseVols[i];
}

// Create percent accuracy array
for (i=0;i<dilutionPoints;i++) {
	arrPercentAcc[i] = (100*(arrDispenseVols[i]/arrPercentAccCompare[i])).toFixed(1);
}

// Find distinct source plate concentrations
arrFindDistinctElementsResults = findDistinctElements(arrAdjStockConcs);

// Display results
console.log("Compound dispense volumes:   " + arrDispenseVols);
console.log("Percent accuracy:            " + arrPercentAcc);
console.log("DMSO dispense volumes:       " + arrDmsoVols);
console.log("Source plate concentrations: " + arrAdjStockConcs);
console.log("There are " + arrFindDistinctElementsResults[0] + " distinct source plate concentrations and they are: " + arrFindDistinctElementsResults[1]);

// FUNCTIONS

// Finds dispense volume that's divisible by 2.5
// Returns best dispense volume and the recursion counter
function findBestDispenseVol(tempDispVol,recurCtr) {
	// return array of values
	var returnVol; // declare return volume
	// If the given dispense volume is divisible by 2.5, return it as the volume to be used.
	if (tempDispVol % 2.5 === 0) {
		returnVol = tempDispVol;
		return [returnVol,recurCtr];
	// If the given dispense volume is not dividisble by 2.5, multiply it by 10 and try again.
	// recurCtr is incremented to keep track of how many times the recursion has taken place.
	} else {
		tempDispVol *= 10;
		recurCtr++;
		return findBestDispenseVol(tempDispVol,recurCtr);
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

// Finds how many distinct elements are in a large-to-small sorted array and reports what the values are
function findDistinctElements(array) {
	var distinctElements = 0; // Number of distinct elements in the input array
	var arrDistinctElements = []; // Array of distinct elements from input array
	var currentValue = array[0]; // Value of the most recent distinct element
	var testValue = array[0]; // Value from input array that is tested against currentValue
	arrDistinctElements[0] = currentValue; // Set first element in distinct elements array to first element in input array, which is necessarily distinct
	// Iterate over input array and test each element for distinctness
	// If the test input element (testValue) is different from the most recent distinct element (currentValue), add the test input element to the array of distinct elements
	// This test input element then becomes the new most recent distinct element and the number of distinct elements is incremented
	for (i=0;i<array.length;i++) {
		testValue = array[i];
		if (testValue !== currentValue) {
			distinctElements++;
			arrDistinctElements[distinctElements] = testValue;
			currentValue = testValue;
		}
	}

	return [distinctElements+1,arrDistinctElements];
}