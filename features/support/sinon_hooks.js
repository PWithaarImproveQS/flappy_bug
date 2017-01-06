var sinon  = require('sinon');

var stubs = [];

module.exports = function () {

  this.Before(function() {
    this.stub = function(object, func) {
      var stub = sinon.stub(object, func);
      stubs.push(stub);
      return stub;
    };
  });

  this.After(function(){
    stubs.forEach(function(stub){
      stub.restore();
    });
  });
};