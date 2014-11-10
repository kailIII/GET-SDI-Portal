var print_template=0;

var print_code="";

var print_btn=[
	{xtype: 'tbseparator'},
	{
		xtype:'button',
		id:'print_btn',
		iconCls:'maptab_toolbar_general_print',
		tooltip:_maptab_toolbar_general_print,
		handler:function(){
			
			var w=fn_print_window();
			
			w.show();
		}
	}]

var print_tabpanel=[
	{
		xtype:'label',
		text:_maptab_toolbar_general_print_layout
	},
	{
		xtype:'combobox',
		id:'print_choose_template',
		store:new Ext.data.SimpleStore({
			fields: ['index','template'],
			data:[]
		}),
		editable:false,
        queryMode: 'local',
        displayField: 'template',
        valueField: 'index',
		forceSelection: true,
		triggerAction: 'all',
		selectOnFocus: false,
		listeners:{
			select:function(combo, record, eOpts)
			{
				var index = combo.getValue();
				
				print_template=_config_print_layouts[index];
			}
		}
	}]

init_onload_fn.push(init_print);

function init_print()
{
	Ext.getCmp("maptab_toolbar_north").add(print_btn);
	
	var _layout_data=[];
	
	Ext.getCmp("maptab_toolbar_print_tab").add(print_tabpanel);
	
	var i=0;
	
	Ext.each(_config_print_layouts,function(item)
	{
		if (item._is_default)
		{
			Ext.getCmp("print_choose_template").emptyText=[item._print_identifier_title];
			
			print_template=item;
		}
	
		_layout_data.push([i,item._print_identifier_title]);
		
		i++;
	});
	
	Ext.getCmp("print_choose_template").getStore().loadData(_layout_data);
}

function fn_print()
{
	var p=new fn_get();
		
	p._async=true;
		
	p._data=[{
		_serviceType:"PRINT",
		_html:print_code
	}]
		
	p._timeout=5000;
	
	p._success=function(_response, _opts){
		
		var _response=Ext.JSON.decode(_response.responseText)[0];
		
	};
		
	p.get();
	
	print_code="";
}

function fn_print_window()
{
	var _w=new Ext.Window({ 
		width:800,
		height:600,
		closeAction:'destroy',
		modal:false,
		layout:'border',
		tbar:[{
			xtype:'button',
			iconCls:'maptab_toolbar_general_print',
			tooltip:_maptab_toolbar_general_print,
			handler:function(){
				
				print_code=window.frames["print_frame"].createCode();
				
				fn_print();
			}
		}],
		listeners:{
			resize:function(win)
			{
				Ext.get("print_frame_id").setHeight(win.getHeight()-15);
				
				Ext.get("print_frame_id").setWidth(win.getWidth()-15);
				
			}
		},
		html:"<iframe width='100%' height='800px' name=\"print_frame\" id=\"print_frame_id\" frameborder='0' src='modules/print/print.html'></iframe>"
	});
	
	return _w;
}