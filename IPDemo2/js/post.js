/**js提交post请求：隐藏请求参数**/
function postDetail(URL, PARAMTERS) {
    //创建form表单
    var temp_form = document.createElement("form");
    temp_form.action = URL;

    temp_form.method = "post";
    temp_form.style.display = "none";
    //添加参数
    for (var item in PARAMTERS) {
      var opt = document.createElement("textarea");
      opt.Hash = PARAMTERS[item].Hash;
      temp_form.appendChild(opt);
    }
    document.body.appendChild(temp_form);
    //提交数据
    temp_form.submit();
  }