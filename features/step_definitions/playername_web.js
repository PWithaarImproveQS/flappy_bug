var {defineSupportCode} = require('cucumber');
 var Assert = require('assert');

 //const wdio = require('wdio');

var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
client
    .init()
    .url('https://duckduckgo.com/')
    .setValue('#search_form_input_homepage', 'WebdriverIO')
    .click('#search_button_homepage')
    .getTitle().then(function(title) {
        console.log('Title is: ' + title);
        // outputs:
        // "Title is: WebdriverIO (Software) at DuckDuckGo"
    })
    .end();
    
defineSupportCode(function({Before, After, Given, When, Then}) {

    // var browser = wdio.getBrowser({
    //     desiredCapabilities: {
    //         browserName: 'chrome'
    //     }
    // });
    
    // // Initialize selenium standalone server if it is not started yet 
    // Before({tags: "@webdriver"}, wdio.initSelenium);
    
    // // Initialize selenium standalone server if it is not started yet 
    // Before({tags: "@webdriver"}, function(done) {
    //   wdio.wrap(function(done)
    //   {
    //       console.log("init");
    //       browser.init();
    //       console.log(wdio.getBrowser());
    //   });
    // });
    
    //   // Initialize selenium standalone server if it is not started yet 
    // After({tags: "@webdriver"}, function(done) {
    //   wdio.wrap(function(done)
    //   {
    //       browser.end();
    //   });
    // });
    
     Given('a started server', {timeout: 60 * 100}, function (done) {
         client.init();
         client.end();
         done();
        //wdio.wrap(function (done) {
            //browser.url('http://www.google.com');
            //console.log(browser.getTitle);
            //assert.equal('Google', browser.getTitle());
        //});
     });
     
     Given('there already is a player called Pieter in the game', function (done) {
       
       done();
     });
   
     When('I go to the flappy bug url in my web browser', function (done) {
       done();
     });
});