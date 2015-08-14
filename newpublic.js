/**
 * 
 * @authors wangzhenpeng(814263832@qq.com)
 * @date    2015-08-11 10:43:40
 * @version $0.1$
 * @description [utils method]
 * 
 */
var public={};
var public.utils={}; 
var public.tools={};
var public.Math={};
var public.other={};
var public.date={};
/**
 * 模板替换方法
 */
public.utils={
	/**
	 * [temp 字符串替换函数 ]
	 * @param  {[string]} string [字符串模板]
	 * @param  {[obj or array]} data   [数据]
	 * @return {[string]}        [返回替换后的字符串]
	 */
      temp:function(string,data){
		function replate(string,obj){
		            return  string.replace(/\$\w+\$/gi, function (matchs) {
		                var returns = obj[matchs.replace(/\$/g, "")];
		                return (returns + "") == "undefined" ? "" : returns;
		            })
		        }
		        var html="";
		        switch (public.tools.typeOf(data)){
		            case "object":
		                html=replate(string,data);
		                break;
		            case "array":
		                var length=data.length;
		                for(var i= 0;i<length;i++){
		                    html+=replate(string,data[i]);
		                }
		                break;
		            default:
		                html="";
		        }
		        return html;
      },
      /**
       * [loadOnDemand 按需加载]
       * @param  {[type]} option [配置参数]
       * @return {[type]}        [无]
       */
      loadOnDemand:function(option){
          var option=option||{};
          var $root=$(option.root);
          var fn=option.fn;
          var hght=0;
          var top=0;
        $root.on("scroll",function(){
            hght=this.scrollHeight-$(this).height();
            top=this.scrollTop;
        })
        function observe(){
            if(top>parseInt(hght/3)*2){
                if(fn){
                    fn();
                }
                hght=0;
                top=0;
            }
        }
        setInterval(observe,2000)
      }
};

public.tools={
    /**
     * [判断类型函数]
     * @param  {[type]} obj [description]
     * @return {[string number array object boolean function undefined null]}     [返回的类型]
     */
   typeOf:funtion(obj){
 	return Object.prototype.toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();
   }
};
public.Math={
	/**
	 * [newtoFixed 数字保留几位小数]
	 * @param  {[number]} num [要操作的数字]
	 * @param  {[numbe} s   [保留的位数]
	 * @return {[string]}     [s位数字字符串]
	 */
	newtoFixed:function(num,s){
		 var s=s||2;
		            if(!num){
		                return null;
		            }
		            var num=parseFloat(num);
		            var s=s||2;
		            var  changenum=(parseInt(num * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
		            var   index=changenum.indexOf(".");
		            if(index<0&&s>0){
		                changenum=changenum+".";
		                for(i=0;i<s;i++){
		                    changenum=changenum+"0";
		                }
		            }else {
		                index=changenum.length-index;
		                for(i=0;i<(s-index)+1;i++){
		                    changenum=changenum+"0";
		                }

		            }

		            return changenum;
			}
};
public.other={
       windowToOpen:function(){
            // 一个函数中如果有ajax 根据回调的结果来判断是否进行跳转window.open 解决浏览器拦截的方法
            // window.open要写在事件函数中 避免浏览器拦截
           var success=false;
           $.ajax({
           	url:url,
           	data:null,
           	type:"post",
           	success:function(result){
           		if(result.success){
           			success=true;
           		}
           	}
           })
             setTimeout(function(){
             if(success){
                window.open(BUYER_BASE_URL+"/companyAttachment/collectionData");
           }   
         },100);
       }
};
public.date={
	// 一个日期从1号到现在的周数.
	/**
	 * [weekOfYear 计算日期在一年中是第几周]
	 * @param  {[Date]} adate
	 * @return {[int]} 周数
	 */
	weekOfYear: function(adate) {
		var weekofyear1 = 0
		d = adate,
			myYear = d.getFullYear(),
			firstDate = new Date(myYear, 0, 1),
			dayofyear = 0;
		for (var i = 0; i < d.getMonth(); i++) {
			switch (i) {
				case 0:
				case 2:
				case 4:
				case 6:
				case 7:
				case 9:
					dayofyear += 31;
					break;
				case 1:
					if (public.isLeapYear(myYear)) {
						dayofyear += 29;
					} else {
						dayofyear += 28;
					}
					break;
				case 3:
				case 5:
				case 8:
				case 10:
					dayofyear += 30;
					break;
			}
		}
		dayofyear += d.getDate();
		var firstweek = 7 - (firstDate.getDay() == 0 ? 7 : firstDate.getDay()) + 2; //第二周的开始时间
		var day = d.getDay() == 0 ? 7 : d.getDay();
		var endweek = dayofyear - (day + 1) + 1 + 1; //完整的倒第一周开始的时间

		if (dayofyear < firstweek) {
			weekofyear1 = 1;
		} else {

			if (dayofyear < firstweek + 7) {
				weekofyear1 = 2;
			} else {
				weekofyear1 = Math.floor(((endweek - firstweek) / 7)) + 2;
			}
		}
		return weekofyear1;
	},
	/**
	 * [isLeapYear 判断年份是否是闰年]
	 * @param  {[number]}  year [description]
	 * @return {Boolean}      [description]
	 */
	isLeapYear: function(year) {
		return (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)));
	}
}


