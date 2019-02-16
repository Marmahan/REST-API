$(document).ready(function(){
  		//searchmeals('sauce');
  		//listmeals();
  		//restaurantinfo(2);
  		//restaurantname(2);

      // $('.allinfotable').on('click', function() {
      //     alert('clicked');
      //   });

      // $('#allmenu').click(function(event) {
      //       listmeals();
      // });

      $('#search-ingridient').click(function(eve){
        var searchvalue=$('#ing-value').val();
        searchmeals(searchvalue);
      });

      // //display back restaurant info once clicked
      // $('#rest1-info').click(function(event) {
      //       restaurantinfo(1);
      // });

      // $('#rest2').click(function(event) {
      //       restaurantinfo(2);
      // });

      // $('#rest3').click(function(event) {
      //       restaurantinfo(3);
      // });

      // //display back restaurant info once clicked
      // $('#rest1-info').click(function(event) {
      //       restaurantinfo(1);
      // });

      // //display back all the meals for a specific restaurant
      // $('#rest1-menu').click(function(event){
      //       restaurantmeal(1);
      // });

      

  		//search the DB for any meal with a specific ingrideints, gives back the meal and its resturant info
  		function searchmeals(searchmeal){
  			$.ajax({
  				url:'http://localhost/project/back-end/public/meals/'+searchmeal
  			}).done(function(meals){
  				let output='';
  				$.each(meals, function(key,meal){
  					// console.log(meal.name);
  					// console.log(restaurantinfo(meal.restaurant_id));
  					output+= `
  					<li class="list-group-item">
  						${meal.name}
  						<small>Offered by: </small>
  						${restaurantname(meal.restaurant_id)};
  					</li>
  					`;
  				});
          //$('#items').empty();
  				$('#items').append(output);
  			});
  		}
});
  		/* //gives back all the meals available in the DB with their restaurant info
  		function listmeals(){
  			$.ajax({
  				url:'http://localhost/project/back-end/public/meals'
  			}).done(function(meals){
  				//console.log(meals);
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
              `;
  				$.each(meals, function(key,meal){
  					// console.log(meal.name);
  					// console.log(meal.price);
  					// console.log(meal.ingredients);
  					// console.log(restaurantname(meal.restaurant_id));
  					output+= `
                <tr>
                  <td>${meal.name}</td>
                  <td>${meal.ingredients}</td>
                  <td>${meal.price}</td>
                  <td><a href="restinfo.html?id=${meal.restaurant_id}">${restaurantname(meal.restaurant_id)}</a></td>
                </tr>
  					`;

  				});
          output+=`
            </tbody>
            </table>
          `;
         
          //$('#items').empty();
  				$('#items').append(output);
  			});
  		}

      //show specific restaurant info
      //called after getting clicked by the link of the restaurant
      //trim resturant id
      function getmerestinfo(restinfo){
        var id=restinfo.replace('restid', '');
        restaurantinfo(id);

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
  						${restinfo.name}
  						<small>Address: </small>
  						${restinfo.address}
  					</li>
  				`;

         
          //$('#items').empty();
  				$('#items').append(output);
  			});
  			
  		}

  		//gives back the info of a specific restaurant
  		function restaurantname(rid){
  			// var restname=$.ajax({
  			// 	url:'http://localhost/project/back-end/public/restaurants/'+rid
  			// }).done(function(restinfo){
  			// 	//return restinfo;
  			// });
  			// console.log(restname);
  			var response = '';
			$.ajax({ async: true, type: "GET",   url:'http://localhost/project/back-end/public/restaurants/'+rid,   async: false,success : function(text)
         		{
             		response = text;
        	 	}
			});

			//console.log(response.name);
			return response.name;

  		}
  	});
*/

      // //display back all the meals for a specific restaurant
      // function restaurantmeal(rid){
      //   $.ajax({
      //     url:'http://localhost/project/back-end/public/meals/restmeals/'+rid
      //   }).done(function(meals){
      //     //console.log(mealinfo);
      //     let output='';
      //     $.each(meals, function(key,meal){
      //     output+= `
      //       <li class="list-group-item">
      //         ${meal.name}
      //         <small>Price: </small>
      //         ${meal.price}
      //       </li>
      //     `;
      //     });

      //    // $('#items').empty();
      //     //$('#seach-ing').empty();
      //     $('#items').append(output);
      //   });
        

     // }