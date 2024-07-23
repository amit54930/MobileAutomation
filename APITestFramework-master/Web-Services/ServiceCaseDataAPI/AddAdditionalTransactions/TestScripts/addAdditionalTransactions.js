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



//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_AddAdditionalTransactions = config.AddAdditionalTransactions;


//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
//console.log('test_data_path :'+test_data_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

var Query = require(path.join(__dirname, config.test_query_root_path));

//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;
//console.log("After convert to JSON "+ JSON.stringify(test_data_obj.TestCase));

var testData, url, response, reportID, request_metadata;

//expected Response Root path
var expected_response_root_path = config.expected_response_root_path;


//Web service URL
var url = config.servicecasedata_root_url+config_AddAdditionalTransactions.call_suffix_toAddAdditionalTransactions;

// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  //console.log("testCaseData.TestGroup="+testCaseData.TestGroup);
  it(execution_group, function () {

    switch (testCaseData.template) {
      case 1:
        template1_success(this, testCaseData, url);
        break;
      case 2:
        template1_failure(this, testCaseData, url);
        break;
    }
    this._runnable.title = "Test case " + testCaseData.TestCaseName;
    //console.log('test case passed: ' + testCaseData.TestCaseName);

  });
});

/**
* To select every test case from test data
@param test_data_obj.TestSuite : test suite to be executed
*
*/
describe(test_data_obj.TestSuite, function () {

  for (var eachTestData in test_data_TestCaseWise) {
    //console.log(eachTestData + " : " + JSON.stringify(test_data_TestCaseWise[eachTestData]));
    if (null != eachTestData) {
      if ((test_data_TestCaseWise[eachTestData].TestCaseName.includes(execution_group))) {
      //  console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
        eventEmitter.emit("testCaseData", test_data_TestCaseWise[eachTestData]);
      }
    }
  }
});

/**
 *For success flow 200 response
 * @param testData : test data need to be passed
 */
function template1_success(object, testData, url) {
  var queries = Query.generateDynamicQuery(testData.test.transactionDetail.acqReferenceNumber);
  if (!queries.length == 0) {

    //console.log("dataQuery************ :"+queries);
    var expected_response = Framework.dbValidator(queries,
      config.SQLConnectionURL,
      config.resultType, 
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
 
      //console.log(expected_response);
      expected_response=JSON.parse(expected_response);
      var acqReferenceNumber=expected_response[0].acquirer_reference_number;
    testData.test.transactionDetail.acqReferenceNumber=acqReferenceNumber;
    //console.log(acqReferenceNumber);
    }
   else{
      // console.log("Dynamic query generator has not generated any query! Please check configurations");
      addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
    }

    if(acqReferenceNumber!=undefined){

      
   
  var options = { headers: config.header, json:testData.test }
 // console.log( "*************** options :" + JSON.stringify(options));
  var response = getResponse(url, object, testData, options);

  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
 // console.log("Status Code Matched");
}
else{
  console.log("This transaction is already attached!");
}
}
  




/**
 *For fail flow - 400 response code
 * @param testData : test data need to be passed
 */
function template1_failure(object, testData, url) {

  object._runnable.title = testData.TestCaseName;
 

  //console.log("URL: " + url);
  utils.testCaseInfo(object, testData);
  var options = { headers: config.header, json: testData.test };

  //addContext(object, "url :" + url);
  var response = Framework.hitWebService(testData.type, url, options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
}

/**
   * Hit the web service through API and get response.
   * @param url : URL to be hit
   * @param testData: required test data
   * @param options : optional fields contains input fields if any or headers
   * @return Response of web service.
   */
function getResponse(url, object, testData, options) {
  object._runnable.title = testData.TestCaseName;
  utils.testCaseInfo(object, testData);
  addContext(object, "url :" + url);
  var response = Framework.hitWebService(testData.type, url, options);
  //console.log("Response in getResponse "+JSON.stringify(response));
  return response;
}
