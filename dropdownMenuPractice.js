var str=''; // variable to store the options
var month = new Array("January","February","March","April","May","June","July","August",
"September","October","November","December");
for (var i=0; i < month.length;++i){
str += '<option value="'+month[i]+'" />'; // Storing options in variable
}
var my_list=document.getElementById("months");
my_list.innerHTML = str;