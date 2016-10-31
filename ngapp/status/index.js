console.log('loading module ngStatus')
angular.module('ngStatus', []).directive('ngStatus',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/status/template.html',
    }
});