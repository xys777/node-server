/**
 * Created by a514804 on 10/26/2016.
 */
console.log('loading module automation');
var deps=[
  './ngapp/header.js',
  './ngapp/center.js',
  './ngapp/footer.js',
  './ngapp/uploader/index.js'
]
loadJS(deps).done(function () {
  var app = angular.module('automation', ['ui.router','ngHeader','ngCenter','ngFooter']);

  console.log('loaded module automation')
    app.config(function($stateProvider) {

      $stateProvider.state('config',{
        url: '/config',
        template: '<ng-specs></ng-specs>',
        controller: function($scope) {$scope.hash = '/config';console.log('config controller is called') }
      }).state('config.summary',{
        url: '/summary',
        views: {
          "summary@": {
            template: '<ng-config></ng-config>',
            controller: function($scope) {$scope.hash = '/config/summary';console.log('config/summary controller is called') }
          }
        }
      }).state('runner',{
        url: '/runner',
        template: '<ng-specs></ng-specs>',
        controller: function($scope) {$scope.hash = '/runner' }
      });
    });
  // app.run(['$rootScope','$location','$state','$stateParams',/*'$templateCache',*/
  //   function (
  //     $rootScope,   $location,  $state,  $stateParams/*,  $templateCache*/  ) {
  //     console.log("app run")
  //     $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
  //       console.log("app $stateChangeStart")
  //       $rootScope.showLoading = true;
  //     });
  //
  //     $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
  //       console.log("app $stateChangeSuccess")
  //       $rootScope.showLoading = false;
  //     });
  //   }]);
//   app.value('templateConfig', {
//   url: true,
//   config2: "Default config2 but it can changes"
// });
  angular.bootstrap(document,['automation','uploader'])

  console.log('generated angular app automation')
})
