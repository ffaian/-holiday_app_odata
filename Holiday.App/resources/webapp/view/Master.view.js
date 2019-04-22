sap.ui.jsview("app.holiday.Holiday.App.view.Master", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.Master
	 */
	getControllerName: function () {
		return "app.holiday.Holiday.App.controller.Master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.Master
	 */
	createContent: function (oController) {

		var app = new sap.m.App("myApp", {
			initialPage: "oPage"
		});

		// searching combobox
		var oSearch = [{
			"KEY": "1",
			"TXT": "Date"
		}, {
			"KEY": "2",
			"TXT": "Province #"
		}, {
			"KEY": "3",
			"TXT": "Holiday #"
		}];
		var oModelSearch = new sap.ui.model.json.JSONModel();
		oModelSearch.setData(oSearch);

		var oSearchCombo = new sap.m.Select("mySearchCombo", {
			change: oController.onListPress
		});
		oSearchCombo.setModel(oModelSearch); // lookup_tables
		oSearchCombo.bindAggregation("items", {
			path: "/",
			template: new sap.ui.core.ListItem({
				key: "{KEY}",
				text: "{TXT}"
			})
		});

		var aColumns = [new sap.m.Column({
			header: new sap.m.Text({
				text: "Date"
			})
		}), new sap.m.Column({
			header: new sap.m.Text({
				text: "Province"
			})
		}), new sap.m.Column({
			header: new sap.m.Text({
				text: "Holiday"
			})
		})];

		// Columns
		var oTemplate = new sap.m.ColumnListItem({
			press: [oController.onListPress, oController],
			cells: [new sap.m.ObjectIdentifier({
				text: "{date}"
			}), new sap.m.ObjectIdentifier({
				text: {
					path: "Province",
					formatter: oController.formatter.formatProvince
				}
			}), new sap.m.ObjectIdentifier({
				text: {
					path: "Holiday_Id",
					formatter: oController.formatter.formatHoliday
				}
			})]
		});

		// Table Toolbar
		var oToolBar = new sap.m.Toolbar({
			content: [
				new sap.m.Button({
					text: "Create",
					icon: "sap-icon://add",
					type: sap.m.ButtonType.Transparent,
					press: function () {
						oController.openCreateDialog(oController);
					}
				}),
				new sap.m.Button({
					type: sap.m.ButtonType.Transparent,
					text: "Edit",
					icon: "sap-icon://edit",
					press: function () {
						// it give the complete
						// context data assigned
						// to row
						var oContexts = sap.ui.getCore().byId("mytable")
							.getSelectedContexts();
						if (oContexts.length === 0) {
							sap.m.MessageToast.show("Please select a row");
						} else {
							var oSelectItem = oTable.getSelectedItem();
							var oIndex = oTable.indexOfItem(oSelectItem);
							oController.openUpdateDialog(oController, oIndex);
						}

					}
				}),
				new sap.m.Button({
					type: sap.m.ButtonType.Transparent,
					text: "Delete",
					icon: "sap-icon://delete",
					press: function () {
						var oContexts = sap.ui.getCore().byId("mytable")
							.getSelectedContexts();
						if (oContexts.length === 0) {
							sap.m.MessageToast.show("Please select a row");
						} else {
							var oSelectItem = oTable.getSelectedItem();
							var oIndex = oTable.indexOfItem(oSelectItem);
							oController.openDeleteDialog(oIndex);
						}

					}
				}), new sap.m.ToolbarSpacer(), new sap.m.Label({
					text: "Searching by:"
				}), oSearchCombo, new sap.m.Label({
					text: ""
				}), new sap.m.SearchField({
					placeholder: "Search",
					width: "300px",
					showRefreshButton: true,
					tooltip: "Search for a Date",
					liveChange: oController.onLiveSearch,
					search: oController.onSearch
				})
			]
		});

		var oTable = new sap.m.Table("mytable", {
			width: "auto",
			columns: aColumns,
			headerToolbar: oToolBar
		});
		oTable.setMode(sap.m.ListMode.SingleSelectMaster);
		oTable.bindItems("/Holidays", oTemplate);

		var oPageMaster = new sap.m.Page("mainPage", {
			//			title : "Weather Impact - this is the JS view",
			content: [oTable]
		});

		var oBar = new sap.m.Bar({
			contentLeft: [new sap.m.Image({
				src: "../images/favicon.ico",
				height: "45px"
			})],
			contentMiddle: [new sap.m.Label({
				text: "CRUD: Holidays Calendar",
				textAlign: "Left",
				design: "Bold"
			})],
			contentRight: [new sap.m.Label("myUserLabel", {
				design: "Bold"
			}), new sap.m.Button({
				type: sap.m.ButtonType.Transparent,
				icon: "sap-icon://log",
				tooltip: "Logout",
				press: function () {
					window.location.href = "/my/logout";
				}
			})]
		});

		oPageMaster.setCustomHeader(oBar);
		//		return oPageMaster;

		app.addPage(oPageMaster);
		return app;

	}

});