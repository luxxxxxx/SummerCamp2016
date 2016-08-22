# 文件上传
**fileReader函数**
<table><tr><td>方法名</td><td>参数</td><td>描述</td></tr><tr><td>readAsBinaryString</td><td>file</td><td>将文件读取为二进制编码
</td></tr><tr><td>readAsText</td><td>file,[encoding]</td><td>将文件读取为文本
</td></tr><tr><td>readAsDataURL</td><td>file</td><td>将文件读取为DataURL
</td></tr></table>

	事件	描述
    onabort	中断
    onerror	出错
    onloadstart	开始
    onprogress	正在读取
    onload	成功读取
    onloadend	读取完成，无论成功失败
    

## 图片上传压缩
	上传图片太大需要时间过长
    利用canvas压缩图片大小
    	var image = new Image();  
            image.src = resultURL;
        image.onload = function(){ 
            //创建一个image对象，给canvas绘制使用  
            var cvs = document.createElement('canvas');  
            var scale = 1;    
            if(this.width > 1000 || this.height > 1000){  
            //1000只是示例，可以根据具体的要求去设定    
                if(this.width > this.height){    
                    scale = 1000 / this.width;  
                }else{    
                    scale = 1000 / this.height;    
                }    
            }  
            cvs.width = this.width*scale;    
            cvs.height = this.height*scale;    
            //计算等比缩小后图片宽高  
            var ctx = cvs.getContext('2d');    
            ctx.drawImage(this, 0, 0, cvs.width, cvs.height);     
            newImageData = cvs.toDataURL(file.type, 0.5); 
## 断点续传
	上传过程中可以暂停和继续。

## 作业
    写一个可以传图片的断点续传
    可以压缩后上传也可以不压缩
    用readAsDataURL方法
    对于样式没要求但要有进度条
    upload.js代码仅供参考无法运行嘿嘿~~
    额，交作业的话，，考核之前把，，