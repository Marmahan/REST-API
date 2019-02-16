<?php

namespace App;
use App\Restaurant;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    public function getrestaurantid(){
    	return Restaurant::where('id',$this->restaurant_id)->first()->id;
    }

    public function getrestaurantname(){
        return Restaurant::where('id',$this->restaurant_id)->first()->name;
    }
}
