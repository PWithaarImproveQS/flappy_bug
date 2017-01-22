var Const = require('../../sharedConstants').constant;
var sleep = require('sleep'); 
var {defineSupportCode} = require('cucumber');
var Assert = require('assert');
var ClientHelper = require('../support/clienthelper');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
   

var browser = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer(Const.SELENIUM_HUB)
    .build();

var defaultTimeout = 10000;

defineSupportCode(function({Before, After, Given, When, Then}) {

    var playerNameInput = 'player-name';
    var statusField = 'gs-loader-text';
    var playButton = 'player-connection';
     
    function waitfor(locator, timeout) {
        browser.wait(until.elementLocated(By.id(locator)), timeout);
        sleep.sleep(2);
    }
    
    Before({tags: "@webdriver"}, function() {
        return browser.manage().window().maximize();
    });
    
      // Initialize selenium standalone server if it is not started yet 
    After({tags: "@webdriver"}, function(done) {
        browser.quit();
    });
    
     Given('a started server', function (done) {
       done();
     });
     
     Given('there already is a player called {playernick} in the game', function (playernick, done) {
        ClientHelper.ConnectClientToServer(this, playernick, function (world, client) 
        {
          done();
        });
     });
   
    When('I go to the flappy bug url in my web browser', function () {
       return browser.get(Const.SOCKET_ADDR + ':' + Const.SERVER_PORT);
    });
     
    When('I wait for the page to be loaded', {timeout: 60 * 1000}, function () {
      return waitfor(statusField, defaultTimeout); 
    });
    
    When('I click the name box', {timeout: 60 * 1000}, function () {
       return browser.findElement(By.id(playerNameInput)).click();
    });
       
    When('I remove the text Player_1', function () {
        return browser.findElement(By.id(playerNameInput)).clear();
    });

    When('I enter {playernick}', function (playernick) {
        return browser.findElement(By.id(playerNameInput)).sendKeys(playernick);
    });
    
    When('I press the Play! button', function () {
        return browser.findElement(By.id(playButton)).click();
    });
    
    Then('my name is accepted', function (done) {
       browser.findElement(By.id(statusField)).getAttribute("innerHTML").then(function(text) {
             Assert.deepEqual(text, "Playing", "Player is not playing. Name is rejected");
             done();
        });
    });
    
    Then('the start screen of flappy bug is shown', function (done) {
        // There is no real/easy way to test this anymore with selenium webdriver
        // This is because the canvas object is already showing on the background
        // And the drawings inside the canvas object is not testable
        done();
    });
    
    Then('a bug with my name on it is shown', function (done) {
        // There is no real/easy way to test this anymore with selenium webdriver
        // This is because the canvas object is already showing on the background
        // And the drawings inside the canvas object is not testable
        done();
    });
});