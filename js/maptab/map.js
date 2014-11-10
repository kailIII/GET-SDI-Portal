var map;
var map_previousProjection;
var map_currentProjection;
var map_controls;
var map_highlightLayer;

var map_contextMenu=Ext.create("Ext.menu.Menu",{
	floating:true,
	ignoreParentClick: true,
	items:[{
		text:_map_contextMenu_Cancel
	}]
});

function init_map()
{
	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
	
	OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;
	
	OpenLayers.Util.onImageLoadErrorColor = 'transparent';
	
	map = new OpenLayers.Map("maptab_map",{controls:[]});
	
	_map_config_object=new _config_init_map();
	
	for(var k=0;k<_map_config_object._basemapLayers.length;k++)
	{
		map.addLayer(_map_config_object._basemapLayers[k]._layer);
		
		maptab_west_layer_add_BaseLayer(_map_config_object._basemapLayers[k]._layer,maptab_west_layer_tree_panel_tree_json_store.getNodeById('maptab_west_layer_tree_panel_tabs_layers_basemaps_node'));
	}
	
	map.setOptions(_map_config_object._mapOptions)
	
	map_controls=_map_config_object._mapControls;
	
	init_map_controls_measureDistance();
	
	init_map_controls_measureArea();
	
	for(var key in map_controls)
	{
		map.addControl(map_controls[key]);
	}
	
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	
	mapListOfBasemapProjections();
	
	map_previousProjection=mapGetCurrentProjection();
	
	map_currentProjection=mapGetCurrentProjection();
	
	map.div.oncontextmenu = function noContextMenu(e) {return false;}
	
	Ext.EventManager.on(Ext.get(map.div.id), 'contextmenu', function(e)
	{
		if (map_contextMenu.items.length>1)
		{
			map_contextMenu.showAt(e.getXY());
		}
	});
	
	var _initCenter= new OpenLayers.LonLat(_map_config_object._initCenter[0],_map_config_object._initCenter[1]);
	
	if (map_currentProjection!="EPSG:4326")
	{
		_initCenter.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(map_currentProjection));
	}
	
	map_highlightLayer=new OpenLayers.Layer.Vector("map_highlightLayer",{
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
	
	map.addLayer(map_highlightLayer);
	
	mapSetCenter(Number(_initCenter.lon),Number(_initCenter.lat),_map_config_object._initZoom);
	
	init_maptab_bbar_general_bbar();
	
	init_map_controls_eastPanel_foundFeaturesGrid();
	
	init_maptab_toolbar_search_controls();
	
	init_maptab_west_general_settings_store_load_data();
	
	init_maptab_west_search_settings_grid_store_populate();
	
	fn_execOnloadFn();
	
	mapOnChangeBaseLayer(mapChangeBaseLayer);
	
}

function mapChangeBaseLayer(a,b)
{

	if (a!=b)
	{
		map.setCenter(new OpenLayers.LonLat(Number(map.getCenter().lon),Number(map.getCenter().lat)).transform(new OpenLayers.Projection(b), new OpenLayers.Projection(a)),map.getZoom());
			
		map.setOptions({projection:new OpenLayers.Projection(a)});
			
		map.updateSize();
			
		map_currentProjection=map.getProjectionObject().toString();
			
		var overlayers=mapGetlayersBy("isBaseLayer",false);
	
		for(var i=overlayers.length-1;i>=0;i--)
		{
			var _layer=overlayers[i];
		
			if (_layer._serviceObject._serviceType=="WMS")
			{
				_layer.projection=new OpenLayers.Projection(map_currentProjection);
			}
		}
		
		map.zoomIn();
		
		map.zoomOut();
		
	}
	
}

function mapSetVisibilityBaseOnScales()
{
	
}


function mapSetCenter(lon,lat,zoom)
{
	map.setCenter(new OpenLayers.LonLat(Number(lon),Number(lat)),zoom);
}

function mapGetCenter()
{
	var _mc=map.getCenter();
	
	if (mapGetCurrentProjection()!=mapGetCurrentDisplayProjection())
	{
		_mc.transform(new OpenLayers.Projection(mapGetCurrentProjection()), new OpenLayers.Projection(mapGetCurrentDisplayProjection()))
	}
	
	var _mz=(map.getZoom()+1);
	
	var _c={
		lon:_mc.lon,
		lat:_mc.lat,
		zoom:_mz
	}
	
	return _c
}

function mapSetDisplayProjection(_epsg)
{
	map.setOptions({displayProjection:new OpenLayers.Projection(_epsg)});
}

function mapBeforeAddLayer(_serviceObject,_layerObject)
{
	config_update_addLayer(_layerObject,_serviceObject);
}

function mapAddLayer(_serviceObject,_layerObject)
{
	var _node=maptab_west_layer_tree_panel_tree_json_store.getNodeById('maptab_west_layer_tree_panel_tabs_layers_layers_node');

	if(_layerObject._groupId!="")
	{
		_node=maptab_west_layer_tree_panel_tree_json_store.getRootNode().findChild("_groupId",_layerObject._groupId,true);
	}

	if (!mapFindLayerById(_layerObject._layerId))
	{
		var _layerNode=maptab_west_layer_add_layer(_layerObject._layer,_node);
	
		mapOnLayerLoadStart(_layerObject._layer,fn_loadStart);
		
		mapOnLayerLoadEnd(_layerObject._layer,fn_loadEnd);
	
		map.addLayer(_layerObject._layer);
	
		config_update_addLayer(_layerObject,_serviceObject);
		
		maptab_west_layer_reorder_layer(_layerNode,mapGetCountOfOverlayers());
	
	}
}

function mapRemoveLayerNode(_layer)
{
	if (mapRemoveLayer(_layer))
	{
		maptab_west_layer_remove_node(_layer._layerObject._layerId);
	}
}

function mapRemoveLayer(_layer)
{
	
	if (mapFindLayerById(_layer._layerObject._layerId))
	{
		map.removeLayer(_layer);
		
		return true;
	}
	return false;
}


function mapFindLayerById(_layerId)
{
	return map.getLayer(_layerId);
}

function mapChangeLayerVisibility(_layerId,_visibility)
{
	mapFindLayerById(_layerId).setVisibility(_visibility);
	
	if (mapFindLayerById(_layerId)._layerObject)
	{
		mapFindLayerById(_layerId)._layerObject._visibility=_visibility;
	}
}

function mapGetCountOfOverlayers()
{
	return map.getLayersBy("isBaseLayer",false).length;
}

function mapGetlayersBy(_find,_value)
{
	var _array=[];

	var _layers=map.getLayersBy(_find,_value);
	
	for(var i=0;i<_layers.length;i++)
	{
		if ((typeof _layers[i]._layerObject!=="undefined") && (typeof _layers[i]._serviceObject!=="undefined"))
		{
			_array.push(_layers[i]);
		}
	}

	return _array;
}

function mapReorderLayer(_layerId,_index)
{
	map.setLayerIndex(mapFindLayerById(_layerId),_index);
}

function mapLayerIsLoaded(_layerId)
{
	if(mapFindLayerById(_layerId))
	{
		return mapFindLayerById(_layerId)._layerObject._loadedStatus;
	}
	
	return false;
}

function mapListOfBasemapProjections()
{
	var basemaps=map.getLayersBy("isBaseLayer",true);
	
	var _supportedEPSG=new Array();
	
	for(var i=0;i<basemaps.length;i++)
	{
		if(_supportedEPSG.indexOf(basemaps[i].projection.toString())==-1)
		{
			_supportedEPSG.push(basemaps[i].projection.toString());
		}
	}
	
	return _supportedEPSG;
}

function mapGetCurrentProjection()
{
	var p=map.getProjectionObject().toString();
	
	return p;
}

function mapGetCurrentDisplayProjection()
{
	var p=map.displayProjection.toString();
	
	return p;
}

function mapGetCurrentScale()
{
	var p=map.getScale().toString();
	
	return p;
}

function mapGetBasemapResolutions()
{
	var resolutions = map.baseLayer.resolutions;
        
	var units = map.baseLayer.units;
		
	var mapScales=new Array();
		
    for (var i=resolutions.length-1; i >= 0; i--) {
		
		var res = resolutions[i];
		
		mapScales.push([(OpenLayers.Util.getScaleFromResolution(res, units)-1),"1:"+Math.round(OpenLayers.Util.getScaleFromResolution(res, units))])
    }
	
	return mapScales;
}

function mapZoomToScale(scale)
{
	map.zoomToScale(scale);
}

function mapGetProjectionCode(projection)
{
	var p=new OpenLayers.Projection(projection);
	
	return p.getCode().toString();
}

function mapBBOXToString(_layerObject)
{
	var b=_layerObject._bboxMinX+","+_layerObject._bboxMinY+","+_layerObject._bboxMaxX+","+_layerObject._bboxMaxY;
	
	return b.toString();
}

function mapOnChangeBaseLayer(fn_param)
{
	map.events.on({
		"changebaselayer":function()
		{
			fn_param(map_previousProjection,map_currentProjection);
			
			map_previousProjection=map.getProjectionObject().toString();
		}
	});
}

function mapOnZoomEnd(fn_param)
{
	map.events.on({
		"zoomend":function()
		{
			fn_param();
		}
	});
}

function mapOnMoveEnd(fn_param)
{
	map.events.on({
		"moveend":function()
		{
			fn_param();
		}
	});
}

function mapOnBeforeAddLayer(fn_param)
{
	map.events.on({
		"preaddlayer":fn_param
	});
}

function mapOnAddLayer(fn_param)
{
	map.events.on({
		"addlayer":fn_param
	});
}

function mapOnRemoveLayer(fn_param)
{
	map.events.on({
		"removelayer":function()
		{
			fn_param();
		}
	});
}

function mapOnMouseMove(fn_param)
{
	map.events.on({
		"mousemove":fn_param
	});
}

function mapOnChangeLayer(fn_param)
{
	map.events.on({
		"changelayer":fn_param
	});
}

function mapOnFeatureOver(fn_param)
{
	map.events.on({
		"featureover":fn_param
	});
}

function mapOnFeatureOut(fn_param)
{
	map.events.on({
		"featureout":fn_param
	});
}

function mapOnClick(fn_param)
{
	map.events.on({
		"click":fn_param
	});

}

function mapOnLayerLoadStart(layer,fn_param)
{
	layer.events.on({
		loadstart: function() 
		{
			fn_param(layer.id);
		}
	});
}

function mapOnLayerLoadEnd(layer,fn_param)
{
	layer.events.on({
		loadend: function() 
		{
			fn_param(layer.id);
		}
	});
}

function mapUnregisterEvents(event,fn_param)
{
	map.events.unregister(event,map,fn_param);
}

function mapExtentToLayer(_layerId)
{
	map.zoomToExtent(mapLayerBounds(mapFindLayerById(_layerId)._layerObject));
}


function mapLayerBounds(_layerObject)
{
	var b=new OpenLayers.Bounds.fromString(mapBBOXToString(_layerObject));
	
	if(mapGetCurrentProjection()!="EPSG:4326")
	{
		b=b.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection(mapGetCurrentProjection()));
	}
	
	return b;
}

function mapCoordinatesFromPixels(xy)
{
	return map.getLonLatFromViewPortPx(xy);
}

function mapSetOpacity(_layerId,_value)
{
	mapFindLayerById(_layerId).setOpacity(_value);
	
	mapFindLayerById(_layerId)._layerObject._opacity=_value;
}

function mapGetOpacity(_layerId)
{
	return mapFindLayerById(_layerId).opacity;
}

function mapGetSize()
{
	return map.size;
}

function mapGetExtent()
{
	return map.getExtent();
}

function mapAddControl(_control)
{
	map.addControl(_control);
}

function mapGetFeatureByFid(_layerId,_featureId)
{
	try{
		return mapFindLayerById(_layerId).getFeatureByFid(_featureId);
	}catch(err){
		return;
	}
}

function mapGetFeatureByAttribute(_layerId,_attributeName,_attributeValue)
{
	try{
		return mapFindLayerById(_layerId).getFeaturesByAttribute(_attributeName,_attributeValue);
	}catch(err){
		return;
	}
}

function mapSetBaseMapLayer(_layerId)
{
	map.setBaseLayer(mapFindLayerById(_layerId));
}

function mapLayerIsBaseLayer(_layerId)
{
	return mapFindLayerById(_layerId).isBaseLayer;
}

function mapGetFeatureById(_layerId,_featureId)
{
	return mapFindLayerById(_layerId).getFeatureById(_featureId);
}

function mapRemoveControl(_control)
{
	map.removeControl(_control);
}

function mapAddFeatures(_layerId,_features)
{
	if (_features!="")
	{
		if(_features.length>0)
		{
			var p=_features.length;
		
			for(var i=0;i<p;i++)
			{
				mapFindLayerById(_layerId).addFeatures(_features[i]);
			}
		}
		else
		{
			mapFindLayerById(_layerId).addFeatures(_features);
		}
		
	}
}

function mapEraseFeatures(_layerId,_features)
{
	if (_features!="")
	{
		if(_features.length>0)
		{
			var p=_features.length;
		
			for(var i=0;i<p;i++)
			{
				var _f=mapGetFeatureByFid(_layerId,_features[i].fid);
				
				_f.state=OpenLayers.State.DELETE;
				
				mapFindLayerById(_layerId).eraseFeatures(_f);
			}
		}
		else
		{
			_features.state=OpenLayers.State.DELETE;
			
			mapFindLayerById(_layerId).eraseFeatures(_features);
		}
		
	}
}

function mapRemoveFeatures(_layerId,_features)
{
	if (_features!="")
	{
		if(_features.length>0)
		{
			var p=_features.length;
		
			for(var i=0;i<p;i++)
			{
				var _f=mapGetFeatureByFid(_layerId,_features[i].fid);
				
				mapFindLayerById(_layerId).removeFeatures(_f);
			}
		}
		else
		{
		
			mapFindLayerById(_layerId).removeFeatures(_features);
		}
		
	}
}

function mapSelectedFeatures(_layerId)
{
	return mapFindLayerById(_layerId).selectedFeatures;
}