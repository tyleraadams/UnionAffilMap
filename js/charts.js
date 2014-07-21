//http://bl.ocks.org/rgdonohue/9280446

stateAbbrev = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};
 

  var width, height, projection, path, graticule, svg, attributeArray = [], currentAttribute = 0, playing = false;

  function init() {
    setMap();

    // animateMap(); write this method later
  }

  function setMap() {
    width = 960, height = 580;
    loadCsvData();
  }

  function loadCsvData() { 
    queue()
    .defer(d3.csv, "1983.csv")
    .await(processData);
  }


  function processData(error, stateData) {
    var states = d3.selectAll('path');

    var cleanStateData = [];
    for (var datum in stateData) {
      if (stateData[datum]["Sector"] === "Total") {
        cleanStateData.push([stateData[datum]["State"], stateData[datum]["Members"]]);
      }
    }
    
    for(var datum in cleanStateData) {
      states.each( function(data, index){
         if( cleanStateData[datum][0] === d3.select(this).attr("id") ) {
            d3.select(this).attr("unionMembers",  cleanStateData[datum][1]);
         } 
      });

    drawMap();
      
    }
  
  function drawMap() {
    d3.selectAll('.state')
    .attr('fill-opacity', function(d) {
      console.log(d);
        return getColor(d.attr("unionMembers"), dataRange);  // give them an opacity value based on their current value
    });
  }
  

  function sequenceMap() {
    var dataRange = getDataRange();
  }

  function getColor(valueIn, valuesIn) {

    var color = d3.scale.linear() // create a linear scale
      .domain([valuesIn[0],valuesIn[1]])  // input uses min and max values
      .range([.3,1]);   // output for opacity between .3 and 1 %

    return color(valueIn);  // return that number to the caller
}

  function getDataRange() {
    var min = Infinity, max = -Infinity;  
    d3.selectAll('.state')
    .each(function(d,i) {
      var currentValue = d.attr["unionMembers"];
      if(currentValue <= min && currentValue != -99 && currentValue != 'undefined') {
        min = currentValue;
      }
      if(currentValue >= max && currentValue != -99 && currentValue != 'undefined') {
        max = currentValue;
      }
  });
  return [min,max];  //boomsauce
  }
}


    
// var state = d3.selectAll('path').attr('fill', function(d){
 
  // Get the ID of the path we are currently working with
  // Our SVG uses the state abbreviation for the ID




 // for(i=0;i<data.length;i++) {
 //          if (data[i]["Sector"] === "Total") {
 //              Dataset.push([data[i]["State"], data[i]["Members"]]);
 //          }
 //        }
 //    });
 //    $.each(Dataset, function(key, data){
 //    console.log(abbrev);
 //    for(var abbrev in stateAbbrev){
 //      console.log(abbrev);
 //    if(data[0] === stateAbbrev[abbrev]){
 //      console.log( parseFloat(data.Members.replace(',','')));
 //    } else {
 //      console.log("wrong abbrev");
 //    }
 //  }
 //  });
 
  // Return colors
  // based on data          
  // if(state_members > 20000){
  //   return "blue";
  // }
  // else if(state_members > 50000){
  //   return "red";
  // }
  // else {
  //   return "#CCC";
  // }
window.onload = init();
