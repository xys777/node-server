/**
 * Created by a514804 on 11/01/2016.
 */
console.log('loading module ngSpecs')
angular.module('ngSpecs', []).directive('ngSpecs',function(){
  return{    
    templateUrl: 'ngapp/selector/specs.html',
    link:function ($scope) {
      $scope.$on("$stateChangeSuccess", function (v) {console.log(v)})
    }
  }
});
console.log('loaded module ngSpecs');