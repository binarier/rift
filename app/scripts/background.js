'use strict';

chrome.runtime.onInstalled.addListener(function(details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({
	text : '\'Allo'
});

console.log('\'Allo \'Allo! Event Page for Browser Action');

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
