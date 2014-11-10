var maptab_toolbar_general=[
	{
		xtype:'button',
		id:'maptab_toolbar_general_pan_Left',
		iconCls:'maptab_toolbar_general_pan_left',
		tooltip:_maptab_toolbar_general_pan_Left,
		handler:function(){
		
			map_controls.pan.direction="West";
			map_controls.pan.trigger();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_pan_Up',
		iconCls:'maptab_toolbar_general_pan_up',
		tooltip:_maptab_toolbar_general_pan_Up,
		handler:function(){
		
			map_controls.pan.direction="North";
			map_controls.pan.trigger();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_pan_Down',
		iconCls:'maptab_toolbar_general_pan_down',
		tooltip:_maptab_toolbar_general_pan_Down,
		handler:function(){
		
			map_controls.pan.direction="South";
			map_controls.pan.trigger();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_pan_right',
		iconCls:'maptab_toolbar_general_pan_right',
		tooltip:_maptab_toolbar_general_pan_Right,
		handler:function(){
		
			map_controls.pan.direction="East";
			map_controls.pan.trigger();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_pan',
		iconCls:'maptab_toolbar_general_pan',
		enableToggle: true,
		pressed:true,
		tooltip:_maptab_toolbar_general_pan,
		toggleHandler:function(item,state){

			
			fn_toggleControl('navigation',state);
		}
	},
	{xtype: 'tbseparator'},
	{
		xtype:'button',
		id:'maptab_toolbar_general_zoomIn',
		iconCls:'maptab_toolbar_general_zoomIn',
		tooltip:_maptab_toolbar_general_zoomIn,
		handler:function(){
			
			map.zoomIn();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_zoomOut',
		iconCls:'maptab_toolbar_general_zoomOut',
		tooltip:_maptab_toolbar_general_zoomOut,
		handler:function(){
			
			map.zoomOut();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_zoomByArea',
		iconCls:'maptab_toolbar_general_zoomByArea',
		enableToggle: true,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_general_zoomByArea,
		toggleHandler :function(item,state){
			fn_toggleControl('zoomByArea',state);
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_extent',
		iconCls:'maptab_toolbar_general_extent',
		tooltip:_maptab_toolbar_general_extent,
		handler:function(){
			map.zoomToMaxExtent();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_zoomPrevious',
		iconCls:'maptab_toolbar_general_zoomPrevious',
		tooltip:_maptab_toolbar_general_zoomPrevious,
		handler:function(){
			
			map_controls.navigationHistory.previousTrigger();
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_zoomNext',
		iconCls:'maptab_toolbar_general_zoomNext',
		tooltip:_maptab_toolbar_general_zoomNext,
		handler:function(){
			
			map_controls.navigationHistory.nextTrigger();
		}
	},
	{xtype: 'tbseparator'},
	{
		xtype:'button',
		id:'maptab_toolbar_general_measureDistance',
		iconCls:'maptab_toolbar_general_measureDistance',
		enableToggle: true,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_general_measureDistance,
		toggleHandler :function(item,state){
			
			if(!state)
			{
				measuredistance_labels.destroyFeatures();
				measuredistance_cursor.destroyFeatures();
			}
			
			fn_toggleControl('measuredistance',state);
			
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_measureArea',
		iconCls:'maptab_toolbar_general_measureArea',
		enableToggle: true,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_general_measureArea,
		toggleHandler :function(item,state){
			if(!state)
			{
				measurearea_labels.destroyFeatures();
				measurearea_cursor.destroyFeatures();
			}
			
			fn_toggleControl('measurearea',state);
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_measureClear',
		iconCls:'maptab_toolbar_general_measureClear',
		enableToggle: false,
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_general_measureClear,
		handler :function(item,state){
			
			
		}
	},
	{xtype: 'tbseparator'},
	{
		xtype:'button',
		id: 'maptab_toolbar_general_setCoordinates',
		iconCls:'maptab_toolbar_general_setCoordinates',
		toggleGroup:'map_control_one_btn_allowed_group',
		enableToggle: true,
		tooltip:_maptab_toolbar_general_setCoordinates,
		toggleHandler:function(item,state){
			fn_maptab_toolbar_general_setCoordinates(state)
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_getCoordinates', 
		iconCls:'maptab_toolbar_general_getCoordinates',
		tooltip:_maptab_toolbar_general_getCoordinates,
		enableToggle: true,
		toggleHandler:function(item,state){
			fn_maptab_toolbar_general_getCoordinates(state);
		}
	},
	{
		xtype:'button',
		id:'maptab_toolbar_general_featureInfo', 
		iconCls:'maptab_toolbar_general_featureInfo',
		toggleGroup:'map_control_one_btn_allowed_group',
		tooltip:_maptab_toolbar_general_featureInfo,
		enableToggle: true,
		toggleHandler:function(item,state){
			map_controls_featureInfo(state);
		}
	}
];

var maptab_toolbar_general_setCoordinates_win=new Ext.Window({ 
	width:200,
	height:150,
	maxWidth:200,
	maxHeight:350,
	shim:true,
	x:10,
	y:270,
	title:_maptab_toolbar_general_setCoordinates,
	iconCls:'maptab_toolbar_general_setCoordinates',
	id:'maptab_toolbar_general_setCoordinates_window',
	resizable:true,
	closeAction:'hide',
	constrainTo:'maptab_map',
	autoRender:false,
	constrain:true,
	layout:'fit',
	listeners:{
		close:function()
		{
			Ext.getCmp('maptab_toolbar_general_setCoordinates').toggle(false);
		}
	}
});

var maptab_toolbar_general_update_setCoordinates_marker_layer;

function maptab_toolbar_general_update_setCoordinates()
{
	var _config=new _config_init_map();
	
	var _record=maptab_west_general_settings_store.findRecord("_generalSettingId", "maptab_west_general_settings_data_set_coordinates_projections");

	var _projections=_record.get("_generalSettingValue").split(/,\s*/);
	
	var _projectionStoreData=[];
	
	for(var i=0;i<_projections.length;i++)
	{
		var _projectionIndex=fn_objIndexOf(_config._mapProjections,"_title",_projections[i]);
			
		if (_projectionIndex>=0)
		{
			var _projection=_config._mapProjections[_projectionIndex]._epsg;
			
			var _projectionTitle=_config._mapProjections[_projectionIndex]._title;
			
			_projectionStoreData.push({_epsg:_projection,_title:_projectionTitle});
		}
	}
	
	var _setCoordinatesForm={
		xtype:'panel',
		layout:'form',
		border:false,
		bbar:['->',
			{
				xtype:'button',
				text:_maptab_toolbar_general_setCoordinates_goToBtn,
				handler:function()
				{
					var lon=trim(Ext.getCmp("maptab_toolbar_general_setCoordinates_lon").getValue());
		
					var lat=trim(Ext.getCmp("maptab_toolbar_general_setCoordinates_lat").getValue());
					
					var _choosen_projection=Ext.getCmp("maptab_toolbar_general_setCoordinates_combo").getValue();
					
					maptab_toolbar_general_setCoordinates(lon,lat,_choosen_projection);
				}
			}
		],
		items:[
			{
				xtype:'textfield',
				id:'maptab_toolbar_general_setCoordinates_lon',
				emptyText:_maptab_toolbar_general_setCoordinates_lon_label
			},
			{
				xtype:'textfield',
				id:'maptab_toolbar_general_setCoordinates_lat',
				emptyText:_maptab_toolbar_general_setCoordinates_lat_label
			},
			{	
				xtype:'combobox',
				id:'maptab_toolbar_general_setCoordinates_combo',
				store:new Ext.data.Store({
					fields: ['_epsg','_title'],
					data:_projectionStoreData
				}),
				emptyText:_maptab_toolbar_general_setCoordinates_projection,
				value:'',
				displayField: '_title',
				valueField: '_epsg',
				forceSelection: true,
				triggerAction: 'all',
				selectOnFocus: false,
				mode: 'local',
				editable: false
			}
		]
	};
	
	Ext.getCmp("maptab_toolbar_general_setCoordinates_window").add(_setCoordinatesForm);
}

function fn_maptab_toolbar_general_setCoordinates(state)
{
	if (state)
	{
		maptab_toolbar_general_setCoordinates_win.show();
		
		Ext.getCmp("maptab_toolbar_general_setCoordinates_window").removeAll();
		
		maptab_toolbar_general_update_setCoordinates();
	}
	else
	{
	
		maptab_toolbar_general_update_setCoordinates_marker_layer.destroy();
		
		maptab_toolbar_general_setCoordinates_win.hide();
	}
}

var maptab_toolbar_general_getCoordinates_win=new Ext.Window({ 
	width:200,
	height:150,
	maxWidth:200,
	maxHeight:350,
	shim:true,
	title:_maptab_toolbar_general_getCoordinates,
	iconCls:'maptab_toolbar_general_getCoordinates',
	resizable:true,
	constrainTo:'maptab_map',
	autoRender:false,
	constrain:true,
	x:10,
	y:100,
	closeAction:'hide',
	layout:'fit',
	items:[{
		xtype:'panel',
		layout:'fit',
		autoScroll:true,
		id:'maptab_toolbar_general_getCoordinates_panel'
	}],
	listeners:{
		close:function()
		{
			Ext.getCmp('maptab_toolbar_general_getCoordinates').toggle(false);
		}
	}
});

function maptab_toolbar_general_update_getCoordinates(evt)
{
	if (evt)
	{
		var _config=new _config_init_map();
	
		var _record=maptab_west_general_settings_store.findRecord("_generalSettingId", "maptab_west_general_settings_data_get_coordinates_projections");

		var _projections=_record.get("_generalSettingValue").split(/,\s*/);
	
		var _showCoordinates=[];
	
		for(var i=0;i<_projections.length;i++)
		{
			var _projectionIndex=fn_objIndexOf(_config._mapProjections,"_title",_projections[i]);
			
			if (_projectionIndex>=0)
			{
				var _projection=_config._mapProjections[_projectionIndex]._epsg;
				
				var _numDigits=_config._mapProjections[_projectionIndex]._numDigits;
				
				var _coordinates=mapCoordinatesFromPixels(evt.xy);
				
				if (_projection!=mapGetCurrentProjection())
				{
					_coordinates.transform(new OpenLayers.Projection(mapGetCurrentProjection()), new OpenLayers.Projection(_projection));
				}
				
				var _projectionText="<b>"+_projections[i]+"</b>:<br>"+_coordinates.lon.toFixed(_numDigits)+", "+_coordinates.lat.toFixed(_numDigits);
				
				_showCoordinates.push(_projectionText);
				
			}
		}
	
		Ext.getCmp("maptab_toolbar_general_getCoordinates_panel").update(_showCoordinates.join("<br><br>"));
	}
}

function fn_maptab_toolbar_general_getCoordinates(state)
{	
	if (state)
	{
		Ext.getCmp("maptab_toolbar_general_getCoordinates_panel").update(_maptab_toolbar_general_getCoordinates_empty_text);
		
		maptab_toolbar_general_getCoordinates_win.show();
		
		maptab_toolbar_general_update_getCoordinates();
		
		mapOnClick(maptab_toolbar_general_update_getCoordinates);
		
		Ext.get('maptab_map').setStyle("cursor", "crosshair");
	}
	else
	{
		maptab_toolbar_general_getCoordinates_win.hide();
		
		mapUnregisterEvents("click",maptab_toolbar_general_update_getCoordinates);
		
		Ext.get('maptab_map').setStyle("cursor", "initial");
	}
}

function maptab_toolbar_general_setCoordinates(lon,lat,projection)
{
	if(maptab_toolbar_general_update_setCoordinates_marker_layer)
	{
		maptab_toolbar_general_update_setCoordinates_marker_layer.destroy();
	}
	
	if (projection!="")
	{
		if((lon!="") && (lat!=""))
		{
			
			var lonLat = new OpenLayers.LonLat(lon,lat);
	
			if (mapGetCurrentProjection()!=projection)
			{
				lonLat.transform(new OpenLayers.Projection(projection), new OpenLayers.Projection(mapGetCurrentProjection()));
			}
			
			var _record=maptab_west_general_settings_store.findRecord("_generalSettingId", "maptab_west_general_settings_data_set_coordinates_zoom");
			
			var zoom=_record.get("_generalSettingValue");
			
			mapSetCenter(lonLat.lon,lonLat.lat,zoom);
			
			var _showMarker=maptab_west_general_settings_store.findRecord("_generalSettingId", "maptab_west_general_settings_data_set_coordinates_marker");
			
			_showMarker=_showMarker.get("_generalSettingValue");
			
			if(_showMarker=="true")
			{
				maptab_toolbar_general_update_setCoordinates_marker_layer = new OpenLayers.Layer.Markers("maptab_toolbar_general_update_setCoordinates_marker_layer");
						
				map.addLayer(maptab_toolbar_general_update_setCoordinates_marker_layer);
					
				var size = new OpenLayers.Size(24,32);
						
				var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
						
				var icon = new OpenLayers.Icon(host+'images/marker.png', size, offset);

				maptab_toolbar_general_update_setCoordinates_marker_layer.addMarker(new OpenLayers.Marker(lonLat,icon));
			}	
			
		}
	}
}
