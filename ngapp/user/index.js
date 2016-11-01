console.log('loading module ngUser')
angular.module('ngUser', []).directive('ngUser',function(){
    return{        
        templateUrl: 'ngapp/user/template.html'
    }
});
console.log('loaded module ngUser')