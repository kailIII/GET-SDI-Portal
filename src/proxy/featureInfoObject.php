<?php

class FeatureInfoObject
{
    public function readGML($objArr)
    {
		require("config.php");
	
        $p = new Proxy();
		
        if (empty((string)$objArr->_featureUrl))
        {
			if (empty((string)$objArr->_cqlFilter))
			{
				$p->_url = self::createGetFeatureInfoRequest($objArr);
			}
			else
			{
				$p->_url = self::createSearchUrl($objArr);
				
				
			}
        }else
        {
			$p->_url = (string)$objArr->_featureUrl;
        }

        $p->_username = (string)$objArr->_username;

        $p->_password = (string)$objArr->_password;

        $p->get();

        if ($p->o_responseCode == 200)
        {
			libxml_use_internal_errors(true);
		
			$xml=new DOMDocument();
			
			$xml->loadXML($p->o_response);
			
			$xpath = new DOMXPath($xml);
		
			foreach($_config["NAMESPACES"] as $key=>$value)
			{
				$xpath->registerNamespace($key,$value);
			}

			$section = $_config["GML"];

			$countFeatureMembers =$p->xmlNode($section["_featureMemberCount"]);

			$f_response = array();

			for ($i=1;$i<=$countFeatureMembers;$i++)
			{
				$r_attributes = array();

				$nodes = $xpath->query(str_replace("[]","[".$i."]",$section["_featureMember"]));

				$v = array();
				
				foreach ($nodes as $node) 
				{
					foreach($node->firstChild->childNodes as $n)
					{
						
						if ((string)$n->firstChild->namespaceURI!= $_config["NAMESPACES"]["gml"])
						{
							$v[$n->localName]=$n->nodeValue;
						}
						else
						{
							$feature_srs = $n->firstChild->getAttribute("srsName");
						}
					}
					
					$v["_layerId"]=(string)$objArr->_layerId;
				
					$featureId = $node->firstChild->getAttribute("fid");
				}
				
				if (!empty($objArr->_featureType))
				{
					if (strpos($featureId,$objArr->_featureType)===false)
					{}else{
						$featureId = (string)$objArr->_featureType.".".$featureId;
					}
				}
				
				
				$v["_featureId"]=$featureId;

				$v["_srsName"]=$feature_srs;
				
				if ((string)$objArr->_request=="search")
				{
					$v["_featureUrl"]=self::createGetSearchUrl($objArr, $featureId);
				
				}
				else
				{
					$v["_featureUrl"]=self::createGetFeatureUrl($objArr, $featureId);
				}
				
				$v["_featureGeomFormat"]="gml";

				$r_attributes[]=$v;
				
				$f_response[]=$r_attributes;
				
			}
	
			return $f_response;

        }

        return "";
    }

    public function readJSON()
    {
		//TOBE
        return "";
    }

    public function createGetFeatureInfoRequest($objArr)
    {

        switch((string)$objArr->_serviceType)
        {
			case "WMS":
				$_query["REQUEST"]="GETFEATUREINFO";
				$_query["SERVICE"]="WMS";
				$_query["WIDTH"]=$_REQUEST["_width"];
				$_query["HEIGHT"]=$_REQUEST["_height"];
				$_query["X"]=$_REQUEST["_x"];
				$_query["Y"]=$_REQUEST["_y"];
				$_query["BBOX"]=$_REQUEST["_bbox"];
				$_query["SRS"]=$_REQUEST["_srs"];
				$_query["LAYERS"]=(string)$objArr->_layerName;
				$_query["QUERY_LAYERS"]=(string)$objArr->_layerName;
				$_query["INFO_FORMAT"]=(string)$objArr->_featureInfoFormat;
				$_query["FEATURE_COUNT"]="1000";
				break;

			case "WFS":
				$_query["REQUEST"]="GETFEATURE";
				$_query["SERVICE"]="WFS";
				$_query["FEATUREID"]=(string)$objArr->_featureid;
				$_query["OUTPUTFORMAT"]=(string)$objArr->_featureInfoFormat;
				$_query["TYPENAME"]=(string)$objArr->_layerName;
				break;
        }

        return Proxy::createUriQuery($objArr->_serviceUrl, $_query);
    }

    public function createSearchUrl($objArr)
    {
        $_query["REQUEST"]="GETFEATURE";
        $_query["SERVICE"]="WFS";
        $_query["OUTPUTFORMAT"]="GML2";
        $_query["TYPENAME"]=(string)$objArr->_layerName;
        $_query["CQL_FILTER"]=(string)$objArr->_cqlFilter;
       
        return Proxy::createUriQuery($objArr->_serviceUrl, $_query);
    }


    public function createGetSearchUrl($objArr, $featureId)
    {
		$_query["REQUEST"]="GETFEATURE";
		$_query["SERVICE"]="WFS";
		$_query["OUTPUTFORMAT"]="GML2";
		$_query["TYPENAME"]=$objArr->_layerName;
		$_query["FEATUREID"]=$featureId;
		
        return Proxy::createUriQuery($objArr->_serviceUrl, $_query);
    }

    public function createGetFeatureUrl($objArr,$featureId)
    {
        switch ($objArr->_serviceType)
        {
			case "WMS":
				$_query["REQUEST"]="GETFEATUREINFO";
				$_query["SERVICE"]="WMS";
				$_query["WIDTH"]=$_REQUEST["_width"];
				$_query["HEIGHT"]=$_REQUEST["_height"];
				$_query["X"]=$_REQUEST["_x"];
				$_query["Y"]=$_REQUEST["_y"];
				$_query["BBOX"]=$_REQUEST["_bbox"];
				$_query["SRS"]=$_REQUEST["_srs"];
				$_query["LAYERS"]=$objArr->_layerName;
				$_query["QUERY_LAYERS"]=$objArr->_layerName;
				$_query["INFO_FORMAT"]=$objArr->_featureInfoFormat;
				$_query["FEATUREID"]=$featureId;
				break;

			case "WFS":
				$_query["REQUEST"]="GETFEATURE";
				$_query["SERVICE"]="WFS";
				$_query["FEATUREID"]=$featureId;
				$_query["OUTPUTFORMAT"]=(string)$objArr->_featureInfoFormat;
				$_query["TYPENAME"]=(string)$objArr->_layerName;
				break;
        }

        return Proxy::createUriQuery($objArr->_serviceUrl, $_query);
    }
}

?>