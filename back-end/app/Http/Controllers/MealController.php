<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Meal;
use App\Mycurrentday;
use Carbon\Carbon;

//for the parsing
require 'vendor/autoload.php';
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\CssSelector\CssSelectorConverter;

class MealController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $meals= Meal::all();
        return response()->json($meals);

        //go back to the view called index located in the folder meals
        //return view('meals.index', ['all_meals' => $meals]);
    }

    //get the meals of a specific rest
    public function restmeals($id){
        $meals = Meal::where('restaurant_id', $id)->get();
        return response()->json($meals);

        //return view('meals.mealrest', ['all_meals' => $meals]);
    }

    //search the ingridients of a specific restaurant
    public function searchrestmeals($restid, $ing){

       $words = $ing;
       $rid=$restid;
       $meals= Meal::where(function ($query) use ($words, $rid) {
              $query->where('ingredients', 'like', '%' . $words . '%')->where('restaurant_id', $rid);
         })->get();

        return response()->json($meals);
        //return view('meals.mealrestsearch', ['all_meals' => $meals]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function searchmeals($mealname){
        $words = $mealname;
        $query = Meal::where(function ($query) use ($words) {
              $query->where('name', 'like', '%' . $words . '%');
         })->get();

        return response()->json($query);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //search for a specific ingredients
    public function show($id)
    {
        $words = $id;
        $query = Meal::where(function ($query) use ($words) {
              $query->where('ingredients', 'like', '%' . $words . '%');
         })->get();

        return response()->json($query);
        //go to the view called show in the folder meals
        //return view('meals.show', ['all_meals' => $query]);
    }

    //gives back the info of the meal based on the id of the meal
    public function mealinfo($id)
    {
        $mealinfo = Meal::find($id);
        return response()->json($mealinfo);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    //update the database with the new menu
     public function newmeal(){
        
        $returnedvalue='default value';
        //find the stored date of the last update in the database
        $myday = Mycurrentday::find(1);

        //same month
        if(date("m")==$myday->mymonth){
            //$returnedvalue='same month';
             //same day
            if ((date("d")-$myday->mytoday)<1) 
                $returnedvalue= "Too many updates";
             //next day
            else if ((date("d")-$myday->mytoday)==1 && ($myday->myhour > date("H"))) 
                 $returnedvalue= "Too many updates";

        }
        //different month
        else if(date("m")!=$myday->mymonth){
            //must check if the updated happend like two months ago not just one month
            //maybe just a simple condition 
             //first day of the month
              if ((($myday->mytoday-date("d")==29) || ($myday->mytoday-date("d")==30)) && ($myday->myhour > date("H"))) 
                 $returnedvalue= "Too many updates";

         }
         if($returnedvalue!='default value')
         {

            return $returnedvalue;
        }
        else
        {

            //delete everything first, delete all old meals records.
             Meal::truncate();

            //set id back to start from one again
            Meal::query("alter table meals auto_increment = 1;");
            ///////-----------------------Restaurant 1-------------------------/////////
            //url
            $url='http://pizzeria-mario-lino.de/menu/speisekarte';
            $client = new \GuzzleHttp\Client();
            $res = $client->request('GET', $url);

            $html= ''.$res->getBody();


            $crawler = new Crawler($html);

            //number of description must be removed.
             //loop through the values
             $items = $crawler->filter('.menu-items > li')->each(function (Crawler $node, $i)  {
                 //echo $node->html();
                 $name= $node->filter('.grid2column')->text();
                 //remove numbers from the name
                 $name = preg_replace('/[0-9]+/', '', $name);
                 //remove '.' from the name
                 $name=trim($name,'.');
                 $price= $node->filter('.lastcolumn')->text(); 
                 //take the € sign from the price
                 $price = trim($price,'€');
                 $price = trim($price,' €');
                 $ing= $node->filter('.item-description-menu')->text();

                 $meals=['name'=>$name,'price'=>$price,'ing'=>$ing];
                 return $meals;

             });
            
            foreach ($items as $item) {
                $new_meal = new Meal;
                $new_meal->restaurant_id= 1;
                $new_meal->name= $item['name'];
                $new_meal->price= $item['price'];
                $new_meal->ingredients= $item['ing'];
                $new_meal->save();
             }
            /*-----------------------------------------------------------------------------*/
            //restaurant 2
            // // //url
             $url='http://www.sanmatteopanuozzo.com/menu-list/';
             $client = new \GuzzleHttp\Client();
             $res = $client->request('GET', $url);

              $html= ''.$res->getBody();


              $crawler = new Crawler($html);


              //loop through the values
              $items = $crawler->filter('.gdlr-menu-item-content')->each(function (Crawler $node, $i)  {

                   $name= $node->filter('.menu-title')->text();
                   $price= $node->filter('.menu-price')->text();
                    //take the € sign from the price
                    $price = trim($price,'$');
                    $ing= $node->filter('.menu-info')->text();

                 $meals=['name'=>$name,'price'=>$price,'ing'=>$ing];
                 return $meals;

              });

     

            foreach ($items as $item) {
                $new_meal2 = new Meal;
                //delete two titles that contain the word special, they're not meals
                if (strpos($item['name'],'Special') !== false || strpos($item['name'],'SPECIAL') !== false) {
                    continue;
                }
                $new_meal2->restaurant_id= 2;
                $new_meal2->name= $item['name'];
                $new_meal2->price= $item['price'];
                $new_meal2->ingredients= $item['ing'];
                $new_meal2->save();
             }
            /*-----------------------------------------------------------------------------*/
            //Resturant 3
            //url
             $url='http://bakerspizzanyc.com/menu/';
             $client = new \GuzzleHttp\Client();
             $res = $client->request('GET', $url);

              $html= ''.$res->getBody();


              $crawler = new Crawler($html);

             $price="not available";
              //loop through the values
             $items = $crawler->filter('.menu-items > div')->each(function (Crawler $node, $i)  {
             $name= $node->filter('.menu-item-title')->text();
             //delete white space from the beginning of the name
             $name=ltrim($name);
             $price="not available";
             $ing= $node->filter('.menu-item-description')->text();

             $meals=['name'=>$name,'price'=>$price,'ing'=>$ing];
             return $meals;
            });

            foreach ($items as $item) {
                $new_meal = new Meal;
                $new_meal->restaurant_id= 3;
                $new_meal->name= $item['name'];
                $new_meal->price= $price;
                $new_meal->ingredients= $item['ing'];
                $new_meal->save();
             }

            //finally, update the current date of the last update of the menu
           $myday->mytoday = date("d");
           $myday->myhour = date("H");
           $myday->save();
           return 'Menu updated';
        }    
    }
}
