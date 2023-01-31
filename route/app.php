<?php

use think\facade\Route;

Route::any('api/wechat/serve', 'WechatNotice/serve');
Route::get('install','Install/begin');
Route::group('install',function(){
   route::get('environment','/environment') ;
   route::get('databases','/databases') ;
   route::post('databases/create','/create') ;
   route::post('databases/check','/databasesCheck') ;
   route::post('perform/:n','/perform') ;
   route::get('end','/end') ;
   route::get('loader','/swooleCompiler') ;
})->prefix('Install');
