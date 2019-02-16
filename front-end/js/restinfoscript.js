

$(document).ready(function(){

  //parse the id value from the url
  var localrestid=0;
  if(window.location.href.indexOf("id") > -1) 
    {
      localrestid=decodeURIComponent(urlParam('id'));
    }

    //show resturant info, we go to this page only when we want to show restaurant info
    localrestaurantinfo(localrestid);
    $('#rest-search-ing').hide();//hide the search form


      //show the list of meals for the specific restaurant
      $('#restmenu').click(function(event) {
          $('#rest-search-ing').hide();
          $('#items').empty();
          $('#items').show();
          listmeals(localrestid);
          $('#restorantinfo').removeClass('active');
          $('#restmenu').addClass('active');
          $('#localsearch').removeClass('active');
      });

      //show resturant info when pressed in the navbar
      $('#restorantinfo').click(function(e){
        localrestaurantinfo(localrestid);
        $('#restorantinfo').addClass('active');
        $('#restmenu').removeClass('active');
        $('#localsearch').removeClass('active');
      });

      //show the search form 
      $('#localsearch').click(function(event) {
          $('#rest-search-ing').show();
          $('#items').hide();
          $('#restorantinfo').removeClass('active');
          $('#restmenu').removeClass('active');
          $('#localsearch').addClass('active');
      });

      //activate the search with Enter key
      $("#localing-value").keyup(function(event) {
          if (event.keyCode === 13) {
              $("#localsearch-ingridient").click();
          }
      });
      $('#localsearch-ingridient').click(function(e) {
         e.preventDefault()
        var searchvalue=$('#localing-value').val();
        localsearchmeals(localrestid,searchvalue);
        //return false;
      });


       //gives back all the meals available in the DB for a specific restaurant based on search
      function localsearchmeals(rid,ing){
        $.ajax({
          url:'http://localhost/project/back-end/public/meals/restmeals/'+rid+'/search/'+ing
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
          output+=`
            </tbody>
            </table>
          `;
            $('#rest-search-ing').hide();
            $('#items').empty();
            $('#items').show();

          $('#items').append(output);
        });
      }

       //gives back all the meals available in the DB for a specific restaurant
      function listmeals(rid){
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
          output+=`
            </tbody>
            </table>
          `;
         
          $('#items').empty();
          $('#items').append(output);
        });
      }

      //gives back the info of a specific restaurant
      function localrestaurantinfo(rid){
        $.ajax({
          url:'http://localhost/project/back-end/public/restaurants/'+rid
        }).done(function(restinfo){
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

          $('#rest-search-ing').hide();
          $('#items').empty();
          $('#items').show();

          $('#items').append(output);
        });
      }

   function urlParam(name){
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }

});