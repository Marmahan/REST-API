<?php

require 'vendor/autoload.php';
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\CssSelector\CssSelectorConverter;
//------------------------------------------------------------------------------------------------------------
//working
// //url
// $url='http://pizzeria-mario-lino.de/menu/speisekarte';
// $client = new \GuzzleHttp\Client();
// $res = $client->request('GET', $url);

// $html= ''.$res->getBody();


// $crawler = new Crawler($html);


// //loop through the values
// $items = $crawler->filter('.menu-items > li')->each(function (Crawler $node, $i)  {
//     //echo $node->html();
// 	$name= $node->filter('.grid2column')->text();
//     $price= $node->filter('.lastcolumn')->text();
//     $ing= $node->filter('.item-description-menu')->text();

//     $meals=['name'=>$name,'price'=>$price,'ing'=>$ing];
//     return $meals;

// });



// foreach ($items as $item) {
// 	echo 'name: '.$item['name'];
// 	echo 'price: '.$item['price'];
// 	echo 'Ingridient: '.$item['ing'];
// 	echo '<br>';
// }


//------------------------------------------------------------------------------------------------------------
//working
// // //url
// $url='http://www.sanmatteopanuozzo.com/menu-list/';
// $client = new \GuzzleHttp\Client();
// $res = $client->request('GET', $url);

//  $html= ''.$res->getBody();


//  $crawler = new Crawler($html);


//  //loop through the values
//  $items = $crawler->filter('.gdlr-menu-item-content')->each(function (Crawler $node, $i)  {
// //     //echo $node->html();
//  	 $name= $node->filter('.menu-title')->text();
//       $price= $node->filter('.menu-price')->text();
//        $ing= $node->filter('.menu-info')->text();

//     $meals=['name'=>$name,'price'=>$price,'ing'=>$ing];
//     return $meals;

//  });



// foreach ($items as $item) {
// 	echo 'name: '.$item['name'] . ' ';
// 	echo 'price: '.$item['price']. ' ';
// 	echo 'Ingridient: '.$item['ing'];
// 	echo '<br>';
// }

//------------------------------------------------------------------------------------------------------------
//working
// //url
// $url='http://bakerspizzanyc.com/menu/';
// $client = new \GuzzleHttp\Client();
// $res = $client->request('GET', $url);

//  $html= ''.$res->getBody();


//  $crawler = new Crawler($html);

// $price="not available";
//  //loop through the values
//  $items = $crawler->filter('.menu-items > div')->each(function (Crawler $node, $i)  {
// //     //echo $node->html();
//  	   $name= $node->filter('.menu-item-title')->text();
//       $price="not available";
//         $ing= $node->filter('.menu-item-description')->text();

//      $meals=['name'=>$name,'price'=>$price,'ing'=>$ing];
//      return $meals;

//  });



// foreach ($items as $item) {
// 	echo 'name: '.$item['name'] . ' ';
// 	echo 'price: '.$item['price']. ' ';
// 	echo 'Ingridient: '.$item['ing'];
// 	echo '<br>';
// }