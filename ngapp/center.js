/**
 * Created by a514804 on 10/26/2016.
 */
console.log('loading module ngCenter');
var deps=[
  './ngapp/selector/index.js',
  './ngapp/content/index.js'
]
loadJS(deps).done(function () {
  angular.module('ngCenter', ['ngSelector','ngContent']);
  console.log('loaded module ngCenter');
})
