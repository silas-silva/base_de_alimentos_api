
function generate(jsonArray){
    var tBody = document.getElementById("table-body");      

    var data = JSON.parse(jsonArray);

    data.forEach(function(row){     
        if (row) {        
            var tRow = document.createElement("tr");        
            for(var i=0; i<row.length; i++){      
                var tCol = document.createElement("td");              
                tCol.textContent = row[i];                       
                tRow.appendChild(tCol);          
            }            
            tBody.appendChild(tRow);     
        }
    });
}
  
  