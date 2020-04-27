sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Holiday/master_data/Holiday_md/app/model/models",
	"sap/ui/model/odata/v2/ODataModel"
], function (UIComponent, Device, models, ODataModel) {
	"use strict";

	return UIComponent.extend("Holiday.master_data.Holiday_md.app.Component", {

		metadata: {
			manifest: "json",
			"config": {
				"serviceUrl_odata": "../xsodata/service.xsodata",
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

			var oModel = new ODataModel(
				this.getMetadata().getConfig().serviceUrl_odata, oParams);
			oModel.attachMetadataLoaded(null, function () {
				var oMetadata = oModel.getServiceMetadata();
				sap.m.MessageToast.show("whatever dude");
				console.log(oMetadata);
			}, null);

			this.setModel(oModel);

			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
		}
	});
});