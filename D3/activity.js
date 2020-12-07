// Wyatt Merians
// activity.js
// 12/7/2020

// Set up to parse FitBit dates and time and get outputs
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

// Rows and columns (placement of heatmap
var myTimes = [ 
								"00:00","00:15","00:30","00:45",
								"01:00","01:15","01:30","01:45",
								"02:00","02:15","02:30","02:45",
								"03:00","03:15","03:30","03:45",
								"04:00","04:15","04:30","04:45",
								"05:00","05:15","05:30","05:45",
								"06:00","06:15","06:30","06:45",
								"07:00","07:15","07:30","07:45",
								"08:00","08:15","08:30","08:45",
								"09:00","09:15","09:30","09:45",
								"10:00", "10:15", "10:30", "10:45",
								"11:00", "11:15", "11:30", "11:45",
								"12:00", "12:15", "12:30", "12:45",
								"13:00", "13:15", "13:30", "13:45",
								"14:00", "14:15", "14:30", "14:45",
								"15:00", "15:15", "15:30", "15:45",
								"16:00", "16:15", "16:30", "16:45",
								"17:00", "17:15", "17:30", "17:45",
								"18:00", "18:15", "18:30", "18:45",
								"19:00", "19:15", "19:30", "19:45",
								"20:00", "20:15", "20:30", "20:45",
								"21:00", "21:15", "21:30", "21:45",
								"22:00", "22:15", "22:30", "22:45",
 								"23:00", "23:15", "23:30", "23:45"
							]
var myDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


// Labels
var xTime = d3.scaleTime()
	.range([0, width])
	.domain([new Date("1900-01-01 00:00:00"), new Date("1900-01-02 00:00:00")])
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

var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateRgb("white", "#8b0000"))
    .domain([1,200])

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
 
// Three functions that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
  tooltip
  	.style("opacity", 1)
  d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
}
var mousemove = function(d) {
	tooltip
  	.html("At " + d.printTime + " on " + d.printDate  + ": " + d.value + " calories")
   	.style("left", (d3.mouse(this)[0]+70) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}

var mouseleave = function(d) {
  tooltip
  	.style("opacity", 0)
  d3.select(this)
  	.style("stroke", "none")
}

//Read the data
d3.json("data.json", function(data)
{
	data['data'].forEach(function(day) 
	{
		// Daylength used to ensure don't go past num elements when averaging before and after heatmaps
		// average ensures smoother heatmap transitions
		dayLength = day['activity']['caloriesIntraday']['dataset'].length - 1;
		iterator = 0;
		day['activity']['caloriesIntraday']['dataset'].forEach(function(mData) 
		{
			mData.count = iterator++;
			// same day for sleep and activity so this is usable
			mData.dateVal = parseDate(day['sleep']['dateOfSleep']);
			mData.printDate = printFormatDate(mData.dateVal);
			mData.dateVal = formatDate(mData.dateVal);	

			mData.timeVal = parseTime(mData['time']);
			mData.printTime = printFormatTime(mData.timeVal);
			mData.timeVal = formatTime(mData.timeVal);
			mData.value = +mData['value'];
			mData.value = mData.value.toFixed(2);

			// get average
			mData.valueToColor = parseFloat(mData.value);
			mData.valueDivisor = 1.00;
			if (mData.count > 0) 
			{
				mData.valueToColor += parseFloat(day['activity']['caloriesIntraday']['dataset'][mData.count - 1]['value']);
				mData.valueDivisor += 1.00;
			}
			if (mData.count < dayLength) 
			{
				mData.valueToColor += parseFloat(day['activity']['caloriesIntraday']['dataset'][mData.count + 1]['value']);
				mData.valueDivisor += 1.00;
			}
			mData.valueSum = mData.valueToColor / mData.valueDivisor;

			mData.color = myColor(mData.valueSum);
		});	

		// set up heat map
  	svg.selectAll()
			.data(day['activity']['caloriesIntraday']['dataset'], function(mData) { return mData.dateVal+':'+mData.timeVal; } )
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
})
