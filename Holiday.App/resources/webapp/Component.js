sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"app/holiday/Holiday/App/model/models",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, ODataModel, JSONModel) {
	"use strict";

	return UIComponent.extend("app.holiday.Holiday.App.Component", {

		metadata: {
			manifest: "json",
			"config": {
//								"serviceUrl" : "../xsodata/service.xsodata"
				"serviceUrl": "../xsjs/Holiday_JSON.xsjs"
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

//			var oModel = new ODataModel(
							var oModel = new JSONModel(
				this.getMetadata().getConfig().serviceUrl);
			this.setModel(oModel);

			// set the device model
			//			this.setModel(models.createDeviceModel(), "device");
		}
	});
});