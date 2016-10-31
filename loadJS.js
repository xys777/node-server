/**
 * Created by a514804 on 10/26/2016.
 */
( function( global, factory ) {
  "use strict";

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get loadJS.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var loadJS = require("loadJS")(window);
    module.exports = global.document ?
      factory( global, true ) :
      function( w ) {
        if ( !w.document ) {
          throw new Error( "loadJS requires a window with a document" );
        }
        return factory( w );
      };
  } else {
    factory( global );
  }
})( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

  var
    version = "1.0.0",
  // Define a local copy of loadJS
    loadJS = function( ) {
      var d = $.Deferred();
      var args = arguments
      console.log(JSON.stringify(args))
      if (arguments.length>0) {
        var arg = [].shift.call(args)
        console.log(JSON.stringify(args))
        var jsArr = Array.isArray(arg) ? arg : [arg]
        var ajaxArr = []
        jsArr.forEach(function (item) {
          if (item) ajaxArr.push($.getScript(item));
        })
        if (ajaxArr.length > 0) {
          $.when.apply($, ajaxArr).done(function (arr) {
            //console.log(JSON.stringify(arr))
            loadJS.apply(null,args).done(d.resolve)
          })
        }else{
          loadJS.apply(null,args).done(d.resolve)
        }
      }else{
        d.resolve();
      }
      return d;
    };
  if ( !noGlobal ) {
    window.loadJS = loadJS;
  }
  return loadJS;
})
