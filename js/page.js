
  
// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{

	var tests = document.getElementsByTagName('body')[0].outerHTML;
		var testa = tests.replaceAll(/src="([^"]+)"|srcset="([^"]+)"|data-pfu="([^"]+)"|id="([^"]+)"|class="([^"]+)"|<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>|<path\b[^<]*(?:(?!<\/path>)<[^<]*)*<\/path>/gi,"");
		var phones = testa.match(/[+\(\d]{3,4}[\(\d \)-]{4,8}[\d]{4}|[\d]{4}-[\d]{3}-[\d]{3}|(4|0)[0-9]\d{8}|[\d]{3}-[\d]{5}-[\d]{2}|[+\d]{2}\s[\d]{3}-[\d]{3}-[\d]{4}|[\d]{1}-[\d]{3}-[\d]{3}-[\d]{4}|[+\(\d]{3,4}[\d.]{4,8}[\d]{4}/g);
		var qubiaoqian = testa.replaceAll(/<[^>]+>/g,"");//去全文标签
		// 去标签前
		var str1 = testa.match(/(\w+)@(\w+)(\.(\w+))/g);
		//去标签后
		var str2 = qubiaoqian.match(/(\w+)@(\w+)(\.(\w+))|(\w+)(\.(\w+))@(\w+)(\.(\w+))|(\w+)(\.(\w+))(\.(\w+))@(\w+)(\.(\w+))/g)
		// 合并
		if(str1 != null && str1 != ""){
			var str = str1.concat(str2);
		}else{
			var str = ""
		}
		var emails = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var reg = /^\d{12,20}$|(000|111|2222|333|444|555|666|777|888|999)\d{7,8}$|(0123|1234|2345|3456|4567|5678|6789)\d{6,7}$|^(3|5|6|7|9)\d{9,10}$/;
		console.log("所有疑似电话：："+phones)
		
		
		// 调用
		// -------------------------------------------------------------------------------------------------------------------------
		var plist = [];
		var elist = [];
		
		// 去杂
		var lphone = []
		if(phones != null && phones != ""){
		for(var i = 0 ; i < phones.length ; i++){
			if(!reg.test(phones[i])){
			lphone.push(phones[i])
			}
		}
		console.log("匹配电话"+lphone)
		}

		if(phones != null && phones != ""){
			var phone = quchong(lphone)
			console.log("去重电话:"+phone)
			chrome.storage.sync.set({ phone });
			plist = phone;
		}else{
			var phone = "空"
			console.log("空号码:"+phone)
			chrome.storage.sync.set({ phone });
			plist = [];//此处必须返回数组，要不然下面push不到东西
		}

		var regem = [];
		if(str != null && str != "" ){
			for(var i = 0 ;i<str.length;i++){
				if(emails.test(str[i]) == false){
					regem.push(str[i])
				}
			}
			console.log("所有邮箱："+regem)
		}
		
		if(str != null && str != "" ){
			var email = quchong(regem)
			console.log("去重邮箱:"+email)
			chrome.storage.sync.set({ email });
			elist = email;
		}else{
			var email = "空"
			console.log("空邮箱:"+email)
			chrome.storage.sync.set({ email });
			elist = [];//此处必须返回数组，要不然下面push不到东西
		}

		// 处理电话和邮箱，转化为json数组
		var plen = plist.length
		var elen = elist.length
		// console.log("电话数组长度："+plen);
		// console.log("邮箱数组长度：" + elen)

		if(plen > elen){
			for(var i = 0 ; i < plen-elen ; i++){
				elist.push("")
			}
		}else{
			for(var i = 0 ; i < elen-plen ; i++){
				plist.push("")
			}
		}
		var all = []
		var array = {}
		for(var i = 0 ; i < plist.length ; i++){
			array['phone'] = plist[i];
			array['email'] = elist[i];
			all.push(array)
			array = {}
		}
		// console.log( all)
		var jsonpe = JSON.stringify(all)
		chrome.storage.sync.set({ jsonpe });

// -------------------------------------------------------------------------------------------------------------------------

		// 去重
		function quchong(arr){
		 for(var i = 0,len = arr.length ; i < len ; i++){
			 for (var j = i + 1,len = arr.length; j < len; j++) {
				if(arr[i] === arr[j]){
					arr.splice(j,1);
					j--;
					len--;
				}
			 }
		 }
		 return arr;
		}
		console.log(new Date())
		console.log("----------------------------------------------------")
		sendResponse("收到是来自popup页面的消息："+request);
		if(request!="popup"){
		console.log('收到来自 ' + (sender.tab ? "page(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request+ new Date());
		sendResponse("收到不是来自popup页面的消息："+request);
	}
});

  
// 给后台发消息
  function sendMessageToBackground(message) {
	chrome.runtime.sendMessage(message, function(response) {
		// tip('收到来自后台的回复：' + response);
		console.log("当前页面地址：" + response)
	});
}

sendMessageToBackground(window.location.href)


$(function(){
	var tdlen =  $("#xjs td").length;
	console.log("搜索分页页码数量："+tdlen)


// 触底测试
var url = "https://www.google.com"+$("#xjs td:nth-child(3) a").attr("href");
console.log(url)
var addh = 1;
var reg = /start=\d{1,10}/;
var res = url.split(reg);
console.log(res);

if(tdlen > 2){
	window.addEventListener("scroll", function(event) {
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body
			.scrollTop;
		if (document.documentElement.scrollHeight == document.documentElement.clientHeight +
			scrollTop) {
			console.log("触底了1!");
			// res
			
			// $.ajax({
			// 	url : res[0]+ "start="+ addh*10 + res[1],
			// 	success:(result)=>{
			// 		var html = $(result);
			// 		var con = html.find("#search").html()
			// 		$("#res").append("<p style='border-top:1px solid #999'></p><h3>Page "+ addh +"</h3><p style='border-bottom:1px solid #999'></p>"+con)
			// 	},
			// 	error:(e)=>{
			// 		console.log(e)
			// 	}
			// })
			var idsum = "xiangbudao"+addh;
			var idsum1 = "#xiangbudao"+addh;
			$("#res").append("<p style='border-top:1px solid #999'></p><h3>Page "+ (addh+1) +"</h3><p style='border-bottom:1px solid #999'></p>")
			$("#res").append('<div id="'+ idsum +'"></div>')
			$(idsum1).load(res[0]+ "start="+ addh*10 + res[1]+" #search") 
			// console.log(loadhtml)

			console.log(addh*10)
			addh += 1;
		}
	});
}


})