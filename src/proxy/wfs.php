<?php

class WFS
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

			case "search":
                $this->output = $this->search($objArr);
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

                $sectionVersionManager = "WFS_".$version;

                $section=$_config[$sectionVersionManager];

                $countFeatureInfoFormat = $p->xmlNode($section["_featureInfoFormatCount"]);

                $featureInfoFormat = "";

                foreach($_config["FEATUREINFOFORMAT"] as $key=>$value)
                {
                    for ($i=1;$i<=$countFeatureInfoFormat;$i++)
                    {
                        $currentFeatureInfoFormat=str_replace("[]","[".$i."]",$p->xmlNode($section["_featureInfoFormat"]));

                        if (($featureInfoFormat == "") && ($currentFeatureInfoFormat==$key))
                        {
                            $featureInfoFormat = $currentFeatureInfoFormat;
                        }
                    }
                }
				
				if ($featureInfoFormat=="")
                {
                    $featureInfoFormat = "GML2";
                }
				
                $_serviceObject = new ServiceObject();
				
                $_serviceObject->_serviceId = md5($objArr->_serviceUrl);

                $_serviceObject->_serviceType = "WFS";

                $_serviceObject->_serviceName = $p->xmlNode($section["_serviceName"]);

                $_serviceObject->_serviceAbstract = $p->xmlNode($section["_serviceAbstract"]);

                $_serviceObject->_serviceTitle = $p->xmlNode($section["_serviceTitle"]);

                $_serviceObject->_serviceUrl = (string)$objArr->_serviceUrl;

                $_serviceObject->_username = $p->_username;

                $_serviceObject->_password = $p->_password;

                $_serviceObject->_version = $p->xmlNode("string(//@version)");

                $_serviceObject->_isVector = true;

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

                $sectionVersionManager = "WFS_".$version;

                $section=$_config[$sectionVersionManager];

                $countLayer = $p->xmlNode($section["_layer"]);

                $r_layers = Array();

                for ($i =1;$i<=$countLayer;$i++)
                {
				
                    $layerId = md5($p->xmlNode(str_replace("[]","[".$i."]",$section["_layerName"])));
					
					$serviceId=md5($objArr->_serviceUrl);

                    $color = substr($layerId,0,6);

                    $isEditableStr = $p->xmlNode(str_replace("[]","[".$i."]",$section["_isEditable"]));

                    $isEditable = false;
					
					if ($isEditableStr>0)
					{
						$isEditable=true;
					}
					
					$_layerObject=new LayerObject();
					
					$_layerObject->_serviceId = $serviceId;

                    $_layerObject->_layerId = $serviceId.$layerId;

                    $_layerObject->_layerName = $p->xmlNode(str_replace("[]","[".$i."]",$section["_layerName"]));

                    $_layerObject->_layerTitle = $p->xmlNode(str_replace("[]","[".$i."]",$section["_layerTitle"]));

                    $_layerObject->_layerAbstract = $p->xmlNode(str_replace("[]","[".$i."]",$section["_layerAbstract"]));

                    $_layerObject->_layerLegend = $_config["host"]."?proxy=color&color=".$color;

                    $_layerObject->_color=$color;

                    $_layerObject->_bboxMinX = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMinX"]));

                    $_layerObject->_bboxMaxX = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMaxX"]));

                    $_layerObject->_bboxMinY = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMinY"]));

                    $_layerObject->_bboxMaxY = $p->xmlNode(str_replace("[]","[".$i."]",$section["_bboxMaxY"]));

                    $_layerObject->_isSLDEditable = true;

                    $_layerObject->_isEditable = $isEditable;

                    $_layerObject->_isQueryable = true;

                    $_layerObject->_isVector = true;
					
					$r_layers[]=$_layerObject;
                }

				
				
				$_serviceObject = new ServiceObject();
				
                $_serviceObject->_serviceId = md5($objArr->_serviceUrl);

                $_serviceObject->_serviceType = "WFS";

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
		
		$_attributes=self::createDescribeFeatureTypeObject($objArr);
		
		$_layerDetailsObject->_attributes = $_attributes;

        $_layerDetailsObject->_nativeSRS = self::getLayerNativeSRS($objArr);

        $_layerDetailsObject->_geometryField=self::getGeoemtryField($_attributes);

        $_layerDetailsObject->_featureNS = self::getPrefixNType($objArr, "prefix");

        $_layerDetailsObject->_featureType = self::getPrefixNType($objArr, "typename");
		
        $r->_response=$_layerDetailsObject;

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
	
	public function getPrefixNType($objArr, $_type)
    {
        $splitNM = explode(":",$objArr->_layerName);

        $_output="";

        if (count($splitNM)>0)
        {
            switch($_type)
            {
                case "prefix":
				
					$p = new Proxy();
		
					$p->_url = $this->createGetCapabilitiesUri((string)$objArr->_serviceUrl);
						
					$p->_username = $objArr->_username;

					$p->_password = $objArr->_password;

					$p->get();
					
                    $_output=$p->nodeNamespace($splitNM[0]);

                    break;

                case "typename":
				
                    $_output = $splitNM[1];
					
                    break;
            }
        }

        return $_output;
    }
	
	public function getGeoemtryField($attributes)
    {
        foreach($attributes as $key=>$value)
        {
		
            if ($value->_attributeIsGeometry==true)
            {
                return $value->_attributeName;
            }
        }
        return "";
    }
	
	public function getLayerNativeSRS($objArr)
    {
		require("config.php");

		$p = new Proxy();
		
		$p->_url = self::createGetCapabilitiesUri((string)$objArr->_serviceUrl);
						
		$p->_username = $objArr->_username;

		$p->_password = $objArr->_password;

		$p->get();

        $r = new Response();

        $r->_responseCode = (string)$p->o_responseCode;

        $version = $p->xmlNode("string(//@version)");

        $sectionVersionManager = "WFS_".$version;

        $section=$_config[$sectionVersionManager];

        if ($section!=null)
        {
			if ($p->o_responseCode == 200)
			{
				return $p->xmlNode(str_replace("{_layerName}",$objArr->_layerName,$section["_nativeSRS"]));
			}
        }
        return "";
    }

	public function createDescribeFeatureTypeObject($objArr)
	{
		require("config.php");
	   
		$p = new Proxy();
		
		$p->_url = self::createDescribeFeatureType($objArr->_serviceUrl, $objArr->_layerName);

		$p->_username = $objArr->_username;

		$p->_password = $objArr->_password;

		$p->get();

        $r = new Response();

        $r->_responseCode = (string)$p->o_responseCode;

        $section = $_config["DESCRIBEFEATURETYPE"];

        $r_attributes = array();

        if ($p->o_responseCode == 200)
        {
		
			if (!empty($p->xmlNode($section["_attributesRoot"])))
			{
				$countAttributes = $p->xmlNode($section["_attributesRoot"]);

				$isgeoemtry = false;

				for ($i=1;$i<=$countAttributes;$i++)
				{
					$_type = $p->xmlNode(str_replace("[]", "[".$i."]",$section["_attributeType"]));

					$_name = $p->xmlNode(str_replace("[]", "[".$i."]",$section["_attributeName"]));

					$isgeoemtry = false;

					if (strlen($_type)>2)
					{
						if ((substr($_type,0,3))=="gml")
						{
							$isgeoemtry = true;
						}
					}

					$_typeExp=explode(":",$_type);
					
					if (count($_typeExp)>=0)
					{
						$_type = $_typeExp[count($_typeExp)-1];
					}

					$_attributesObject=new AttributesObject();
					
					$_attributesObject->_attributeName = $_name;
					
					$_attributesObject->_attributeType = $_type;
					
					$_attributesObject->_attributeIsGeometry = $isgeoemtry;
					
					$r_attributes[]=$_attributesObject;
					
				}
			}
        }

        return $r_attributes;
    }	
	
	public function createGetCapabilitiesUri($_url)
    {
		$_query["REQUEST"]="GETCAPABILITIES";
		
		$_query["SERVICE"]="WFS";

        return Proxy::createUriQuery($_url, $_query);
    }
	
	public function createDescribeFeatureType($_url, $typenames)
    {
	
        $_url = str_replace("wms","wfs",$_url);

        $_query["REQUEST"]="DESCRIBEFEATURETYPE";

        $_query["SERVICE"]="WFS";

        $_query["TYPENAME"]=$typenames;

        return Proxy::createUriQuery($_url, $_query);
    }
}

?>