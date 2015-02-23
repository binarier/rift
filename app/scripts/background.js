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
	proxy.refreshChromeProxy(riftMode);
	proxy.fetchList();
});


console.log("startup");
$(document).ajaxSend(function(event, xhr, options){
	xhr.setRequestHeader("Authorization", "Basic " + btoa("clam:abc"));
});

//$.getJSON("http://localhost:8080/token/refresh", function(result){
//	console.log(result);
//});
chrome.webRequest.onErrorOccurred.addListener(function(details){
	console.log(details.method + ":" + details.url);
	var u = new URL(details.url);
	unreachables[u.hostname] = true;
}, {urls: ["<all_urls>"]});

