var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var chalk = require("Chalk");
var isArray = require('isarray');
var events = require('events').EventEmitter;
var querystring = require('querystring');
var Framework = require('../../../../API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var utils = require('../../../../Utilities/utils.js');

//US157986

//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_CaseExportControllerAPI= config.CaseExportControllerAPI;


//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
//console.log('test_data_path :'+test_data_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');



//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;
//console.log("After convert to JSON "+ JSON.stringify(test_data_obj.TestCase));

var testData, url, response, reportID, request_metadata;


//Web service URL
var root_url = config.service_merchant_export_root_url;

// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates
var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  url=root_url+config_CaseExportControllerAPI.call_suffix_toFetchData;
  //console.log(url);
  //console.log("testCaseData.TestGroup="+testCaseData.TestGroup);
  it(execution_group, function () {

    switch (testCaseData.template) {
      case 1:
        template1_success(this, testCaseData,url);
        break;
      case 2:
        template1_failure(this, testCaseData,url);
        break;
    }
    this._runnable.title = "Test case " + testCaseData.TestCaseName;
   // console.log('test case passed: ' + testCaseData.TestCaseName);

  });
});

/**
* To select every test case from test data
@param test_data_obj.TestSuite : test suite to be executed
*
*/
describe(test_data_obj.TestSuite, function () {

  for (var eachTestData in test_data_TestCaseWise) {
    //console.log(eachTestData + " : " + test_data_TestCaseWise[eachTestData]);
    if (null != eachTestData) {
      if ((test_data_TestCaseWise[eachTestData].TestCaseName.includes(execution_group))) {
     //   console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
        eventEmitter.emit("testCaseData", test_data_TestCaseWise[eachTestData]);
      }
    }
  }
});


/**
 *For success flow 200 response
 * @param testData : test data need to be passed
 */
function template1_success(object, testData,url) {
  var options = { headers: config.header, json: testData.input }
 // console.log(testData.input);
  var response = getResponse(url, object, testData, options);
  //addContext(object, "response :" + JSON.stringify(response.body));
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
 // console.log("Status Code Matched");
  //Get the Queries Array


}//success

/**
 *For fail flow - 400 response code
 * @param testData : test data need to be passed
 */
function template1_failure(object, testData,url) {

object._runnable.title = testData.TestCaseName;
  var options = { headers: config.header, json: testData.input }
  utils.testCaseInfo(object, testData);
  var response = getResponse(url, object, testData, options);
  addContext(object, "url :" + url);
  //console.log('testData.type: ' + testData.type);

  var response = Framework.hitWebService(testData.type, url, options);
 //console.log("API response code" + response.statusCode);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
}

function getResponse(url, object, testData,options) {
  object._runnable.title = testData.TestCaseName;
 utils.testCaseInfo(object, testData);
 addContext(object, "url :" + url);
 var response = Framework.hitWebService(testData.type, url,options);
//console.log("Response in getResponse---------------actual "+JSON.stringify(response));
 return response;
}