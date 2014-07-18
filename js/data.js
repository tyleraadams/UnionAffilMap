(function() {
    var dataset = [];
    d3.csv("1983.csv", function(data) {
      
        for(i=0;i<data.length;i++) {
            if (data[i]["Sector"] === "Total") {
                dataset.push([data[i]["State"], data[i]["Members"]]);
            }
        }

      

      console.log(dataset);
    });
}());