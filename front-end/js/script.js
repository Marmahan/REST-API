

$(document).ready(function(){
      
   
      //search based on the ingredients
      $('#search-ingridient').click(function(event) {
        //$('#search-ing').empty();
        var searchvalue=$('#ing-value').val();
        searchmeals(searchvalue);
        return false;
      });

      //search based on the meal name
      $('#search-dish').click(function(event) {
        var searchvalue=$('#dish-value').val();
        searchmealsnames(searchvalue);
        return false;
      });

      //show a list of all menus
      $('#allmenu').click(function(event) {
        $('#search-ing').empty();
            listmeals();
      });

      //update menus
      $('#updatemenu').click(function(event) {
            updatemenus();
      });


      //display back restaurant info once clicked
      $('#rest1-info').click(function(event) {
            restaurantinfo(1);
      });

      //display back restaurant info once clicked
      $('#rest2-info').click(function(event) {
            restaurantinfo(2);
      });


      $('#rest3-info').click(function(event) {
            restaurantinfo(3);
      });

      //display back all the meals for a specific restaurant
      $('#rest1-menu').click(function(event){
            restaurantmeal(1);
      });

      //display back all the meals for a specific restaurant
      $('#rest2-menu').click(function(event){
            restaurantmeal(2);
      });

      //display back all the meals for a specific restaurant
      $('#rest3-menu').click(function(event){
            restaurantmeal(3);
      });

      //search the DB for any meal with a specific ingrideints, gives back the meal and its ingridient info
      function searchmeals(searchmeal){
        $.ajax({
          url:'http://localhost/project/back-end/public/meals/'+searchmeal
        }).done(function(meals){
          let output='';
          output+= `
            <table class="table table-hover">
              <thead>
                <tr>
                  <th> Number </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th>Name</th>
                  <th>ingredients</th>
                </tr>
              </thead>
              <tbody class="allinfotable">
              `;
              var counter=0;
          $.each(meals, function(key,meal){
              output+= `
                <tr>
                  <td>${++counter}</td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td><a href="mealinfo.html?id=${meal.id}">${meal.name}</a></td>
                  <td>${meal.ingredients}</td>
                </tr>
            `;
          });
          $('#items').empty();
          $('#search-ing').empty();
          $('#items').append(output);
        });
      }

      //search the meals based on the name of the meal
      function searchmealsnames(searchval){
        $.ajax({
          url:'http://localhost/project/back-end/public/meals/search/'+searchval
        }).done(function(meals){
          //console.log(meals);
          let output='';
          output+= `
            <table class="table table-hover">
              <thead>
                <tr>
                  <th> Number </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th>Name</th>
                  <th>ingredients</th>
                </tr>
              </thead>
              <tbody class="allinfotable">
              `;
              var counter=0;
          $.each(meals, function(key,meal){
            output+= `
                <tr>
                  <td>${++counter}</td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td><a href="mealinfo.html?id=${meal.id}">${meal.name}</a></td>
                  <td>${meal.ingredients}</td>
                </tr>
            `;

          });
          output+=`
            </tbody>
            </table>
          `;
         
          $('#items').empty();
          $('#search-ing').empty();
          $('#items').append(output);
        });
      }

       //gives back all the meals available in the DB with their restaurant info
      function listmeals(){
        $.ajax({
          url:'http://localhost/project/back-end/public/meals'
        }).done(function(meals){
          let output='';
          output+= `
            <table class="table table-hover">
              <thead>
                <tr>
                  <th> Number </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th> &nbsp; </th>
                  <th>Name</th>
                  <th>ingredients</th>
                </tr>
              </thead>
              <tbody class="allinfotable">
              `;
          $.each(meals, function(key,meal){
            output+= `
            
                <tr>
                  <td>${meal.id}</td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td> &nbsp; </td>
                  <td><a href="mealinfo.html?id=${meal.id}">${meal.name}</a></td>
                  <td>${meal.ingredients}</td>   
                </tr>

            `;

          });
          output+=`
            </tbody>
            </table>
          `;
         
          $('#items').empty();
          $('#items').append(output);
        });
      }


      //gives back the info of a specific restaurant
      function restaurantinfo(rid){
        $.ajax({
          url:'http://localhost/project/back-end/public/restaurants/'+rid
        }).done(function(restinfo){
          //console.log(restinfo);
          let output='';
          output+= `
            <li class="list-group-item">
              <strong>${restinfo.name}</strong>
            </li>
            <br>
            <li class="list-group-item">
              ${restinfo.address}
            </li>
            <li class="list-group-item">
              Phone: ${restinfo.phone}
            </li>
          `;

          $('#items').empty();
          $('#search-ing').empty();
          $('#items').append(output);
        });
        
      }

      //gives back the info of a specific restaurant
      function restaurantname(rid){
        var response;
        var response = '';
      $.ajax({ async: true, type: "GET",   url:'http://localhost/project/back-end/public/restaurants/'+rid,   async: false,success : function(text)
            {
                response = text;
            }
      });

      return response.name; 
  }

      $('#getmerest').click(function(event) {
            restaurantname(2);
      });

      //display back all the meals for a specific restaurant
      function restaurantmeal(rid){
        $.ajax({
          url:'http://localhost/project/back-end/public/meals/restmeals/'+rid
        }).done(function(meals){
          let output='';
          output+= `
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>ingredients</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody class="allinfotable">
              `;
              var counter=0;
          $.each(meals, function(key,meal){
            output+= `
                <tr>
                  <td>${++counter}</td>
                  <td>${meal.name}</td>
                  <td>${meal.ingredients}</td>
                  <td>${meal.price}</td> 
                </tr>
            `;
          });

          $('#items').empty();
          $('#search-ing').empty();
          $('#items').append(output);
        });
        

     }

      //update the menus of the database
      function updatemenus(){
        $.ajax({
          url:'http://localhost/project/back-end/public/meals/new'
        }).done(function(returnedvalue){
            alert(returnedvalue);
        });
      }
});