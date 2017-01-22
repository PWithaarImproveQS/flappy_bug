var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://192.168.42.100:4444/wd/hub')
    .build();
    
    
driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();

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