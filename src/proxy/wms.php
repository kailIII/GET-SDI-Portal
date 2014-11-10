<?php

class WMS
{
	public $output;

	public function get($objArr)
	{
		$_request = $objArr->_request;

        switch ($_request)
        {
            case "registerService":
                $this->output = $this->registerService($objArr);
				
                break;
				
			case "fetchLayers":
                $this->output = $this->fetchLayers($objArr);
                break;
	
            case "registerLayer":
                $this->output = $this->registerLayer($objArr);
                break;

            case "getInfo":
                $this->output = $this->getinfo($objArr);
                break;

            case "getAttributes":
                $this->output = $this->getAttributes($objArr);
                break;

			case "search":
                $this->output = $this->search($objArr);
                break;

            case "getLegendGraphic":
                $this->output = $this->getLegendGraphic($objArr);
                break;
        }
	}
	
	public function registerService($objArr)
	{
		require("config.php");
	
		$p = new Proxy();
		
        $p->_url = $this->createGetCapabilitiesUri((string)$objArr->_serviceUrl);
            
        $p->_username = $objArr->_username;

        $p->_password = $objArr->_password;

        $p->get();

        $r = new Response();

        $r->_responseCode = (string)$p->o_responseCode;

        if ($p->o_responseCode == 200)
        {
			
            if (!empty($p->xmlNode("//ogc:ServiceExceptionReport/ogc:ServiceException/text()")))
            {
                $r->_errorStatus = 0;
				
                $r->_errorDescription = $p->xmlNode("//ogc:ServiceExceptionReport/ogc:ServiceException/text()");
            }
            else
            {
					
                $version = $p->xmlNode("string(//@version)");

                $sectionVersionManager = "WMS_".$version;

                $section=$_config[$sectionVersionManager];

                $countFeatureInfoFormat = $p->xmlNode($section["_featureInfoFormatCount"]);

                $featureInfoFormat = "";

                foreach($_config["FEATUREINFOFORMAT"] as $key=>$value)
                {
                    for ($i=1;$i<=$countFeatureInfoFormat;$i++)
                    {
                        $currentFeatureInfoFormat=$p->xmlNode(str_replace("[]","[".$i."]",$section["_featureInfoFormat"]));

                        if (($featureInfoFormat == "") && ($currentFeatureInfoFormat==$value))
                        {
                            $featureInfoFormat = $currentFeatureInfoFormat;
                        }
                    }
                }
				
				
                $_serviceObject = new ServiceObject();
				
                $_serviceObject->_serviceId = md5($objArr->_serviceUrl);

                $_serviceObject->_serviceType = "WMS";

                $_serviceObject->_serviceName = $p->xmlNode($section["_serviceName"]);

                $_serviceObject->_serviceAbstract = $p->xmlNode($section["_serviceAbstract"]);

                $_serviceObject->_serviceTitle = $p->xmlNode($section["_serviceTitle"]);

                $_serviceObject->_serviceUrl = (string)$objArr->_serviceUrl;

                $_serviceObject->_username = $p->_username;

                $_serviceObject->_password = $p->_password;

                $_serviceObject->_version = $p->xmlNode("string(//@version)");

                $_serviceObject->_isVector = false;

                $_serviceObject->_isService = true;

                $_serviceObject->_featureInfoFormat = $featureInfoFormat;
				
				$r->_response=$_serviceObject;
                
            }
        }
        else
        {
            $r->_errorDescription = $p->o_response;
        }

        return $r;		
	
	}
	
	public function fetchLayers($objArr)
    {
        require("config.php");
	
		$p = new Proxy();
		
        $p->_url = $this->createGetCapabilitiesUri((string)$objArr->_serviceUrl);
            
        $p->_username = $objArr->_username;

        $p->_password = $objArr->_password;

        $p->get();

        $r = new Response();

        $r->_responseCode = (string)$p->o_responseCode;

        if ($p->o_responseCode == 200)
        {
            if (!empty($p->xmlNode("//ogc:ServiceExceptionReport/ogc:ServiceException/text()")))
            {
                $r->_errorStatus = 0;
				
                $r->_errorDescription = $p->xmlNode("//ogc:ServiceExceptionReport/ogc:ServiceException/text()");
            }
            else
            {

                $version = $p->xmlNode("string(//@version)");

                $sectionVersionManager = "WMS_".$version;

                $section=$_config[$sectionVersionManager];

                $countLayer = $p->xmlNode($section["_layer"]);

                $r_layers = Array();

                for ($i =1;$i<=$countLayer;$i++)
                {
                    $layerId = md5($p->xmlNode(str_replace("[]","[".$i."]",$section["_layerName"])));
					
					$serviceId=md5($objArr->_serviceUrl);

                    $queryable = $p->xmlNode(str_replace("[]","[".$i."]",$section["_isQueryable"]));

                    $queryableValue = false;

                    if($queryable=="1")
                    {
                        $queryableValue = true;
                    }

					$_layerObject=new LayerObject();
					
					$_layerObject->_serviceId = $serviceId;

                    $_layerObject->_layerId = $serviceId.$layerId;

                    $_layerObject->_layerName = $p->xmlNode(str_replace("[]","[".$i."]",$section["_layerName"]));

                    $_layerObject->_layerTitle = $p->xmlNode(str_replace("[]","[".$i."]",$section["_layerTitle"]));

                    $_layerObject->_layerAbstract = $p->xmlNode(str_replace("[]","[".$i."]",$section["_layerAbstract"]));

                    $_layerObject->_layerLegend = $p->xmlNode(str_replace("[]","[".$i."]",$section["_layerLegend"]));

                    $_layerObject->_isQueryable = $queryableValue;

                    $_layerObject->_bboxMinX = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMinX"]));

                    $_layerObject->_bboxMaxX = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMaxX"]));

                    $_layerObject->_bboxMinY = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMinY"]));

                    $_layerObject->_bboxMaxY = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMaxY"]));

                    $_layerObject->_isSLDEditable=true;

                    $_layerObject->_isVector = false;

                    $_layerObject->_isPrintable = true;
					
					$r_layers[]=$_layerObject;
                }
				
				$_serviceObject = new ServiceObject();
				
                $_serviceObject->_serviceId = md5($objArr->_serviceUrl);

                $_serviceObject->_serviceType = "WMS";

                $_serviceObject->_serviceName = $p->xmlNode($section["_serviceName"]);

                $_serviceObject->_serviceAbstract = $p->xmlNode($section["_serviceAbstract"]);

                $_serviceObject->_serviceTitle = $p->xmlNode($section["_serviceTitle"]);

                $_serviceObject->_serviceUrl = (string)$objArr->_serviceUrl;

                $_serviceObject->_version = $p->xmlNode("string(//@version)");

                $_serviceObject->_layers = $r_layers;
				
				$r->_response=$_serviceObject;
            }
        }
        else
        {
            $r->_errorDescription = $p->o_response;
        }

        return $r;

    }
	
	public function registerLayer($objArr)
    {
		$r = new Response();
		
		$_layerDetailsObject = new LayerDetailsObject();
		
		$_attributes=WFS::createDescribeFeatureTypeObject($objArr);
		
		$_layerDetailsObject->_attributes = $_attributes;

        $_layerDetailsObject->_nativeSRS = WFS::getLayerNativeSRS($objArr);

        $_layerDetailsObject->_geometryField=WFS::getGeoemtryField($_attributes);
		
        $r->_response=$_layerDetailsObject;

        return $r;
    }
	
	public function getAttributes($objArr)
    {
        $f = new FeatureInfoObject();

		$r = new Response();

        $fr = new FeatureInfoResponse();

        $fr->_attributes = $f->readGML($objArr);

        $fr->_layerId=(string)$objArr->_layerId;

        $r->_response = $fr;

        return $r;
    }
	
	public function search($objArr)
    {
        $f = new FeatureInfoObject();

		$r = new Response();

        $fr = new FeatureInfoResponse();

        $fr->_attributes = $f->readGML($objArr);

        $fr->_layerId=(string)$objArr->_layerId;

        $r->_response = $fr;

        return $r;
    }
	
	public function getinfo($objArr)
    {
        $f = new FeatureInfoObject();

		$r = new Response();

        $fr = new FeatureInfoResponse();

        $fr->_attributes = $f->readGML($objArr);

        $fr->_layerId=(string)$objArr->_layerId;

        $r->_response = $fr;

        return $r;
    }
	
	public function createGetCapabilitiesUri($_url)
    {
		$_query["REQUEST"]="GETCAPABILITIES";
		
		$_query["SERVICE"]="WMS";

        return Proxy::createUriQuery($_url, $_query);
    }
}

?>