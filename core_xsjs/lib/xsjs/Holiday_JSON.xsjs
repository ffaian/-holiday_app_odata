var select_my_query = ("select * from \"Holiday.Holiday\" order by \"date\"");

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
	var myDataList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_my_query);
		resultSet = statement.executeQuery();
		var myData;

		while (resultSet.next()) {
			myData = {};
			myData.date = resultSet.getString(1);
			myData.Province = resultSet.getString(2);
			myData.Holiday_Id = resultSet.getString(3);
			myDataList.push(myData);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Holidays : myDataList
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
 * Test:
 * http://serin.sobeys.com:8000/ZRT_POS_CONTROL_TABLES/Cheque_Table/jsondata.xsjs
 */