var maptab_east_search_panel_last_result_id;

var maptab_east_search_panel_toolbar=[
	{
		xtype:'button',
		id:'maptab_east_search_panel_toolbar_polygon',
		iconCls:'maptab_toolbar_search_polygon',
		enableToggle: true,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_search_polygon,
		toggleHandler:function(item,state){
			
			if (state)
			{
				maptab_toolbar_search_attribute_mode=true;
			}
		
			fn_toggleControl('drawpolygon',state,maptab_toolbar_search_controls);
		}
	},
	{
		xtype:'button',
		id:'maptab_east_search_panel_toolbar_line',
		iconCls:'maptab_toolbar_search_line',
		enableToggle: true,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_search_line,
		toggleHandler:function(item,state){
			
			if (state)
			{
				maptab_toolbar_search_attribute_mode=true;
			}
		
			fn_toggleControl('drawline',state,maptab_toolbar_search_controls);
		}
	},
	{
		xtype:'button',
		id:'maptab_east_search_panel_toolbar_rectangle',
		iconCls:'maptab_toolbar_search_rectangle',
		enableToggle: true,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_search_rectangle,
		toggleHandler:function(item,state){
			
			if (state)
			{
				maptab_toolbar_search_attribute_mode=true;
			}
		
			fn_toggleControl('drawrectangle',state,maptab_toolbar_search_controls);
		}
	},
	{
		xtype:'button',
		id:'maptab_east_search_panel_toolbar_circle',
		iconCls:'maptab_toolbar_search_circle',
		enableToggle: true,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_search_circle,
		toggleHandler:function(item,state){
			
			if (state)
			{
				maptab_toolbar_search_attribute_mode=true;
			}
		
			fn_toggleControl('drawcircle',state,maptab_toolbar_search_controls);
		}
	},
	{
		xtype:'combo',
		loadMask:true,
		width:120,
		id:'maptab_east_search_panel_toolbar_geometry_criteria',
		emptyText:_maptab_search_geometry_criteria_intersects,
		value:"INTERSECTS",
		store: new Ext.data.SimpleStore({
		fields: ['value','name'],
			data: [
				["INTERSECTS",_maptab_search_geometry_criteria_intersects],
				["CROSSES",_maptab_search_geometry_criteria_crosses],
				["WITHIN",_maptab_search_geometry_criteria_within]
			]
		}), 
		displayField: 'name',
		valueField: 'value',
		forceSelection: true,
		triggerAction: 'all',
		selectOnFocus: false,
		mode: 'local',
		editable: false
	},
	{xtype:'tbseparator'},
	{
		xtype:'button',
		id:'maptab_east_search_panel_toolbar_clear',
		iconCls:'maptab_toolbar_search_clear',
		tooltip:_maptab_toolbar_search_clear,
		handler:function(){
			fn_toolbar_search_clear_drawings();
		}
	},
	{
		xtype:'button',
		tooltip:_maptab_east_search_panel_criteria_tab_add_attribute_btn,
		iconCls:'map_general_add_btn',
		handler:function()
		{
			var c=new fn_east_search_panel_addCriteria();

			Ext.getCmp('maptab_east_search_panel_criteria_panel').add(c);
			
			Ext.getCmp('maptab_east_search_panel_criteria_panel').doLayout();
		
		}
	},
	{
		xtype:'combo',
		id:'maptab_toolbar_search_andor',
		store: new Ext.data.SimpleStore({
		fields: ['name','value'],
			data: [
				[_maptab_toolbar_search_and,"AND"],
				[_maptab_toolbar_search_or,"OR"]
			]
		}),
		displayField: 'name',
		valueField: 'value',
		emptyText:_maptab_toolbar_search_and,
		value:'AND',
		width:60,
		triggerAction: 'all',
		selectOnFocus: false,
		mode: 'local',
		editable: true
	}
]

var maptab_east_search_panel_choose_LayerCombo=new fn_storeColumnsServiceLayers();

var maptab_east_search_panel={
	xtype:'panel',
	layout:'border',
	title:_maptab_east_search_panel,
	iconCls:'maptab_accordion_icon',
	id:'maptab_east_search_panel',
	tbar:[{
		xtype:'combobox',
		flex:3,
		id:'maptab_east_search_panel_choose_LayerCombo',
		emptyText: _maptab_east_search_panel_criteria_choose_layer,
		store: maptab_east_search_panel_choose_LayerCombo.store,
		queryMode: 'local',
		displayField: '_layerTitle',
		valueField: '_layerId',
		forceSelection: true,
		triggerAction: 'all',
		editable: false,
		listeners:{
			beforequery:fn_populate_east_search_panel_choose_LayerCombo,
			select:fn_east_search_panel_clear
		}
	}],
	items:[{
		xtype:'tabpanel',
		region:'center',
		layout:'fit',
		disabled:true,
		id:'maptab_east_search_panel_tabs',
		border:false,
		items:[{
			xtype:'panel',
			title:_maptab_east_search_panel_criteria_tab,
			id:'maptab_east_search_panel_criteria_tab',
			border:false,
			layout:'fit',
			tbar:maptab_east_search_panel_toolbar,
			items:[{
				xtype:'panel',
				autoScroll:true,
				id:'maptab_east_search_panel_criteria_panel',
				bbar:[
				'->',
				{
					xtype:'button',
					iconCls:'map_general_clear_btn',
					text:_maptab_east_search_panel_criteria_tab_clear_btn,
					handler:fn_east_search_panel_clear
				},
				{
					xtype:'checkbox',
					boxLabel:_maptab_east_search_results_new_tab,
					id:'maptab_east_search_results_new_tab'
				},
				{
					xtype:'button',
					iconCls:'maptab_toolbar_search',
					text:_maptab_east_search_panel_criteria_tab_search_btn,
					handler:fn_east_search_panel_search
				}]
			}]
		},{
			xtype:'panel',
			title:_maptab_east_search_panel_cql_statement_tab,
			id:'maptab_east_search_panel_cql_statement_tab',
			border:false,
			layout:'fit',
			items:[{
				xtype:'textarea',
				id:'maptab_east_search_panel_cql_statement_textarea'
			}]
		},{
			xtype:'panel',
			title:_maptab_east_search_panel_history_tab,
			id:'maptab_east_search_panel_history_tab',
			border:false,
			layout:'fit',
			items:[{
				xtype:'grid',
				border:false,
				id:'maptab_east_search_panel_history_grid',
				columnLines:true,
				closable:true,
				selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE',checkOnly:true}),
				store: new Ext.data.Store({
					fields: ['_searchNumber','_gridId','_layerName','_serviceType','_layerId','_jsonAttributes','_jsonGeometry'],
					data: []
				}),
				columns:[
					{
						dataIndex:'_searchNumber',
						sortable: true,
						width:35,
						maxWidth:35,
						minWidth:35,
						hideable: false,
						hidden:false
					},
					{
						dataIndex:'_gridId',
						sortable: true,
						hideable: false,
						hidden:true
					},
					{
						dataIndex:'_layerName',
						sortable: true,
						hideable: false,
						hidden:false
					},
					{
						dataIndex:'_serviceType',
						sortable: true,
						hideable: false,
						hidden:false
					},
					{
						dataIndex:'_layerId',
						sortable: true,
						hideable: false,
						hidden:true
					},
					{
						dataIndex:'_jsonAttributes',
						sortable: true,
						hideable: false,
						hidden:true
					},
					{
						dataIndex:'_jsonGeometry',
						sortable: true,
						hideable: false,
						hidden:true
					}
				]
			}]
		}]
	}]
};

function fn_populate_east_search_panel_choose_LayerCombo()
{
	maptab_east_search_panel_choose_LayerCombo.store.removeAll();

	var overlayers=mapGetlayersBy("isBaseLayer",false);
	
	for(var i=overlayers.length-1;i>=0;i--)
	{
		var layer=overlayers[i];
		
		if ((layer._layerObject._isSearchable==true) && (layer._layerObject._visibility==true))
		{
			maptab_east_search_panel_choose_LayerCombo.store.add({
				_layerId:layer._layerObject._layerId,
				_layerName:layer._layerObject._layerName,
				_layerTitle:layer._layerObject._layerTitle+" ("+layer._serviceObject._serviceType+")",
				_layerAbstract:layer._layerObject._layerAbstract,
				_layerLegend:layer._layerObject._layerLegend,
				_loadedStatus:layer._layerObject._loadedStatus,
				_layerObject:layer._layerObject,
				_serviceObject:layer._serviceObject
			});
		}
	}
}

var east_search_panel_criteria_count=0;

function fn_east_search_panel_addCriteria()
{
	var layerId=Ext.getCmp('maptab_east_search_panel_choose_LayerCombo').getValue();

	var attributes=mapFindLayerById(layerId)._layerObject._attributesFields;
	
	var cmbId="attributes_search_combobox_id_"+east_search_panel_criteria_count;

	var valueId="value_search_combobox_id_"+east_search_panel_criteria_count;
	
	var conditionsId="condition_search_combobox_id_"+east_search_panel_criteria_count;
	
	var cmb=new fn_createAttributesComboBox(attributes,cmbId);
	
	var cnd=Ext.create('Ext.form.ComboBox',{
		id:conditionsId,
		store: new Ext.data.SimpleStore({
			fields: ['condition','disableValue'],
				data: []
			}), 
		displayField: 'condition',
		valueField: 'condition',
		region:'west',
		width:100,
		emptyText:_maptab_east_search_conditions_empty_text,
		queryMode: 'local',
		forceSelection: true,
		triggerAction: 'all',
		selectOnFocus: false,
		mode: 'local',
		editable: false,
		listeners:{
			select:function(combo,record)
			{
				var record=record[0];
				
				if(record.data.disableValue)
				{
					Ext.getCmp(valueId).setDisabled(true);
				}
				else
				{
					Ext.getCmp(valueId).setDisabled(false);
				}
			}
		}
	});
	
	cmb.on('select',function(combo,record){
		
		var record=record[0];
		
		var conditions=fn_createCriteriaComboConditions(record.data._attributeType);
		
		cnd.store.loadData(conditions);
	});
	
	var panelId=Ext.id();
	
	var c=[{
		xtype:'panel',
		border:true,
		id:panelId,
		layout:'form',
		items:[cmb,
			{
				xtype:'panel',
				layout:'border',
				border:false,
				height:22,
				items:[cnd,
				{
					xtype:'textfield',
					id:valueId,
					width:200,
					emptyText:_maptab_east_search_value_empty_text,
					region:'center'
				},{
					xtype:'button',
					iconCls:'map_general_remove_btn',
					region:'east',
					handler:function()
					{
						Ext.getCmp("maptab_east_search_panel_criteria_panel").remove(Ext.getCmp(panelId));
					}
				}]
			}
		]
	}];
	
	east_search_panel_criteria_count++;
	
	return c;
}

function fn_east_search_panel_createCQLStatement()
{
	var q=new Array();
	
	var r;

	for(var i=0;i<east_search_panel_criteria_count;i++)
	{
		if (typeof Ext.getCmp("attributes_search_combobox_id_"+i)!=="undefined")
		{
			r=new Array();
		
			var attribute=Ext.getCmp("attributes_search_combobox_id_"+i).getValue();
			
			r.push(attribute);
			
			var condition=Ext.getCmp("condition_search_combobox_id_"+i).getValue();
		
			r.push(condition);
		
			var value=Ext.getCmp("value_search_combobox_id_"+i).getValue();
			
			r.push(value);
			
			if (i<(east_search_panel_criteria_count-1))
			{
				var andor=Ext.getCmp("maptab_toolbar_search_andor").getValue();
					
				r.push(andor);				
			}
			
			q.push(r.join(' '));
		}
	}
	
	if (maptab_toolbar_search_draw_layer.features.length>0)
	{
		var _layerId=Ext.getCmp('maptab_east_search_panel_choose_LayerCombo').getValue();
	
		var _cqlFilter=fn_toolbar_search_fetch_search_geometry(_layerId,Ext.getCmp("maptab_east_search_panel_toolbar_geometry_criteria").getValue());
		
		var _andor="";
		
		if (q.length>0)
		{
			_andor=' AND ';
		}
		
		q.push(_andor+_cqlFilter);
	}
	
	return q.join(' ');
}

function fn_east_search_panel_search()
{
	var cql_filter=fn_east_search_panel_createCQLStatement();

	Ext.getCmp("maptab_east_search_panel_cql_statement_textarea").setValue(cql_filter);
	
	var _layer=mapFindLayerById(Ext.getCmp("maptab_east_search_panel_choose_LayerCombo").getValue());
	
	var _queryObject=[{
		_layerId:_layer._layerObject._layerId,
		_serviceType:_layer._serviceObject._serviceType,
		_username:_layer._serviceObject._username,
		_serviceUrl:_layer._serviceObject._serviceUrl,
		_password:_layer._serviceObject._password,
		_layerName:_layer._layerObject._layerName,
		_version:_layer._serviceObject._version,
		_isService:_layer._serviceObject._isService,
		_featureType:_layer._layerObject._featureType,
		_cqlFilter:cql_filter,
		_featureInfoFormat:_layer._serviceObject._featureInfoFormat,
		_request:"search"
	}];
	
	var p=new fn_get();
	
	p._async=true;
	
	p._data=_queryObject;
		
	p._timeout=5000;
	
	var r;
	
	if (Ext.getCmp("maptab_east_search_results_new_tab").getValue())
	{
		r=fn_east_search_panel_results_grid();
		
		fn_grid_results_ids_array.push(r.id);
		
		maptab_search_results_count++;

		r.setTitle(mapFindLayerById(_layer._layerObject._layerId)._layerObject._layerTitle + " ("+mapFindLayerById(_layer._layerObject._layerId)._serviceObject._serviceType+")"+" "+maptab_search_results_count);
		
		Ext.getCmp("maptab_south").expand();
		
		Ext.getCmp("maptab_south_tabpanel").add(r);
		
		Ext.getCmp("maptab_south_tabpanel").setActiveTab(r);
	}
	else
	{
		if (Ext.getCmp(maptab_east_search_panel_last_result_id))
		{
			r=Ext.getCmp(maptab_east_search_panel_last_result_id);
			
			Ext.getCmp("maptab_south_tabpanel").setActiveTab(r);
		}
		else
		{
			r=fn_east_search_panel_results_grid();
		
			fn_grid_results_ids_array.push(r.id);
			
			maptab_search_results_count++;
			
			r.setTitle(mapFindLayerById(_layer._layerObject._layerId)._layerObject._layerTitle + " ("+mapFindLayerById(_layer._layerObject._layerId)._serviceObject._serviceType+")"+" "+maptab_search_results_count);
		
			Ext.getCmp("maptab_south").expand();
			
			Ext.getCmp("maptab_south_tabpanel").add(r);
			
			Ext.getCmp("maptab_south_tabpanel").setActiveTab(r);
		}
	}
	
	var mask=fn_loadingMask(r,_mask_loading_message_default);
	
	mask.show();
	
	p._success=function(_response, _opts)
	{
		
		var _response=Ext.JSON.decode(_response.responseText)
		
		var _data=new Array();
	
		Ext.each(_response,function(item)
		{
			Ext.each(item._response._attributes,function(record)
			{
				
				_data.push(record[0]);
				
			});
			
		});
		
		r.getStore().loadData(_data);
		
		var _f=r.getDockedItems('toolbar[dock="top"]')[0].items.items;
				
		_f[0].setText(mapFindLayerById(_layer._layerObject._layerId)._layerObject._layerTitle + " ("+mapFindLayerById(_layer._layerObject._layerId)._serviceObject._serviceType+")");
				
		_f[2].setText(_maptab_east_search_results_count_text+r.getStore().getCount());
				
		_f[4].setText(_maptab_east_search_results_selected_count_text+r.getSelectionModel().getSelection().length);
		
		mask.hide();
	};
	
	
	//	p._failure=map_controls_featureInfo_failure;
	
	p.get();
	
}

function fn_east_search_panel_results_grid()
{
	var _layerId=Ext.getCmp('maptab_east_search_panel_choose_LayerCombo').getValue();
	
	var _attributesFields=mapFindLayerById(_layerId)._layerObject._attributesFields;

	var maptab_east_search_panel_results_grid_tbar=fn_createFetureGridTopBar();

	maptab_east_search_panel_results_grid_tbar.unshift(
	{xtype:'label'},
	{xtype:'tbseparator'},
	{xtype:'label'},
	{xtype:'tbseparator'},
	{xtype:'label'});

	var gId=Ext.id();
	
	maptab_east_search_panel_last_result_id=gId;
	
	var g=Ext.create('Ext.grid.Panel',
	{
		border:false,
		columnLines:true,
		closable:true,
		id:gId,
		enableColumnMove:mapFindLayerById(_layerId)._layerObject._attributesReorder,
		title:_maptab_east_search_results,
		selModel: Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE',checkOnly:true}),
		store:fn_createAttributesStore(fn_featureColumnModelForGrid(_attributesFields)),
		columns:fn_createAttributesColumnModel(fn_featureColumnModelForGrid(_attributesFields)),
		tbar:maptab_east_search_panel_results_grid_tbar,
		listeners:{
			select:function(row, record, index, eOpts)
			{
				var _feature=fn_featureObject(record);
				
				fn_featureHighlight(_feature._featureId,_feature._layerId,_feature._srsName,_feature._featureUrl,_feature._featureGeomFormat,'');
				
				fn_toggleHightlightFromAllResultsGrids(_feature._featureId,_feature._layerId,g.id);
				
				var _f=g.getDockedItems('toolbar[dock="top"]')[0].items.items;
				
				_f[4].setText(_maptab_east_search_results_selected_count_text+g.getSelectionModel().getSelection().length);
			},
			show:function()
			{
				var _f=g.getDockedItems('toolbar[dock="top"]')[0].items.items;
				
				_f[4].setText(_maptab_east_search_results_selected_count_text+g.getSelectionModel().getSelection().length);
			},
			deselect:function(row, record, index, eOpts)
			{
				var _feature=fn_featureObject(record);
				
				fn_featureUnHiglighted(_feature._featureId,_feature._layerId);
				
				fn_toggleHightlightFromAllResultsGrids(_feature._featureId,_feature._layerId,g.id);
				
				var _f=g.getDockedItems('toolbar[dock="top"]')[0].items.items;
				
				_f[4].setText(_maptab_east_search_results_selected_count_text+g.getSelectionModel().getSelection().length);
			},
			beforeclose:function(grid, eOpts)
			{
				Ext.Array.remove(fn_grid_results_ids_array,g.id);
				
				Ext.Array.clean(fn_grid_results_ids_array);
			
				grid.store.each(function(item){
					
					if(fn_featureIsHiglighted(item.get("_featureId"),item.get("_layerId")))
					{
						fn_featureUnHiglighted(item.get("_featureId"),item.get("_layerId"));
						
						fn_toggleHightlightFromAllResultsGrids(item.get("_featureId"),item.get("_layerId"),g.id);
					}
				});
			},
			viewready:function(grid, eOpts)
			{
				grid.store.each(function(item){
					
					if(fn_featureIsHiglighted(item.get("_featureId"),item.get("_layerId")))
					{
						grid.getSelectionModel().select(item,true,true);
					}
				});
				
				var _f=g.getDockedItems('toolbar[dock="top"]')[0].items.items;
				
				_f[4].setText(_maptab_east_search_results_selected_count_text+g.getSelectionModel().getSelection().length);
				
			}
		}
	});
	
	return g;
}

function fn_east_search_panel_clear()
{
	fn_toolbar_search_clear_drawings();

	Ext.getCmp("maptab_east_search_panel_tabs").enable();

	Ext.getCmp("maptab_east_search_panel_criteria_panel").removeAll();
	
	east_search_panel_criteria_count=0;
}

