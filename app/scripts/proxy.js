/**
 * 
 */

var proxy = {};

proxy.mode = "none";

proxy.serverData = {
	pac : "function FindProxyForURL(url, host) { return 'DIRECT';}",
	hostnames : []
};

proxy.refreshChromeProxy = function(mode)
{
	if (mode != null)
		this.mode = mode;
	
	console.log("proxy set to " + this.mode);

	switch (this.mode)
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
				data : this.serverData.pac
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
	
	chrome.browserAction.setIcon({
		path : 'images/' + this.mode + "-32.png"
	});
	
	chrome.storage.sync.set({riftMode:this.mode});
};

