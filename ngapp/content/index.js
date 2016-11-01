console.log('loading module ngContent')

var deps=[
    './ngapp/content/config.js'
]

loadJS(deps).done(function () {
    angular.module('ngContent', ['ngConfig']).directive('ngContent',function(){
        return{
            templateUrl: 'ngapp/content/template.html'
        }
    });
    console.log('loaded module ngContent')
})
