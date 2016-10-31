console.log('loading module ngMicrohelp')
angular.module('ngMicrohelp', []).directive('ngMicrohelp',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/microhelp/template.html',
    }
});