<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
//get resturant info
Route::get('meals/restmeals/{restid}', 'MealController@restmeals');
//search the ingridients of the meals for a specific restaurant
Route::get('meals/restmeals/{restid}/search/{ing}', 'MealController@searchrestmeals');
//to parse data and store it on the database
Route::get('meals/new', 'MealController@newmeal');
//search the dish name
Route::get('meals/search/{dish}', 'MealController@searchmeals');

//get the info of the meal (name, price, ingridient, restinfo)
Route::get('meals/mymeal/{id}', 'MealController@mealinfo');

Route::resource('meals', 'MealController');

Route::resource('restaurants', 'RestaurantController');