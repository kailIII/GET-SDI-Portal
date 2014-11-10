<?php

class ServiceObject
{
	public $_serviceId=null;

	public $_tiled=false;
	
	public $_api;
	
	public $_bbox=null;
	
	public $_serviceUrl=null;
	
	public $_serviceProxyUrl=null;
	
	public $_version=null;
	
	public $_username=null;
	
	public $_password=null;

    public $_featureInfoFormat = null;
	
	public $_isSecure=false;
	
	public $_isSecureLogged=false;
	
	public $_serviceType=null;
	
	public $_serviceTitle=null;
	
	public $_serviceAbstract=null;
	
	public $_serviceName=null;

    public $_layers = null;
	
	public $_supportedEPSG;

    public $_isVector = false;

    public $_isService = true;

}

?>