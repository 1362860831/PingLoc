function getData(challenge){
    //var canvas = document.createElement("canvas");
    var canvas = document.getElementById("canvas1");	//定位HTML上的画布
    canvas.width = 1900;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");					//2d风格
    canvas.style.display = "inline";					//显示风格
    ctx.textBaseline = "alphabetic";					//写字的位置，参考基准线

    for (var i = 0; i < challenge.glyphs.length; i++) {
        var st = challenge.glyphs[i];
        ctx.translate(st.rX, st.rY);					//利用相对位置定义画笔位置
        ctx.rotate(Math.PI * st.rA);					//转角
        ctx.fillStyle = getGradient(ctx,st.gr,canvas.width); //渐变效果
        ctx.shadowBlur = st.sb;							//阴影模糊级数
        ctx.shadowColor = st.sc;						//阴影色彩
        ctx.font = st.si+"pt no-real-font-123";			//字形
        ctx.fillText(st.str, 0, 0);						//字符串内容，从画笔当前位置开始写
        ctx.rotate(-Math.PI * st.rA);					//画笔的角度转回来
        ctx.translate(-st.rX,-st.rY);					//然后画笔位置清零
    }

    for (var k = 0; k < challenge.curves.length; k++) {
        var cu = challenge.curves[k];
        ctx.translate(cu.rX, cu.rY);					//画笔位置
        ctx.beginPath();								//绘制路径，类似matlab的hold on
        ctx.lineWidth = cu.width;						//定义线宽
        ctx.strokeStyle = getGradient(ctx,cu.gr,canvas.width); //渐变效果
        ctx.shadowBlur = cu.sb;							//阴影模糊级数
        ctx.shadowColor = cu.sc;						//阴影颜色
        if(cu.points.length == 4){
            ctx.quadraticCurveTo(cu.points[0],cu.points[1],cu.points[2],cu.points[3]);		//绘制二次贝塞尔曲线
        } else {
            ctx.bezierCurveTo(cu.points[0],cu.points[1],cu.points[2],cu.points[3],cu.points[4],cu.points[5]);		//绘制三次贝塞尔曲线
        }
        ctx.stroke();									//绘制图线，类似matlab的hold off
        ctx.translate(-cu.rX,-cu.rY);					//画笔位置清零
    }

    var data = canvas.toDataURL();						//返回包括数据类型，编码格式和具体的文件编码
    //canvas.remove();

    return data;
}

function getGradient(ctx,gr,width){
    var grX = gr.x;				//渐变中心点x坐标
    var grY = gr.y;				//渐变中心点y坐标
    var gradient = ctx.createRadialGradient(grX, grY, 0, grX, grY, width-grY); //渐变
    for (var j = 0; j < gr.colors.length; j++) {
        var color = gr.colors[j];
        gradient.addColorStop(color.pos,color.col);			//插入渐变的颜色
    }
    return gradient;
}