//var queryUtils = require('../../../../Utilities/queryUtils.js');


var subquery = " where ";



var testQuery =
  `
  SELECT wwmaster_transaction_settled_sk	AS wwmasterTransactionSettledSk,
  etlbatchid	AS etlbatchid,
  record_code	AS recordCode,
  arn	AS acqReferenceNumber,
  merchant_number	AS merchantNumber ,
  original_transaction_reference_number	AS originalTransactionReferenceNumber,
  transaction_amount AS transactionAmount,
  transaction_code AS transactionCode	,
  transaction_date AS transactionDate,	
  transaction_time AS transactionTime,	
  invoice_number	AS invoiceNumber,
  foreign_domestic_ind	AS foreignDomesticInd,
  authorization_source_code	AS authorizationSourceCode,
  cardholder_id_method	AS cardholderIdMethod,
  terminal_entry_mode	AS terminalEntryMode, 
  transaction_identifier AS transactionIdentifier,
  currency_code	AS currencyCode,
  mcc AS mcc,
  pos_entry_mode	AS posEntryMode,
  currency_exponent	AS currencyExponent,
  foreign_amount	AS foreignAmount,
  batch_date	AS batchDate,
  batch_number  AS batchNumber,	
  batch_amount	AS batchAmount,
  recurring_pay_ind AS recurringPayInd,
  category_ind	AS categoryInd,
  security_protocol	AS securityProtocol,
  card_authentication_ind	AS cardAuthenticationInd,
  universal_cardholder_authentication_field_ind	AS universalCardholderAuthenticationFieldInd,
  requested_payment_service_ind  AS requestedPaymentServiceInd,
  terminal_tid	AS terminalTid,
  moto_ec_ind AS motoEcInd,
  terminal_capacity_ind	AS terminalCapacityInd,
  authorization_response_code AS authorizationResponseCode,
  authorization_ind AS authorizationInd,
  transaction_type	AS transactionType,
  terminal_transaction_date AS	terminalTransactionDate,
  terminal_capability_profile	AS terminalCapabilityProfile,
  terminal_country_code	AS terminalCountryCode,
  cryptogram_code	AS cryptogramCode,
  terminal_verification_result_code	AS terminalVerificationResultCode,
  cryptogram_unpredictable_number  AS cryptogramUnpredictableNumber,
  application_transaction_count	AS applicationTransactionCount,
  application_interchange_profile AS applicationInterchangeProfile,
  cryptogram_information	AS cryptogramInformation,
  issuer_application_byte1_data AS issuerApplicationByte1Data	,
  issuer_application_byte2_data AS issuerApplicationByte2Data	,
  issuer_application_byte3_data AS issuerApplicationByte3Data	,
  issuer_application_byte4to7_data AS issuerApplicationByte4to7Data,
  issuer_application_byte8_data	AS issuerApplicationByte8Data,	
  issuer_application_byte9to16_data AS issuerApplicationByte9to16Data	,	
  issuer_application_byte17_data	AS issuerApplicationByte17Data,	
  issuer_application_byte18to32_data AS issuerApplicationByte18to32Data	,
  authorization_amount	AS authorizationAmount,
  mc_quick_payment_service_ind	AS mcQuickPaymentServiceInd,	
  authorization_code	AS  authorizationCode,	
  deposit_control_number	AS depositControlNumber,
  cash_back_amount AS cashBackAmount,	
  audit_id	AS auditId,
  remarks	AS remarks,	
  card_number_sk AS cardNumberSk,
  merchant_token AS merchantToken,	
  card_number_rk AS cardNumberRk	,	
  seq_number_token AS seqNumberToken	,	
  global_token AS globalToken	 `; 

var s = "from `prj-gousenaiq-dlak-res01.consumption_layer_dims.vw_wwmaster_transaction_settled`";

var condition="` where arn='74830509028160369035580' AND  merchant_number='54460671' AND transaction_amount=17.2 AND transaction_code='05' AND card_number_Rk like '489396%8214' AND transaction_date BETWEEN '2019-01-22' AND '2019-01-28' Order By transaction_identifier ASC LIMIT 25; `"

module.exports.generateDynamicQuery = function (inputs) {
  var tempQuery = "";
  if (inputs["acqRefNumber"] != undefined) {
    tempQuery = subquery + "arn='" + inputs["acqRefNumber"] + "'";
    
  }
  if (inputs["merchantNumber"] != undefined) {
    tempQuery = tempQuery + " AND merchant_number='" + inputs["merchantNumber"] + "'";
    
  }
  if (inputs["firstSixDigitsCardNumber", "lastFourDigitsCardNumber"] != undefined ) {
    
    tempQuery = tempQuery + " AND card_number_rk LIKE '" + inputs["firstSixDigitsCardNumber"]+"%"+inputs["lastFourDigitsCardNumber"] + "'";
  } else
  if (inputs["lastFourDigitsCardNumber"] != undefined) {
    tempQuery = tempQuery + " AND card_number_rk LIKE '"+inputs["lastFourDigitsCardNumber"] + "%" + "'";
    
  }else
  if (inputs["firstSixDigitsCardNumber"] != undefined) {
    tempQuery = tempQuery + " AND card_number_rk LIKE '" + inputs["firstSixDigitsCardNumber"]+ "%" + "'";
  }
  if (inputs["fromTransactionDate", "toTransactionDate"] != undefined) {
    tempQuery = tempQuery + " AND transaction_date BETWEEN '" + inputs["fromTransactionDate"]+"' AND '"+inputs["toTransactionDate"]+ "'";
  }
  if (inputs["fromTransactionAmount", "toTransactionAmount"] != undefined) {
    tempQuery = tempQuery + " AND transaction_amount BETWEEN " + inputs["fromTransactionAmount"]+" AND "+inputs["toTransactionAmount"]+ " ";
  }
  if (inputs["transactionAmount"] != undefined) {
    tempQuery = tempQuery + " AND transaction_amount='" + inputs["transactionAmount"]+"'";

  }
  if (inputs["transactionCode"] != undefined) {
    tempQuery = tempQuery + " AND transaction_code='" + inputs["transactionCode"]+"'";

  }
  if (inputs["size"] != undefined) {
    tempQuery = tempQuery + " ORDER BY " + inputs["orderByProperties"] +" "+ inputs["direction"]+" LIMIT "+inputs["size"];

  }
  var finalQuery = testQuery + s + tempQuery;
  //console.log('finalQuery'+finalQuery);
  return finalQuery;
}
