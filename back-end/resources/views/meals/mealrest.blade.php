<h1>Meals.rest view</h1>


@foreach($all_meals as $meal)
	<h1>{{ $meal->name }} </h1>

	<p>{{ $meal->price }}</p>
@endforeach
