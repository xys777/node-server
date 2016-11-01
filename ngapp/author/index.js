console.log('loading module ngAuthor')
angular.module('ngAuthor', []).directive('ngAuthor',function(){
    return{        
        templateUrl: 'ngapp/author/template.html'
    }
});
console.log('loaded module ngAuthor')