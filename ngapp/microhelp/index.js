console.log('loading module ngMicrohelp')
angular.module('ngMicrohelp', []).directive('ngMicrohelp',function(){
    return{        
        templateUrl: 'ngapp/microhelp/template.html'
    }
});
console.log('loaded module ngMicrohelp')