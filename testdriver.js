var webdriverio = require('webdriverio');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();
    
    
driver.get('www.google.nl');

// var options = {
//     desiredCapabilities: {
//         browserName: 'chrome'
//     }
// };
// webdriverio
//     .remote(options)
//     .init()
//     .url('localhost:8080')
//     .getTitle().then(function(title) {
//         console.log('Title was: ' + title);
//     })
//     .end();