var server = "https://b26876kqee.execute-api.ap-south-1.amazonaws.com/prod";

var date = "2021-03-08";

var api_key = "wQlhIS7cNgNjcR404qcLP6nlUjtuyX612blvU0e5";
const tableHtml = document.querySelector(".tabledata");
    // First, show the list of events
var url = server + "/neo/rest/v1/feed" + "?start_date=" + date +"&end_date=" + date + "&api_key=" + api_key;

fetch(url)
  .then(response => response.json())
  .then(x => {
        json_objects = x.near_earth_objects;
        console.log(json_objects);
        var table = '<table id="NEO_table" class="tablesorter tablesorter-default" border="1" cellpadding="5">'
        + '<tr><td>Object ID</td><td>name</td><td>nasa JPL resource</td><tr>';
        Object.keys(json_objects).forEach(function(key) {
            json_objects[key].forEach(object => {
                
 //               table += "<tr><td>"+object.id+"</td><td>"+object.name+"</td></tr>";

                table += "<tr><td>"+object.id+"</td><td>"
                +object.name+"</td><td>"
                +"<a href="+object.nasa_jpl_url+">More info</a>"
                +"</td></tr>";

            });
          });
          table += "</table>";
          tableHtml.innerHTML = table;
          console.log(table);  
    });