'use strict';

$("#proxy-options input").change(function(){
	console.log("proxy set to " + this.value);
	var config;
	switch (this.value)
	{
	case "always":
		config = {
			mode : "fixed_servers",
			rules : {
				singleProxy : {
					scheme : "http",
					host : "211.149.217.191",
					port : 13128
				}
			}
		};
		break;
	case "required":
		config = {
			mode : "pac_script",
			pacScript : {
				data : "function FindProxyForURL(url, host) {\n"
						+ "  if (shExpMatch(host, '*.google.*'))\n"
						+ "    return 'PROXY 211.149.217.191:13128';\n"
						+ "  return 'DIRECT';\n"
						+ "}"
			}
		};
		break;
	case "none":
		config = {
			mode : "direct"
		};
		break;
	}
	chrome.proxy.settings.set({
		value : config,
		scope : 'regular'
	});
	chrome.storage.sync.set({proxy:this.value});
	
	chrome.browserAction.setIcon({
		path : 'images/' + this.value + "-32.png"
	});
});

$(function(){
	console.log("getting proxy settings...");
	chrome.storage.sync.get("proxy", function(items){
		var proxy = items['proxy'];
		console.log("proxy:" + proxy);
		if (proxy == null)
		{
			proxy = 'none';
			chrome.storage.sync.set({proxy:'none'});
		}
		$("#proxy-options input[value='" + proxy + "']").parent().button('toggle');
	});

	chrome.extension.getBackgroundPage().console.log('foo');
});