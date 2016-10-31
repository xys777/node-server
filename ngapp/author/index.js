console.log('loading module ngAuthor')
angular.module('ngAuthor', []).directive('ngAuthor',function(){
    return{
        restrict: 'AE',
        templateUrl: 'ngapp/author/template.html',
    }
});