//var parseDate = d3.timeParse("%m%d%Y");
var parseDate = d3.timeParse("%Y-%m-%d");
var formatDate = d3.timeFormat("%a");
var printFormatDate = d3.timeFormat("%A");

var parseTime = d3.timeParse("%H:%M:%S");
var formatTime = d3.timeFormat("%H:%M");
var printFormatTime = d3.timeFormat("%I:%M %p");

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 1000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
	.append("svg")
  	.attr("width", width + margin.left + margin.right)
  	.attr("height", height + margin.top + margin.bottom)
	.append("g")
  	.attr("transform",
    	    "translate(" + margin.left + "," + margin.top + ")");

// Rows and columns placemnt
var myTimes = [ 
								"22:00","22:15","22:30","22:45",
								"23:00","23:15","23:30","23:45", 
								"00:00","00:15","00:30","00:45",
								"01:00","01:15","01:30","01:45",
								"02:00","02:15","02:30","02:45",
								"03:00","03:15","03:30","03:45",
								"04:00","04:15","04:30","04:45",
								"05:00","05:15","05:30","05:45",
								"06:00","06:15","06:30","06:45",
								"07:00","07:15","07:30","07:45",
								"08:00","08:15","08:30","08:45",
								"09:00","09:15","09:30","09:45"
							]
var myDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Column labels
var xTime = d3.scaleTime()
	.range([0, width])
	.domain([new Date("1900-01-01 22:00:00"), new Date("1900-01-02 10:00:00")])
svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(xTime)
		.ticks(d3.timeHour, 1)
		.tickFormat(d3.timeFormat("%I %p"))
	);

var x = d3.scaleBand()
	.range([ 0, width ])
	.domain(myTimes)
	.padding(0.01);

// Build X scales and axis:
var y = d3.scaleBand()
  .range([0, height])
	.domain(myDays)
  .padding(.25);
svg.append("g")
  .call(d3.axisLeft(y));


// Lines to show goal sleep time and goal wake time
goalSleepTime = formatTime(parseTime("23:00:00"));
goalWakeUpTime = formatTime(parseTime("08:00:00"));

var goalSleepTimeLine = svg.append("line")
              						 .attr("x1", x(goalSleepTime))
              						 .attr("y1", height)
              						 .attr("x2", x(goalSleepTime))
              						 .attr("y2", 0)
              						 .attr("stroke-width", 5)
          		    				 .attr("stroke", "orange")
												   .style("stroke-dasharray", "2,2");
var goalWakeTimeLine = svg.append("line")
              						.attr("x1", x(goalWakeUpTime))
              						.attr("y1", height)
            						  .attr("x2", x(goalWakeUpTime))
          						    .attr("y2", 0)
     						          .attr("stroke-width", 5)
    						          .attr("stroke", "orange")
													.style("stroke-dasharray", "2,2");

// Colors
var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateRgb("#003375", "#00fffb", "white"))
    .domain([1,3])

// create a tooltip
var tooltip = d3.select("#my_dataviz")
	.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
	.style("background-color", "white")
 	.style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
	.style("width", "300")
 
// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  tooltip
  	.style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
}
var mousemove = function(d) {
	tooltip
  	.html("At " + d.printTime + " on " + d.printDate  + ": " + d.valueName + " (" + d.value + ")")
   	.style("left", (d3.mouse(this)[0]+70) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}

var mouseleave = function(d) {
  tooltip
  	.style("opacity", 0)
  d3.select(this)
  	.style("stroke", "none")
}

// Average time from an array of times
function getAverageTime(times) {
    var count = times.length
    var timesInSeconds = [];
    // loop through times
    for (var i =0; i < count; i++) {
        // parse
        var pieces = times[i].split(':');
        var hrs = Number(pieces[0]);
        var mins = Number(pieces[1]);
        var secs = Number(pieces[2]);

				/* 
				Because this is calculated in military time, 12am or midnight goes to 0am, 1am goes to 01:00, etc.
				This offsets the bedtime average. Thus, for times with hours of midnight to 3am it adds 24 hours to
				correctly represent the time average. 3am was choosen because it is approximately what is the latest
				to go to bed and it is too early to wake up. This is a personal choice but can be modified in the code.
				However, it is a balance and 3am was chosen to try to keep this balance.
				This function needs to be improved if someone has a very different sleep cycle.
				*/ 
				if (hrs <= "03") hrs += 24;
        // find value in seconds of time
        var totalSecs = hrs * 60 * 60;
        totalSecs += mins * 60;
        totalSecs += secs;
        // add to array
        timesInSeconds[i] = totalSecs;
    }
    // find average timesInSeconds
    var total = 0;
    for (var j =0; j < count; j++) {
        total += Number(timesInSeconds[j]);
    }
    var avg = Math.round(total / count);
    // turn seconds back into a time
    var avgMins = Math.floor(avg/60);
    var avgHrs = Math.floor(avgMins/60);
    avgMins -= (60 * avgHrs);
    // convert back to 12 hr. format
    var avgAmpm = 'AM';
		if (avgHrs >= 24) {
			avgHrs -= 12;
		}
    else if (avgHrs > 12) {
        avgAmpm = 'PM';
        avgHrs -= 12;
    }
    // add leading zeros for seconds, minutes
    avgMins = ('0' + avgMins).slice(-2);

		var m = (((parseInt(avgMins) + 7.5)/15 | 0) * 15) % 60;
		m = ('0' + m).slice(-2);

    return avgHrs+':'+m+' '+avgAmpm;
}

// Earliest bed time
function minBedTime(times)
{
  var count = times.length;
  var hrs = [];
	var mins = [];
	// loop through times
  for (var i = 0; i < count; i++) {
  	// parse
    var pieces = times[i].split(':');
    hrs[i] = Number(pieces[0]);
		if (hrs[i] <= "03") hrs[i] += 24;
    mins[i] = Number(pieces[1]);
	}

	// Search through and grab minimum
	var minI = 0;
	for (var i = 1; i < count; i++) 
	{
		if (hrs[i] < hrs[minI])
			minI = i;
		else if (hrs[i] == hrs[minI])
			if (mins[i] < mins[minI])	
				minI = i;
	}

	var minHrs = hrs[minI];
	var minMins = mins[minI];

	// parse and return
	var ampm = 'AM';
  if (minHrs > 24) {
  	minHrs -= 24; 
  }
	if (minHrs == 24) {
		minHrs -= 12;
	}
  else if (minHrs > 12) {
  	ampm = 'PM';
    minHrs -= 12; 
  }   

    return minHrs+':'+minMins+' '+ampm;
}

// Search for maximum bed time
function maxBedTime(times)
{
	var count = times.length;
  var hrs = [];
  var mins = [];
  // loop through times
  for (var i = 0; i < count; i++) {
    // parse
    var pieces = times[i].split(':');
    hrs[i] = Number(pieces[0]);
    if (hrs[i] <= "03") hrs[i] += 24;
    mins[i] = Number(pieces[1]);
  }
  
	// search and grab maximum
  var maxI = 0;
  for (var i = 1; i < count; i++)
  { 
    if (hrs[i] > hrs[maxI])
      maxI = i;
    else if (hrs[i] == hrs[maxI])
      if (mins[i] > mins[maxI])
        maxI = i;
  }
  
  var maxHrs = hrs[maxI];
  var maxMins = mins[maxI];
  
	// parse and return
  var ampm = 'AM';
  if (maxHrs > 24) {
    maxHrs -= 24;
  }
	else if (maxHrs == 24) {
		maxHrs -= 12;
	}
  else if (maxHrs > 12) {
  	ampm = 'PM';
    maxHrs -= 12;
  }
    
  return maxHrs+':'+maxMins+' '+ampm;
}

// find deviation from bed time goal for each element
// To get average deviation, run result through averageMinutes()
function bedTimeDeviation(times)
{
	console.log(goalSleepTime);
	var count = times.length;
  var hrs = [];
  var mins = [];
	var totalMins = [];

	var pieces = goalSleepTime.split(':');
  var goalHrs = Number(pieces[0]);
  var goalMins = Number(pieces[1]);
	var totalGoalMins = goalMins + (goalHrs * 60);	

	var goalDeviationMins = [];

  // loop through times
  for (var i = 0; i < count; i++) {
    // parse
    var pieces = times[i].split(':');
    hrs[i] = Number(pieces[0]);
    if (hrs[i] <= "03") hrs[i] += 24;
    mins[i] = Number(pieces[1]);
  }

	// find deviation
	for (var i = 0; i < count; i++)
		totalMins[i] = (hrs[i]*60) + mins[i];

	for (var i = 0; i < count; i++)
		goalDeviationMins[i] = totalMins[i] - totalGoalMins;			

	return goalDeviationMins;
}

// Find average minutes
function averageMinutes(duration)
{
  var count = duration.length;
  var total = 0;
  for (var i = 0; i < count; i++)
  {
    total += duration[i];
  }
  var avg = total / 7;
  return avg;

}

var bedTimeArray = [];
var wakeTimeArray = [];
var bedDuration = [];
var averageMinutesRestless = [];

//Read the data
d3.json("data.json", function(data)
{
	data['data'].forEach(function(day) 
	{
		// save data and push into arrays
		userName = day.userID;
		dayLength = day['sleep']['minuteData'].length - 1;
		bedTimeArray.push(day['sleep']['minuteData'][0]["dateTime"]);
		wakeTimeArray.push(day['sleep']['minuteData'][dayLength]["dateTime"]);
		bedDuration.push(day['sleep']['timeInBed']);
		averageMinutesRestless.push(day['sleep']['minutesAwake']);
		
		// save data to create heatmap
		iterator = 0;
		day['sleep']['minuteData'].forEach(function(mData) 
		{
			// parse data
			mData.count = iterator++;
			mData.dateVal = parseDate(day['sleep']['dateOfSleep']);
			mData.printDate = printFormatDate(mData.dateVal);
			mData.dateVal = formatDate(mData.dateVal);	

			mData.timeVal = parseTime(mData['dateTime']);
			mData.printTime = printFormatTime(mData.timeVal);
			mData.timeVal = formatTime(mData.timeVal);
			mData.value = +mData['value'];
			mData.value = mData.value.toFixed(2);

			// average heatmap sections to smooth sections
			mData.valueToColor = parseFloat(mData.value);
			mData.valueDivisor = 1.00;
			if (mData.count > 0) 
			{
				mData.valueToColor += parseFloat(day['sleep']['minuteData'][mData.count - 1]['value']);
				mData.valueDivisor += 1.00;
			}
			if (mData.count < dayLength) 
			{
				mData.valueToColor += parseFloat(day['sleep']['minuteData'][mData.count + 1]['value']);
				mData.valueDivisor += 1.00;
			}
			mData.valueSum = mData.valueToColor / mData.valueDivisor;

			// set names and colors for heatmap
			if (Math.round(mData.value) == 1) 
			{ // asleep
				mData.valueName = "Asleep";
				mData.color = myColor(mData.valueSum);
			} 
			else if (Math.round(mData.value) == 2) 
			{ // restless
				mData.valueName = "Restless";
				mData.color = myColor(mData.valueSum);
			} 
			else 
			{ //awake
				mData.valueName = "Awake";
				mData.color = "#ff0000";
			}
		});	
		// make heat map
  	svg.selectAll()
			.data(day['sleep']['minuteData'], function(mData) { return mData.dateVal+':'+mData.timeVal; } )
     	.enter()
     	.append("rect")
			.attr("x", function(mData) { return x(mData.timeVal) })
			.attr("y", function(mData) { return y(mData.dateVal) })
			.attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(mData) { return mData.color })
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave)
	});

	// print summary	
	var svg2 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", 500)
    .attr("height", 500)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

	// elements in separate text elements to have more control over paragraph style.
	// filled in with variables run through functions
  var text0 = svg2.append("text")
                  .text("SUMMARY:")
                  .attr("x", 0)
                  .attr("y", 0);

	var text1 = svg2.append("text")
						  	  .text(userName+" average bedtime is around "+getAverageTime(bedTimeArray)+", gets up at " + getAverageTime(wakeTimeArray)+",")
									.attr("x", 0)
									.attr("y", 15);

  var text2 = svg2.append("text")
                  .text("and spends an average of "+(Math.round(averageMinutes(bedDuration) / 60))+" hours in bed.")
                  .attr("x", 0)
                  .attr("y", 30);

	var text3 = svg2.append("text")
                  .text(userName+" bedtimes vary a little, ranging from "+minBedTime(bedTimeArray)+" to "+maxBedTime(bedTimeArray)+".")
                  .attr("x", 0)
                  .attr("y", 45);
 
	var text4 = svg2.append("text")
								  .text(userName+" also goes to sleep "+Math.round(averageMinutes(bedTimeDeviation(bedTimeArray)))+" minutes from their goal bedtime.")
								 	.attr("x", 0)
									.attr("y", 60);
 
	var text5 = svg2.append("text")
                  .text(userName+" wakes up or is restless sometimes during the night for an")
                  .attr("x", 0)
                  .attr("y", 75);

  var text6 = svg2.append("text")
                  .text("average of "+Math.round(averageMinutes(averageMinutesRestless))+" minutes per night. Above is a snapshot of the data.")
                  .attr("x", 0)
                  .attr("y", 90);
})
