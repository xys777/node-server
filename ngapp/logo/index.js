console.log('loading module ngLogo')
angular.module('ngLogo', []).directive('ngLogo',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/logo/template.html'
        
    }
});