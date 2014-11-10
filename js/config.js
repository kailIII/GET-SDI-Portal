function _config_init_map()
{
	var _config={
		_initCenter:[24.11,38.53],
		_initZoom:6,
		_defaultScales:[250,500,750,1000,2000,5000,10000],
		_mapControls:{
			navigation:new OpenLayers.Control.Navigation(),
			navigationHistory:new OpenLayers.Control.NavigationHistory(),
			pan:new OpenLayers.Control.Pan(),
			zoomByArea:new OpenLayers.Control.ZoomBox(),
			scaleBar:new OpenLayers.Control.ScaleBar({
				divisions:2,
				subdivisions:2,
				showMinorMeasures:true,
				singleLine:true,
				abbreviateLabel:true
			})
		},
		_mapProjections:[
			{
				_epsg:"EPSG:3857",
				_title:"EPSG:3857",
				_maxExtent:"",
				_numDigits:3
			},
			{
				_epsg:"EPSG:4326",
				_title:"EPSG:4326",
				_maxExtent:"",
				_numDigits:7
			},
			{
				_epsg:"EPSG:900913",
				_title:"EPSG:900913",
				_maxExtent:"-20037508.34,-20037508.34,20037508.34,20037508.34",
				_numDigits:3
			}
		],
		_defaultProjection:"EPSG:900913",
		_setCoordinatesZoomLevel:20,
		_setCoordinatesDefaultProjections:["EPSG:4326","EPSG:900913"],
		_getCoordinatesDefaultProjections:["EPSG:4326","EPSG:900913"],
		_mapUnits:[],
		_mapOptions:{
			units: "km", 
			zoomMethod:null,
			transitionEffect:null,
			projection:new OpenLayers.Projection("EPSG:900913"),
			displayProjection: new OpenLayers.Projection("EPSG:900913"),
			maxExtent: new OpenLayers.Bounds.fromString("-20037508.34,-20037508.34,20037508.34,20037508.34"),
			controls:[]
		},
		_canEdit:true,
		_canAddService:true,
		_canRemoveLayer:true,
		_basemapLayers:[
			{
				_layer:new OpenLayers.Layer.Google(
					"Google Streets",
					{
						type: google.maps.MapTypeId.ROADMAP,
						numZoomLevels: 30,
						icon:'images/earth.png',
						'sphericalMercator': true,
						isBaseLayer:true,
						projection:new OpenLayers.Projection("EPSG:900913"),
						fractionalZoom:false,
						maxExtent:new OpenLayers.Bounds.fromString("-20037508.34,-20037508.34,20037508.34,20037508.34")
					})
			},
			{
				_layer:new OpenLayers.Layer.Google(
					"Google Satellite",
					{
						type: google.maps.MapTypeId.SATELLITE, 
						numZoomLevels: 30,
						isBaseLayer:true,
						icon:'images/earth.png',
						projection:new OpenLayers.Projection("EPSG:900913"),
						'sphericalMercator': true,
						fractionalZoom:false
					})			
			},
			{
				_layer:new OpenLayers.Layer.Google(
					"Google Hybrid",
					{
						type: google.maps.MapTypeId.HYBRID, 
						numZoomLevels: 30,
						isBaseLayer:true,
						icon:'images/earth.png',
						'sphericalMercator': true,
						projection:new OpenLayers.Projection("EPSG:900913"),
						fractionalZoom:false,
						maxExtent:new OpenLayers.Bounds.fromString("-20037508.34,-20037508.34,20037508.34,20037508.34")
					})
			}
		]
	}
	
	return _config;

}


var _config_create_tree_groups=[];

var _config_load_layers=[];

var _config_print_layouts=[];