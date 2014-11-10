<?php

class Proxy
{
	public $_url;

    public $_username;

    public $_password;

    public $_method = "GET";

    public $_timeout=8000;

    public $o_response;

	public $o_responseCode;

    public $_postData = "";
	
	public $_proxy_Server="";
	
	public $_proxy_Port="";
	
	public $_proxy_auth_type="";
	
	public $_proxy_username="";
	
	public $_proxy_password="";
	
	public function get()
	{
		$curl = curl_init($this->_url);
		
		curl_setopt($curl, CURLOPT_MUTE, true);
		
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/xml'));
		
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		
		curl_setopt($curl,CURLOPT_FOLLOWLOCATION,true);
		
		if (!empty($GLOBALS["_proxy_Server"])){
		
			curl_setopt($curl, CURLOPT_PROXY,$GLOBALS["_proxy_Server"]);
			
			if (!empty($GLOBALS["_proxy_Port"])){
				curl_setopt($curl, CURLOPT_PROXYPORT,$GLOBALS["_proxy_Port"]);
			}
			
			if (!empty($GLOBALS["_proxy_auth_type"])){
				curl_setopt($curl, CURLOPT_HTTPAUTH, $GLOBALS["_proxy_auth_type"]);
			}
			
			if (!empty($GLOBALS["_proxy_username"])){
				curl_setopt($curl, CURLOPT_PROXYUSERPWD, $GLOBALS["_proxy_username"].':'.$GLOBALS["_proxy_password"]);
			}
		}
		
		if (!empty($this->_postData)){
			curl_setopt($curl, CURLOPT_POSTFIELDS, $this->_postData);
		}

		$this->o_response = curl_exec($curl);
		
		
		$this->o_responseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		
		curl_close($curl);
	}

	public function xmlNode($_xpath)
    {
		require("config.php");
	
		libxml_use_internal_errors(true);
		
		$xml=new DOMDocument();
		
		$xml->loadXML($this->o_response);
		
		$xpath = new DOMXPath($xml);
	
        foreach($_config["NAMESPACES"] as $key=>$value)
        {
			$xpath->registerNamespace($key,$value);
        }

		$value=$xpath->evaluate($_xpath);
		
		if ($value->length===0)
		{
			return "";
		}
		
        return (string)$value;

    }
	
	public function nodeNamespace($prefix)
    {
        $xml=new DOMDocument();
		
		$xml->loadXML($this->o_response);

		return $xml->documentElement->lookupnamespaceURI($prefix);
	}
	
	public static function createUriQuery($_uri,$_query)
    {
        $uri = parse_url($_uri);

        $uriQuery =explode("&",$uri["query"]);
		
		$_newQuery=array();
		
		$_newUri[] = isset($uri['scheme']) ? $uri['scheme'] . '://' : '';
		
		$_newUri[] = isset($uri['host']) ? $uri['host'] : '';
		
		$_newUri[] = isset($uri['port']) ? ':'.$uri['port']:'';
		
		$_newUri[] = isset($uri['path']) ? $uri['path'] : '';
		
        if ($_query != null)
        {
            foreach($uriQuery as $key=>$value)
            {
                if (((strtolower($key)!= "request") && (strtolower($key)!= "service")) && (!empty($value)))
                {
                    $_newQuery[] =$key."=".$value;
                }
            }

            foreach($_query as $key=>$value)
            {
                $_newQuery[] =$key."=".$value;

            }
        }

		$_newUri=implode("",$_newUri);
		
		if(count($_newQuery)>0)
		{
			$_newUri=$_newUri."?".implode("&",$_newQuery);
		}
		
		$_newUri=str_replace(" ","+",$_newUri);
		
        return $_newUri;
    }
	
}


?>