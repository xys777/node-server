console.log('loading module ngContent')
angular.module('ngContent', []).directive('ngContent',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/content/template.html',
    }
});