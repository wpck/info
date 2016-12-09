window.onload=function(){
	var obtn=document.getElementById("onoff");
	var opar=document.getElementById("par")
	var owrap=document.getElementById("wrap");
	var omark=document.getElementById("mark").getElementsByTagName("span")[0];
	var speed=4;
	var timer=null;
	init();	
	obtn.onclick=function(){
		timer=setInterval(movedown,50);
		opar.onclick = function(ev){
	        judge(ev);
	    }
	}	
	//初始化生成4个div
	function init(){
		for(var i=0;i<4;i++){
			createrow();
		}
	}
	//创建指定class名的div
	function creatediv(classname){
		var odiv=document.createElement("div");
		odiv.className=classname;
		return odiv;
	}
	//创建class为row的div，包含三个子div
	function createrow(){
		var row=creatediv("row");
		var arr=createcol();
		for(var i=0;i<3;i++){
			row.appendChild(creatediv(arr[i]));
		}
		if(owrap.firstChild==null){
			owrap.appendChild(row);
		}else{
			owrap.insertBefore(row, owrap.firstChild);
		}
	}
	//删除一个row节点
	function delrow(){
        if(owrap.childNodes.length == 5) {
        	owrap.removeChild(owrap.lastChild);
        }
    } 
	//创建一个类名数组
	function createcol(){
		var ran=['col','col','col'];
		var i=Math.floor(Math.random()*3);
		ran[i]="col b";
		return ran;
	}

	//让黑块向下移动
	function movedown(){
		var top=parseInt(getStyle(owrap,"top"));
		if(speed + top > 0){
            top = 0;
        }else{
            top += speed;
        }            
        owrap.style.top = top + 'px';
        if(top == 0){
            delrow();
            createrow();
            owrap.style.top="-100px";            
        }else if(top == (-100 + speed)){
            var rows = owrap.children;
            if((rows.length == 5) && (!rows[rows.length-1].pass) ){
                end();
            }
        }

	}
	function end(){
        clearInterval(timer);
        alert("游戏结束,你得了"+omark.innerHTML+"分！");
    }

    //计算分数
    function mark(){
    	omark.innerHTML=parseInt(omark.innerHTML)+1;
    	if(omark.innerHTML%6==0){
    		speed+=2;
    	}
    }

	//获取样式的函数
	function getStyle(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	}

	//判断是否点击到了黑块,点到了让其变成白色
	function judge(ev){
		if(ev.target.className.indexOf("b")==-1){
			ev.target.parentNode.pass=false;
		}else{
			ev.target.className="col";
			ev.target.parentNode.pass=true;
			mark();
			//点击到了黑块，该行属性pass为true
		}
	}
}