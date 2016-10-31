/**
 * Created by a514804 on 10/26/2016.
 */
console.log('loading module ngapp');
var deps=[
  './ngapp/header.js',
  './ngapp/body.js',
  './ngapp/footer.js',
  './ngapp/uploader/index.js'
]
loadJS(deps).done(function () {
  console.log('automation')
  var app = angular.module('automation', ['ngHeader','ngBody','ngFooter']);
  app.value('templateConfig', {
  url: true,
  config2: "Default config2 but it can changes"
});
  angular.bootstrap(document,['automation','uploader'])
})
