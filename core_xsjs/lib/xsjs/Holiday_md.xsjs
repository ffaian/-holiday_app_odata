
var select_all_HOLIDAY = ("select * from \"Holiday.Holiday_md\" "	+
		// "you can use single \' or double \"quote" +
		"WHERE \"Langu\" = \'EN\'");

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
	var dataHOLIDAYList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_all_HOLIDAY);
		resultSet = statement.executeQuery();
		var dataHOLIDAY;		
		while (resultSet.next()) {
			dataHOLIDAY = {};
			dataHOLIDAY.HOLIDAY_ID = resultSet.getString(1);
			dataHOLIDAY.HOLIDAY_TXT = resultSet.getString(3);
			dataHOLIDAYList.push(dataHOLIDAY);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Holidays : dataHOLIDAYList
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

/*
 * Test: http://serin.sobeys.com:8000/ZRT_CONTROL_TABLES/Model/HOLIDAY.xsjs
 */