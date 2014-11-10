<?php


require_once("proxy.php");
require_once("featureInfoResponse.php");
require_once("featureInfoObject.php");
require_once("wmtsDetailsObject.php");
require_once("serviceObject.php");
require_once("layerObject.php");
require_once("layerDetailsObject.php");
require_once("attributesObject.php");
require_once("sldObject.php");
require_once("response.php");
require("wms.php");
require("wfs.php");
require("wmts.php");
require("sld.php");
require("print.php");

error_reporting(0);

class SDIPortal
{
	public $output;
	
	public $r_objects=[];
	
	private $_data;
	
	public function __construct($_data)
	{	
		$this->_data=$_data;
		
		if (($_REQUEST["proxy"] == "getfeatures") || ($_REQUEST["proxy"] == "proxy"))
        {
			$p = new Proxy();
			
			$url = explode("url=",$_SERVER["REQUEST_URI"]);
		
			$p->_url = $url[1];
				
			$p->_username = $_REQUEST["_username"];

			$p->_password = $_REQUEST["_password"];
			
			$p->_postData=$_POST;
			
			$p->get();
			
			$contenttype = @$_REQUEST['FORMAT'];
			
			if(empty($contenttype))
			{
				$contenttype = "text/xml";
			}

			if (isset($_REQUEST["nocache"]))
			{
				$seconds_to_cache= -1000;
			}
			else
			{
				$seconds_to_cache = 3600;
			}

			$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache) . " GMT";

			header("Expires: $ts");

			header("Pragma: cache");

			header("Cache-Control: max-age=$seconds_to_cache");

			header("Content-type: " . $contenttype);
			
			$this->output=$p->o_response;
			
		}
		else
		{
			$this->constructRequest();
			
			$this->output=json_encode($this->r_objects);
		}
		
	}

	public function constructRequest()
	{
        $jsonR = json_decode($this->_data);

        foreach ($jsonR as $key=>$objArr)
        {
            $_serviceType = (string)$objArr->_serviceType;

            switch ($_serviceType)
            {
                case "WMS":

					$wms = new WMS();

					$wms->get($objArr);

					$this->r_objects[]=$wms->output;
					
					break;
				
                case "WFS":

					$wfs = new WFS();

					$wfs->get($objArr);

					$this->r_objects[]=$wfs->output;

					break;
				
                case "WMTS":

                    $wmts = new WMTS();

					$wmts->get($objArr);

					$this->r_objects[]=$wmts->output;

					break;
				
                case "PRINT":

                    $print = new PrintClass();

					$print->get($objArr);

					$this->r_objects[]=$print->output;

                    break;
				
                case "SLD":

                    $sld = new SLD();

					$sld->get($objArr);

					$this->r_objects[]=$sld->output;

                    break;
				
            }
		}
	}
}

$sdi=new SDIPortal($_REQUEST["data"]);

echo $sdi->output;
?>