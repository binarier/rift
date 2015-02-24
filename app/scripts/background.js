'use strict';

var unreachables = {};

chrome.runtime.onInstalled.addListener(function(details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.storage.sync.get("riftMode", function(items){
	var riftMode = items['riftMode'];
	console.log("riftMode:" + riftMode);
	if (riftMode == null)
	{
		riftMode = 'none';
	}
	proxy.mode = riftMode;
	//更新数据
	$.getJSON(RIFT_SERVER + "/proxy/data", function(data){
		proxy.serverData = data;
		console.log(data.hostnames);
		proxy.refreshChromeProxy();
	});
});


//认证
$(document).ajaxSend(function(event, xhr, options){
	xhr.setRequestHeader("Authorization", "Basic " + btoa("clam:abc"));
});

chrome.webRequest.onErrorOccurred.addListener(function(details){
	console.log(details.error  + ":" + details.method + ":" + details.url);
	var u = new URL(details.url);
	
	if (!proxy.serverData.hostnames[u.hostname])
	{
		if (unreachables[details.tabId] == undefined)
			unreachables[details.tabId] = {};
		unreachables[details.tabId][u.hostname] = true;
	}
}, {urls: ["<all_urls>"]});

