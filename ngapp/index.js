/**
 * Created by a514804 on 10/26/2016.
 */
console.log('ngapp index');
var deps=[
  './ngapp/nglogo/index.js',
  './ngapp/uploader/index.js'
]
loadJS(deps).done(function () {
  console.log('automation')
  var ngapp = angular.module('automation', ['ngLogo']);
  angular.bootstrap(document,['automation','uploader'])
})
