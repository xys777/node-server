console.log('loading module ngStatus')
angular.module('ngStatus', []).directive('ngStatus',function(){
    return{        
        templateUrl: 'ngapp/status/template.html'
    }
});
console.log('loaded module ngStatus');