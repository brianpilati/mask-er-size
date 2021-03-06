'use strict';

var ctxMock = function() {
  var args = createArgs(arguments);

  function getArgs(argKey) {
    return ((argKey in args) ? args[argKey] : null);
  }

  function createArgs(methodArgs) {
    var args = {};
    if (methodArgs.length) {
      _.each(methodArgs, function(newObject) {
        _.each(newObject, function(value, key) {
          args[key] = value;
        });
      });
    }
    return args;
  }

  return {
    'scale' : function() { return getArgs('scale'); },
    'fillStyle' : undefined,
    'fillRect' : function(a,b,c,d) { return getArgs('fillRect'); },
    'drawImage' : function(a,b,c) { return getArgs('drawImage'); },
    'getImageData' : function(a,b,c,d) { return new getImageData() }
  }
};
