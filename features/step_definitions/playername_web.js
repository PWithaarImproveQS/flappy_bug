var {defineSupportCode} = require('cucumber');
 var Assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver1 = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://192.168.42.100:4444/wd/hub')
    .build();
    
// var driver2 = new webdriver.Builder()
//     .forBrowser('chrome')
//     .usingServer('http://192.168.42.100:4444/wd/hub')
//     .build();
        
    
var defaultTimeout = 10000;

 

defineSupportCode(function({Before, After, Given, When, Then}) {

    function waitfor(cssLocator, timeout) {
        var waitTimeout = timeout || defaultTimeout;
        return driver1.wait(function() {
          return driver1.isElementPresent({ css: cssLocator });
        }, waitTimeout);
    }  
    
    // Initialize selenium standalone server if it is not started yet 
    Before({tags: "@webdriver"}, function(done) {
      
    });
    
      // Initialize selenium standalone server if it is not started yet 
    After({tags: "@webdriver"}, function(done) {
        driver1.quit();
        //driver2.quit();
    });
    
     Given('a started server', {timeout: 60 * 100}, function () {
         
        // driver1.get('http://192.168.42.110:8080');
        //   driver1.wait(
        //      until.elementLocated(By.id('player-name')
        //     ), 100).then(function()
        //     {
        //         var element = driver1.findElement(By.id('player-name'));
        //         element.clear();
        //         element.sendKeys("Hallo").then(function()
        //         {
        //             return;
        //         });
        //     });
            
            
     });
     
     Given('there already is a player called Pieter in the game', function (done) {
     
        done();
         
     });
   
     When('I go to the flappy bug url in my web browser', function (done) {
      done();
     });
});