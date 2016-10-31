/**
 * Created by a514804 on 10/26/2016.
 */
console.log('loading module footer');
var deps=[
  './ngapp/status/index.js',
  './ngapp/microhelp/index.js',
  './ngapp/author/index.js'
]
loadJS(deps).done(function () {
  console.log('genarating module footer');
  angular.module('ngFooter', ['ngStatus','ngMicrohelp','ngAuthor']);
})
