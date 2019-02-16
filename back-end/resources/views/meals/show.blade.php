<h1>meal.show view meal search</h1>


@foreach($all_meals as $meal)
	<h1>{{ $meal->name }} <small>Offered by <a href="
		{{ url('restaurants/'. $meal->getrestaurantid()) }}">{{$meal->getrestaurantname()}}</a></small></h1>

	<p>{{ $meal->price }}</p>
	<p>{{ $meal->ingredients }}</p>
@endforeach
