<h1>Restaurants.index view</h1>


@foreach($all_restaurants as $restaurant)
	<h1>{{ $restaurant->name }} </h1>

	<p>{{ $restaurant->address }}</p>
	<p>{{ $restaurant->phone }}</p>
@endforeach
