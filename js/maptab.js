var maptab_north_tabpanel=
{
	xtype:'tabpanel',
	id:'maptab_north_tabpanel',
	region:'center',
	border:false,
	items:[
		{
			xtype:'toolbar',
			border:false,
			id:'maptab_toolbar_search_tab',
			items:maptab_toolbar_search,
			title:_maptab_maptab_north_tabpanel_search
		},
		{
			xtype:'toolbar',
			border:false,
			id:'maptab_toolbar_print_tab',
			title:_maptab_maptab_north_tabpanel_print
		}
		
	]
	
};



var maptab_center_items = {
	xtype:'panel',
	layout:'border',
	items:[
		{
			xtype:'panel',
			region:'center',
			layout:'border',
			border:false,
			items:[
				{
					xtype:'panel',
					layout:'border',
					region:'north',
					height:82,
					items:[
						{
							xtype:'toolbar',
							region:'north',
							border:false,
							id:'maptab_toolbar_north',
							items:maptab_toolbar_general
						},
						maptab_north_tabpanel
					]
				},
				{
					xtype:'panel',
					region:'center',
					layout:'fit',
					id:'maptab_mapPanel',
					html:'<div id=\'maptab_map\' style=\'width:100%;height:100%\'></div>'
				}
			]
		},
		{
			xtype:'panel',
			region:'south',
			id:'maptab_south',
			border:false,
			title:_viewport_south_title,
			collapsible: true,
			collapsed: true,
			layout:'fit',
			split:true,
			height:200,
			items:[{
				xtype:'tabpanel',
				id:'maptab_south_tabpanel',
				layout:'fit'
			}]
		},
		{
			xtype:'panel',
			region:'north',
			border:false
		},
		{
			xtype:'panel',
			region:'east',
			id:'maptab_east',
			layout:'border',
			title:_viewport_east_title,
			border:false,
			collapsible: true,
			collapsed: true,
			split:true,
			width:340,
			items:[
				{
					xtype:'panel',
					region:'north',
					border:false,
					layout:'fit',
					id:'maptab_east_north',
					split:true,
					height:200,
					hidden:true,
					items:[{
						xtype:'panel',
						layout:'fit',
						title:_maptab_featureInfoWindow_title,
						closable:true,
						closeAction:'hide',
						id:'maptab_east_north_panel',
						tools:[{
							type:'maximize',
							handler: function(event, toolEl, panelHeader) {
								
								Ext.getCmp("maptab_east_north").hide();
								
								featureInfoWindow_isMinimized=false;
								
								var i=fn_featureInfoWindow(Ext.getCmp("maptab_east_north_panel").items.items[0]._feature);
								
								i.show();
							}
						}],
						listeners:{
							hide:function()
							{
								Ext.getCmp("maptab_east_north").hide();
							}
						}
					}]
				},
				{
					xtype:'panel',
					region:'center',
					id:'maptab_east_south',
					layout:'accordion',
					items:[
						maptab_east_search_panel
					]				
				}
			]
		}
		
	]
};


var maptab={
	xtype:'panel',
	layout:'border',
	border:false,
	items:[
		{
			xtype:'panel',
			region:'center',
			border:false,
			layout:'fit',
			items:[maptab_center_items]
		},
		{
			xtype:'panel',
			id:'maptab_west',		
			region:'west',
			layout:'accordion',
			border:false,
			title:_maptab_maptab_west,
			collapsible: true,
			collapsed: false,
			split:true,
			width:300,
			items:[
				maptab_west_layer_tree_panel,
				maptab_west_selection_panel,
				maptab_west_search_settings_panel,
				maptab_west_general_settings_panel
			]
		}
	]
};