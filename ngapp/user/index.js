console.log('loading module ngUser')
angular.module('ngUser', []).directive('ngUser',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/user/template.html',
    }
});