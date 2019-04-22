var body = '';

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

    body = JSON.stringify({
        "session": [{
        
          //$.session.getUsername() - Returns the user name of the logged-on database user
          "UserName": $.session.getUsername(),
        
         //$.session.language - Contains an empty string unless a language is explicitly set by the XS session layer.
         "Language": $.session.language
        
         //$.session.getInvocationCount() - Returns the number of requests sent to the current session
         //"InvocationCount": $.session.getInvocationCount(),
        
         //$.session.hasSystemPrivilege(privilegeName) - Checks whether the logged-on user has a specified system privilege
         //"HasCreateSchemaPrivilege": $.session.hasSystemPrivilege("CREATE SCHEMA"),
        
         //$.session.getSecurityToken() - Returns unique session-specific token that could be used for XSRF prevention
        // "SecurityToken": $.session.getSecurityToken()
        }]
    });
    
    var str = body;
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
 * http://serin.sobeys.com:8000/ZRT_POS_CONTROL_TABLES/Model/user_section.xsjs
 */
