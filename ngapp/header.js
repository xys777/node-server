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
  angular.module('ngHeader', ['ngLogo','ngMenu','ngUser']);
  console.log('loaded module header');
})
