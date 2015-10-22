
function SetOpeningBar(id, open, close) {

    var row1 = [0, 0]; // first part of each bar
    var row2 = [0, 0]; // 2nd part of each bar
    var row3 = [0, 0]; // 3rd part of each bar

    if (hour > open && hour < close) { // Check if the time is between the opening hours
        //open
        row1[0] = 1; // first element -> [0] of each element is the color 1=green=open 0=red=close 
        row2[0] = 0; //if the first element is green the next element has to be red
        row3[0] = 1; //same goes with the 3rd element
        row1[1] = Math.abs(((close - hour) % 24)) * 10; // Math.abs makes negative numbers positive the rest calculates the time between now and the closing to define the size of the first element
        row2[1] = ((24 - close) + open) * 10; // the next element is the time between the closing to the opening 

    } else {

        //close
        row1[0] = 0;
        row2[0] = 1;
        row3[0] = 0;
        row1[1] = open - hour ; // time between now and the opening 
	row1[1] = (row1[1]%24 + 24)%24;
			
	row1[1] = row1[1]*10;
        row2[1] = Math.abs((close - open) % 24) * 10; // time how long the cafe is open 

    }

    if ((row1[1] + row2[1]) > 100) { //the progress bar can't be longer then 100%, otherwise the is an error, so we cut it down in case
        row2[1] = 100 - row1[1];
    }

    if (row1[1] + row2[1] < 100) { // if 2 parts of the bar are not enough we add a part to fill it up
        row3[1] = 100 - (row1[1] + row2[1]);
    }


    if (!row1[0]) $("#" + id + " .progress").append("<div class=\"progress-bar progress-bar-danger\" style=\"width: " + row1[1] + "%\"></div>");
    if (row1[0]) $("#" + id + " .progress").append("<div class=\"progress-bar progress-bar-success\" style=\"width: " + row1[1] + "%\"></div>");
    if (!row2[0]) $("#" + id + " .progress").append("<div class=\"progress-bar progress-bar-danger\" style=\"width: " + row2[1] + "%\"></div>");
    if (row2[0]) $("#" + id + " .progress").append("<div class=\"progress-bar progress-bar-success\" style=\"width: " + row2[1] + "%\"></div>");
    if (!row3[0]) $("#" + id + " .progress").append("<div class=\"progress-bar progress-bar-danger\" style=\"width: " + row3[1] + "%\"></div>");
    if (row3[0]) $("#" + id + " .progress").append("<div class=\"progress-bar progress-bar-success\" style=\"width: " + row3[1] + "%\"></div>");

    return 0;
}

var d = new Date();
var n = d.getDay();
var hour = d.getHours();


$(".now").append(hour);
$(".then").append((hour + 10) % 24);

SetOpeningBar('VWCafeOpenBar', 9, 21);
SetOpeningBar('cafe2', 8, 18);
SetOpeningBar('cafe3', 7.5, 18);
