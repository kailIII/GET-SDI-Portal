var init_onload_fn=new Array();

function fn_execOnloadFn()
{
	setTimeout(function()
	{
		Ext.each(init_onload_fn,function(item)
		{
			if(item)
			{
				item();
			}
		});
		 
	},100);
}

function fn_getParameterByName(name) 
{    
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
 
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    
	results = regex.exec(location.search);
    
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



var loader_script_urls=[
	"http://maps.google.com/maps/api/js?v=3&amp;sensor=false"
]

var loader_script_files=[
	
	"tools/extjs/ext-all.js",
	"tools/proj4js/lib/proj4js-combined.js",
	"tools/OpenLayers/OpenLayers.js",
	"tools/OpenLayers/lib/OpenLayers/Control/ScaleBar.js",
	"tools/OpenLayers/lib/OpenLayers/Handler/Path.js",
	"tools/jsts/lib/javascript.util.js",
	"tools/jsts/lib/jsts.js",
	"tools/jsts/lib/attache.array.min.js",
	"js/language/en_us.js",
	"js/functions.js",
	"js/maptab/lib/servicesFunctions.js",
	"js/maptab/lib/layersFunctions.js",
	"js/maptab/lib/attributesFunctions.js",
	"js/maptab/lib/featureFunctions.js",
	"js/maptab/maptab_toolbar_general.js",
	"js/maptab/maptab_toolbar_search.js",
	"js/viewport.js",
	"js/maptab/maptab_west_layer_tree_panel.js",
	"js/maptab/maptab_west_selection_panel.js",
	"js/maptab/maptab_west_search_settings_panel.js",
	"js/maptab/maptab_west_general_settings_panel.js",
	"js/maptab/maptab_east_search_panel.js",
	"js/maptab/maptab_services_manager/wms.js",
	"js/maptab/maptab_services_manager/wfs.js",
	"js/maptab/maptab_services_manager/wmts.js",
	"js/maptab/maptab_services_manager.js",
	"js/maptab.js",
	"js/maptab/map.js",
	"js/maptab/maptab_toolbar_general/map_controls_featureInfo.js",
	"js/maptab/maptab_toolbar_general/map_controls_measureDistance.js",
	"js/maptab/maptab_toolbar_general/map_controls_measureArea.js",
	
	"modules/colorpicker/colorpicker.js",
	"modules/sldeditor/language/en_us.js",
	"modules/sldeditor/sldeditor.js",
	"modules/print/print.js",
	
	"js/config.js",
	"js/config_functions.js"
];

var loader_css_files=[
	"tools/extjs/resources/css/ext-all.css",
	"tools/extjs/resources/ext-theme-gray/ext-theme-gray-all.css",
	"css/style.css"
];

var host="http://localhost/getsdiportalv4/";

function init_loader_files()
{
	
	var URLscriptTags = new Array(loader_script_urls.length);
    
	for (var i=0, len=loader_script_urls.length; i<len; i++) 
	{
		URLscriptTags[i] = "<script src='"+loader_script_urls[i]+"'></script>"; 
	}
	
	if (URLscriptTags.length > 0)
	{
		document.write(URLscriptTags.join(""));
	}

	var cssTags = new Array(loader_css_files.length);
    
	for (var i=0, len=loader_css_files.length; i<len; i++) 
	{
		cssTags[i] = "<link rel='stylesheet' type='text/css' href='" + host + loader_css_files[i] +"' />"; 
	}
	
	if (cssTags.length > 0)
	{
		document.write(cssTags.join(""));
	}
	
	var scriptTags = new Array(loader_script_files.length);
    
	for (var i=0, len=loader_script_files.length; i<len; i++) 
	{
		scriptTags[i] = "<script type='text/javascript' src='" + host + loader_script_files[i] +"'></script>"; 
	}
	
	if (scriptTags.length > 0)
	{
		document.write(scriptTags.join(""));
	}
	
}

init_loader_files();