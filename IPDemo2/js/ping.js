function ping(ip,id){
    var img = new Image();								//这里虽然是Image对象，但是我们实际是为了建立一个缓存，当然你也可以假装自己只不过是想要获得某个第三方网站的资源，从而掩盖自己的真实目的
    var start = 0;										//起始时间
    var end = 0;										//终止时间
    var flag = false;									//标志位，确认是否完成缓存
    var isCloseWifi = true;								//标志位，确认网络状况
    var hasFinish = false;								//标志位，确认是否已经结束了ping的工作

    var MAX_LIMIT = 800
    var time = MAX_LIMIT;									//ping的结果，初始值设为一个极大的结果，方便后续处理

    img.onload = function() {							//这里是在建立缓存时进行的任务,但是我们的目的并不在这里！！！
        if ( !hasFinish ) {
            flag = true;								//修改标志位，我们已经获取到了缓存
            hasFinish = true;							//修改标志位，我们ping的工作已经完成
//            console.log('ONLOAD!!!');	//输出一些日志信息
        }
    };
    img.onerror = function() {							//这里是异常跳出部分，因为我们根本没有去缓存图片，所以一定会跳到这里
        if ( !hasFinish ) {								//如果没有完成工作
            if ( !isCloseWifi ) {						//并且网络畅通，即已经找到了目标网站，但是这个网站没有我们需要的资源
                flag = true;							//ok啦~这就是我们想达到的目的
                end = new Date().getTime();				//说明我们已经“ping”到了
                time = end - start;
//                console.log('Ping ' + ip + ' success. '+ time);
//                console.log("success to "+ip);
            } else {									//否则说明网络出现问题
//                console.log('network is not working!');
            }
            hasFinish = true;
        }
    };
    setTimeout(function(){									//网站资源有时不可获取，设置超时时间
        isCloseWifi = false;								//修改标志位，网络畅通
//        console.log('network is working, start ping...');	//输出一些日志信息
//        console.log("I am testing "+ip);							//弹窗告示
    },2);
    start = new Date().getTime();									//开始计时
    img.src = 'http://' + ip + '/' + start;					//这里才是真正要建立目标网站缓存的目标，这里加一个小尾巴的目的就是让他异常跳出！
    
	setTimeout(function(){									//这里将我们统计到的时间写入表单
		document.getElementById(id).value = time
		},MAX_LIMIT+1
	);

/*
	var timer = setTimeout(function() {
        if ( !flag ) {										//如果没有建立缓存
            hasFinish = true;								//关闭onload和onerror的处理程序入口
            flag = false ;
            console.log('Ping ' + ip + ' fail. ');			//输出日志
        }
    }, MAX_LIMIT);
*/
}

