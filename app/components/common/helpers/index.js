import _ from 'lodash'
import $ from 'jquery'

export const _setCookie = function (key, value, timeSet) {
	let timeDefault = 1000 * 60 * 24 * 30 * 365;
	let timeEp = timeSet ? timeSet : timeDefault;
	let expires = new Date();
	expires.setTime(expires.getTime() + timeEp);
	document.cookie =
		key +
		"=" +
		encodeURIComponent(value) +
		";expires=" +
		expires.toUTCString() +
		";path=/";
};

export const _getCookie = function (cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return decodeURIComponent(c.substring(name.length, c.length));
		}
	}
	return "";
};
export const _removeCookie = function (name) {
	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
export const _formatMoney = (num, round = 0, format = '$') => {
	if (num && !_.isNaN(num)) {
		let p = (num.toString()).split(".");
		let result;
		if (round ===0) {
			result = p[0].split("").reverse().reduce(function (acc, num, i, orig) {
				return num ==="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
			}, "")
		}
		result = p[0].split("").reverse().reduce(function (acc, num, i, orig) {
			return num ==="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
		}, "") + "." + (p[1] && p[1].length > 1 ? p[1].substring(0, round) : p[1] && p[1].length ===1 ? p[1] + '0' : '00');
		return (format + result)
	}
	return '0.00'
}
export const getParam = (name) => {
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null) {
		   return null;
		}
		return decodeURI(results[1]) || 0;
	}
	return $.urlParam(name)
}