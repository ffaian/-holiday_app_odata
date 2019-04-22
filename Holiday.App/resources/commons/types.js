sap.ui.define([
	"sap/ui/model/SimpleType"
], function (SimpleType) {
	"use strict";
	return {

		/**
		 * Data Type for phone numbers.
		 *
		 * @public
		 */
		myDate: SimpleType.extend("control.tables.myDate", {
			formatValue: function (oValue) {
				//        	   var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "MMM-dd-YYYY"});
				//        	   var oDateRow = oDateFormat.format(new Date(oValue));
				//        	   return oDateFormat.format(new Date(oValue));
				return oValue;
			},
			parseValue: function (oValue) {
				//         	   	var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
				//         	   	return oDateFormat.format(new Date(oValue));
				return oValue;
			},
			validateValue: function (oValue) {
				var sPattern = /(\d{4})-(\d{2})-(\d{2})/;
				var sValid = oValue.match(sPattern);

				if (sValid === null) {
					throw new sap.ui.model.ValidateException("enter a valid date");
				}

			}
		}),

		myDate_to: SimpleType.extend("control.tables.myDate_to", {
			formatValue: function (oValue) {
				return oValue;
			},
			parseValue: function (oValue) {
				return oValue;
			},
			validateValue: function (oValue) {
				var sPattern = /(\d{4})-(\d{2})-(\d{2})/;
				var sValid = oValue.match(sPattern);

				if (sValid === null) {
					throw new sap.ui.model.ValidateException("enter a valid date");
				} else {
					// check if to date is valid
					var sDate_From = sap.ui.getCore().byId("myDateFrom").getValue();
					if (sValid < sDate_From) {
						throw new sap.ui.model.ValidateException("Date To invalid");
					}
				}

			}
		}),

		mySwich: SimpleType.extend("control.tables.mySwich", {
			formatValue: function (oValue) {
				if (oValue === "X") {
					return true;
				} else {
					return false;
				}
			},

			parseValue: function (oValue) {
				if (oValue) {
					return "X";
				} else {
					return "";
				}
			},

			validateValue: function (oValue) {
				// nothing :) No validation is needed
			}
		}),

		myBanner: SimpleType.extend("control.tables.myBanner", {
			formatValue: function (oValue) {
				var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
					minIntegerDigits: 3
				});
				var oNewNumber = oValue;
				if (typeof (oValue) !== 'undefined') {
					if (oValue.length !== 0) {
						oNewNumber = oNumberFormat.format(oValue);
					}
				}
				return oNewNumber;
			}

		})

	};

});