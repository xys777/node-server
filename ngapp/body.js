/**
 * Created by a514804 on 10/26/2016.
 */
console.log('loading module body');
var deps=[
  './ngapp/selector/index.js',
  './ngapp/content/index.js'
]
loadJS(deps).done(function () {
  console.log('genarating module body');
  angular.module('ngBody', ['ngSelector','ngContent']);
})
