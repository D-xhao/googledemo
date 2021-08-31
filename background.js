// background.js

//-------------------- 右键菜单演示 ------------------------//
chrome.contextMenus.create({
	title: "打开谷歌首页",
	onclick: function(){
    chrome.tabs.create({url: 'https://www.google.com/search?q='});
    // 弹出消息框！
		// chrome.notifications.create(null, {
		// 	type: 'basic',
		// 	iconUrl: 'images/icon.png',
		// 	title: '这是标题',
		// 	message: '您刚才点击了自定义右键菜单！'
		// });
	}
});
chrome.contextMenus.create({
	title: '使用google搜索：%s', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params)
	{
		// 注意不能使用location.href，因为location是属于background的window对象
		// chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    chrome.tabs.create({url: 'https://www.google.com/search?q=' + encodeURI(params.selectionText)});
	}
});


let color = '#f00';
let ncolor = '#0000'
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ ncolor });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// function reloads(){
//   window.location.reload();
// }

function czai(){
  // alert("hello")
  window.location.reload();
  // return "hello!"
}


// 监听来自page的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  var hrefs = request
  chrome.storage.sync.set({ hrefs });
	console.log(request, sender, sendResponse);
	sendResponse(request);
	return true
})

