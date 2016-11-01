console.log('loading module ngMenu')
angular.module('ngMenu', []).directive('ngMenu',function(){
    return{        
        templateUrl: 'ngapp/menu/template.html',
        link:function ($scope) {
            $scope.$on("$stateChangeSuccess", function (v) {console.log(v)})
        }
    }
});
console.log('loaded module ngMenu')
// $rootScope.$on('$stateChangeStart',
//   function(event, toState, toParams, fromState, fromParams){
//       // logic
//   })