/**
 * 过滤特殊字符
 */
export function goulv(str) {
	var pattern = new RegExp("[`~!@#$^&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
	var rs = "";
	for (var i = 0; i < str.length; i++) {
		rs = rs + str.substr(i, 1).replace(pattern, '');
	}
	return rs;
}
export function youxiang(value) {
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return  !reg.test(value) ? true:false
}

export function mima(value) {
	let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	return  !reg.test(value) ? true:false
}

export function vscode(value) {
	let reg = /^[a-z0-9]{6}$/;
	console.log(value)
	return  !reg.test(value) ? true:false
}