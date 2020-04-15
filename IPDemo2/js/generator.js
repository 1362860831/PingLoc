/*****************************
 *     Generator limits      *
 * ***************************/

var maxGradientPoints = 100;
var minStrings = 10;
var maxStrings = 50;
var minStringLength = 3;
var maxStringLength = 10;
var minSize = 30;
var maxSize = 78;
var minCurves = 1;
var maxCurves = 10;
var minCurveWidth = 2;
var maxCurveWidth = 10;
var minCurveXY = -200;
var maxCurveXY = 200;
var minShadowBlur = 0;
var maxShadowBlur = 50;
var canvasWidth = 1900;
var canvasHeight = 300;


/*****************************
 *    Generator functions    *
 * ***************************/

function getRandomColor() {
    var letters = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;	//生成了一个6位的十六进制色彩,以'#'开头，例如#66ccff
}

function getRandomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';	//短路原理设定字符集
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPos = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPos,randomPos+1);	//生成给定长度的随机字符串，保存在randomString中
    }
    return randomString;
}

function getRandomInt(min,max) {//Min and max included
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNbStrings(){
    return getRandomInt(minStrings,maxStrings);
}

function getRandomStringLength(){
    return getRandomInt(minStringLength,maxStringLength);
}

function getRandomSize(){
    return getRandomInt(minSize,maxSize);
}

function getRandomNbGradientPoints(){
    return getRandomInt(0,maxGradientPoints-2);
}

function getRandomShadowBlur(){
    return getRandomInt(minShadowBlur,maxShadowBlur);
}

function getRandomCurveWidth(){
    return getRandomInt(minCurveWidth,maxCurveWidth);
}

function getRandomNbCurves(){
    return getRandomInt(minCurves,maxCurves);
}

function getRandomCurvePoints(){
    var points = [];
    for(var i=0; i<4;i++){
        points.push(getRandomInt(minCurveXY,maxCurveXY));
    }

    //if quadratic curve is chosen,
    //generate two more points
    if(Math.random()>0.5){
        points.push(getRandomInt(minCurveXY,maxCurveXY));
        points.push(getRandomInt(minCurveXY,maxCurveXY));
    }
	//这里只有四个点或六个点的原因是，为了绘制尽可能复杂的曲线，作者调用了canvas的二次和三次贝塞尔曲线，前者参数四个点，后者六个点
    return points;
}

function randomX(){
    return Math.floor(Math.random() * canvasWidth);
}

function randomY(){
    return Math.floor(Math.random() * canvasHeight);
}

function getRandomRadialGradient(){

    //Center of the gradient
    var rX = randomX();  //between 0 and canvasWidth
    var rY = randomY(); //between 0 and canvasHeight

    //Generation of the colors
    var colors = [];
    colors.push({pos: "0", col: getRandomColor()});
    colors.push({pos: "1", col: getRandomColor()});
    var nbRandomPoints = getRandomNbGradientPoints();	//这里生成了随机的着色点，描述了一共有多少种色彩
    for(var i=0; i<nbRandomPoints; i++){
        colors.push({pos: Math.random().toString(), col: getRandomColor()});	//着色点的结构包括色彩所在的位置和随机颜色，这里的pos是0-1的随机数，表示的是颜色发生转变开始的位置
    }

    return { x:rX , y:rY, colors: colors};
}


/*****************************
 *    Challenge generation   *
 * ***************************/
//Generation of random parameters
function generateChallenge(){

    var glyphs = [];
    var nbGlyphs = getRandomNbStrings();		//生成随机数量的字符串
    for(var j=0; j<nbGlyphs; j++){				//这里是对每一个字符串的处理
        var str = getRandomString(getRandomStringLength());		//生成随机长度的随机字符串
        var size = getRandomSize();								//生成字符随机大小
        var rX = randomX(); //Random X
        var rY = randomY(); //Random Y
        var rAngle = Math.floor(Math.random() * 360) / 360; //Random rotation
        var gr =  getRandomRadialGradient();					//随机的渐变效果，这里的返回值是一个结构体，含有渐变的中心坐标和色彩信息，注意的是这里是一个渲染效果，是在画布的某一个位置的中心渐变在当前字符串上的表现
        var sb = getRandomShadowBlur();							//随机的阴影模糊级数
        var sc = getRandomColor();								//生成随机阴影色彩
        glyphs.push({str:str,si:size,rX:rX,rY:rY,rA:rAngle,gr:gr,sb:sb,sc:sc});	//将字符串的设定保存起来
    }

    var curves = [];
    var nbCurves = getRandomNbCurves();			//生成随机数量的曲线
    for(var k=0; k<nbCurves; k++){				//这里是对每一个曲线的处理
        var rX = randomX(); //Random X
        var rY = randomY(); //Random Y
        var points = getRandomCurvePoints(); //Return 4 or 6 points depending on the curve
        var width = getRandomCurveWidth(); //线宽
        var gr =  getRandomRadialGradient(); //渐变效果
        var sb = getRandomShadowBlur(); //阴影模糊级数
        var sc = getRandomColor(); //阴影色彩
        curves.push({rX:rX,rY:rY,points:points,width:width,gr:gr,sb:sb,sc:sc});	//将曲线的设定保存起来
    }

    return {"glyphs": glyphs, "curves": curves};
}