var measuredistance_labels=new OpenLayers.Layer.Vector("measuredistance_labels",{
		styleMap: new OpenLayers.StyleMap({
			'default':{
				fontColor: "${fontColor}",
				fillColor: "#FF5500",
				fontSize: "${fontSize}",
				fontFamily: "Tahoma",
				fillOpacity: 0,
				pointRadius: 1,
				pointerEvents: "visiblePainted",
				labelOutlineColor:"#FFFFFF",
				labelOutlineWidth:2,
				label : "${distance}" + "${units}"
			}
		})
	});

var measuredistance_cursor=new OpenLayers.Layer.Vector("measuredistance_cursor",{
		styleMap: new OpenLayers.StyleMap({
			'default':{
				fontColor: "${fontColor}",
				fillColor: "#FF9900",
				fontSize: "${fontSize}",
				fontFamily: "Tahoma",
				fillOpacity: 0,
				pointRadius: 1,
				pointerEvents: "visiblePainted",
				labelOutlineColor:"#FFFFFF",
				labelOutlineWidth:2,
				label : "${distance}"
			}
		})
	});
	
var measuredistance_distance=0;	
	
function init_map_controls_measureDistance()
{
	
	map_controls.measuredistance=new OpenLayers.Control.Measure(OpenLayers.Handler.Path,{
			persist: true,
			handlerOptions: {
				layerOptions: 
				{
					styleMap: new OpenLayers.StyleMap({
						strokeColor:"#686868",
						strokeWidth:2,
						strokeDashstyle:"dashdot",
						labelOutlineColor:"#FFFFFF",
						labelOutlineWidth:5
					})
				}
			},
			callbacks:{
				create:function()
				{
					try{
						
						map.removeLayer(measuredistance_labels);
	
						map.removeLayer(measuredistance_cursor);
						
					}catch(err){};
					
					map.addLayer(measuredistance_labels);
	
					map.addLayer(measuredistance_cursor);
				},
				modify:function(_cursorPoint,evt)
				{
					var _v=evt.geometry.getLength();
					
					measuredistance_cursor.destroyFeatures();
					
					var _cursor = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(_cursorPoint.x, _cursorPoint.y));
					
					if (_v>0)
					{
						_cursor.attributes={
							distance: _v.toFixed(2),
							units:evt.units,
							fontColor: '#989898',
							align: "cm",
							fontSize:"14px"
						}
						
						measuredistance_cursor.addFeatures([_cursor]);
					}
				}
			},
			eventListeners: {
				measure: function(evt)
				{
					var _v = evt.geometry.getVertices();
					
					if (_v.length>2)
					{					
						var _preLastVertex = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point((_v[_v.length-1].x + _v[_v.length-2].x)/2, (_v[_v.length-1].y + _v[_v.length-2].y)/2));
			
						var _lastVertex = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(_v[_v.length-1].x, _v[_v.length-1].y));
					
						var _segment = new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(_v[_v.length-2].x, _v[_v.length-2].y), new OpenLayers.Geometry.Point(_v[_v.length-1].x, _v[_v.length-1].y)]);
					
						var measuredistance_distance_segment=_segment.getLength();
					
						_preLastVertex.attributes={
							distance: measuredistance_distance_segment.toFixed(2),
							units:evt.units,
							fontColor: '#808080',
							align: "cm",
							fontSize:"12px"
						};
					
						_lastVertex.attributes = {
							distance: evt.measure.toFixed(2),
							units:evt.units,
							fontColor: '#FF6600',
							align: "cm",
							fontSize:"14px"
						};
						
						measuredistance_labels.addFeatures([_preLastVertex,_lastVertex]);
					}
					
				},
				measurepartial:function(evt)
				{
					var _v = evt.geometry.getVertices();
					
					if (_v.length>2)
					{					
						var _preLastVertex = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point((_v[_v.length-2].x + _v[_v.length-3].x)/2, (_v[_v.length-2].y + _v[_v.length-3].y)/2));
			
						var _lastVertex = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(_v[_v.length-1].x, _v[_v.length-1].y));
					
						var _segment = new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(_v[_v.length-3].x, _v[_v.length-3].y), new OpenLayers.Geometry.Point(_v[_v.length-2].x, _v[_v.length-2].y)]);
					
						var measuredistance_distance_segment=_segment.getLength();
					
						_preLastVertex.attributes={
							distance: measuredistance_distance_segment.toFixed(2),
							units:evt.units,
							fontColor: '#808080',
							align: "cm",
							fontSize:"12px"
						};
					
						_lastVertex.attributes = {
							distance: evt.measure.toFixed(2),
							units:evt.units,
							fontColor: '#FF6600',
							align: "cm",
							fontSize:"14px"
						};
						
						measuredistance_labels.addFeatures([_preLastVertex,_lastVertex]);
					}
				}
			}
		});
}
