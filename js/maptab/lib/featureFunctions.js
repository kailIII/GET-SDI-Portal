function fn_featureObject(record)
{

	var _featureId=record.get("_featureId");

	var _layerId=record.get("_layerId");
	
	var _srsName=record.get("_srsName");
	
	var _featureUrl=record.get("_featureUrl");
	
	var _featureGeomFormat=record.get("_featureGeomFormat");
	
	var feature={
		_featureId:_featureId,
		_layerId:_layerId,
		_srsName:_srsName,
		_featureUrl:_featureUrl,
		_featureGeomFormat:_featureGeomFormat,
		_featureAttributes:""
	};
	
	return feature;

}

function fn_featureColumnModelForGrid(_appendColumns)
{
	var output=new Array();
	
	output=[
	{
		_attributeName:"_featureUrl",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		hideable:false,
		hidden:true
	},
	{
		_attributeName:"_featureGeomFormat",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		hideable:false,
		hidden:true
	},
	{
		_attributeName:"_srsName",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		hideable:false,
		hidden:true
	},{
		_attributeName:"_featureId",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		width:30,
		hideable:false,
		renderer:fn_featureShowOnMapRenderer
	},
	{
		_attributeName:"_featureId",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		width:30,
		hidden:true,
		hideable:false,
		renderer:fn_featureHighlightRenderer
	},
	{
		_attributeName:"_featureId",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		width:30,
		hidden:false,
		hideable:false,
		renderer:fn_featureAddToSelectedRenderer
	},
	{
		_attributeName:"_featureId",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		width:30,
		hideable:false,
		renderer:fn_featureInfoWindowRenderer
	},
	{
		_attributeName:"_featureId",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		width:30,
		hideable:false,
		hidden:true,
		renderer:fn_featureDownloadRenderer
	},
	{
		_attributeName:"_layerId",
		_attributeSortable:false,
		_attributeType:"string",
		_attributeTranslation:"",
		width:30,
		hidden:true,
		hideable:false,
		renderer:fn_featureEditRenderer
	}];
	
	if (typeof _appendColumns!="undefined")
	{
		output.push.apply(output, _appendColumns);
	}
	
	return output;
}

function fn_createFetureGridTopBar()
{
	var tbar=[
		'->',
		{
			xtype:'button',
			tooltip:_feature_gridicons_qtip_showOnMap,
			iconCls:'features_toolbar_showonmap',
			hidden:true,
			handler:function()
			{
			
			}
		},
		{
			xtype:'button',
			tooltip:_feature_gridicons_qtip_highlight,
			iconCls:'features_toolbar_highlight',
			hidden:true,
			handler:function()
			{
			
			}
		},
		{
			xtype:'button',
			tooltip:_feature_gridicons_qtip_featureInfoWindow,
			iconCls:'features_toolbar_showinfow',
			handler:function()
			{
				var selected=Ext.getCmp(this.findParentByType("grid").id).getSelectionModel().getSelection();
				
				Ext.each(selected,function(item)
				{
				
					fn_callFeatureFnFromGrid(item.get("_featureId"),item.get("_layerId"),item.get("_srsName"),item.get("_featureUrl"),item.get("_featureGeomFormat"),'getInfo');
					
				});
			}
		},
		{
			xtype:'button',
			hidden:true,
			tooltip:_feature_gridicons_qtip_download,
			iconCls:'features_toolbar_download',
			handler:function()
			{
			
			}
		},
		{
			xtype:'button',
			tooltip:_feature_gridicons_qtip_addtoselected,
			iconCls:'features_toolbar_addtoselected',
			handler:function()
			{
				var selected=Ext.getCmp(this.findParentByType("grid").id).getSelectionModel().getSelection();
				
				Ext.each(selected,function(item)
				{
					maptab_west_selection_panel_grid_add_record(item.get("_featureId"),item.get("_layerId"),item.get("_featureUrl"),item.get("_srsName"),item.get("_featureGeomFormat"));
					
				});
			}
		}
	];
	
	return tbar;

}

function fn_featureEditRenderer(value, metaData, record, row, col, store, gridView)
{
	var _layerId=record.get("_layerId");
	
	var _feature=fn_featureObject(record);
	
	if (mapFindLayerById(_layerId)._layerObject._isEditable)
	{
		return "<img src=\""+host+"images/edit.png\" data-qtip=\""+_feature_gridicons_qtip_edit+"\" onClick=\"fn_maptab_edit_init_edit_from_grid('"+_layerId+"',['"+_feature._featureId+"']);\">";
	}
	return "";
}

function fn_featureShowOnMapRenderer(value, metaData, record, row, col, store, gridView)
{
	var _feature=fn_featureObject(record);

	return "<img src=\""+host+"images/show.png\" class=\"column_grid_images\" data-qtip=\""+_feature_gridicons_qtip_showOnMap+"\" onClick=\"fn_featureShowOnMap('"+_feature._featureId+"','"+_feature._layerId+"','"+_feature._srsName+"','"+_feature._featureUrl+"','"+_feature._featureGeomFormat+"','');\" d>";
}

function fn_featureShowOnMap(_featureId,_layerId,_srsName,_featureUrl,_featureGeomFormat,fn_param)
{
	if(mapGetFeatureByFid(_layerId,_featureId)!=null)
	{
		var _fetaure_Extent=mapGetFeatureByFid(_layerId,_featureId).geometry.getBounds();
		
		map.zoomToExtent(_fetaure_Extent);
	}
	else
	{
		
		var p=new fn_get();
			
		p._async=false;
		
		p._url=fn_surl(_featureUrl,mapFindLayerById(_layerId)._serviceObject._username,mapFindLayerById(_layerId)._serviceObject._password,"getfeatures&method=get");
		
		p._timeout=5000;
			
		p._success=function(_response, _opts){
			
			var gmlReader = new OpenLayers.Format.GML({
				extractAttributes: true,
				internalProjection:new OpenLayers.Projection(mapGetCurrentProjection()),
				externalProjection: new OpenLayers.Projection(mapFindLayerById(_layerId)._layerObject._nativeSRS)
			});
					
			var features = gmlReader.read(_response.responseText);
					
			map.zoomToExtent(features[0].geometry.getBounds());
		};
			
		p.get();
	}
}

function fn_featureHighlightRenderer(value, metaData, record, row, col, store, gridView)
{
	var _feature=fn_featureObject(record);
	
	return "<img src=\""+host+"images/highlight.png\" class=\"column_grid_images\" onClick=\"fn_featureHighlight('"+_feature._featureId+"','"+_feature._layerId+"','"+_feature._srsName+"','"+_feature._featureUrl+"','"+_feature._featureGeomFormat+"','');\" data-qtip=\""+_feature_gridicons_qtip_highlight+"\">";
}

function fn_featureIsHiglighted(_featureId,_layerId)
{
	if (mapGetFeatureByFid(map_highlightLayer.id,_featureId))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function fn_featureUnHiglighted(_featureId,_layerId)
{
	if (mapGetFeatureByFid(map_highlightLayer.id,_featureId))
	{
		map_highlightLayer.removeFeatures([mapGetFeatureByFid(map_highlightLayer.id,_featureId)]);
		
	}
}

function fn_toggleHightlightFromAllResultsGrids(_featureId,_layerId,_gridId)
{
	Ext.each(fn_grid_results_ids_array,function(item)
	{
		if (item!=_gridId)
		{
			Ext.getCmp(_gridId).getStore().each(function(record){
				
				var _r=Ext.getCmp(item).getStore().findRecord('_featureId', record.get("_featureId"));
				
				if (mapGetFeatureByFid(map_highlightLayer.id,record.get("_featureId")))
				{
					if(_r)
					{
						Ext.getCmp(item).getSelectionModel().select(_r,true,true);
					}
				}
				else
				{
					if(_r)
					{
						Ext.getCmp(item).getSelectionModel().deselect(_r,true);
					}
				}
				
			});
		}
	});
}


function fn_featureHighlight(_featureId,_layerId,_srsName,_featureUrl,_featureGeomFormat,fn_param)
{
	if (mapGetFeatureByFid(map_highlightLayer.id,_featureId)==null)
	{
		if (mapGetFeatureByFid(_layerId,_featureId))
		{
			var _cloneFeature=mapGetFeatureByFid(_layerId,_featureId).clone();
			
			_cloneFeature.fid=_featureId;
			
			_cloneFeature.attributes=mapGetFeatureByFid(_layerId,_featureId).attributes;
		
			map_highlightLayer.addFeatures(_cloneFeature);
		}
		else
		{
		
			var p=new fn_get();
			
			p._async=false;
			
			p._url=fn_surl(_featureUrl,mapFindLayerById(_layerId)._serviceObject._username,mapFindLayerById(_layerId)._serviceObject._password,"getfeatures&method=get");
			
			p._timeout=5000;
			
			p._success=function(_response, _opts){
			
				var gmlReader = new OpenLayers.Format.GML({
					extractAttributes: true,
					internalProjection:new OpenLayers.Projection(mapGetCurrentProjection()),
					externalProjection: new OpenLayers.Projection(mapFindLayerById(_layerId)._layerObject._nativeSRS),
					xy:mapFindLayerById(_layerId)._layerObject._xy
				});
				
				var features = gmlReader.read(_response.responseText);
				
				map_highlightLayer.addFeatures(features);
			};
			
			p.get();
		}
		
		if (fn_param!="")
		{
			fn_param(_featureId,_layerId,_featureUrl,_featureGeomFormat);
		}
	}
}

function fn_featureInfoWindowRenderer(value, metaData, record, row, col, store, gridView)
{
	var _feature=fn_featureObject(record);
	
	return "<img src=\""+host+"images/featureInfoWindow.png\" class=\"column_grid_images\" onClick=\"fn_callFeatureFnFromGrid('"+_feature._featureId+"','"+_feature._layerId+"','"+_feature._srsName+"','"+_feature._featureUrl+"','"+_feature._featureGeomFormat+"','getInfo');\" data-qtip=\""+_feature_gridicons_qtip_featureInfoWindow+"\">";
}

function fn_callFeatureFnFromGrid(_featureId,_layerId,_srsName,_featureUrl,_featureGeomFormat,fn_param)
{
	
	var feature={
		_featureId:_featureId,
		_layerId:_layerId,
		_srsName:_srsName,
		_featureUrl:_featureUrl,
		_featureGeomFormat:_featureGeomFormat
	};
	
	switch(fn_param)
	{
		case "getInfo":
			fn_featureInfoWindow(feature).show();
		break;
	}
}

function fn_featureDownloadRenderer(value, metaData, record, row, col, store, gridView)
{
	return "<img src=\""+host+"images/download.png\" class=\"column_grid_images\" data-qtip=\""+_feature_gridicons_qtip_download+"\">";
}


function fn_featureAddToSelectedRenderer(value, metaData, record, row, col, store, gridView)
{
	var _feature=fn_featureObject(record);
	
	return "<img src=\""+host+"images/addToSelected.png\" class=\"column_grid_images\" onClick=\"fn_featureAddToSelected('"+_feature._featureId+"','"+_feature._layerId+"','"+_feature._featureUrl+"','"+_feature._srsName+"','"+_feature._featureGeomFormat+"');\" data-qtip=\""+_feature_gridicons_qtip_highlight+"\">";
}

function fn_featureAddToSelected(_featureId,_layerId,_featureUrl,_srsName,_featureGeomFormat)
{
	maptab_west_selection_panel_grid_add_record(_featureId,_layerId,_featureUrl,_srsName,_featureGeomFormat);
}



function fn_createAttributePanel(_feature)
{
	var a="";
	
	a=fn_createAttributesPivotGrid(_feature);
	
	if(mapGetFeatureByFid(_feature._layerId,_feature._featureId)!=null)
	{
		var _attributes=fn_createAttributesRecords(mapGetFeatureByFid(_feature._layerId,_feature._featureId).attributes,mapFindLayerById(_feature._layerId)._layerObject._attributesFields);
		
		a.getStore().loadData(_attributes);
	
	}
	else
	{
		var p=new fn_get();
		
		p._async=true;
		
		p._data=[{
			_layerId:_feature._layerId,
			_serviceType:mapFindLayerById(_feature._layerId)._serviceObject._serviceType,
			_username:mapFindLayerById(_feature._layerId)._serviceObject._username,
			_serviceUrl:mapFindLayerById(_feature._layerId)._serviceObject._serviceUrl,
			_password:mapFindLayerById(_feature._layerId)._serviceObject._password,
			_layerName:mapFindLayerById(_feature._layerId)._layerObject._layerName,
			_version:mapFindLayerById(_feature._layerId)._serviceObject._version,
			_isService:mapFindLayerById(_feature._layerId)._serviceObject._isService,
			_featureType:mapFindLayerById(_feature._layerId)._layerObject._featureType,
			_cqlFilter:mapFindLayerById(_feature._layerId)._layerObject._cqlFilter,
			_featureInfoFormat:mapFindLayerById(_feature._layerId)._serviceObject._featureInfoFormat,
			_featureUrl:_feature._featureUrl,
			_request:"getAttributes"
		}]
		
		p._timeout=5000;
		
		p._success=function(_response, _opts){
		
			var _response=Ext.JSON.decode(_response.responseText)[0];
		
			var t_attributes=_response._response._attributes[0][0];
			
			var _attributes=fn_createAttributesRecords(t_attributes,mapFindLayerById(_feature._layerId)._layerObject._attributesFields);
			
			a.getStore().loadData(_attributes);
		
		};
		
		p.get();
	}
	
	
	return a;
}


function fn_fetchGML(_feature)
{

	var _output;

	if(mapGetFeatureByFid(_feature._layerId,_feature._featureId)!=null)
	{
		_output=mapGetFeatureByFid(_feature._layerId,_feature._featureId);
	}
	else
	{
	
		var p=new fn_get();
				
		p._async=false;
		
		p._url=fn_surl(_feature._featureUrl,mapFindLayerById(_feature._layerId)._serviceObject._username,mapFindLayerById(_feature._layerId)._serviceObject._password,"getfeatures&method=get");
				
		p._timeout=5000;
				
		p._success=function(_response, _opts){
				
			var gmlReader = new OpenLayers.Format.GML({
				extractAttributes: true,
				internalProjection:new OpenLayers.Projection(mapGetCurrentProjection()),
				externalProjection: new OpenLayers.Projection(mapFindLayerById(_feature._layerId)._layerObject._nativeSRS),
				xy:mapFindLayerById(_feature._layerId)._layerObject._xy
			});
					
			_output=gmlReader.read(_response.responseText)[0];
					
		};
				
		p.get();
			
	}
	return _output;
}

function fn_featureCreateMiniMap(_feature,_mapId,_layerId)
{
	var mini_map = new OpenLayers.Map(_mapId, {controls: []});
				
	mini_map.addControl(new OpenLayers.Control.Navigation());
	
	var _map_config_object=new _config_init_map();
	
	for(var k=0;k<_map_config_object._basemapLayers.length;k++)
	{
		mini_map.addLayer(_map_config_object._basemapLayers[k]._layer);
	}	
	
	var featurelayer=new OpenLayers.Layer.Vector("aa",{
		styleMap:new OpenLayers.StyleMap({
			"default":new OpenLayers.Style({
				pointRadius: 5, 
				fillColor: "#FFCB50",
				fillOpacity: 0.4, 
				strokeColor:  "#FF9428",
				strokeWidth: 1,
				strokeOpacity:0.8
			})
		})
	});
	
	mini_map.addLayer(featurelayer);
	
	var _f=_feature.clone();
	
	featurelayer.addFeatures(_f);
	
	mini_map.zoomToExtent(_f.geometry.getBounds());
	
}

function fn_createGeometryPanel(_theFeature,_feature)
{
	var _g="";
	
	if (_theFeature)
	{
		var _data=[];
		
		var i=1;
		
		var _theFeatureClone=_theFeature.clone();
		
		var _theGeometry=_theFeatureClone.geometry;
		
		if (mapGetProjectionCode(mapFindLayerById(_feature._layerId)._layerObject._nativeSRS)!=mapGetCurrentProjection())
		{
			_theGeometry=_theGeometry.transform(new OpenLayers.Projection(mapGetCurrentProjection()),new OpenLayers.Projection(mapGetProjectionCode(mapFindLayerById(_feature._layerId)._layerObject._nativeSRS)));
		}
	
		Ext.each(_theGeometry.components, function(item)
		{
			var _vertices=item.getVertices();
			
			for(var a=0;a<_vertices.length;a++)
			{
				_data.push([_vertices[a].x,_vertices[a].y,i]);
			}
			
			i++;
			
		});
		
		var _s=new Ext.data.SimpleStore({
			fields: ['lon','lat','componentNum'],
			data: _data
		});
		
		_s.group("componentNum");
		
		_g=Ext.create('Ext.grid.Panel',
		{
			border:true,
			columnLines:true,
			split: true,
			store:_s,
			_feature:_feature,
			columns:[{
				header:_feature_geometry_lon,
				dataIndex: 'lon',
				hidden:false,
				sortable:false,
				flex:2,
				hideable:false
			},
			{
				header:_feature_geometry_lat,
				dataIndex:'lat',
				flex:2,
				hidden:false,
				sortable:false,
				hideable:false
			},
			{
				header:'',
				dataIndex: 'componentNum',
				hidden:true,
				hideable:false
			}],
			tbar:[
				{
					xtype:'label',
					text:_feature_projection_system+": "+mapGetProjectionCode(mapFindLayerById(_feature._layerId)._layerObject._nativeSRS)
				}
			],
			features: [{
				ftype: 'grouping',
				groupHeaderTpl: [
					'{name:this.formatName}',
					{
						formatName: function(name) {
							return _feature_geometry_component+":"+name;
						}
					}
				]
			}]
		});
		
	}

	return _g;
}

function fn_createDetailsPanel(_feature)
{
	var d;
	
	return d;
}


var featureInfoWindow_isMinimized=false;

function fn_featureInfoWindow(_feature)
{
	var attributes=fn_createAttributePanel(_feature);
	
	var _theFeature=fn_fetchGML(_feature);
	
	var a=Ext.create('Ext.Panel',
	{
		title:_maptab_featureInfoWindow_Attributes_Tab_title,
		border:false,
		layout:'fit',
		items:[
			attributes
		]
	});
	
	var geometry=fn_createGeometryPanel(_theFeature,_feature);
	
	var g="";
	
	if(geometry!="")
	{
		g=Ext.create('Ext.Panel',
		{
			title:_maptab_featureInfoWindow_Geometry_Tab_title,
			border:false,
			layout:'fit',
			items:[
				geometry
			]
		});
	}
		
	var details=fn_createDetailsPanel(_feature);
		
	var d=Ext.create('Ext.Panel',
	{
		title:_maptab_featureInfoWindow_Details_Tab_title,
		border:false,
		layout:'fit',
		items:[
			details
		]
	});
	
	var mapid=Ext.id();
	
	var m=Ext.create('Ext.Panel',
	{
		title:_maptab_featureInfoWindow_Map_Tab_title,
		border:false,
		_isFirstTime:true,
		layout:'fit',
		listeners:{
			boxready:function(){
			
				if (this._isFirstTime)
				{
					fn_featureCreateMiniMap(_theFeature,mapid,_feature._layerId);
					
					this._isFirstTime=false;
					
				}
			}
		},
		items:[{
			xtype:'panel',
			html:"<div id=\""+mapid+"\" style=\"width:100%;height:100% !important;\"></div>"
		}]
	});
	
	
	var	_tabs={
		xtype:'tabpanel',
		region:'center',
		layout:'fit',
		_feature:_feature,
		border:false,
		items:[a,m,g,d]
	};
	
	
	var i=new Ext.Window({ 
		width:340,
		height:485,
		title:_maptab_featureInfoWindow_title,
		minimizable:true,
		resizable:true,
		plain:true,
		_feature:_feature,
		layout:'border',
		closeAction:'destroy',
		minimize:function(win, eOpts )
		{
			if ((!featureInfoWindow_isMinimized) && (_feature))
			{
				Ext.getCmp('maptab_east').expand();
			
				Ext.getCmp("maptab_east_north").show();
				
				Ext.getCmp("maptab_east_north_panel").show();
				
				Ext.getCmp("maptab_east_north_panel").add(_tabs);
				
				Ext.getCmp("maptab_east_north_panel").items.items[0].doLayout();
				
				Ext.getCmp("maptab_east_north_panel").items.items[0].setActiveTab(1);
				
				Ext.getCmp("maptab_east_north_panel").items.items[0].setActiveTab(0);
				
				featureInfoWindow_isMinimized=true;
				
				i.hide();
			}
		},
		listeners:{
			show:function(w)
			{
				
				if (featureInfoWindow_isMinimized)
				{
					Ext.getCmp('maptab_east').expand();
				
					Ext.getCmp("maptab_east_north").show();
				
					Ext.getCmp("maptab_east_north_panel").removeAll();
					
					Ext.getCmp("maptab_east_north_panel").show();
					
					Ext.getCmp("maptab_east_north_panel").add(_tabs);
					
					Ext.getCmp("maptab_east_north_panel").items.items[0].doLayout();
				
					Ext.getCmp("maptab_east_north_panel").items.items[0].setActiveTab(1);
					
					Ext.getCmp("maptab_east_north_panel").items.items[0].setActiveTab(0);
					
					i.hide();
				}
			}
		},
		items:[{
			xtype:'panel',
			region:'center',
			layout:'border',
			items:[_tabs]
		}]
	});
	
	return i;
}



