
function init_config_create_tree_groups()
{
	if (_config_create_tree_groups.length>0)
	{
		maptab_west_layer_tree_panel_tree_json_store.getNodeById('maptab_west_layer_tree_panel_tabs_layers_layers_node').appendChild(_config_create_tree_groups);
		
		Ext.getCmp("maptab_west_layer_tree_panel_tree").getView().refresh(false);
	}
}

function init_config_add_layer()
{
	var mask=fn_loadingMask(Ext.getBody(),_mask_loading_message_default);
	
	mask.show();
	
	Ext.each(_config_load_layers,function(item){
		
		var _layerObject;
		
		switch(item._serviceType)
		{
			case "WMS":
				
				var _serviceObject=wms_register_service(item._serviceUrl,item._username,item._password);
				
				wms_fetch_layers(_serviceObject);
				
				var _layers=item._layerName;
				
				if (item._layerName=="*")
				{
					wms_StoreColumnsServiceLayers.store.each(function(_layer)
					{				
						_layerObject = _layer.get("_layerObject");
						
						_layerObject._groupId = item._groupId;
						
						wms_register_layer(_serviceObject,_layerObject);
					
					});
					
				}
				else
				{
					Ext.each(_layers,function(_layer)
					{				
						_layerObject = wms_StoreColumnsServiceLayers.store.findRecord('_layerName', _layer).get("_layerObject");
						
						if (_layerObject)
						{
							_layerObject._groupId = item._groupId;
						
							wms_register_layer(_serviceObject,_layerObject);
						}
					
					});
				}
				
			break;
			
			
			case "WFS":
				
				var _serviceObject=wfs_register_service(item._serviceUrl,item._username,item._password);
				
				wfs_fetch_layers(_serviceObject);
				
				var _layers=item._layerName;
				
				if (item._layerName=="*")
				{
					wfs_StoreColumnsServiceLayers.store.each(function(_layer)
					{				
						_layerObject = _layer.get("_layerObject");
						
						_layerObject._groupId = item._groupId;
						
						wfs_register_layer(_serviceObject,_layerObject);
					
					});
					
				}
				else
				{
					Ext.each(_layers,function(_layer)
					{				
						_layerObject = wfs_StoreColumnsServiceLayers.store.findRecord('_layerName', _layer).get("_layerObject");
						
						_layerObject._groupId = item._groupId;
						
						wfs_register_layer(_serviceObject,_layerObject);
					
					});
				}
				
			break;
		}
		
		maptab_west_layer_reorder_layer(maptab_west_layer_tree_panel_tree_json_store.getNodeById('maptab_west_layer_tree_panel_tabs_layers_layers_node'),mapGetCountOfOverlayers());
		
	});
	
	mask.hide();
}

function config_update_layerObjectProperties(_layerObject,_configItem)
{
	if (_layerObject)
	{
		Ext.iterate(_configItem._generalProperties,function(_propertyKey,_propertyValue)
		{
			var _hasCustomIndex=fn_objIndexOf(_configItem._perLayerProperties,"_layerName",_layerObject._layerName);
			
			var _hasCustom=false;
			
			if (_hasCustomIndex>=0)
			{
				var _perLayerItem=_configItem._perLayerProperties[_hasCustomIndex];
				
				if (typeof _perLayerItem[_propertyKey]!=="undefined")
				{
					_propertyValue=_perLayerItem[_propertyKey];
					
					_hasCustom=true;
					
					if (_propertyValue!="inherit")
					{
						_layerObject[_propertyKey]=_propertyValue;
					}
				}
				
				if((typeof _perLayerItem._attributes!=="undefined") && (_perLayerItem._attributes!=""))
				{
					if ((_perLayerItem._attributes=="*") && ((typeof _perLayerItem._attributesExceptions!=="undefined") || (_perLayerItem._attributesExceptions!=="")))
					{
						Ext.each(_perLayerItem._attributesExceptions,function(_exceptAttribute){
							
							var _attributeIndex=fn_objIndexOf(_layerObject._attributesFields,"_attributeName",_exceptAttribute);
							
							if (_attributeIndex>=0)
							{
								Ext.Array.erase(_layerObject._attributesFields,_attributeIndex,1);
								
								Ext.Array.clean(_layerObject._attributesFields);
							}
						
						});
						
					}
					else if (_perLayerItem._attributes!="*")
					{
					
						var _attributesRemoved=[];
						
						Ext.each(_layerObject._attributesFields,function(_attribute)
						{
							if (_perLayerItem._attributes.indexOf(_attribute._attributeName)<0)
							{
								_attributesRemoved.push(_attribute);
							}
						});
						
						for(var i=0;i<_attributesRemoved.length;i++)
						{
							Ext.Array.remove(_layerObject._attributesFields,_attributesRemoved[i]);
						}
						
						Ext.Array.clean(_layerObject._attributesFields);
						
						var _orderAttributes=[];
						
						Ext.each(_perLayerItem._attributes,function(_attribute){
						
							var _attributeIndex=fn_objIndexOf(_layerObject._attributesFields,"_attributeName",_attribute);
							
							if (_attributeIndex>=0)
							{
								_orderAttributes.push(_layerObject._attributesFields[_attributeIndex]);
							}
						})
						
						_layerObject._attributesFields=_orderAttributes;
						
					}
				}
				
				if((typeof _perLayerItem._attributesFields!=="undefined") && (_perLayerItem._attributesFields.length>0))
				{
					Ext.each(_perLayerItem._attributesFields, function(_attribute)
					{
						
						var _attributeIndex=fn_objIndexOf(_layerObject._attributesFields,"_attributeName",_attribute._attributeName);
						
						if (_attributeIndex>=0)
						{
							if (typeof _attribute._attributeType!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeType=_attribute._attributeType;
							}
							
							if (typeof _attribute._attributeTranslation!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeTranslation=_attribute._attributeTranslation;
							}
							
							if (typeof _attribute._attributeEditor!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeEditor=_attribute._attributeEditor;
							}
							
							if (typeof _attribute._attributeIsSortable!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeIsSortable=_attribute._attributeIsSortable;
							}
							
							if (typeof _attribute._attributeIsVisible!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeIsVisible=_attribute._attributeIsVisible;
							}
							
							if (typeof _attribute._attributeIsSearchable!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeIsSearchable=_attribute._attributeIsSearchable;
							}
							
							if (typeof _attribute._attributeVisible!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeVisible=_attribute._attributeVisible;
							}
							
							if (typeof _attribute._attributeShowOnSummary!=="undefined")
							{
								_layerObject._attributesFields[_attributeIndex]._attributeShowOnSummary=_attribute._attributeShowOnSummary;
							}
							
						}
					
					});
				}
			}
			
			if ((_propertyValue!="inherit") && (!_hasCustom))
			{
				
				if (_propertyValue=="*")
				{
					_layerObject[_propertyKey]=true;
				
				}else
				{
					_layerObject[_propertyKey]=false;
					
					if (Ext.Array.contains(_propertyValue, _layerObject._layerName))
					{
						_layerObject[_propertyKey]=true;
					}
					
				}
				
			}	
		});
		
		var _config=new _config_init_map();
	
		var _defaultScales=_config._defaultScales;
		
		_layerObject._scales=_defaultScales;
	}
}

function config_update_addLayer(_layerObject,_serviceObject)
{
	if ((_layerObject) && (_serviceObject))
	{
		Ext.each(_config_load_layers,function(item)
		{
			if(item._serviceUrl==_serviceObject._serviceUrl)
			{
				if (item._layerName=="*")
				{
					config_update_layerObjectProperties(_layerObject,item);
				}
				else
				{
					if (Ext.Array.contains(item._layerName, _layerObject._layerName))
					{
						config_update_layerObjectProperties(_layerObject,item);
					}
				}
			}
		});
	}
}


function init_config_congigure_portal()
{
	var _config=new _config_init_map();

	if (typeof _config._canAddService!=="undefined")
	{
		if (_config._canAddService)
		{
			Ext.getCmp("maptab_west_layer_tree_panel_add_btn").enable();
		}
		else
		{
			Ext.getCmp("maptab_west_layer_tree_panel_add_btn").disable();
		}
	}
	if (typeof _config._canRemoveLayer!=="undefined")
	{
		if (_config._canRemoveLayer)
		{
			Ext.getCmp("maptab_west_layer_tree_panel_remove_btn").enable();
		}
		else
		{
			Ext.getCmp("maptab_west_layer_tree_panel_remove_btn").disable();
		}
	}

}

Ext.onReady(function()
{
	init_map();
	
	init_config_congigure_portal();

	init_config_create_tree_groups();
	
	init_config_add_layer();
});