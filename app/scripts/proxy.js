/**
 * 
 */

var proxy = {};

proxy.mode = "none";

proxy.proxyList = [];

proxy.refreshChromeProxy = function(mode)
{
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
				data : this.createPacScript(this.proxyList)
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

proxy.fetchList = function()
{
	$.getJSON("http://localhost:8080/proxy/list", function(list){
		console.log(list);
		proxy.proxyList = list;
		if (proxy.mode == 'required')
		{
			proxy.refreshChromeProxy('required');
		}
	});
};

proxy.createPacScript = function(list)
{
	var script = "function FindProxyForURL(url, host) {\n" +
			"var p = 'PROXY 211.149.217.191:13128';\n" +
			"if (shExpMatch(host, '*.google.*'))\n" +
			"	return p;\n";

	script += "var a = [";
	var first = true;
	for (var i in list){
		if (!first)
			script += ",";
		script += "'" + this.proxyList[i] + "'";
		first = false;
	}
	script += "];\n"
	script += "if (a.indexOf(host) != -1) return p;";
	script += "return 'DIRECT';\n";
	script += "}";
	return script;
};