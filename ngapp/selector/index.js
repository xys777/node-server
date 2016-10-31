console.log('loading module ngSelector')
angular.module('ngSelector', []).directive('ngSelector',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/selector/template.html',
    }
});