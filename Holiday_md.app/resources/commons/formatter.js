sap.ui.define([], function () {
	"use strict";
	return {

		/**
		 * Formats a given string to uppercase.
		 * 
		 * @function
		 * @param {string}
		 *            sName string to be formatted
		 * @public
		 */
		formatOData_Date: function (sDate) {
			var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
				pattern: "yyyy-mm-ddThh:mm:ss"
			});
			return oDateFormat.format(new Date(sDate));
		},

		formatUpperCase: function (sName) {
			return sName && sName.toUpperCase();
		},

		formatGovCheque: function (sChequeID) {
			var oChequeTypeComboBox = sap.ui.getCore()
				.byId("myChequeTypeCombo");
			var oData = oChequeTypeComboBox.getModel().getData();
			var result = jQuery.grep(oData.GovCheques, function (e) {
				return e.CHEQUE_TYPE_ID === sChequeID;
			});
			if (result && result.length === 1) {
				// return result[0].CHEQUE_TYPE_TXT;
				return (result[0].CHEQUE_TYPE_TXT + " - " + sChequeID);
			} else {
				return "not Found!";
			}
		},

		formatProvince: function (sProvince) {
			var oProvinceComboBox = sap.ui.getCore().byId("myProvinceCombo");
			var oData = oProvinceComboBox.getModel().getData();
			var result = jQuery.grep(oData.Province, function (e) {
				return e.REGION === sProvince;
			});
			if (result && result.length === 1) {
				return (result[0].TXTSH + " - " + sProvince);
				// return ( result[0].TXTSH ) ;
			} else {
				return "not found!";
			}
		},

		// Holidays formatting
		formatHoliday: function (sHoliday) {
			var oHolidayComboBox = sap.ui.getCore().byId("myHolidayCombo");
			var oData = oHolidayComboBox.getModel().getData();
			var result = jQuery.grep(oData.Holidays, function (e) {
				return e.HOLIDAY_ID === sHoliday;
			});
			if (result && result.length === 1) {
				// return result[0].HOLIDAY_TXT;
				return (result[0].HOLIDAY_TXT + " - " + sHoliday);
			} else {
				return "not found!";
			}
		},

		// Holidays formatting
		formatWeather: function (sWeather) {
			var oWeatherComboBox = sap.ui.getCore().byId("myWeatherCombo");
			var oData = oWeatherComboBox.getModel().getData();
			var result = jQuery.grep(oData.Weather, function (e) {
				return e.WEATHER_ID === sWeather;
			});
			if (result && result.length === 1) {
				// return result[0].WEATHER_TXT;
				return (result[0].WEATHER_TXT + " - " + sWeather);
			} else {
				return "not found!";
			}
		},

		// format mySwith
		formatSwich: function (sValue) {
			if (sValue === "X") {
				return true;
			} else {
				return false;
			}
		},

		// Group
		formatGroup: function (sGroup) {
			var oGroupSelect = sap.ui.getCore().byId("myGroupSelect");
			var oData = oGroupSelect.getModel().getData();
			var result = jQuery.grep(oData.Group, function (e) {
				return e.GROUP_ID === sGroup;
			});
			if (result && result.length === 1) {
				return (result[0].GROUP_TXT + " - " + sGroup);
			} else {
				return "not found!";
			}
		},

		// Division
		formatDivision: function (sDivision) {
			var oDivisionSelect = sap.ui.getCore().byId("myDivisionSelect");
			var oData = oDivisionSelect.getModel().getData();
			var result = jQuery.grep(oData.Division, function (e) {
				return e.DIVISION_ID === sDivision;
			});
			if (result && result.length === 1) {
				return (result[0].DIVISION_TXT + " - " + sDivision);
			} else {
				return "not found!";
			}
		}

	};

});