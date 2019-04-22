var select_all_provinces = ( "select \"Province\", \"Name\"" +
// "you can use single \' or double \"quote" +
"from \"Holiday.Province_md\"" +
 " where \"Country\" = \'CA\'");
// " AND LANGU = \'E\' ORDER BY REGION");
 //"from _SYS_BIC.\"ZRT_CONTROL_TABLES.SAP_HANA_Development/CV_REGION_MD\"");		

function close(closables) {
	var closable;
	var i;
	for (i = 0; i < closables.length; i++) {
		closable = closables[i];
		if (closable) {
			closable.close();
		}
	}
}
function getData() {
	var dataprovincesList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;	
	try {
		statement = connection.prepareStatement(select_all_provinces);
		resultSet = statement.executeQuery();
		var dataProvinces;
		// add ALL provinces option
		dataProvinces = {};
		dataProvinces.REGION = "99";
		dataProvinces.TXTSH = "All Provinces";
		dataprovincesList.push(dataProvinces);
		while (resultSet.next()) {
			dataProvinces = {};
			dataProvinces.REGION = resultSet.getString(1);
			dataProvinces.TXTSH = resultSet.getString(2);
			
			dataprovincesList.push(dataProvinces);

		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Province : dataprovincesList
	});
	return str;
}
function doGet() {
	try {
		$.response.contentType = "application/json";
		$.response.setBody(getData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();