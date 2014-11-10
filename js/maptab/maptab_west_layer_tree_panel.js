var maptab_west_layer_tree_panel_tree_json_store=Ext.create('Ext.data.TreeStore', {
	fields: ['text','tools','_groupId'],
	root: {
		text: 'root',
		children: [
			{
				text:_maptab_west_layer_tree_panel_tabs_layers_node_title_basemaps,
				id:'maptab_west_layer_tree_panel_tabs_layers_basemaps_node',
				expanded: true
			},{
				text:_maptab_west_layer_tree_panel_tabs_layers_node_title_layers,
				id:'maptab_west_layer_tree_panel_tabs_layers_layers_node',
				expanded: true,
				checked:true
			}	
		]
	}
});

var maptab_west_layer_tree_panel_tree={
	xtype: 'tree-grid',
	rootVisible: false,
	id:'maptab_west_layer_tree_panel_tree',
	border:false,
	multiSelect: true, 
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ],
	viewConfig: {
		markDirty:false,
        plugins: {
            ptype: 'treeviewdragdrop'
        },
		listeners:{
			drop:function()
			{
				maptab_west_layer_reorder_layer(maptab_west_layer_tree_panel_tree_json_store.getNodeById('maptab_west_layer_tree_panel_tabs_layers_layers_node'),mapGetCountOfOverlayers());
			}
		}
    },
	listeners: {
		checkchange:function(node, checked)
		{
			maptab_west_layer_check_node(node.data.id,checked);
		},
		itemcontextmenu:function(view, node, item, index, event)
		{
			if(node.isLeaf())
			{
				event.preventDefault();
				
				maptab_west_layer_layer_menu_show(view, node, item, index, event);
			}
			else
			{
				event.preventDefault();
				
				maptab_west_layer_folder_menu_show(view, node, item, index, event);
			}
		}
	},
	store:maptab_west_layer_tree_panel_tree_json_store,
	columns: [
	{
		dataIndex: 'tools',
		width:40
	},
	{
		dataIndex: '_groupId',
		width:40,
		hidden:true,
		hideable:false
	},
	{
		xtype: 'treecolumn',
		dataIndex: 'text',
		autoSizeColumn: true,
		flex:2,
		editor:{
			xtype:"textfield",
			allowBlank: false
        }
	}]
}

var maptab_west_layer_tree_panel_tabs={
	xtype:'tabpanel',
	id:'maptab_west_layer_tree_panel_tabs',
	region:'center',
	border:false,
	layout:'fit',
	items:[
		{
			xtype:'panel',
			border:false,
			layout:'fit',
			title:_maptab_west_layer_tree_panel_tabs_layers,
			items:[maptab_west_layer_tree_panel_tree]
		}]
	}

var maptab_west_layer_tree_panel ={
	xtype:'panel',
	id:'maptab_west_layer_tree_panel',
	title:_maptab_west_layer_tree_panel,
	region:'center',
	layout:'border',
	iconCls:'maptab_accordion_icon',
	items:[
		maptab_west_layer_tree_panel_tabs
	],
	tbar:[
		{
			xtype:'button',
			id:'maptab_west_layer_tree_panel_add_btn',
			text:_map_general_add_btn,
			iconCls:'map_general_add_btn',
			tooltip:_map_general_add_btn,
			handler:function()
			{
				maptab_services_manager.show();
			}
		},
		{
			xtype:'button',
			id:'maptab_west_layer_tree_panel_remove_btn',
			text:_map_general_remove_btn,
			iconCls:'map_general_remove_btn',
			tooltip:_map_general_remove_btn,
			handler:function()
			{
				var _selected_Nodes=Ext.getCmp('maptab_west_layer_tree_panel_tree').getSelectionModel().getSelection();
				
				Ext.each(_selected_Nodes,function(item)
				{
					maptab_west_layer_remove_node(item.data.id);
				
				});
				
			}
		}			
	]
}

function maptab_west_layer_add_BaseLayer(_layer,_node)
{
	_node.insertBefore({
		id: _layer.id,
		text:_layer.name,
		leaf: true,
		icon:_layer.icon,
		iconCls:'maptab_services_manager_layer_legend_size',
		checked: _layer.visibility,
		tools: ""
	},_node.firstChild);
}


function maptab_west_layer_add_layer(_layer,_node)
{
	_node.insertBefore({
		id: _layer._layerObject._layerId,
		text:_layer._layerObject._layerTitle,
		leaf: true,
		icon:_layer._layerObject._layerLegend,
		iconCls:'maptab_services_manager_layer_legend_size',
		checked: _layer.visibility,
		tools: "<img src=\"images/layer_info.png\" width=\"12px\" data-qtip=\"<div style='width:260px;'><b>"+_layer._layerObject._layerTitle +"</b><br>"+_layer._serviceObject._serviceAbstract+"</div>\">"
	},_node.firstChild);
	
	return _node;
}

function maptab_west_layer_get_layer_title(_layerId)
{
	var _node=maptab_west_layer_tree_panel_tree_json_store.getRootNode().findChild("id", _layerId, true);
	
	return _node.data.text;
}

function maptab_west_layer_set_layer_icon(_layerId,_icon)
{
	var _node=maptab_west_layer_tree_panel_tree_json_store.getRootNode().findChild("id", _layerId, true);
	
	_node.set("icon",_icon);
}

function maptab_west_layer_set_edit_layer(_layerId)
{
	var _node=maptab_west_layer_tree_panel_tree_json_store.getRootNode().findChild("id", _layerId, true);
	
	var _layer=mapFindLayerById(_layerId);
	
	_node.data.tools="<img src=\"images/edit.png\" width=\"12px\" data-qtip=\"<div style='width:260px;'><b>"+_layer._layerObject._layerTitle +"</b><br>"+_layer._serviceObject._serviceAbstract+"</div>\">"
}

function maptab_west_layer_remove_node(_nodeId)
{
	
	var _node=maptab_west_layer_tree_panel_tree_json_store.getRootNode().findChild("id", _nodeId, true);
	
	if (typeof _node!=="undefined")
	{
		if (_node.hasChildNodes())
		{
			while(_node.firstChild)
			{
				maptab_west_layer_remove_node(_node.firstChild.data.id);
			}
		}
		
		if(_node.isLeaf())
		{
			mapRemoveLayer(mapFindLayerById(_nodeId));
		}
			
		_node.remove();
	}
}

function maptab_west_layer_check_node(_nodeId,checked)
{
	var _node=maptab_west_layer_tree_panel_tree_json_store.getRootNode().findChild("id", _nodeId, true);
	
	if (_node.hasChildNodes())
	{
		Ext.each(_node.childNodes,function(item)
		{
			maptab_west_layer_check_node(item.data.id,checked);
		});
	}
	
	if(_node.isLeaf()&&(!mapLayerIsBaseLayer(_node.data.id)))
	{
		mapChangeLayerVisibility(_node.data.id,checked);
	}
	
	if(_node.isLeaf()&&(mapLayerIsBaseLayer(_node.data.id)))
	{
		maptab_west_layer_set_BaseLayer(_node.data.id);
		
		_node.set('checked',true);
		
		return;
	}
		
	_node.set('checked',checked);
	
}

function maptab_west_layer_set_BaseLayer(_layerId)
{
	maptab_west_layer_tree_panel_tree_json_store.getNodeById('maptab_west_layer_tree_panel_tabs_layers_basemaps_node').eachChild(function(node){
		
		if (node.isLeaf())
		{
			node.set('checked',false);
		}
	});
	
	mapSetBaseMapLayer(_layerId);

}

function maptab_west_layer_reorder_layer(_node,_index)
{	
	_node.eachChild(function(node){
	
		if (node.isLeaf())
		{
			mapReorderLayer(node.data.id,_index);
			
			_index--;
		}
		else
		{
			maptab_west_layer_reorder_layer(node,_index);
			
			_index--;
		}
		
	});
}

function maptab_west_layer_folder_menu_show(view, node, item, index, event)
{
	var menu = new Ext.menu.Menu({
		items: [
			{
				text: _maptab_west_layer_tree_panel_tabs_layers_node_create_subfolder_menu_title,
				iconCls:'map_general_add_btn',
				handler:function()
				{
					maptab_west_layer_folder_add_group(node, Ext.id(), _maptab_west_layer_tree_panel_tabs_layers_node_new_subfolder_title, true, true);
				}
			},
			{
				text: _maptab_west_layer_tree_panel_tabs_layers_node_remove_subfolder_menu_title,
				iconCls:'map_general_remove_btn',
				handler:function()
				{
					maptab_west_layer_remove_node(node.data.id);
				}
			}
		]
	});

	menu.showAt(event.getXY());
}

function maptab_west_layer_folder_add_group(_node, _nodeId, _nodeTitle, _nodeExpanded, _nodeChecked)
{
	
	_node.insertBefore({
		text:_nodeTitle,
		expanded: _nodeExpanded,
		checked:_nodeChecked,
		id:_nodeId
	},_node.firstChild);
}

var _maptab_west_layer_layer_menu_components=[];

function maptab_west_layer_layer_menu_show(view, node, item, index, event)
{

	if (!mapLayerIsBaseLayer(node.data.id))
	{
		var _current_opacity=Number(mapGetOpacity(node.data.id)*100);
					
		var _opacity={
			text: _maptab_west_layer_tree_panel_tabs_layers_node_opacity_layer_menu_title,
			iconCls:'maptab_layer_tree_opacity',
			menu:[{
				xtype:'slider',
				width: 100,
				hideLabel: true,
				useTips: true,
				increment: 10,
				value:_current_opacity,
				minValue: 0,
				maxValue: 100,
				listeners: {
					change: function (slider, value, thumb){
					
						var opacity=(value*0.01);
						
						mapSetOpacity(node.data.id,Number(opacity));
					}
				}
			}]
		};
		
		var _maxExtent={
			text: _maptab_west_layer_tree_panel_tabs_layers_node_extent_layer_menu_title,
			iconCls:'maptab_toolbar_general_extent',
			handler:function()
			{
				mapExtentToLayer(node.data.id);
				
			}
		};
		
		
		
		var _scales="";
		
		_scales ={
			text:_maptab_west_layer_tree_panel_tabs_layers_node_scales_layer_menu_title,
			menu: maptab_west_layer_layer_menu_create_scales(mapFindLayerById(node.data.id)._layerObject._scales,node.data.id)
		};
		
		
		var _removeLayer="";
		
		var _config=new _config_init_map();
		
		if (typeof _config._canRemoveLayer!=="undefined")
		{
			if (_config._canRemoveLayer)
			{
				_removeLayer={
					text: _maptab_west_layer_tree_panel_tabs_layers_node_remove_layer_menu_title,
					iconCls:'map_general_remove_btn',
					handler:function()
					{
						maptab_west_layer_remove_node(node.data.id);
					}
				}
			}
		}
		
		var menu = new Ext.menu.Menu({
			_nodeId:node.data.id,
			items: [
				_maxExtent,
				_opacity,
				_scales,
				_removeLayer
			]
		});

		menu.add(_maptab_west_layer_layer_menu_components);
		
		menu.showAt(event.getXY()); 
	}
}

function maptab_west_layer_layer_menu_create_scales(_scales,_layerId)
{
	var _scalesMenu=[];
	
	var _config=new _config_init_map();
	
	var _defaultScales=_config._defaultScales;
	
	var _layerScales=mapFindLayerById(_layerId)._layerObject._scales;
	
	if (_layerScales!=null)
	{
		for(var i=0;i<_defaultScales.length;i++)
		{
			var _checked=false;
			
			if (_layerScales.indexOf(_defaultScales[i])>-1)
			{
				_checked=true;
			}
			
			var _text="1:"+_defaultScales[i]+"  <1:"+_defaultScales[i+1];
			
			if (i==0)
			{
				_text="<1:"+_defaultScales[i];
			}
			
			if (i==(_defaultScales.length-1))
			{
				_text=">1:"+_defaultScales[i];
			}
			
			_scalesMenu.push({
				xtype:'menucheckitem',
				text:_text,
				checked:_checked,
				_currentScale:_defaultScales[i],
				listeners: {
					checkchange: function(item,_checked)
					{
						Ext.Array.remove(_layerScales,item._currentScale);
						
						if(_checked)
						{
							Ext.Array.push(_layerScales,item._currentScale);
						}
							
						Ext.Array.clean(_layerScales);
						
						_layerScales=_layerScales.sort(function (a, b) { 
								return a - b;
							});
						
						mapFindLayerById(_layerId)._layerObject._scales=_layerScales;
						
					}
				}
			});
		}
	}
	
	return _scalesMenu;
}
