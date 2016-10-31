console.log('nglogo')
angular.module('ngLogo', []).directive('ngLogo',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/nglogo/template.html',
    }
});