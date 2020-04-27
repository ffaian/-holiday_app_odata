sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"app/holiday/Holiday/App/model/models",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, ODataModel, JSONModel) {
	"use strict";

	return UIComponent.extend("app.holiday.Holiday.App.Component", {

		metadata: {
			manifest: "json",
			"config": {
				"serviceUrl_odata": "../xsodata/service.xsodata",
				"serviceUrl": "../xsjs/Holiday_JSON.xsjs",
				"sizeLimit": 500
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			var oParams = {};
			oParams.json = true;
			oParams.defaultBindingMode = sap.ui.model.BindingMode.TwoWay;
			oParams.defaultUpdateMethod = "PUT";
			oParams.useBatch = false;

			var oModel_odata = new ODataModel(
				this.getMetadata().getConfig().serviceUrl_odata, oParams);
			oModel_odata.attachMetadataLoaded(null, function () {
				var oMetadata = oModel_odata.getServiceMetadata();
				sap.m.MessageToast.show("whatever dude");
				console.log(oMetadata);
			}, null);
			// oModel.attachMetadataLoaded(null, {
			// 	success: function (oData, oResponse) {
			//                 // run the success code
			//                 },
			//                 error: function (oError) {
			//                  // run the failed code.
			//                 }
			// });

			//oModel_odata.setDefaultBindingMode("TwoWay");
			oModel_odata.setSizeLimit(this.getMetadata().getConfig().sizeLimit);

			this.setModel(oModel_odata);

			// var oModel = new JSONModel(
			// 	this.getMetadata().getConfig().serviceUrl);
			// this.setModel(oModel);

			// set the device model
			//			this.setModel(models.createDeviceModel(), "device");
		}
	});
});