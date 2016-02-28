<?php
include '../../autoloader.php';

$g = new \Project\Classes\Router\Nav();

$g->group('/Classes/Router as TestGroup', function() use($g) {
  $g->get('/ as home', function() {
    echo 'home';
  });
  $g->get('/test as test', function() {
    echo 'test';
  });

  $g->group('/Classes/Router/1 as test', function() use($g) {
    $g->get('/ as inside group', function() {
      echo 'test22';
    });

  });
  $g->get('/after as after', function() {
    echo 'ttt';
  });

});


$g->group('/Classes/Router/2 as TestGroup3', function() use($g) {
  $g->get('/ as separate group', function() {
    echo 'test22';
  });
});


$g->start();
//var_dump('base', $g->base);
//var_dump('callbacks', $g->callbacks);
//var_dump('name', $g->name);
//$g->dumpRoutes();
//var_dump('sub items', \Project\Classes\Router\RouterGroup::$subItems);
//$g->dumpRoutes();


