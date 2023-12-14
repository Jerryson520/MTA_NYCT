// Initial setup
var margin1 = { top1: 30, right1: 30, bottom1: 60, left1: 60 };
var width1 = 600 - margin1.left1 - margin1.right1;
var height1 = 400 - margin1.top1 - margin1.bottom1;
var svg1 = d3.select("div#plot")
  .append("svg")
  .attr("width", 600)
  .attr("height", 400)
  .append("g")
  .attr("transform", "translate(" + margin1.left1 + "," + margin1.top1 + ")");

// Initial scales
var xScale = d3.scaleBand().range([0, width1]).paddingInner(0.1);
var yScale = d3.scaleLinear().range([height1, 0]);

// Adding X-axis
svg1.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + height1 + ")");

// Adding Y-axis
svg1.append("g")
  .attr("class", "y-axis");

// Initial data - taken from results section
var data = [
  { Borough: "Bronx", DayType: "Weekday", avg: 0.2481818 },
  { Borough: "Bronx", DayType: "Weekend", avg: 0.2447414 },
  { Borough: "Brooklyn", DayType: "Weekday", avg: 0.3165536 },
  { Borough: "Brooklyn", DayType: "Weekend", avg: 0.2095380 },
  { Borough: "Queens", DayType: "Weekday", avg: 0.2665650 },
  { Borough: "Queens", DayType: "Weekend", avg: 0.1842582 },
  { Borough: "Staten Island", DayType: "Weekday", avg: 0.3946081 },
  { Borough: "Staten Island", DayType: "Weekend", avg: 0.3723544 }
];

// Adding a custom color scale for each borough
var customColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"];

var colorScale = d3.scaleOrdinal()
  .domain(data.map(d => d.Borough))
  .range(customColors);

// Adding labels on x and y
svg1.append("text")
  .attr("transform", "translate(" + (width1 / 2) + " ," + (height1 + margin1.top1 + 20) + ")")
  .style("text-anchor", "middle")
  .text("Day Type")
  .style("font-weight", "bold");

svg1.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin1.left1)
  .attr("x", 0 - (height1 / 2) - 40)
  .attr("dy", "1em")
  .text("Average Load")
  .style("font-weight", "bold");

// Initial chart
updateBorough("Bronx");

// Function to update the chart
function updateBorough(selectedBorough) {

  // Filter data for the selected borough
  var filteredData1 = data.filter(d => d.Borough === selectedBorough);

  // Update scales based on filtered data
  xScale.domain(filteredData1.map(d => d.DayType));
  yScale.domain([0, d3.max(filteredData1, d => d.avg)]);

  // Update X-axis
  svg1.select(".x-axis")
    .transition()
    .duration(1000)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("transform", "rotate(-45)");

  // Update Y-axis
  svg1.select(".y-axis")
    .transition()
    .duration(1000)
    .call(d3.axisLeft(yScale));

  // Update bars
  var bars = svg1.selectAll(".bar")
    .data(filteredData1);

  bars.exit().remove(); // Remove bars that are not needed anymore

  bars.enter().append("rect")
    .attr("class", "bar")
    .attr("y", height1) // Initial position for entering bars
    .merge(bars) // Merge the new and existing bars
    .transition()
    .duration(500)
    .attr("x", d => xScale(d.DayType))
    .attr("width", xScale.bandwidth())
    .attr("y", d => yScale(d.avg))
    .attr("height", d => height1 - yScale(d.avg))
    .attr("fill", d => colorScale(d.Borough));

  svg1.select(".chart-title").remove(); // removing a title for a bar
  svg1.append("text") // adding title for each borough
    .attr("class", "chart-title")
    .attr("x", width1 / 2)
    .attr("y", -margin1.top1 / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Average load over weekdays and weekends for " + selectedBorough);
}

// 2nd interactive plot

var data2 = [
  { "Borough": "Bronx", "Hour": 0, "Count": 438 },
  { "Borough": "Bronx", "Hour": 1, "Count": 135 },
  { "Borough": "Bronx", "Hour": 2, "Count": 0 },
  { "Borough": "Bronx", "Hour": 3, "Count": 0 },
  { "Borough": "Bronx", "Hour": 4, "Count": 41 },
  { "Borough": "Bronx", "Hour": 5, "Count": 212 },
  { "Borough": "Bronx", "Hour": 6, "Count": 517 },
  { "Borough": "Bronx", "Hour": 7, "Count": 690 },
  { "Borough": "Bronx", "Hour": 8, "Count": 845 },
  { "Borough": "Bronx", "Hour": 9, "Count": 775 },
  { "Borough": "Bronx", "Hour": 10, "Count": 881 },
  { "Borough": "Bronx", "Hour": 11, "Count": 907 },
  { "Borough": "Bronx", "Hour": 12, "Count": 907 },
  { "Borough": "Bronx", "Hour": 13, "Count": 930 },
  { "Borough": "Bronx", "Hour": 14, "Count": 872 },
  { "Borough": "Bronx", "Hour": 15, "Count": 880 },
  { "Borough": "Bronx", "Hour": 16, "Count": 902 },
  { "Borough": "Bronx", "Hour": 17, "Count": 894 },
  { "Borough": "Bronx", "Hour": 18, "Count": 875 },
  { "Borough": "Bronx", "Hour": 19, "Count": 876 },
  { "Borough": "Bronx", "Hour": 20, "Count": 827 },
  { "Borough": "Bronx", "Hour": 21, "Count": 834 },
  { "Borough": "Bronx", "Hour": 22, "Count": 792 },
  { "Borough": "Bronx", "Hour": 23, "Count": 712 },
  { "Borough": "Brooklyn", "Hour": 0, "Count": 95 },
  { "Borough": "Brooklyn", "Hour": 1, "Count": 0 },
  { "Borough": "Brooklyn", "Hour": 2, "Count": 0 },
  { "Borough": "Brooklyn", "Hour": 3, "Count": 0 },
  { "Borough": "Brooklyn", "Hour": 4, "Count": 1 },
  { "Borough": "Brooklyn", "Hour": 5, "Count": 227 },
  { "Borough": "Brooklyn", "Hour": 6, "Count": 317 },
  { "Borough": "Brooklyn", "Hour": 7, "Count": 387 },
  { "Borough": "Brooklyn", "Hour": 8, "Count": 420 },
  { "Borough": "Brooklyn", "Hour": 9, "Count": 421 },
  { "Borough": "Brooklyn", "Hour": 10, "Count": 484 },
  { "Borough": "Brooklyn", "Hour": 11, "Count": 595 },
  { "Borough": "Brooklyn", "Hour": 12, "Count": 603 },
  { "Borough": "Brooklyn", "Hour": 13, "Count": 547 },
  { "Borough": "Brooklyn", "Hour": 14, "Count": 536 },
  { "Borough": "Brooklyn", "Hour": 15, "Count": 588 },
  { "Borough": "Brooklyn", "Hour": 16, "Count": 454 },
  { "Borough": "Brooklyn", "Hour": 17, "Count": 475 },
  { "Borough": "Brooklyn", "Hour": 18, "Count": 424 },
  { "Borough": "Brooklyn", "Hour": 19, "Count": 366 },
  { "Borough": "Brooklyn", "Hour": 20, "Count": 317 },
  { "Borough": "Brooklyn", "Hour": 21, "Count": 280 },
  { "Borough": "Brooklyn", "Hour": 22, "Count": 229 },
  { "Borough": "Brooklyn", "Hour": 23, "Count": 232 },
  { "Borough": "Queens", "Hour": 0, "Count": 32 },
  { "Borough": "Queens", "Hour": 1, "Count": 0 },
  { "Borough": "Queens", "Hour": 2, "Count": 0 },
  { "Borough": "Queens", "Hour": 3, "Count": 0 },
  { "Borough": "Queens", "Hour": 4, "Count": 0 },
  { "Borough": "Queens", "Hour": 5, "Count": 290 },
  { "Borough": "Queens", "Hour": 6, "Count": 774 },
  { "Borough": "Queens", "Hour": 7, "Count": 908 },
  { "Borough": "Queens", "Hour": 8, "Count": 869 },
  { "Borough": "Queens", "Hour": 9, "Count": 631 },
  { "Borough": "Queens", "Hour": 10, "Count": 499 },
  { "Borough": "Queens", "Hour": 11, "Count": 406 },
  { "Borough": "Queens", "Hour": 12, "Count": 457 },
  { "Borough": "Queens", "Hour": 13, "Count": 450 },
  { "Borough": "Queens", "Hour": 14, "Count": 484 },
  { "Borough": "Queens", "Hour": 15, "Count": 678 },
  { "Borough": "Queens", "Hour": 16, "Count": 913 },
  { "Borough": "Queens", "Hour": 17, "Count": 1043 },
  { "Borough": "Queens", "Hour": 18, "Count": 959 },
  { "Borough": "Queens", "Hour": 19, "Count": 637 },
  { "Borough": "Queens", "Hour": 20, "Count": 348 },
  { "Borough": "Queens", "Hour": 21, "Count": 303 },
  { "Borough": "Queens", "Hour": 22, "Count": 159 },
  { "Borough": "Queens", "Hour": 23, "Count": 209 },
  { "Borough": "Staten Island", "Hour": 0, "Count": 253 },
  { "Borough": "Staten Island", "Hour": 1, "Count": 206 },
  { "Borough": "Staten Island", "Hour": 2, "Count": 103 },
  { "Borough": "Staten Island", "Hour": 3, "Count": 122 },
  { "Borough": "Staten Island", "Hour": 4, "Count": 537 },
  { "Borough": "Staten Island", "Hour": 5, "Count": 762 },
  { "Borough": "Staten Island", "Hour": 6, "Count": 878 },
  { "Borough": "Staten Island", "Hour": 7, "Count": 946 },
  { "Borough": "Staten Island", "Hour": 8, "Count": 983 },
  { "Borough": "Staten Island", "Hour": 9, "Count": 667 },
  { "Borough": "Staten Island", "Hour": 10, "Count": 439 },
  { "Borough": "Staten Island", "Hour": 11, "Count": 424 },
  { "Borough": "Staten Island", "Hour": 12, "Count": 421 },
  { "Borough": "Staten Island", "Hour": 13, "Count": 512 },
  { "Borough": "Staten Island", "Hour": 14, "Count": 799 },
  { "Borough": "Staten Island", "Hour": 15, "Count": 1014 },
  { "Borough": "Staten Island", "Hour": 16, "Count": 1014 },
  { "Borough": "Staten Island", "Hour": 17, "Count": 1027 },
  { "Borough": "Staten Island", "Hour": 18, "Count": 1070 },
  { "Borough": "Staten Island", "Hour": 19, "Count": 921 },
  { "Borough": "Staten Island", "Hour": 20, "Count": 508 },
  { "Borough": "Staten Island", "Hour": 21, "Count": 368 },
  { "Borough": "Staten Island", "Hour": 22, "Count": 315 },
  { "Borough": "Staten Island", "Hour": 23, "Count": 258 }
];


var margin2 = { top2: 30, right2: 30, bottom2: 60, left2: 60 };
var width2 = 600 - margin2.left2 - margin2.right2;
var height2 = 400 - margin2.top2 - margin2.bottom2;

var svg2 = d3.select("div#lineplot")
  .append("svg")
  .attr("width", 600)
  .attr("height", 400)
  .append("g")
  .attr("transform", "translate(" + margin2.left2 + "," + margin2.top2 + ")");

var customColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"];
var colorScale2 = d3.scaleOrdinal()
  .domain(data2.map(d => d.Borough))
  .range(customColors);

var xScale2 = d3.scaleLinear()
  .domain([0, 23])
  .range([0, width2]);

var yScale2 = d3.scaleLinear()
  .domain([0, d3.max(data2, d => d.Count)])
  .range([height2, 0]);

svg2.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + height2 + ")");

svg2.append("g")
  .attr("class", "y-axis");

var line = d3.line()
  .x(d => xScale2(d.Hour))
  .y(d => yScale2(d.Count));

// Initial draw with a default borough
drawLine("Bronx");

function drawLine(selectedBorough) {
  // Clear existing SVG content
  svg2.selectAll("*").remove();

  // Filter data for the selected borough
  var filteredData2 = data2.filter(d => d.Borough === selectedBorough);


  // Update scales with filtered data
  xScale2.domain([0, 23]);
  yScale2.domain([0, d3.max(filteredData2, d => d.Count)]);

  // Adding a line
  svg2.append("path")
    .data([filteredData2])
    .attr("class", "line")
    .attr("d", line)
    .style("stroke", colorScale2(selectedBorough))
    .style("fill", "none");

  // Adding a tooltip
  var tooltip = d3.select("div#lineplot").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  svg2.selectAll("circle")
    .data(filteredData2)
    .enter().append("circle")
    .attr("class", "tooltip")
    .attr("cx", d => xScale2(d.Hour))
    .attr("cy", d => yScale2(d.Count))
    .attr("r", 5)
    .style("fill", colorScale2(selectedBorough))
    .on("mouseover", (event, d) => {
      var xPosition = parseFloat(d3.select(event.target).attr("cx"));
      var yPosition = parseFloat(d3.select(event.target).attr("cy"));
      tooltip.transition().duration(200).style("opacity", .9);
      tooltip.html("Frequency of this trip: " + (d.Count !== undefined ? d.Count : "Not available"))
        .style("left", (xPosition + margin2.left2) + "px")
        .style("top", (yPosition + margin2.top2) + "px");
    })
  .on("mouseout", function() {
    // Removing the tooltip
    tooltip.transition().duration(500).style("opacity", 0);
  });

  // Adding axes
  svg2.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(xScale2));

  svg2.append("g")
    .transition()
    .duration(1000)
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale2));

  // Adding labels and title
  svg2.append("text")
    .attr("x", width2 / 2)
    .attr("y", height2 + margin2.bottom2 - 10)
    .attr("text-anchor", "middle")
    .text("Hour of the Day (h)")
    .style("font-weight", "bold");

  svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - height2 / 2)
    .attr("y", 0 - margin2.left2)
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text("Frequency of Trips")
    .style("font-weight", "bold");

  svg2.select(".chart-title").remove(); // removing a title for a bar
  svg2.append("text") // adding title for each borough
    .attr("class", "chart-title")
    .attr("x", width2 / 2 )
    .attr("y", margin2.top2 - 40)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Frequency of trips during each hour of the day for " + selectedBorough);
}
