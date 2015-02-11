'use strict';

$("#btn-always").click(function(){
var config = {
		mode : "pac_script",
		pacScript : {
			data : "function FindProxyForURL(url, host) {\n"
					+ "  if (shExpMatch(host, '*.google.*'))\n"
					+ "    return 'PROXY 211.149.217.191:7777';\n"
					+ "  return 'DIRECT';\n"
					+ "}"
		}
	};
	chrome.proxy.settings.set({
		value : config,
		scope : 'regular'
	});
});

console.log('\'Allo \'Allo! Popup');

