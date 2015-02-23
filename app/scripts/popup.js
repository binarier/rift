'use strict';

$(function(){

	var proxy = chrome.extension.getBackgroundPage().proxy;

	$("#proxy-options input").change(function(){
		proxy.refreshChromeProxy(this.value);
	});
	
	console.log(chrome.tabs.getCurrent);

	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var u = new URL(tabs[0].url);
		var btn = $("#hostname-button");
		var icon = $("#hostname-icon");
		btn.text(u.hostname + " ");
		if (proxy.serverData.hostnames[u.hostname])
		{
			btn.addClass("btn-success");
			btn.append(
					$("<span/>").addClass("glyphicon glyphicon-trash")
				);
		}
		else
		{
			btn.addClass("btn-primary");
			btn.append(
				$("<span/>").addClass("glyphicon glyphicon-plus")
			);
		}
	});

	$("#proxy-options input[value='" + proxy.mode + "']").parent().button('toggle');

	var unreachables = chrome.extension.getBackgroundPage().unreachables;
	
	var group = $("#unreachables");
	group.empty();
	for (var h in unreachables){
		if (unreachables[h])
			group.append($("<li/>").addClass("list-group-item").text(h))
	}
});