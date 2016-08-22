$(function () {
			var file,  
				partSize = 1024 * 2, // 每一段的大小
				currentPosition = 0, // 当前位置
				pause = false;       // 是否暂停
			$('#file').change(function() {
				file = this.files[0];
				$('.help-block').text('文件 '+file.name+' 的长度：'+file.size+' 字节')
				$('button[name=start]').prop('disabled', false);
			});
			$('button[name=start]').on('click', function(){
				$('button[name=pause], .progress').removeClass('hide');
				$.get('countsize.php?filename=' + encodeURIComponent(file.name), function (response) {
					currentPosition = response[file.name.replace(/\.\w+$/, '')];
					if (currentPosition == 0) {
						showProgress(currentPosition, file.size);
						upload(file);
					} else if (currentPosition == file.size) {
						$('button[name=pause], .progress').addClass('hide');
						alert('此文件已经上传完成!');
					} else if (currentPosition < file.size) {
						alert('此文件已经上传了' + Math.floor((currentPosition / file.size) * 100) + '%, 现在将继续上传!');
						$('.progress-bar').width(currentPosition / file.size * 100 + '%');
						showProgress(currentPosition, file.size);
						upload(file);
					}
				}, 'json');
			});
			$('button[name=pause]').on('click', function() {
				var self = $(this);
				if (pause) {
					self.text('暂停');
					upload(file);
				} else {
					self.text('继续');
				}
				pause = !pause;
			});
			function upload(file) {
				var formData = new FormData();
					formData.append("fileName", encodeURIComponent(file.name));
					formData.append("filePart", file.slice(currentPosition, currentPosition + partSize));
			    $.ajax({
			        type: 'POST',
			        url: 'upload.php',
			        data: formData,
			        contentType: false, // 
			        processData: false, // 
					// 设置 xhr 对象，增加 onprogress 事件
					xhr: function() {
						var xhr = $.ajaxSettings.xhr();
						xhr.upload.onprogress = function (event) {
							showProgress(currentPosition + event.loaded, file.size);
						}
						return xhr
					},
					success: function () {
						// 每上传完一部分就改变当前位置
						currentPosition += partSize;
						if (currentPosition < file.size) {
							if (!pause) {
								setTimeout(function () {
									upload(file);
								}, 300);
							}
						} else {
							$('button[name=pause], .progress-bar').addClass('hide')
							alert('上传结束');
						}
					},
					error: function () {
						alert('上传错误');
					}
			    });
			}
			function showProgress(start, filesize) {
				$('.progress-bar').width(currentPosition / filesize * 100 + '%')
			}
			});