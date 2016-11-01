console.log('loading module ngSelector')
var deps=[
    './ngapp/selector/specs.js'
]
loadJS(deps).done(function () {
    angular.module('ngSelector', ['ngSpecs']).directive('ngSelector',function(){
        return{
            templateUrl: 'ngapp/selector/template.html'
        }
    });
    console.log('loaded module ngSelector');
})
