console.log('loading module ngMenu')
angular.module('ngMenu', []).directive('ngMenu',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/menu/template.html',
    }
});