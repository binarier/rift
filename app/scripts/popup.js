'use strict';

var proxy = chrome.extension.getBackgroundPage().proxy;

var currentTab;

var unreachables;

function updateHostnameButton(){
	var u = new URL(currentTab.url);
	var btn = $("#hostname-button");
	var icon = $("#hostname-icon");
	btn.text(u.hostname + " ");
	if (proxy.serverData.hostnames[u.hostname])
	{
		btn.removeClass("btn-primary").addClass("btn-success");
		btn.append(
				$("<span/>").addClass("glyphicon glyphicon-trash")
			);
	}
	else
	{
		btn.removeClass("btn-success").addClass("btn-primary");
		btn.append(
			$("<span/>").addClass("glyphicon glyphicon-plus")
		);
	}
}

$(function(){
	
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		currentTab = tabs[0];

		unreachables = chrome.extension.getBackgroundPage().unreachables[currentTab.id];
		updateHostnameButton();

		console.log("current tab id:" + currentTab.id);
		
		var count = 0;
		var group = $("#unreachables");
		group.empty();
		for (var h in unreachables){
			if (unreachables[h]){
				group
					.append($("<label class='checkbox'/>")
						.append($("<input type='checkbox' checked/>").val(h))
						.append($("<span/>").text(h)));
				count++;
			}
		}
		if (count == 0)
		{
			$("#unreachables-panel").hide();
		}
	});

	$("#hostname-button").click(function(){
		var u = new URL(currentTab.url);
		var requestUrl = RIFT_SERVER;
		requestUrl += proxy.serverData.hostnames[u.hostname] ? "/proxy/remove" : "/proxy/add"; 
		
		$.post(requestUrl, {hostname:u.hostname}, function(){
			$.getJSON(RIFT_SERVER + "/proxy/data", function(data){
				proxy.serverData = data;
				proxy.refreshChromeProxy();
				updateHostnameButton();
				chrome.tabs.executeScript(currentTab.id, {code: 'window.location.reload();'});
			});				
		});
	});

	$("#proxy-options input[value='" + proxy.mode + "']").parent().button('toggle');

	$("#proxy-options input").change(function(){
		proxy.refreshChromeProxy(this.value);
	});

	$("#unreachables-button").click(function(){
		var names = "";
		$("#unreachables label input[type='checkbox']:checked").each(function(i, e){
			names += this.value + ",";
			unreachables[this.value] = false;
		});
		console.log("adding:" + names);
		
		$.post(RIFT_SERVER + "/proxy/add", {hostname : names}, function(){
			$.getJSON(RIFT_SERVER + "/proxy/data", function(data){
				proxy.serverData = data;
				proxy.refreshChromeProxy();
				updateHostnameButton();
				chrome.tabs.executeScript(currentTab.id, {code: 'window.location.reload();'});
				window.close();
			});
		});
	});
});