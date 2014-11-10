<?php

	$_config["host"]="src/proxy/proxy.php";
	
	$_config["FEATUREINFOFORMAT"]=array(
		"application/vnd.ogc.gml",
		"GML2",
		"application/json",
		"application/geojson",
		"text/plain"
	);

	$_config["NAMESPACES"]=array(
		"ows2"=>"http://www.opengis.net/ows/1.1",
		"ows"=>"http://www.opengis.net/ows",
		"wfs"=>"http://www.opengis.net/wfs",
		"wms"=>"http://www.opengis.net/wms",
		"ogc"=>"http://www.opengis.net/ogc",
		"xlink"=>"http://www.w3.org/1999/xlink",
		"xsd"=>"http://www.w3.org/2001/XMLSchema",
		"wfs2"=>"http://www.opengis.net/wfs/2.0",
		"wmts"=>"http://www.opengis.net/wmts/1.0",
		"gml"=>"http://www.opengis.net/gml",
		"sld"=>"http://www.opengis.net/sld"
	);
	
	$_config["GML"]=array(
		"_featureMemberCount"=>"string(count(//wfs:FeatureCollection/gml:featureMember))",
		"_featureMember"=>"//wfs:FeatureCollection/gml:featureMember[]"
	);
	
	$_config["DESCRIBEFEATURETYPE"]=array(
      "_attributesRoot"=>"string(count(//xsd:schema/xsd:complexType/xsd:complexContent/xsd:extension/xsd:sequence/xsd:element))",
      "_attributeName"=>"string(//xsd:schema/xsd:complexType/xsd:complexContent/xsd:extension/xsd:sequence/xsd:element[]/@name)",
      "_attributeType"=>"string(//xsd:schema/xsd:complexType/xsd:complexContent/xsd:extension/xsd:sequence/xsd:element[]/@type)"
   );
    
	$_config["WMS_1.3.0"]=array(
        "_serviceName"=>"string(//wms:WMS_Capabilities/wms:Service/wms:Name/text())",
        "_serviceAbstract"=>"string(//wms:WMS_Capabilities/wms:Service/wms:Abstract/text())",
        "_serviceTitle"=>"string(//wms:WMS_Capabilities/wms:Service/wms:Title/text())",
        "_layer"=>"string(count(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer))",
        "_layerName"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:Name/text())",
        "_featureInfoFormatCount"=>"string(count(//wms:WMS_Capabilities/wms:Capability/wms:Request/wms:GetFeatureInfo/wms:Format))",
        "_featureInfoFormat"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Request/wms:GetFeatureInfo/wms:Format[]/text())",
        "_layerTitle"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:Title/text())",
        "_layerAbstract"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:Abstract/text())",
        "_layerLegend"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:Style[1]/wms:LegendURL/wms:OnlineResource/@xlink:href)",
        "_isQueryable"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/@queryable)",
        "_bboxMinX"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:EX_GeographicBoundingBox/wms:westBoundLongitude/text())",
        "_bboxMaxX"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:EX_GeographicBoundingBox/wms:eastBoundLongitude/text())",
        "_bboxMinY"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:EX_GeographicBoundingBox/wms:southBoundLatitude/text())",
        "_bboxMaxY"=>"string(//wms:WMS_Capabilities/wms:Capability/wms:Layer/wms:Layer[]/wms:EX_GeographicBoundingBox/wms:northBoundLatitude/text())"
	);
	
	$_config["WMS_1.1.1"]=array(
		"_serviceName"=>"string(//WMT_MS_Capabilities/Service/Name/text())",
		"_serviceAbstract"=>"string(//WMT_MS_Capabilities/Service/Abstract/text())",
		"_serviceTitle"=>"string(//WMT_MS_Capabilities/Service/Title/text())",
		"_layer"=>"string(count(//WMT_MS_Capabilities/Capability/Layer/Layer))",
		"_layerName"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/Name/text())",
		"_featureInfoFormatCount"=>"string(count(//WMT_MS_Capabilities/Capability/Request/GetFeatureInfo/Format))",
		"_featureInfoFormat"=>"string(//WMT_MS_Capabilities/Capability/Request/GetFeatureInfo/Format[]/text())",
		"_layerTitle"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/Title/text())",
		"_layerAbstract"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/Abstract/text())",
		"_layerLegend"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/Style[1]/LegendURL/OnlineResource/@xlink:href)",
		"_isQueryable"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/@queryable)",
		"_bboxMinX"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/LatLonBoundingBox/@maxx))",
		"_bboxMaxX"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/LatLonBoundingBox/@minx)",
		"_bboxMinY"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/LatLonBoundingBox/@miny)",
		"_bboxMaxY"=>"string(//WMT_MS_Capabilities/Capability/Layer/Layer[]/LatLonBoundingBox/@maxy)"
	);
	
    
	$_config["WFS_2.0.0"]=array(
		"_serviceName"=>"string(//wfs2:WFS_Capabilities/ows2:ServiceIdentification/ows2:Title/text())",
		"_serviceAbstract"=>"string(//wfs2:WFS_Capabilities/ows2:ServiceIdentification/ows2:Abstract/text())",
		"_serviceTitle"=>"string(//wfs2:WFS_Capabilities/ows2:ServiceIdentification/ows2:Title/text())",
		"_featureInfoFormatCount"=>"string(count(//wfs2:WFS_Capabilities/ows2:OperationsMetadata/ows2:Operation[@name='GetFeature']/ows2:Parameter[@name='outputFormat']/ows2:AllowedValues/ows2:Value))",
		"_featureInfoFormat"=>"string(//wfs2:WFS_Capabilities/ows2:OperationsMetadata/ows2:Operation[@name='GetFeature']/ows2:Parameter[@name='outputFormat']/ows2:AllowedValues/ows2:Value[]/text())",
		"_layer"=>"string(count(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType))",
		"_layerName"=>"string(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[]/wfs2:Name/text())",
		"_layerTitle"=>"string(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[]/wfs2:Title/text())",
		"_layerAbstract"=>"string(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[]/wfs2:Abstract/text())",
		"_isEditable"=>"string(count(//wfs2:WFS_Capabilities/ows2:OperationsMetadata/ows2:Operation[@name='Transaction']))",
		"_nativeSRS"=>"string(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[wfs2:Name='{_layerName}']/wfs2:DefaultCRS/text())",
		"_bboxMinX"=>"substring-before(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[]/ows2:WGS84BoundingBox/ows2:LowerCorner/text(),' ')",
		"_bboxMaxY"=>"substring-after(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[]/ows2:WGS84BoundingBox/ows2:UpperCorner/text(),' ')",
		"_bboxMaxX"=>"substring-before(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[]/ows2:WGS84BoundingBox/ows2:UpperCorner/text(),' ')",
		"_bboxMinY"=>"substring-after(//wfs2:WFS_Capabilities/wfs2:FeatureTypeList/wfs2:FeatureType[]/ows2:WGS84BoundingBox/ows2:LowerCorner/text(),' ')"
    );
    
	$_config["WFS_1.1.0"]=array(
		"_serviceName"=>"string(//wfs:WFS_Capabilities/ows:ServiceIdentification/ows:Title/text())",
		"_serviceAbstract"=>"string(//wfs:WFS_Capabilities/ows:ServiceIdentification/ows:Abstract/text())",
		"_serviceTitle"=>"string(//wfs:WFS_Capabilities/ows:ServiceIdentification/ows:Title/text())",
		"_featureInfoFormatCount"=>"string(count(//wfs:WFS_Capabilities/ows:OperationsMetadata/ows:Operation[@name='GetFeature']/ows:Parameter[@name='outputFormat']/ows:AllowedValues/ows:Value))",
		"_featureInfoFormat"=>"string(//wfs:WFS_Capabilities/ows:OperationsMetadata/ows:Operation[@name='GetFeature']/ows:Parameter[@name='outputFormat']/ows:AllowedValues/ows:Value[]/text())",
		"_layer"=>"string(count(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType))",
		"_layerName"=>"string(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[]/wfs:Name/text())",
		"_layerTitle"=>"string(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[]/wfs:Title/text())",
		"_layerAbstract"=>"string(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[]/wfs:Abstract/text())",
		"_isEditable"=>"string(count(//wfs:WFS_Capabilities/ows:OperationsMetadata/ows:Operation[@name='Transaction']))",
		"_nativeSRS"=>"string(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[wfs:Name='{_layerName}']/wfs:DefaultSRS/text())",
		"_bboxMinX"=>"substring-before(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[]/ows:WGS84BoundingBox/ows:LowerCorner/text(),' ')",
		"_bboxMaxY"=>"substring-after(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[]/ows:WGS84BoundingBox/ows:UpperCorner/text(),' ')",
		"_bboxMaxX"=>"substring-before(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[]/ows:WGS84BoundingBox/ows:UpperCorner/text(),' ')",
		"_bboxMinY"=>"substring-after(//wfs:WFS_Capabilities/wfs:FeatureTypeList/wfs:FeatureType[]/ows:WGS84BoundingBox/ows:LowerCorner/text(),' ')"
    );
    
	$_config["WFS_1.0.0"]=array(
		"_nativeSRS"=>""
    );
    
	$_config["WMTS_1.0.0"]=array(
		"_serviceName"=>"string(//wmts:Capabilities/ows2:ServiceIdentification/ows2:Title/text())",
		"_serviceAbstract"=>"string(//wmts:Capabilities/ows2:ServiceIdentification/ows2:ServiceType/text())",
		"_serviceTitle"=>"string(//wmts:Capabilities/ows2:ServiceIdentification/ows2:Title/text())",
		"_layer"=>"string(count(//wmts:Capabilities/wmts:Contents/wmts:Layer))",
		"_layerName"=>"string(//wmts:Capabilities/wmts:Contents/wmts:Layer[]/ows2:Identifier/text())",
		"_layerTitle"=>"string(//wmts:Capabilities/wmts:Contents/wmts:Layer[]/ows2:Title/text())",
		"_layerAbstract"=>"string(//wmts:Capabilities/wmts:Contents/wmts:Layer[]/ows2:Abstract/text())",
		"_matrixSetLinks"=>"string(count(//wmts:Capabilities/wmts:Contents/wmts:Layer[ows2:Identifier='{_layerName}']/wmts:TileMatrixSetLink))",
		"_matrixSetLink"=>"string(//wmts:Capabilities/wmts:Contents/wmts:Layer[ows2:Identifier='{_layerName}']/wmts:TileMatrixSetLink[]/wmts:TileMatrixSet/text())",
		"_matrixIds"=>"string(count(//wmts:Capabilities/wmts:Contents/wmts:Layer[ows2:Identifier='{_layerName}']/wmts:TileMatrixSetLink[]/wmts:TileMatrixSetLimits/wmts:TileMatrixLimits))",
		"_matrixId"=>"string(//wmts:Capabilities/wmts:Contents/wmts:Layer[ows2:Identifier='{_layerName}']/wmts:TileMatrixSetLink[]/wmts:TileMatrixSetLimits/wmts:TileMatrixLimits[{}]/wmts:TileMatrix/text())",
		"_topLeftCornerX"=>"substring-before(//wmts:Capabilities/wmts:Contents/wmts:TileMatrixSet[ows2:Identifier='{_tileMatrixSet}']/wmts:TileMatrix[1]/wmts:TopLeftCorner/text(),' ')",
		"_topLeftCornerY"=>"substring-after(//wmts:Capabilities/wmts:Contents/wmts:TileMatrixSet[ows2:Identifier='{_tileMatrixSet}']/wmts:TileMatrix[1]/wmts:TopLeftCorner/text(),' ')",
		"_supportedEPSG"=>"string(//wmts:Capabilities/wmts:Contents/wmts:TileMatrixSet[ows2:Identifier='{_tileMatrixSet}']/ows2:SupportedCRS/text())",
		"_bboxMinX"=>"substring-before(//wmts:Capabilities/wmts:Contents/wmts:Layer[]/ows2:WGS84BoundingBox/ows2:LowerCorner/text(),' ')",
		"_bboxMaxY"=>"substring-after(//wmts:Capabilities/wmts:Contents/wmts:Layer[]/ows2:WGS84BoundingBox/ows2:UpperCorner/text(),' ')",
		"_bboxMaxX"=>"substring-before(//wmts:Capabilities/wmts:Contents/wmts:Layer[]/ows2:WGS84BoundingBox/ows2:UpperCorner/text(),' ')",
		"_bboxMinY"=>"substring-after(//wmts:Capabilities/wmts:Contents/wmts:Layer[]/ows2:WGS84BoundingBox/ows2:LowerCorner/text(),' ')",
		"_layerLegend"=>"images/layer-raster.png"
    );
	
	//if pdf
	//"_arguments"=>"-encoding utf8 -no-pdf-compression -disable-smart-shrinking -T 20 -R 10 -L 12 -B 10 -dpi 600 -zoom 0.9 -page-size A4 -orientation Portrait",
	
	$_config["PRINT"]=array(
        "_pathToWkhtml"=>"",
        "_tmpFolder"=>"",
		"_tmpWWWFolder"=>"http://localhost/getsdiportalv4/modules/print/tmp/",
        "_outExtension"=>"jpg",
        "_arguments"=>""
    );
	
    $_config["SLD_1.0.0"]=array(  
        "_sldName"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:Name/text())",
        "_sldRules"=>"string(count(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule))",
        "_sldGraphicWellKnownName"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]//*[local-name()='WellKnownName']/text())",
        "_sldRuleNode"=>"//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]",
        "_sldRuleName"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:Name/text())",
        "_sldRuleTitle"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:Title/text())",
        "_sldRuleAbstract"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:Abstract/text())",
        "_sldRuleGraphicFillColor"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Fill/sld:GraphicFill/sld:Graphic/sld:Mark/sld:Stroke/sld:CssParameter[@name='stroke']/text())",
        "_sldRuleGraphicFillOpacity"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Fill/sld:GraphicFill/sld:Graphic/sld:Mark/sld:Stroke/sld:CssParameter[@name='stroke-opacity']/text())",
        "_sldRuleFillColor"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Fill/sld:CssParameter[@name='fill']/text())",
        "_sldRuleFillOpacity"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Fill/sld:CssParameter[@name='fill-opacity']/text())",
      
        "_sldRulePointStyle"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Mark/sld:WellKnownName/text())",
        "_sldRulePointSize"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Size/ogc:Literal/text())",
        "_sldRulePointColor"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Mark/sld:Fill/sld:CssParameter[@name='fill']/text())",
        "_sldRulePointOpacity"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Mark/sld:Fill/sld:CssParameter[@name='fill-opacity']/text())",
        "_sldRulePointRotation"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Rotation/ogc:Literal/text())",
        "_sldRulePointStrokeColor"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Mark/sld:Stroke/sld:CssParameter[@name='stroke']/text())",
        "_sldRulePointStrokeDashArray"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Mark/sld:Stroke/sld:CssParameter[@name='stroke-dasharray']/text())",
        "_sldRulePointStrokeWidth"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Mark/sld:Stroke/sld:CssParameter[@name='stroke-width']/text())",
        "_sldRulePointStrokeOpacity"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Graphic/sld:Mark/sld:Stroke/sld:CssParameter[@name='stroke-opacity']/text())",
      
      
        "_sldRuleStrokeColor"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Stroke/sld:CssParameter[@name='stroke']/text())",
        "_sldRuleStrokeDashArray"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Stroke/sld:CssParameter[@name='stroke-dasharray']/text())",
        "_sldRuleStrokeWidth"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Stroke/sld:CssParameter[@name='stroke-width']/text())",
        "_sldRuleStrokeOpacity"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:{_symbolizer}/sld:Stroke/sld:CssParameter[@name='stroke-opacity']/text())",

        "_sldTextSymbolizerProperty"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:TextSymbolizer/sld:Label/ogc:PropertyName/text())",
        "_sldTextSymbolizerFontFamily"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:TextSymbolizer/sld:Font/sld:CssParameter[@name='font-family']/text())",
        "_sldTextSymbolizerFontSize"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:TextSymbolizer/sld:Font/sld:CssParameter[@name='font-size']/text())",
        "_sldTextSymbolizerFontColor"=>"string(//sld:StyledLayerDescriptor/sld:NamedLayer/sld:UserStyle/sld:FeatureTypeStyle/sld:Rule[]/sld:TextSymbolizer/sld:Font/sld:CssParameter[@name='font-color']/text())"
    );
?>