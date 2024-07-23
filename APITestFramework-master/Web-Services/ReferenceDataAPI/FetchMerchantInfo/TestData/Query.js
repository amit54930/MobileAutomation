var subquery =`  where merchant_number='{merchantNumber}'  `;

var testQuery =`select origin_name as originName,	hierarchy,	corporate,	region,	principal,	associate,	chain,	merchant_number as merchantNumber,account_status as accountStatus,	activity_status as activityStatus,	mas_last_update_date as masLastUpdateDate,	mcc,cash_advance_ind as cashAdvanceInd,	tran_category_code as tranCategoryCode,	premier_ind as premierInd,bank_id_number as bankIdNumber,bin,ica, dba_name as dbaName, dba_contact as dbaContact,dba_address1 as dbaAddress1, dba_address2 as dbaAddress2, dba_city as dbaCity,dba_state as dbaState, dba_us_state_code as dbaUsStateCode,	dba_zip_code as dbaZipCode,	dba_fax as dbaFax,	dba_phone as dbaPhone, corporate_name as corporateName,	corporate_contact as corporateContact,	corporate_address1 as corporateAddress1,	corporate_address2 as corporateAddress2,	corporate_address3 as corporateAddress3, corporate_city as corporateCity,	corporate_state as corporateState,	corporate_us_state_code as corporateUsStateCode,	corporate_zip as corporateZip,corporate_fax as corporateFax,	corporate_phone as corporatePhone,	region_name as regionName,	region_contact as regionContact,	region_address1 as regionAddress1,	region_address2 as regionAddress2,	region_address3 as regionAddress3,	region_city as regionCity,	region_state as regionState,	region_country as regionCountry,	region_us_state_code as regionUsStateCode,	region_zip as regionZip,	region_fax as regionFax,	region_phone as regionPhone,retrieval_address_code as retrievalAddressCode,	retrieval_mas_address_code as retrievalMasAddressCode,	retrieval_fax as retrievalFax,	chargeback_address_code as chargebackAddressCode ,	chargeback_group_code as chargebackGroupCode,	chargeback_mas_address_code as chargebackMasAddressCode,	chargeback_print_code as chargebackPrintCode,	misc_name as miscName,	misc_contact as miscContact,	misc_address1 as miscAddress1	,misc_address2 as miscAddress2,	misc_address3 as miscAddress3,	misc_city miscCity,	misc_state as miscState,	misc_country as miscCountry,	misc_us_state_code as miscUsStateCode, 	misc_zip miscZip,	misc_fax as miscFax,	misc_phone as miscPhone,	email_address1 as emailAddress1,	email_address2 as emailAddress2,language_ind_code as languageIndCode,old_merchant_number as oldMerchantNumber,retail_sale_ind as retailSaleInd,		send_request_method as sendRequestMethod,currency_code as currencyCode,user_mc_interchange_code as userMcInterchangeCode,	user_visa_interchange_code as userVisaInterchangeCode` ;

var s = " from `prj-gousenaid-dlak-res01.consumption_layer_dims.merchant_detail`";

module.exports.generateDynamicQuery = function(merchantNumber){
  
  var finalQuery = testQuery+s+subquery;
 finalQuery=finalQuery.replace('{merchantNumber}',merchantNumber);
  console.log("**************** finalQuery: *******************"+finalQuery);
 return finalQuery;
}
