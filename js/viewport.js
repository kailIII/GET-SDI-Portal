Ext.require(['*']);

TabsViewportUi = Ext.extend(Ext.Viewport, {
    layout: 'border',
    initComponent: function() {
        this.items =[
			{
				xtype:'tabpanel',
				id:'viewport_center',
				region:'center',
				items:[
					{
						xtype:'panel',
						title:_viewport_maptab,
						id:'viewport_maptab',
						border:false,
						layout:'fit',
						items:[maptab]
					}
				]
			}
		];
		
		TabsViewportUi.superclass.initComponent.call(this);
    }
	
});

Ext.onReady(function() {
    Ext.QuickTips.init();
    var cmp1 = new TabsViewport({
        renderTo: Ext.getBody()
    });
	
    cmp1.show();
});
 
TabsViewport = Ext.extend(TabsViewportUi, {
    initComponent: function() {
        TabsViewport.superclass.initComponent.call(this);
    }
});