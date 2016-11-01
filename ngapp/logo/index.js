console.log('loading module ngLogo')
angular.module('ngLogo', []).directive('ngLogo',function(){
    return{        
        templateUrl: 'ngapp/logo/template.html'        
    }
});
console.log('loaded module ngLogo');