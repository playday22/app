var user_id = "";
var platform = '';
var div = null;
var inited = false;
var pastedData = "";

var keyboard_hidden = true;

var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.toString());

if(urlParams && urlParams.toString().trim())
{
	user_id = urlParams.get("vk_user_id");
	platform = urlParams.get("vk_platform");
}
else
{
	user_id = 0;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		platform = "mobile";
	}
	else {
		if (iPad()) {
			if(user_id != 0)
				platform = "mobile";
			else
				platform = "ipad";
		}
		else {
			platform = "desktop";
		}
	}
}

function copyToClipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

function pasteFromClipboard() {
	const el = document.createElement('textarea');
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('paste');
	document.body.removeChild(el);

	return pastedData;
}

function get_user_id() {
	 return user_id;
}

function get_width() {
	return document.documentElement.clientWidth;
}

function get_height() {
	return document.documentElement.clientHeight;
}

function init() {
	if (inited){
		return;
	}
	
	document.addEventListener('paste', function (evt) {
		clipdata = evt.clipboardData || window.clipboardData;
		pastedData = clipdata.getData('text/plain');
	});
	
	inited = true;

	div = document.createElement('div');
	div.id = "div_input";
	div.className = 'div_input';
	document.body.appendChild(div);
	div = document.getElementById('div_input');
	
	document.addEventListener("keyup", function(event) {
	  if (event.keyCode == 13) {
			event.preventDefault();
			event.target.blur();
			hide_keyboard();
		}
	});
}

function create_input(name) {
	if (!has_element(name)) {
		div.insertAdjacentHTML('beforeend', `<input type="text" id="${name}"/>`);
	}
}

function create_input_new(name, x, y, width, height, type, maxlength, border) {
	if (!has_element(name)) {
		div.insertAdjacentHTML('beforeend', `<input type="${type}" id="${name}"/>`);
		var input = document.getElementById(`${name}`);
		if (maxlength > 0) {
			input.setAttribute('maxlength', `${maxlength}`)
		}
		input.style.position = 'absolute';
		if (iOS()){
			input.style.webkitBorderRadius = border;
		}
		else
			input.style.borderRadius = border;
		input.style.left = x;
		input.style.top = y;
		input.style.width = width;
		input.style.height = height;
		if(iPad() || platform.includes("desktop")) {
			input.style.fontSize = '17pt';
		}
		else if(iOS()) {
			input.style.fontSize = '17pt';
		}
		else {
			input.style.fontSize = '14px';
		}
	}
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function iPad() {
	return [
    'iPad Simulator',
    'iPad',
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function remove_input(name) {
	if (has_element(name)) {
		div.removeChild(document.getElementById(`${name}`));
	}
}

function set_value(name, value) {
	if (has_element(name)) {
		var input = document.getElementById(`${name}`);
		input.value = value;//String(window.screen.availWidth) + "x" + String(window.screen.availHeight);
		//setCaretPosition(input, value.length);
	}
}

function has_element(name) {
	var input = document.getElementById(`${name}`);
	return typeof input != 'undefined' && input != null;
}

function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  
  // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

function get_value(name) {
	if (has_element(name)) {
		return document.getElementById(`${name}`).value;
	}
	return '';
}

function hide_keyboard(name) {
	keyboard_hidden = true;
	if (has_element(name)) {
		document.getElementById(`${name}`).blur();
	}
}

function show_keyboard(name) {
	keyboard_hidden = false;
	if (has_element(name)) {
		document.getElementById(`${name}`).focus();
	}
}