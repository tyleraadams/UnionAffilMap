
$(document).ready(function() {


var state = d3.selectAll('path').attr('fill', function(d){
 
  // Get the ID of the path we are currently working with
  // Our SVG uses the state abbreviation for the ID
  var abbr = this.id;
 
  // Loop through the state data looking for
  // a match for that abbreviation
  // Then returning the corresponding president
  // who won that state, from the array we made earlier

  (function() {
    Dataset = [];
    d3.csv("1983.csv", function(data) {
      
        for(i=0;i<data.length;i++) {
            if (data[i]["Sector"] === "Total") {
                Dataset.push([data[i]["State"], data[i]["Members"]]);
            }
        }

      

      return Dataset;
    });
}());


  $.each(Dataset, function(key, data){
    if(data[0] == abbr){
      return parseFloat(data.members.replace(',',''));
    } else {
      console.log("wrong abbrev");
    }
  });
 
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
});

});