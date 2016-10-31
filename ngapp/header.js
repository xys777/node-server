/**
 * Created by a514804 on 10/26/2016.
 */
console.log('loading module header');
var deps=[
  './ngapp/logo/index.js',
  './ngapp/menu/index.js',
  './ngapp/user/index.js'
]
loadJS(deps).done(function () {
  console.log('genarating module header');
  angular.module('ngHeader', ['ngLogo','ngMenu','ngUser']);
})
