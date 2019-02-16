

$(document).ready(function(){

  var localrestid=0;
  if(window.location.href.indexOf("id") > -1) 
    {
      mealid=decodeURIComponent(urlParam('id'));
    }

      listmealinfo(mealid);


       //gives back all the info for a specific meal
      function listmealinfo(mealid){
        $.ajax({
          url:'http://localhost/project/back-end/public/meals/mymeal/'+mealid
        }).done(function(mealinfo){
          //alert(mealinfo.ingredients);
          let output='';
          output+= `
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ingredients</th>
                  <th>Price</th>
                  <th>Restaurant</th>
                </tr>
              </thead>
              <tbody class="allinfotable">
                <tr>
                  <td>${mealinfo.name}</td>
                  <td>${mealinfo.ingredients}</td>
                  <td>${mealinfo.price}</td> 
                  <td><a href="restinfo.html?id=${mealinfo.restaurant_id}">${restaurantname(mealinfo.restaurant_id)}</a></td>
                </tr>
              </tbody>
            </table>
              `;
          $('#mealitems').empty();
          $('#mealitems').append(output);
        });
      }

      //gives back the info of a specific restaurant
      function restaurantname(rid){
        var response = '';
        $.ajax({ async: true, type: "GET",   url:'http://localhost/project/back-end/public/restaurants/'+rid,   async: false,success : function(text)
            {
                response = text;
            }
        });
        return response.name;
      }

   function urlParam(name){
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }

});