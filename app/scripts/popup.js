'use strict';

$(function(){

	var proxy = chrome.extension.getBackgroundPage().proxy;

	$("#proxy-options input").change(function(){
		proxy.refreshChromeProxy(this.value);
	});
	
	$("#proxy-options input[value='" + proxy.mode + "']").parent().button('toggle');

	var unreachables = chrome.extension.getBackgroundPage().unreachables;
	
	var group = $("#unreachables");
	group.empty();
	for (var h in unreachables){
		group.append($("<li/>").addClass("list-group-item").text(h))
	}
});