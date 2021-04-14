var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iPad: function () {
        //return false;
        return navigator.platform.match(/iPad/i);
    },
    iPhone: function () {
        //return navigator.platform.match(/iPad/i);
        return navigator.platform.match(/MacIntel|iPhone/i) && (navigator.maxTouchPoints ? navigator.maxTouchPoints : 0 > 0);
    },
    iPadPhone: function () {
        //return navigator.platform.match(/iPad/i);
        return navigator.platform.match(/MacIntel|iPhone/i) && (navigator.maxTouchPoints ? navigator.maxTouchPoints : 0 > 0) || navigator.platform.match(/iPad/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    IE: function () {
        return navigator.userAgent.toUpperCase().indexOf("TRIDENT/") != -1 || navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iPad() || isMobile.iPhone() || isMobile.Opera() || isMobile.Windows());
    }
};

var who_full = {};
var mobil_platform = 0, mobil_screen = { innerWidth: window.innerWidth, innerHeight: window.innerHeight }
    , mobil_first_touch = 0;
if (isMobile.any()) {
    mobil_platform = 1;
    //if (isMobile.iPadPhone()) {
    //    var meta = document.querySelector('[name="viewport"]');
    //    if (!meta) document.head.innerHTML += '<meta name="viewport" />';
    //}
}
var asksoft_event = {
    mousedown: mobil_platform ? 'touchstart' : 'mousedown'
    , mouseup: mobil_platform ? 'touchend' : 'mouseup'
    , mousemove: mobil_platform ? 'touchmove' : 'mousemove'
    , click: mobil_platform ? 'touchend' : 'click'
}


function body_resize() {
	if (document.body.offsetWidth < 1440) {
		//document.getElementById('xx').innerHTML = document.body.offsetWidth;
		//var sz = (document.body.offsetWidth > 1200 ? 10 : (document.body.offsetWidth / 1000 * 27)).toFixed(4); // 26.5
		//var sz = (document.body.offsetWidth > 1200 ? 10 : (document.body.offsetWidth / 1000 * 7)).toFixed(4); // 26.5
		var sz = (document.body.offsetWidth > 1440 ? 10 : (document.body.offsetWidth / 1000 * 7)).toFixed(4); // 26.5
		document.body.setAttribute('sz', sz);
		document.body.style.fontSize = sz + 'px';
		//console.log('width: ' + document.body.offsetWidth + '\tfont: ' + document.body.style.fontSize);
	}
}

var arr_button = [];
var str_button = '<div sid="{SID}" class="button-click">'
	+ '<div name="b-1" class="block l-164 ln-47"><span class="f-18">{NAME}</span></div>'
	+ '<div name="b-2" class="block l-164 ln-24"><span class="f-18" style="white-space: normal;">{TEXT}</span></div>'
	+ '<div name="b-3" class="block l-164 ln-24 f-bold"><span class="f-18">������� �����!</div>'
	+ '<div name="b-4" e-name="button-cl" class="b-click"><div class="b-centor"><span class="f-18">��������</span></div></div>'
	+ '<div name="b-5" class="b-img" style="{IMG}"></div>'
	+ '</div>';
function site_loading() {
	var el = document.querySelector('.what-u-feel');
	var str_html = '<div e-name="mouse-check" mouse-check="{I}" class="what-u-el" style="background: {BACK};">'
		+ '<div name="b-1" class="mouse-check">'
		+ '<div name="b-11" class="block l-162 ln-90"><span class="f-65 u">{TEXT}</span></div>'
		+ '</div>'
		+ '</div>';
	var str_el = '���������:#FFEC00:�� ����� ��������� ����� ����� ������ �� ������� ������, ����������� ������� �� �����, � ����� �� �������� ������������.<br /><br />�� �������, ��� ����� ���� ������ ������ � ������� ����� ��������������� ��������� �� ���������� ���������.;'
		+ '�������� � ����������:#FFE00E:�����, ������������ ���������, ���������� �������, ��������, �������� ����� ����������������� � ��������� � ����������.<br /><br />������ �� � ������� �������� � ���� ����� � ������� ����� ��������������� ���������.;'
		+ '�����������:#FFD41D:����� �������, ��� ������� � ���������� ���������� ��� �� ��������? ��������� ��������� ���������?<br /><br />���������� ���� ��������������� ���������, ����� ����� ������� ������������� � �������� �������� �����.;'
		+ '�����������:#FFCB11:�������� ������� ���� ����� ����� ����� ������� ���� ��������, ���������, ����������.<br /><br />�������� ���� �����, ������� �� ���������� � ���������� �� ����������� ����� � ������� ����������� ��������������� ���������.;'
		+ '�������������:#FFBC3A:������ ���, ��� ����� �� ���������, � ������������� � ����� �� ���� ����������� �������. � ��������� �������������.<br /><br />���������� �� ����� �������, ��������� �� ����� ��-������ ������� �������������� ��������������� ���������.;'
		+ '������� �������������:#ffb048:��� ������� ������������� ������������� � ����� ��� ������������� �������� �������� ������� ����� � ����.<br /><br />������ ��� ��������, ����� ����������� ����� � ������� ��������������� ���������, ������� ��������������� �������������.;'
		+ '�����:#ffa457:����� ����� ���������� �������� �������� � ���������, ������ ��� ����������, �������� ����������� �� ������� �������.<br /><br />���������� �� ������ � ������� ����������� � ���� ����� � ������� ����� ��������������� ���������.;'
		+ '�������:#ff9865:���������������� ����� �������� � �������� ��������� �����, ���������� ������������ �� ��������. ������ ���������� ����������� ��������� � ��� ������.<br /><br />�������, ��� ���������� �� ��� � ������� ����� ��������������� ���������.;'
		+ '��������� � �����:#ff8c74:����������� �� ������� �������, ������ ���������, ���������� ����� � �������� - �������� ��������, ������� ����� ������ ���������������.<br /><br />������� ��� ����� � ������� ����� ��������������� ���������.;'
		+ '������:#ff866a:��� ������ ������� ������� �����������, ��������� ������� � ������� � ������� ����������, ����������� ���������� � ������.<br /><br />�������, ��� ������� ���� � ����� � ������� ����� ��������������� ���������.;'
		+ '�����:#ff815c:������ ���, ��� ����� ����������� �� �������, � ����� ������ ������� �� ��������� ����������. ��-�� ����� ���������� �������� �� ������ � � �����.<br /><br />�������, ��� ����� ��������� � ������� �������������� ��������������� ���������.;'
		+ '���������� ���������:#ff7c4d:������ ��������� ��� �� ������ ���������� ������ ��������� ������������ ����� � �������� �������� �����.<br /><br />�����, ��� �������� ���� � �������� ��������� � ������� ����� ��������������� ���������.;'
		+ '��������� ���:#ff773f:��� ���������� ��� ������� ��������� ���� �������� � ��������, � ���� ��������� ������������, ���������� �����������������.<br /><br />�������������� ��������������� ��������� ������� �������� ��� � ��������������.;'
		+ '��������:#ff7231:��-�� �������� ������� ����� ��������� �� ����� �������, � ����� ���������� ������� ����.<br /><br />���������� � ��������� ������� ��������������� ���������, ������������� ���������� ��� ���.;'
		+ '������ �����:#ff6d22:�������� � ������ ����� �������� � �������� ����������, ������� ���������� � ��������������.<br /><br />������ �� � ��������� ������� ��������� ����� � ������� ����� ��������������� ���������.;'
		+ '���������:#ff6914:��-�� ��������� ����� ��� ������� �� ���, ��������� ���������� �����������, ���������� ������ � ���. ��� ��� �������� �� ����� � �������� � �����������.<br /><br />������� ��������� ������� ������� ���� ��������������� ���������.;'
		+ '������������� � ����:#ff6406:������������� � ���� ��������� � �������� �������� ����������, ���������������. �� �� ����� � ���� �����������, ������������ �� ����������.<br /><br />�������� ���������� ������� ����������� ��������������� ���������.;'
		+ '������ ������ �����:#fd6006:������ ������ ����� ����� �������� � ������, ��������� ��� ��������.<br /><br />����� ���� ����� ����� ������ ������� �������������� ��������������� ���������.;'
		+ '��������� �� ������:#fb5e0d:��������� �� ������ �������� � ����������, ������������������� ����� ������������� � ������ � �����.<br /><br />������ �� ��� ������ ������ ������� ��������������� ���������, ������� ��������������� ��� ������� �������������.;'
		+ '������ ���:#f85b15:��-�� ������� ���� �������� ����������, ���������� �������� � ������ �����, ��������� ��������� �����������. ������� ����� �������� � ��� ������� ����.<br /><br />������ ���������� ����������� ��������������� ���������.;'
		+ '��������� � �������:#f5591c:��������� � ������� ������ ������������� ���������� ����� � ������� �������.<br /><br />���������� �� ���, ����� ���������������� � ��������� � ���� ����� � ������� ����� ��������������� ���������.;'
		+ '������:#f25724:���� ���������� ������ - ��� ������ ��������. ���� �������� �� - ��������� ��������� � �����������.<br /><br />���������� � ���� ���������� �������� ��� ����������� ��� ��������� � ��������� ������� �������������� ��������������� ���������.;'
		+ '�������� ����:#f0542b:�������� � ��������� ���� ����� � �������������������� ������, �������� �� ��������, ����������, ���������� � ����������.<br /><br />��������� ��������� ����, ������� ���������� �������� ������� ���� ��������������� ���������.;'
		+ '�����:#ed5233:����� �������� � ���������� ����������� � ������������ ���������. ������ ��������� ����� � ��������, �� �� ����� ����� �� ��������� ���������.<br /><br />�������, ��� � ���� ���������� � ������� ����������� ��������������� ���������.;'
		+ '������:#ea4f3a:��-�� ������� ������� ������� ������ �������, ������� � ���� ��������� ����������������� � ������������, ���������� ������������ � ���������� ���������.<br /><br />�������, ��� �������� �� �������� � ������� ����� ��������������� ���������.;'
		+ '�����������:#db4d47:����� ������� � ���������� ������ ������ �������� ����������, ���������� ��������� � �����������������.<br /><br />�������, ��� ��������� ����������������� � ��������� ����������. ����������� ���� ��������������� ���������.;'
		+ '��������������:#be4b58:��������� � ��������������� ������ �� ���������� � ������� ����������������� ������.<br /><br />� ������� ����������� ��������������� ��������� �� �������, ��� ����� ����.;'
		+ '��������������:#a24969:������������ ������� �� ��������� ���������� ���, � ������ ������ �� �����, �� ������� �������� � ������� � ������������ �����.<br /><br />���������� � ���� ��������� ������� ������������ ��������������� ���������.;'
		+ '������:#85487a:�������� ������ ��� ������ �� ���������� �������� � ���������� � ������� � �� ������, ������� �������� �����.<br /><br />�������, ��� ������ ��� �������� � ������� �������������� ��������������� ���������.;'
		+ '����� ����:#69468b:����� ���� ����� ������������ ������� ����������������, ������, �������������, �������� � �����������.<br /><br />�������, ��� ������ ����������������� � ������� ����� ��������������� ���������.;'
		+ '����������:#4c449c:�������� ������ ��� ������ �� ���������� �������� � ���������� � ������� � �� ������, ������� �������� �����.<br /><br />�������, ��� ������ ��� �������� � ������� �������������� ��������������� ���������.;'
		+ '���������:#3042ad:������ ��������� ���� �������, ������� � ���������. ��� ������� ������������ �� ����� ������������ � ������ ����� ������.<br /><br />�������, ��� ������� ��������� �������� � �������� ���� � ������� ����������� ��������������� ���������.;'
		+ '����������:#1340bf:�������� ������������� �������� � ������� ����������, �����������, ���������, ������� ������������, �������� ������.<br /><br />�������, ��� ������� ����������� � ��������� ������������� � ������� ����� ��������������� ���������.;'
		+ '��������:#0044ca:����������� ����������� ����� � ������������, ��������� � ����� � �� ������. �������� �������� ���������� �������� �����������.<br /><br />�������, ��� �������� �������� ����������� � ������� �������������� ��������������� ���������.;'
		+ '�����������:#0052ca:����������� ����� �������� ������, �������� � �����������, ������� ����, ������������� � ���������.<br /><br />���������� � ����������� �������� � ������������� � ����� ���������� ������� ����������� ��������������� ���������.;'
		+ '������:#0060c9:������ �������� ������� ������. � �� ������ ����������. ��������, ���� ������ ����� �� �������� ����������� ��� ����� ���� ����������.<br /><br />������ �������� � ������ ����� ������� ���� ��������������� ���������.;'
		+ '������� ����:#006ec9:������� ���� ����� �������� �������, �������� ����������, ������� �������� �����.<br /><br />���� ��������������� ���������, ������� ��������������� ��� ������� �������� �������������, ������� ���������� �� ����� ������������ �������.;'
		+ '������:#007dc9:��� ������ ������� ����� ���������� ������� ����, ��������, ������� ���� � ���� ����� �� ���������.<br /><br />�������� ������� ������� ������� ����������� ��������������� ���������.;'
		+ '���������:#008bc9:��������� �������� � ����� ����� �������������� ���������� ������������� ����������, ���������� ������������, ���������� ���.<br /><br />�������, ��� ���������� � ����� ���������� ��� ����������� � ������� ����� ��������������� ���������.;'
		+ '�������:#0099c8:������� ��� ������ ����� �������� � ����, ��� ������ �������� ������ ����������� � ����. ��� ��� ����� ���������� ���������.<br /><br />�������, ��� �������� � ��������� � ������� ����� ��������������� ���������.;'
		+ '�������:#00a7c8:��������� � ����������� ������� �������� � ��������� � �����������, ������������������� ����������� ������.<br /><br />���� ��������������� ��������� ������ ��� ���������� ������ � ��������� ����� �� ��������� ��������.;'
		+ '��������:#00b3c6:����� ������� ������ � ��������� � ���� - ������� ���. ��� ���������� ���� � ����������, ������ ����������, � ������ �������� ���� ��������.<br /><br />�������, ��� �������� ������ ��� ����������� � ������� ����� ��������������� ���������.;'
		+ '����� ����� ����������:#01b6b8:����� ����� ���������� ����� ��������� � �����������, �������, ������� ����������������.<br /><br />���������� � ���� � �������� �������� ������� ������� ���� ��������������� ���������.;'
		+ '������ ����������:#01b9aa:��-�� ������ ���������� ���������� �����������, �������� �����������, ����� ���������� � ���������� �� ��������.<br /><br />����������� ��������������� ��������� ������� ������� ����������� � ���� � �������� �������� �����.;';
	var arr = str_el.split(';');
	var str_html_in = '';
	var e = [];
	for (var i = 0; i < arr.length - 1; i++) {
		e = arr[i].split(':');
		str_html_in += str_html.replace('{TEXT}', e[0]).replace('{BACK}', e[1]).replace('{I}', 'v-' + i);
		arr_button.push(e.length > 2 ? e[2] : ''); 
	}
	el.innerHTML = str_html_in
		+ '<div class="what-u-el" style="background: #02bc9c;">'
			+ '<div class="page-button" e-name="next-page-start"></div>'
            + '<div e-name="what-u-button" class="what-u-button"><span>�� ���� ������.</span>'
                + '<span>�������� ����������� � ����!</span></div>'
        + '</div>';

	//command
	el = document.querySelector('.comand [name="b-52"]');
	str_html = '<div class="who"><div class="who-el-1 block f-semibold"><span>{NAME}</span></div><div class="who-el-2 block"><span>{COMP}</span></div></div>';
	str_el = '���� ������:(����������� ������ ������ ������ (UNSW));'
		+ '���� ��� �������:(��������� ����������� ��������������� - (���));'
		+ '����� �����:(�������� ��������������� ����� � ��������);'
		+ '���� ������:(������������� ������� �������� ������);'
		+ '�������� ������:(����������� ��������);'
		+ '��� �������:(��������� ����������� ��������������� - (���));'
		+ '������ ��������:(������, �����);'
		+ '������ ����:(�ommon Threads Project, ���);'
		+ '��� ���������:(������������� ��������� �����������);'
		+ '������� ������-�������:(�����, ���);'
		+ '������ ����:(��������� ����������� ��������������� - (���);'
		+ '������� ������-������:(��������� ����������� ��������������� - (���);'
		+ '������ ������:(����������� ������������);'
		+ '���� ������:(����������� �����);'
		+ '���� �����:(��������� ����������� ��������������� - (���);'
		+ '���� �����:(����������� ����� ������������� ��������);'
		+ '����� ���������:(��������� ����������� ��������������� - (���);'
		+ '����� ��������:(������������� ��������� �����������);'
		+ '���� ������:(���������, ����������);'
		+ '������ �����:(����������� �����������);'
		+ '����� ������:(������, ������);'
		+ '����� ������:(����������� ������ ��������);'
		+ '��������� ����� �� ����:(��������� ����������� ��������������� - (���);'
		+ '����� �������:(����, �����������);'
		+ '���� ������:(����������� ���������);'
		+ '������ �����:(World Vision International);'
		+ '������ �����������:(���������� ���������� ��������� �� ������ � ����������� (����));'
		+ '����� ������:(��������� ����������� ��������������� - (���);'
		+ '����� ����������:(������������� ��������� �����������);'
		+ '������ �����:(����������� ���-�����);'
		+ '����� ���:(����������� ������ ��������);'
		+ '����� �����������:(���������� ���������� ��������� �� ������ � ����������� (����));'
		+ '������ �������:(������������ �����������);'
		+ '���� ���������:(������������� ����������� ������);'
		+ '������ ������:(������, ���������);'
		+ '���� �����:(��������� ����������� ��������������� - (���));'
		+ '���� ��:(����������� ������� �������);'
		+ '��� ������:(����������� ����� ���������);';

	arr = str_el.split(';');
	str_html_in = '';
	e = [];
	for (var i = 0; i < arr.length - 1; i++) {
		e = arr[i].split(':');
		str_html_in += str_html.replace('{NAME}', e[0]).replace('{COMP}', e[1]);
	}
	el.innerHTML += ''
		+ str_html_in
		//+ '<div class="page-next who-full"><p>������ �������������� ������</p></div>'
		+ '';

	
	elements_events(document.querySelector('.ws'));
}

function menu_animation(e) {
	var el = document.querySelector('.header-burger');
	var e1 = document.querySelector('.header-burger span:nth-child(1)');
	var e2 = document.querySelector('.header-burger span:nth-child(2)');
	var e3 = document.querySelector('.header-burger span:nth-child(3)');
	var e4 = document.querySelector('.header-burger span:nth-child(4)');
	var menu = document.querySelector('.menu');
	if (el.getAttribute('start') == '1') {
		el.setAttribute('start', '0');
		e1.style.transform = '';
		e1.style.marginTop = '';
		e2.style.width = '';
		e3.style.width = '';
		e4.style.transform = '';
		e4.style.marginTop = '';
		menu.style.width = '';
		menu.style.marginLeft = '';
	} else {
		el.setAttribute('start', '1');
		e1.style.transform = 'rotate(45deg)';
		e1.style.marginTop = '1.00em';
		e2.style.width = '0';
		e3.style.width = '0';
		e4.style.transform = 'rotate(-45deg)';
		e4.style.marginTop = '1.00em';
		menu.style.width = '40.9em';
		menu.style.marginLeft = '88.4em';
		menu.classList.remove('blur');
		setTimeout(function (x) {
			x.classList.add('blur');
		}, 100, menu);
	}
	ws_scroll();
}



function elements_events(e) {
	//console.log('el:' + e);
	if (e.getAttribute('e-name').substr(0, 9) == 'next-page') {
		location.href = '#' + e.getAttribute('e-name').substr(10);
	}
	else if (e.getAttribute('e-name').substr(0, 9) == 'ws') {
		//console.log('e:', e);
		ws_scroll();
	}
}

function ws_position(e) {
	var v = e.getAttribute('start');
	var elg = e.querySelector('[name="b-ws-green"]');
	var elw = e.querySelector('[name="b-ws-white"]');
	if (v == '1') {
		e.style.marginTop = '';
		setTimeout(function (x, xg, xw, xv) { 
			if (document.querySelector('.header-burger').getAttribute('start') == '1') {
				x.style.WebkitAnimation = x.style.animation = 'move-right .5s ease-in-out 0s 1 normal forwards';
				xg.style.WebkitAnimation = xg.style.animation = 'opacity-in .5s ease-in-out 0s 1 normal forwards';
				xw.style.WebkitAnimation = xw.style.animation = 'opacity-out .5s ease-in-out 0s 1 normal forwards';
			} else {
				x.style.WebkitAnimation = x.style.animation = 'move-left .5s ease-in-out 0s 1 normal forwards';
				xg.style.WebkitAnimation = xg.style.animation = 'opacity-out .5s ease-in-out 0s 1 normal forwards';
				xw.style.WebkitAnimation = xw.style.animation = 'opacity-in .5s ease-in-out 0s 1 normal forwards';
			}
			x.style.boxShadow = '';
			if (window.pageYOffset) {
				x.style.marginTop = ((screen.height - (screen.height / 2.5)) / 10) + 'em'; 
			} else {
				x.style.marginTop = '';
			}
		}, 500, e, elg, elw, v);
	} else {
		e.style.WebkitAnimation = e.style.animation = 'move-right .5s ease-in-out 0s 1 normal forwards';
		elg.style.WebkitAnimation = elg.style.animation = 'opacity-in .5s ease-in-out 0s 1 normal forwards';
		elw.style.WebkitAnimation = elw.style.animation = 'opacity-out .5s ease-in-out 0s 1 normal forwards';
		setTimeout(function (x, xv) { 
			x.style.boxShadow = '0 0 0 #fff';
			if (window.pageYOffset) {
				x.style.marginTop = ((screen.height - (screen.height / 2.5)) / 10) + 'em'; 
			} else {
				x.style.marginTop = '';
			}
		}, 300, e, v);
	}
}

function ws_scroll() {
	var e  = document.querySelector('.ws');
	if (window.pageYOffset) {
		e.setAttribute('start', '0');
		ws_position(e);
	} else {
		e.setAttribute('start', '1');
		ws_position(e);
	}

	//var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if (who_full.ln) {
		var fl = who_full.full.getBoundingClientRect();
		var curr = fl.top - window.innerHeight;
		var curr_who = who_full.ln * document.body.getAttribute('sz');
		if (isMobile.IE()) {
			if (curr < 0 && curr_who + curr > -100) {
				//console_log('full: ' + curr + ' + ' + curr_who + ' = ' + (curr_who + curr));
				who_full.who.style.position = 'fixed';
				who_full.who.style.top = (window.innerHeight - (6 * document.body.getAttribute('sz'))) + 'px';
			} else {
				who_full.who.style.position = 'absolute';
				who_full.who.style.top = (curr_who + 80) + 'px';
			}
		}
		if (curr < 0 && curr_who + curr > -100) {
			//console_log('full: ' + curr + ' + ' + curr_who + ' = ' + (curr_who + curr));
				who_full.who.style.top = (window.innerHeight - (6 * document.body.getAttribute('sz'))) + 'px';
		}
	}
}

function asksoft_down(el) {
	if (check_right_click(el)) return;
	var e = check_element(el.target);
	if (e.getAttribute) {
		var s = e.getAttribute('e-name');
		if (s == 'mouse-check') {
			var elv = mobil_platform ? el.targetTouches[0] : el;
			document.body.setAttribute('start-n', e.getAttribute('mouse-check'));
			document.body.setAttribute('start-v', elv.pageX);
			document.body.setAttribute('move-v', elv.pageX);
			//console_log('start:' + e.getAttribute('mouse-check') + ' [' + elv.pageX + ']');
		}
	}
}

function asksoft_move(el) {
	if (document.body.getAttribute('start-n')) {
		var e = el.target;
		var elv = mobil_platform ? el.targetTouches[0] : el;
		//console_log('move: ' + document.body.getAttribute('start-n') + ' [' + document.body.getAttribute('start-v') + 'x' + elv.pageX + ']');
		document.body.setAttribute('move-v', elv.pageX);
	}
}

function asksoft_up(el) {
	if (check_right_click(el)) return;
	if (document.body.getAttribute('start-n')) {
		var e = document.querySelector('[mouse-check="' + document.body.getAttribute('start-n') + '"]');
		if (document.body.getAttribute('start-v') == document.body.getAttribute('move-v')) {
			var stext = str_button
				.replace('{SID}', e.getAttribute('mouse-check'))
				.replace('{NAME}', e.innerText)
				.replace('{TEXT}', arr_button[e.getAttribute('mouse-check').substr(2)])
				.replace('{IMG}', asksoft_icons(e.getAttribute('mouse-check').substr(2)));
			if (!e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]')) {
				e.innerHTML += stext;
			}
			e.style.height = '30.4em';
			setTimeout(function (x) { 
					//x.querySelector('[name="b-4"]').style.borderRadius = '1em';
					x.querySelector('[sid="' + x.getAttribute('mouse-check') + '"]').style.opacity = '1';
					x.querySelector('[sid="' + x.getAttribute('mouse-check') + '"]').style.height = '30.4em';
					var arr = x.parentNode.querySelectorAll('[style^=opacity]');
					if (arr.length == 0) arr = x.parentNode.querySelectorAll('[style^=height]');
					var s = '';
					var e = { };
					for (var i = 0; i < arr.length; i++) {
						e = arr[i];
						s = e.getAttribute('sid');
						if (s) {
							//console_log('close [' + i + ']: ' + s);
							if (s != x.getAttribute('mouse-check')) {
								e.style.opacity = '';
								e.style.height = '';
								e.parentNode.style.height = '';
							}
						}
					}
				}, 100, e);
		} else {
			if (e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]')) {
				e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]').style.opacity = '';
				e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]').style.height = '';
				e.style.height = '';
			}
		}
		//console_log('end: ' + document.body.getAttribute('start-n') + ' [' + document.body.getAttribute('start-v') + 'x' + document.body.getAttribute('move-v') + ']');
		document.body.setAttribute('start-v', 0);
		document.body.setAttribute('start-n', '');
	}
}

function asksoft_click(el) {
	if (check_right_click(el)) return;
	var e = check_element(el.target ? el.target : el);
	if (e.getAttribute) {
		var s = e.getAttribute('e-name');
		if (s == 'mouse-check') {
			//var elv = mobil_platform ? el.targetTouches[0] : el;
			//console_log('click:' + e.getAttribute('mouse-check') + ' [' + elv.pageX + ']');
		}
		else if (s == 'header-burger' || s == 'menu-array') {
			menu_animation(e);
		}
		else if (s == 'who-full') {
			var x = (e.parentNode.querySelectorAll('.who').length - 3) * 5;
			var section = document.querySelector('.comand');
			var b_5 = section.querySelector('[name="b-5"]');
			var b_52 = section.querySelector('[name="b-52"]');
			var img = section.querySelector('.who-full-img');
			var full = section.querySelector('.who-full');
			if (e.getAttribute('start') == '1') {
				e.setAttribute('start', '0');
				//section.style.height = '';
				//b_5.style.height = '';
				//b_52.style.height = '';
				img.style.transform = '';
				section.querySelector('.who-full span').innerHTML = '���������� ���� ������';
				setTimeout(function (a1, a2, a3, fl) {
						a1.style.height = '';
						a2.style.height = '';
						a3.style.height = '';
						//fl.style.position = '';
						//fl.style.top = '';
						//fl.classList.remove('blur');
						who_full.who.style.position = '';
						who_full.who.style.top = '';
						who_full.who.classList.remove('blur');
						who_full = {};
					}, 800, section, b_5, b_52, full);
			} else {
				e.setAttribute('start', '1');
				//section.style.height = (x + 90) + 'em';
				//b_5.style.height = (x + 32) + 'em';
				//b_52.style.height = (x + 22) + 'em';
				img.style.transform = 'rotate(180deg)';
				section.querySelector('.who-full span').innerHTML = '�������� ������';
				setTimeout(function (a1, a2, a3, a4, fl) {
						a1.style.height = (a4 + 85) + 'em';
						a2.style.height = (a4 + 27) + 'em';
						a3.style.height = (a4 + 19) + 'em';
						//fl.style.position = 'sticky';
						//fl.style.top = ((screen.height / document.body.getAttribute('sz')) - 6).toFixed(4) + 'em';
						//fl.classList.add('blur');
						who_full = {
								full: document.querySelector('.comand [name="b-52"]')
								, ln: document.querySelectorAll('.who').length * 6
								, who: document.querySelector('.who-full')
							};
						who_full.who.style.position = '-webkit-sticky';
						who_full.who.style.position = isMobile.IE() ? 'fixed' : 'sticky';
						who_full.who.style.top = ((screen.height / document.body.getAttribute('sz')) - 6).toFixed(4) + 'em';
						who_full.who.classList.add('blur');
						ws_scroll();
					}, 800, section, b_5, b_52, x, full);
			}
		}
		else if (s == 'ws') {
			var cl = document.querySelector('[name="form-1"]');
			cl.style.width = '35.6em';
			cl = document.querySelector('[name="form-2"]');
			cl.style.height = '0';
		}
		else if (s == 'free-start' || s == 'what-u-button' || s == 'free-help-1' || s == 'not-odin-1' || s == 'button-cl') {
			//location.href = 'https://api.whatsapp.com/send?phone=79153356488&text=' + encodeURI('������������! ���� ������ ������ � ������������ � ����������');
			var cl = document.querySelector('[name="form-2"]');
			cl.style.height = '30.3em';
			cl = document.querySelector('[name="form-1"]');
			cl.style.width = '0';
		}
		else if (s == 'close-full') {
			var cl = document.querySelector('[name="form-2"]');
			cl.style.height = '0';
		}
		else if (s == 'close-small') {
			var cl = document.querySelector('[name="form-1"]');
			cl.style.width = '0';
		}
		else if (s == 'click-tbefy') {
			location.href = 'https://clck.ru/TBefy';
		}
		else if (s == 'ws-timer') {
			location.href = 'https://api.whatsapp.com/send?phone=79153356488&text=' + encodeURI('������������! ���� ������ ������ � ������������ � ����������. ������ �������');
		}
		else if (s == 'ws-promo') {
			location.href = 'https://api.whatsapp.com/send?phone=79153356488&text=' + encodeURI('������������! ���� ������ ������ � ������������ � ����������. � ���� �������� ���� ������� (��� ��������: ' + (76280000 + getRandom(1, 10000)).toFixed(0) + ')');
		}
		else if (s == 'free-help-2') {
			//we-help 70.4em;
			//b-5 10.7em;
			//b-6 29.6em;
			if (e.getAttribute('status') == '2') {
				
				document.querySelector('.we-help').style.height = '68.5em';
				//document.querySelector('.our-methods').style.marginTop = '-3.3em';
				document.querySelector('.we-help [name="b-6"]').style.left = '0';
				
				//e.setAttribute('status', '0');
				//document.querySelector('.we-help').style.height = '';
				//document.querySelector('.we-help [name="b-4"]').style.right = '';
				//document.querySelector('.we-help [name="b-5"]').style.left = '';
				//document.querySelector('.we-help [name="b-6"]').style.left = '';
				//setTimeout(function () {
				//	document.querySelector('.we-help [name="b-4"]').style.top = '';
				//}, 400);
			}
			else if (e.getAttribute('status') == '1' && e.getAttribute('timer') == '0') {
				e.setAttribute('status', '2');
				//document.querySelector('.we-help').style.height = '100em';
				document.querySelector('.we-help [name="b-4"]').style.right = '';
				document.querySelector('.we-help [name="b-5"]').style.left = '';
				//document.querySelector('.we-help [name="b-6"]').style.left = '0';
				//setTimeout(function () {
				//	document.querySelector('.we-help [name="b-4"]').style.top = '-2em';
				//	document.querySelector('.we-help [name="b-4"]').style.right = '0';
				//}, 400);
			}
			else if (e.getAttribute('status') == '0' || !e.getAttribute('status')) {
				e.setAttribute('status', '1');
				e.setAttribute('timer', '1');
				document.querySelector('.we-help').style.height = '63em';
				//document.querySelector('.our-methods').style.marginTop = '-5.7em';
				document.querySelector('.we-help [name="b-4"]').style.right = '0';
				document.querySelector('.we-help [name="b-5"]').style.left = '0';
				setTimeout(set_tick, 1000, 60);
			}
		}
		else if (s.substr(0, 5) == 'menu-' || s.substr(0, 5) == 'scrl-') {
			//console_log('menu-click:' + s.substr(5));
			location.href = '#' + s.substr(5);
			if (s.substr(0, 5) == 'menu-')
			menu_animation(document.querySelector('[e-name="header-burger"]'));
		}
	}
}

function set_tick(v) {
	v -= 1;
	var e = {};
	if (v >= 0) {
		e = document.querySelector('.we-help [name="b-4"] span');
		e.innerHTML = '00:' + (v < 10 ? '0' : '') + v;
		setTimeout(set_tick, 1000, v);
	} else {
		e = document.querySelector('.we-help [name="b-33"]');
		e.setAttribute('timer', '0');
		asksoft_click(e);
	}
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function users_tick() {
	var i = getRandom(20, 31);
	//console_log('tick: ' + i);
	document.querySelector('[name="b-ws-1"]').innerHTML = i.toFixed(0) + ' ������� ��������';
}

function asksoft_icons(v) {
	var s_style = 'background: url(img/all-icons.png);background-size: 54em 30em;background-repeat: no-repeat;';
	var pleft = 0;
	var ptop = 0;
	if (v >= 0 && v < 9) {
		s_style += 'background-position:' + ((pleft - (v * 60)) / 10).toFixed(2) + 'em 0em;';
	}
	else if (v >= 9 && v < 18) {
		v -= 9;
		ptop = ptop * 1 - 60;
		s_style += 'background-position:' + ((pleft - (v * 60)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 18 && v < 27) {
		v -= 18;
		ptop = ptop * 2 - (60 * 2);
		s_style += 'background-position:' + ((pleft - (v * 60)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 27 && v < 36) {
		v -= 27;
		ptop = ptop * 3 - (60 * 3);
		s_style += 'background-position:' + ((pleft - (v * 60)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 36 && v < 45) {
		v -= 36;
		ptop = ptop * 4 - (60 * 4);
		s_style += 'background-position:' + ((pleft - (v * 60)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}



	return s_style;
}

function check_element(e) {
	var res = {};
	for (var i = 0; i < 5; i++) {
		if (e.tagName.toUpperCase() == 'BODY' || e.tagName.toUpperCase() == 'HTML') break;
		if (e.getAttribute('e-name')) {
			res = e; //e.getAttribute('e-name');
			break;
		}
		e = e.parentNode;
	}
	return res;
}

function check_right_click(el) {
	var ok = 0;
	if (!mobil_platform) {
		if (el.which ? el.which : 0 || el.button ? el.button : 0) {
			if (!((el.which == 1) || (el.button == 0))) ok = 1;
		}
	}
	return ok;
}

function console_log(s) {
	if (mobil_platform) {
		var c = document.getElementById('console');
		c.innerHTML = s + '\n' + c.innerHTML;
	} else {
		console.log(s);
	}
}

window.addEventListener('scroll', function(e) {
	//console.log('pos:' + window.pageYOffset);
	ws_scroll();
	document.body.setAttribute('start-v', 0);
	document.body.setAttribute('start-n', '');
});

document.addEventListener("DOMContentLoaded", function(event) {
	//document.querySelector('.header-burger').addEventListener('click', menu_animation);
	//document.querySelector('.menu-array').addEventListener('click', menu_animation);
	document.body.setAttribute('sz', '10');
    body_resize();
	site_loading();
	document.addEventListener(asksoft_event['mousedown'], asksoft_down);
	document.addEventListener(asksoft_event['mousemove'], asksoft_move);
	document.addEventListener(asksoft_event['mouseup'], asksoft_up);
	document.addEventListener(asksoft_event['click'], asksoft_click);

	var usersId = setInterval(users_tick, 4000);

});
