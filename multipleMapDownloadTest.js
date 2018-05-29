var dilutionData01 = [
    // Blue Map
    [{
        "Source Well": "A1",
        "Dest Well": "A2",
        "Vol": "50"
    },
    {
        "Source Well": "A2",
        "Dest Well": "A11",
        "Vol": "50"
    },
    {
        "Source Well": "A3",
        "Dest Well": "E22",
        "Vol": "50"
    }],

    // Red Map
    [{
        "Source Well": "A1",
        "Dest Well": "A9",
        "Vol": "50"
    },
    {
        "Source Well": "A2",
        "Dest Well": "A3",
        "Vol": "50"
    },
    {
        "Source Well": "A3",
        "Dest Well": "K6",
        "Vol": "50"
    }],

    // Green Map
    [{
        "Source Well": "A1",
        "Dest Well": "A20",
        "Vol": "50"
    },
    {
        "Source Well": "A2",
        "Dest Well": "A17",
        "Vol": "50"
    },
    {
        "Source Well": "A3",
        "Dest Well": "B17",
        "Vol": "50"
    }]
];

var dilutionData02 = [
    // Orange Map
    [{
        "Source Well": "A1",
        "Dest Well": "A6",
        "Vol": "50"
    },
    {
        "Source Well": "A2",
        "Dest Well": "B6",
        "Vol": "50"
    },
    {
        "Source Well": "A3",
        "Dest Well": "D22",
        "Vol": "50"
    }],

    // Purple Map
    [{
        "Source Well": "A1",
        "Dest Well": "A14",
        "Vol": "50"
    },
    {
        "Source Well": "A2",
        "Dest Well": "K15",
        "Vol": "50"
    },
    {
        "Source Well": "A3",
        "Dest Well": "P9",
        "Vol": "50"
    }],

    // Yellow Map
    [{
        "Source Well": "A1",
        "Dest Well": "A5",
        "Vol": "50"
    },
    {
        "Source Well": "A2",
        "Dest Well": "C18",
        "Vol": "50"
    },
    {
        "Source Well": "A3",
        "Dest Well": "F9",
        "Vol": "50"
    }]
];

var fileNames01 = ["blueMap.csv","redMap.csv","greenMap.csv"];
var fileNames02 = ["orangeMap.csv","purpleMap.csv","yellowMap.csv"];

// This function can be modified to turn any set of data into a string with a 
// column delimiter separating each element and a line delimiter separating each line
function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]); 
    // creates an array of strings that correspond to the keys in the first object of the data array
    // this will be used as the header row

    result = '';
    result += keys.join(columnDelimiter);
    // joins all the elements of the keys array into a string inserting the columnDelimiter in between them
    result += lineDelimiter;
    // concatenates the lineDelimiter at the end of the string
    
    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

// This function will turn a string into a CSV file
function downloadCSV(arrData,args,i) {
    var data, filename, link;

    // Extracts the string of data to be downloaded as a CSV
    var csv = convertArrayOfObjectsToCSV({ 
        data: arrData[i] // input is an object with one value "data" which is the array (arrData) of arrays of objects
    });
    if (csv == null) return;

    filename = args[i] || 'export.csv';

    // Checks to see if the string is prepended with info that tells the browser
    // that this is a CSV file and should be downloaded. If the string does not
    // have this information, it is prepended to the string.
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }

    // Encodes CSV string into the final form to be downloaded using prepended info
    data = encodeURI(csv);

    // Create element
    link = document.createElement('a');
    // Set href attribute to the encoded string
    link.setAttribute('href', data);
    // Set download attribute to file name
    link.setAttribute('download', filename);
    // Simulate click to download file
    link.click();
}

function downloadFiles() {
    fileNames=fileNames02;
    dilutionData=dilutionData02;
    for (i=0;i<fileNames.length;i++) {
        downloadCSV(dilutionData,fileNames,i);
    }
}