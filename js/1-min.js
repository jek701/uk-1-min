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

var name_spis = {
	ru: ['���������� ���� ������', '�������� ������', ' ������� ��������']
	, en: ['View the full list', 'Collapse the list', ' people']
}


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

var lang = 'ru';

function body_resize() {
	if (document.body.offsetWidth > 300) {
		//document.getElementById('xx').innerHTML = document.body.offsetWidth;
		var sz = (document.body.offsetWidth > 1200 ? 10 : (document.body.offsetWidth / 1000 * 27)).toFixed(4); // 26.5
		document.body.setAttribute('sz', sz);
		document.body.style.fontSize = sz + 'px';
		//console.log('width: ' + document.body.offsetWidth + '\tfont: ' + document.body.style.fontSize);
	}
}

var arr_button = [];
var str_button = {
	ru: '<div sid="{SID}" class="button-click">'
		+ '<div name="b-1" class="block l-30 ln-20"><span class="f-17">{NAME}</span></div>'
		+ '<div name="b-2" class="block l-30 ln-18"><span class="f-14" style="white-space: normal;">{TEXT}</span></div>'
		+ '<div name="b-3" class="block l-30 ln-18 f-bold"><span class="f-14" style="white-space: normal;">������������ ����� ��������� � WhatsApp - ��� <u>�������� � ���������,</u> ������� �������������� ���������� ������������� �� ����.<br /><br />������� �����!</div>'
		+ '<div name="b-4" e-name="ws" class="b-click"><img name="b-ws-white-text" class="ws-pic" src="img/ws-white-text.svg" /><span class="f-16">�������� � WhatsApp</span></div>'
		+ '<div name="b-5" class="b-img" style="{IMG}"></div>'
		+ '</div>'
	, en: '<div sid="{SID}" class="button-click">'
		+ '<div name="b-1" class="block l-30 ln-20"><span class="f-17">{NAME}</span></div>'
		+ '<div name="b-2" class="block l-30 ln-18"><span class="f-14" style="white-space: normal;">{TEXT}</span></div>'
		+ '<div name="b-3" class="block l-30 ln-18 f-bold"><span class="f-14" style="white-space: normal;">The consultation will take place on WhatsApp, which is <u>anonymous and safe</u>. You do not need to install any other applications.<br /><br />We answer straight away!</div>'
		+ '<div name="b-4" e-name="ws" class="b-click"><img name="b-ws-white-text" class="ws-pic" src="img/ws-white-text.svg" /><span class="f-16">Message in WhatsApp</span></div>'
		+ '<div name="b-5" class="b-img" style="{IMG}"></div>'
		+ '</div>'
	};
function site_loading() {
	var el = document.querySelector('.what-u-feel');
	var str_html = '<div e-name="mouse-check" mouse-check="{I}" class="what-u-el" style="background: {BACK};">'
		+ '<div name="b-1" class="mouse-check">'
		+ '<div name="b-11" class="block l-30 ln-20"><span class="f-17 u">{TEXT}</span></div>'
		+ '</div>'
		+ '</div>';
	var str_el = {
		ru: '���������|#FFEC00|�� ����� ��������� ����� ����� ������ �� ������� ������, ����������� ������� �� �����, � ����� �� �������� ������������.<br /><br />�� �������, ��� ����� ���� ������ ������ � ������� ����� ��������������� ��������� �� ���������� ���������.;'
			+ '�������� � ����������|#FFE00E|�����, ������������ ���������,<br />���������� �������, ��������, ��������<br />����� ����������������� � ��������� �<br />����������.<br /><br />������ �� � ������� �������� � ����<br />����� � ������� �����<br />��������������� ���������.;'
			+ '�����������|#FFD41D|����� �������, ��� ������� � ����������<br />���������� ��� �� ��������? ���������<br />��������� ���������?<br /><br />���������� ���� ���������������<br />���������, ����� ����� �������<br />������������� � �������� ��������<br />�����.;'
			+ '�����������|#FFCB11|�������� ������� ���� ����� �����<br />����� ������� ���� ��������, ���������,<br />����������.<br /><br />�������� ���� �����, ������� ��<br />���������� � ���������� �� �����������<br />����� � ������� �����������<br />��������������� ���������.;'
			+ '�������������|#FFBC3A|������ ���, ��� ����� �� ���������, �<br />������������� � ����� �� ����<br />����������� �������. � ���������<br />�������������.<br /><br />���������� �� ����� �������, ��������� ��<br />����� ��-������ �������<br />�������������� ���������������<br />���������.;'
			+ '������� �������������|#ffb048|��� ������� �������������<br />������������� � ����� ���<br />������������� �������� ��������<br />������� ����� � ����.<br /><br />������ ��� ��������, ����� �����������<br />����� � ������� ���������������<br />���������, ������� ���������������<br />�������������.;'
			+ '�����|#ffa457|����� ����� ���������� ��������<br />�������� � ���������, ������ ���<br />����������, �������� ����������� ��<br />������� �������.<br /><br />���������� �� ������ � �������<br />����������� � ���� ����� � �������<br />����� ��������������� ���������.;'
			+ '�������|#ff9865|���������������� ����� �������� �<br />�������� ��������� �����, ����������<br />������������ �� ��������. ������<br />���������� ����������� ��������� � ���<br />������.<br /><br />�������, ��� ���������� �� ��� � �������<br />����� ��������������� ���������.;'
			+ '��������� � �����|#ff8c74|����������� �� ������� �������, ������<br />���������, ���������� ����� � �������� -<br />�������� ��������, ������� �����<br />������ ���������������.<br /><br />������� ��� ����� � ������� �����<br />��������������� ���������.;'
			+ '������|#ff866a|��� ������ ������� �������<br />�����������, ��������� ������� �<br />������� � ������� ����������,<br />����������� ���������� � ������.<br /><br />�������, ��� ������� ���� � ����� �<br />������� ����� ���������������<br />���������.;'
			+ '�����|#ff815c|������ ���, ��� ����� ����������� ��<br />�������, � ����� ������ ������� ��<br />��������� ����������.<br />��-�� ����� ���������� �������� ��<br />������ � � �����.<br /><br />�������, ��� ����� ��������� � �������<br />�������������� ���������������<br />���������.;'
			+ '���������� ���������|#ff7c4d|������ ��������� ��� �� ������<br />���������� ������ ���������<br />������������ ����� � �������� ��������<br />�����.<br /><br />�����, ��� �������� ���� � ��������<br />��������� � ������� �����<br />��������������� ���������.;'
			+ '��������� ���|#ff773f|��� ���������� ��� ������� ���������<br />���� �������� � ��������, � ����<br />��������� ������������, ����������<br />�����������������.<br /><br />�������������� ���������������<br />��������� ������� �������� ��� �<br />��������������.;'
			+ '��������|#ff7231|��-�� �������� ������� ����� ���������<br />�� ����� �������, � ����� ����������<br />������� ����.<br /><br />���������� � ��������� �������<br />��������������� ���������,<br />������������� ���������� ��� ���.;'
			+ '������ �����|#ff6d22|�������� � ������ ����� �������� �<br />�������� ����������, �������<br />���������� � ��������������.<br /><br />������ �� � ��������� �������<br />��������� ����� � ������� �����<br />��������������� ���������.;'
			+ '���������|#ff6914|��-�� ��������� ����� ��� ������� �� ���,<br />��������� ���������� �����������,<br />���������� ������ � ���. ��� ��� ��������<br />�� ����� � �������� � �����������.<br /><br />������� ��������� ������� �������<br />���� ��������������� ���������.;'
			+ '������������� � ����|#ff6406|������������� � ���� ��������� �<br />�������� �������� ����������,<br />���������������. �� �� ����� � ����<br />�����������, ������������ �� ����������.<br /><br />�������� ���������� �������<br />����������� ��������������� ���������.;'
			+ '������ ������ �����|#fd6006|������ ������ ����� ����� �������� �<br />������, ��������� ��� ��������.<br /><br />����� ���� ����� ����� ������ �������<br />�������������� ���������������<br />���������.;'
			+ '��������� �� ������|#fb5e0d|��������� �� ������ �������� �<br />����������, ������������������� �����<br />������������� � ������ � �����.<br /><br />������ �� ��� ������ ������ �������<br />��������������� ���������, �������<br />��������������� ��� �������<br />�������������.;'
			+ '������ ���|#f85b15|��-�� ������� ���� �������� ����������,<br />���������� �������� � ������ �����,<br />��������� ��������� �����������.<br />������� ����� �������� � ��� �������<br />����.<br /><br />������ ���������� �����������<br />��������������� ���������.;'
			+ '��������� � �������|#f5591c|��������� � ������� ������<br />������������� ���������� ����� �<br />������� �������.<br /><br />���������� �� ���, �����<br />���������������� � ��������� � ����<br />����� � ������� �����<br />��������������� ���������.;'
			+ '������|#f25724|���� ���������� ������ - ��� ������<br />��������. ���� �������� �� - ���������<br />��������� � �����������.<br /><br />���������� � ���� ���������� ��������<br />��� ����������� ��� ��������� �<br />��������� ������� ��������������<br />��������������� ���������.;'
			+ '�������� ����|#f0542b|�������� � ��������� ���� ����� �<br />�������������������� ������,<br />�������� �� ��������, ����������,<br />���������� � ����������.<br /><br />��������� ��������� ����, �������<br />���������� �������� ������� ����<br />��������������� ���������.;'
			+ '�����|#ed5233|����� �������� � ����������<br />����������� � ������������ ���������.<br />������ ��������� ����� � ��������, �� ��<br />����� ����� �� ��������� ���������.<br /><br />�������, ��� � ���� ����������  �<br />������� ����������� ���������������<br />���������.;'
			+ '������|#ea4f3a|��-�� ������� ������� ������� ������<br />�������, ������� � ���� ���������<br />����������������� � ������������,<br />���������� ������������ � ����������<br />���������.<br /><br />�������, ��� �������� �� �������� �<br />������� ����� ���������������<br />���������.;'
			+ '�����������|#db4d47|����� ������� � ���������� ������<br />������ �������� ����������, ����������<br />��������� � �����������������.<br /><br />�������, ��� ���������<br />����������������� � ���������<br />����������. ����������� ����<br />��������������� ���������.;'
			+ '��������������|#be4b58|��������� � ��������������� ������ ��<br />���������� � ������� �����������������<br />������.<br /><br />� ������� �����������<br />��������������� ��������� �� �������,<br />��� ����� ����.;'
			+ '��������������|#a24969|������������ ������� �� ���������<br />���������� ���, � ������ ������ �� �����,<br />�� ������� �������� � ������� �<br />������������ �����.<br /><br />���������� � ���� ��������� �������<br />������������ ���������������<br />���������.;'
			+ '������|#85487a|�������� ������ ��� ������ ��<br />���������� �������� � ���������� �<br />������� � �� ������, ������� ��������<br />�����.<br /><br />�������, ��� ������ ��� �������� �<br />������� ��������������<br />��������������� ���������.;'
			+ '����� ����|#69468b|����� ���� ����� ������������ �������<br />����������������, ������,<br />�������������, �������� � �����������.<br /><br />�������, ��� ������ ����������������� �<br />������� ����� ���������������<br />���������.;'
			+ '����������|#4c449c|�������� ������ ��� ������ ��<br />���������� �������� � ���������� �<br />������� � �� ������, ������� ��������<br />�����.<br /><br />�������, ��� ������ ��� �������� �<br />������� ��������������<br />��������������� ���������.;'
			+ '���������|#3042ad|������ ��������� ���� �������,<br />������� � ���������. ��� �������<br />������������ �� ����� ������������ �<br />������ ����� ������.<br /><br />�������, ��� ������� ��������� �������� �<br />�������� ���� � ������� �����������<br />��������������� ���������.;'
			+ '����������|#1340bf|�������� ������������� �������� �<br />������� ����������, �����������,<br />���������, ������� ������������,<br />�������� ������.<br /><br />�������, ��� ������� ����������� �<br />��������� ������������� � �������<br />����� ��������������� ���������.;'
			+ '��������|#0044ca|����������� ����������� ����� �<br />������������, ��������� � ����� � ��<br />������. �������� �������� ����������<br />�������� �����������.<br /><br />�������, ��� �������� ��������<br />����������� � ������� ��������������<br />��������������� ���������.;'
			+ '�����������|#0052ca|����������� ����� �������� ������,<br />�������� � �����������, ������� ����,<br />������������� � ���������.<br /><br />���������� � ����������� �������� �<br />������������� � ����� ����������<br />������� ����������� ���������������<br />���������.;'
			+ '������|#0060c9|������ �������� ������� ������. � ��<br />������ ����������. ��������, ���� ������<br />����� �� �������� ����������� ��� �����<br />���� ����������.<br /><br />������ �������� � ������ �����<br />������� ���� ���������������<br />���������.;'
			+ '������� ����|#006ec9|������� ���� ����� �������� �������,<br />�������� ����������, ������� ��������<br />�����.<br /><br />���� ��������������� ���������,<br />������� ��������������� ��� �������<br />�������� �������������, �������<br />���������� �� ����� ������������<br />�������.;'
			+ '������|#007dc9|��� ������ ������� ����� ����������<br />������� ����, ��������, ������� ���� �<br />���� ����� �� ���������.<br /><br />�������� ������� ������� �������<br />����������� ���������������<br />���������.;'
			+ '���������|#008bc9|��������� �������� � ����� �����<br />�������������� ����������<br />������������� ����������, ����������<br />������������, ���������� ���.<br /><br />�������, ��� ���������� � �����<br />���������� ��� ����������� � �������<br />����� ��������������� ���������.;'
			+ '�������|#0099c8|������� ��� ������ ����� �������� � ����,<br />��� ������ �������� ������ ����������� �<br />����. ��� ��� ����� ���������� ���������.<br /><br />�������, ��� �������� � ��������� �<br />������� ����� ���������������<br />���������.;'
			+ '�������|#00a7c8|��������� � ����������� �������<br />�������� � ��������� � �����������,<br />������������������� �����������<br />������.<br /><br />���� ��������������� ��������� ������<br />��� ���������� ������ � ��������� �����<br />�� ��������� ��������.;'
			+ '��������|#00b3c6|����� ������� ������ � ��������� �<br />���� - ������� ���. ��� ���������� ����<br />� ����������, ������ ����������, �<br />������ �������� ���� ��������.<br /><br />�������, ��� �������� ������ ���<br />����������� � ������� �����<br />��������������� ���������.;'
			+ '����� ����� ����������|#01b6b8|����� ����� ���������� ����� ���������<br />� �����������, �������, �������<br />����������������.<br /><br />���������� � ���� � �������� ��������<br />������� ������� ���� ���������������<br />���������.;'
			+ '������ ����������|#01b9aa|��-�� ������ ���������� ����������<br />�����������, �������� �����������,<br />����� ���������� � ���������� ��<br />��������.<br /><br />����������� ��������������� ���������<br />������� ������� ����������� � ���� �<br />�������� �������� �����.;'
		, en: 'Depression|#FFEC00|Depression often manifests in a reluctance to carry out everyday tasks and loss of interest or pleasure in activities you previously enjoyed.<br /><br />With the help of our specialist counselling programme, you will be able to start a better life and find pleasure again in the things you once enjoyed.;'
			+ 'RELATIONSHIP CONCERNS|#FFE00E|Unhappiness with your partner, criticism, aggression, jealousy and fights are all signs of serious conflict between the two of you.<br /><br />With the help of our specialist counselling programme, you and your partner can live together happily again.;'
			+ 'INCOMPREHENSION|#FFD41D|It can often feel as though no-one understands you and conflicts are constantly arising.<br /><br />Our specialist counselling programme will help you find the root of your problems and allow you to live a better life.;'
			+ 'LONELINESS|#FFCB11|A lonely person can feel useless, unwanted and abandoned even when surrounded by other people.<br /><br />With the help of our specialist counselling programme, you will learn to become more confident in building strong connections with other people.;'
			+ 'DISAPPOINTMENT|#FFBC3A|Sometimes we come up against our dreams crashing and burning or everyone we trusted failing us: our colleagues, friends or family. The result of this is diappointment.<br /><br />With the help of our specialist counselling programme, you will be able to see the people around you in a different light, without feeling betrayed or disappointed.;'
			+ 'HARMFUL ATTACHMENTS|#ffb048|You have a harmful dependency if you cannot imagine your life without a specific person without acute feelings of fear and pain.<br /><br />With the help of our specialist counselling programme, you will be able to recognise yourself as an independent person and live happily in this way.;'
			+ 'PHOBIA|#ffa457|Fear can make you feel emotionally and physically exhausted and take away your potential for success.<br /><br />Get rid of your fears and find inner confidence  with the help of our counselling programme.;'
			+ 'ANXIETY|#ff9865|Uncertainty can make you feel anxious and worry over little things or for no reason at all.<br /><br />With the help of our specialist counselling programme, you will learn to manage your anxious thoughts.;'
			+ 'STRAINED FAMILY RELATIONS|#ff8c74|Lack of family support and understanding, frequent fights and lack of respect can all prevent a family from living together happily.<br /><br />Solutions can be found to all these problems with the help of our specialist counselling programme.;'
			+ 'APATHY|#ff866a|Apathy is when you lack motivation and interest in doing anything, you feel indifferent to what is going on around you and you no longer find pleasure in the things you used to enjoy.<br /><br />With the help of our specialist counselling programme, learn how to resume a life full of emotion and happiness.;'
			+ 'ACCUMULATION OF STRESS|#ff815c|Sometimes stress builds up and little things can make us lose control.<br /><br />Learn how to become calmer and let go of stress with our specialist counselling programme.;'
			+ 'LACK OF MOTIVATION|#ff7c4d|A lack or complete absence of motivation can prevent you from achieving your goals and dreams.<br /><br />Learn how to feel more driven and motivated with our counselling programme.;'
			+ 'TROUBLE SLEEPING|#ff773f|Sleep disturbances can make you feel tired and shattered, lose concentration easily and become irritable.<br /><br />Our specialist counselling programme will help you to normalise your sleep rhythms and recover from tiredness.;'
			+ 'AGGRESSION|#ff7231|Aggression can often cause you to take things out on your loved ones and then feel guilty afterwards.<br /><br />Our individually-tailored counselling programme can help you with this problem.;'
			+ 'PERSONAL RELATIONSHIPS|#ff6d22|Problems in personal relationships can lead to poor self esteem, low mood and a feeling of disappointment.<br /><br />Our specialist counselling programme will help you build strong relationships.;'
			+ 'FATIGUE|#ff6914|Sometimes fatigue can make you feel as though nothing will go right, you feel exhausted and your memory and sleep deteriorate.<br />If you feel as though you have not got the energy to get up in the morning and communicate with the  people around you, our specialist counselling programme will help to get you back on your feet.;'
			+ 'LACK OF SELF-CONFIDENCE|#ff6406|Low self esteem can make you feel useless and as though no-one cares about you. People with low self esteem avoid social interaction and difficult situations, thereby missing out on opportunities.<br /><br />Our specialist counselling programme can help you boost your self worth.;'
			+ 'LOSS OF PURPOSE IN LIFE|#fd6006|Loss of purpose in life leads to apathy, depression and the feeling of complete hopelessness.<br /><br />Our specialist counselling programme will help you rediscover the meaning of life and your purpose in it.;'
			+ 'WORKPLACE CONFLICTS|#fb5e0d|Conflicts at work result in stress, dissatisfaction with your job and your life in general.<br /><br />With the help of our specialist counselling programme, developed individually to meet each clients needs, you can easily tackle your problems at work.;'
			+ 'EXCESS WEIGHT|#f85b15|Your self confidence can suffer greatly as a result of excess weight. It can also lead to relationship problems and various health issues.<br /><br />You can lose weight without a strict diet with the help of our counselling programme tailored individuallyto your needs.;'
			+ 'COMMUNICATION DIFFICULTIES|#f5591c|Communication difficulties can prevent you from bulding a network of contacts and developing your career.<br /><br />Our specialist counselling programme will help you become more confident and sociable.;'
			+ 'ANGER|#f25724|Constantly suppressing feelings of anger can damage your health.  But expressing your anger can damage your relationships.'
				+ '<br /><br />Our specialist counselling programme will help you cope with feelings of anger without risking your health or your relationships.;'
			+ 'SELF-ACCEPTANCE|#f0542b|Problems with self-acceptance can lead to dissatisfaction with life, poor quality of life, insecurities and relationship problems.'
				+ '<br /><br />Our specialist counselling programme will help you learn how to accept and love yourself the way you are and achieve inner harmony.;'
			+ 'ABUSE|#ed5233|Abuse can result in physical and mental health issues. Victims often feel fear and despair but are still unable to end their toxic relationships.'
				+ '<br /><br />Discover how to cope with this issue with our special counselling programme.;'
			+ 'STRESS|#ea4f3a|Recurring stress can drain all your energy and reduce your productivity and focus. You constantly feel distracted and exhausted.'
				+ '<br /><br />Learn how to cope with stress with the help of our counselling programme.;'
			+ 'TOXIC PEOPLE|#db4d47|Communicating with toxic people can be harmful: we tend to become irritable and tired.'
				+ '<br /><br />Learn how to communicate with such people without risking your own mental health with our specialist counselling programme.;'
			+ 'PERSONAL FULFILMENT|#be4b58|Difficulties experienced in achieving your goals and finding your place in life can directly affect your self-esteem and your degree of life satisfaction.'
				+ '<br /><br />With the help of our specialist counselling programme, you will learn how to find yourself.;'
			+ 'BURN-OUT|#a24969|A burnt-out person struggles to get up in the morning and loses interest in their social life and everyday activities.'
				+ '<br /><br />If you feel as though you have lost all your inner energy, our individual counselling programme will be able to help.;'
			+ 'EMOTIONS|#85487a|Both over-reaction, and indifference or complete absence of emotion, can make it harder for work colleagues and those in your social circle to communicate with you.'
				+ '<br /><br />With the help of our specialist counselling programme, you will be able to learn how to solve these problems.;'
			+ 'FINDING YOURSELF|#69468b|Finding yourself is often accompanied by feelings of ambiguity, uncertainty, fear and lack of confidence.'
				+ '<br /><br />Discover how to accomplish things that you want quickly with our specialist counselling programme.;'
			+ 'CLOSENESS|#4c449c|A closed person may suffer from heightened anxiety, find conversation difficult and experience a feeling that they are the odd one out or a misfit when with other people.'
				+ '<br /><br />Our special counselling programme can help resolve problems with social interactions.;'
			+ 'LEADERSHIP|#3042ad|Leaders tend to have a sense of their value and importance. They derive satisfaction from their activity and each new achievement.'
				+ '<br /><br />With the help of our specialist programme you can learn how to develop vital leadership qualities.;'
			+ 'TENSIONS|#1340bf|Fatigue, anxiety, bad mood, loss of focus and memory can all be signs of excess tension and stress.'
				+ '<br /><br />Learn how to find tranquillity and relax with the help of our specialist counselling programme.;'
			+ 'ADDICTIONS|#0044ca|Alcohol addiction gives rise to various health issues and family and work problems. It can lead to gradual disintegration of the personality.'
				+ '<br /><br />Our specialist counselling programme will help you fight your addiction.;'
			+ 'BREAK-UP|#0052ca|Break-up can result in extreme pain, regret, disappointment and sadness.'
				+ '<br /><br />Our counselling programme will help you cope with negative emotions, recover your self-esteem and become open to new relationships.;'
			+ 'LOVE|#0060c9|Love makes you feel strong emotions, which are not always positive, particularly if the one you love does not reciprocate or respect your feelings.'
				+ '<br /><br />Our specialist counselling programme will help you resolve problems in your personal life.;'
			+ 'FEELING GUILTY|#006ec9|Feelings of guilt can make you feel anxious and reduce your quality of life.'
				+ '<br /><br />Our counselling programme tailored individually to meet your needs will help you to overcome this destructive feeling.;'
			+ 'BEREAVEMENT|#007dc9|Experiencing loss can cause great pain and feelings of despair, guilt and even depression.'
				+ '<br /><br />This type of difficult situation can be made easier to navigate with the help of our specialist counselling programme.;'
			+ 'ADJUSTMENT|#008bc9|Adjusting to a new physical or social situation can be difficult for adults and children alike, and may be accompanied by anxiety and sleep disturbances.'
				+ '<br /><br />Discover how to adapt quickly and easily to new circumstances with our counselling programme.;'
			+ 'BULLYING|#0099c8|Bullying usually leads to the victim starting to doubt himself or herself and may have tragic consequences.'
				+ '<br /><br />Our counselling programme will help you learn how to cope with bullying.;'
			+ 'CAREER|#00a7c8|Difficulties in building a career often lead to self-esteem problems and dissatisfaction with life.'
				+ '<br /><br />Our counselling programme will help you achieve success and progress up the career ladder.;'
			+ 'CHEATING|#00b3c6|When one of the partners discovers the other is cheating, their world crashes down. They start comparing themselves to their rival, their self-confidence plummets and anxiety grows.'
				+ '<br /><br />With our counselling programme you will be able to find out how to survive changes like this without harm to your mental health.;'
			+ 'RELOCATION|#01b6b8|Moving cities or countries can lead to anxiety, fear and uncertainty.'
				+ '<br /><br />Our counselling programme will help you manage this anxiety and survive a relocation painlessly.;'
			+ 'LOW SELF ESTEEM|#01b9aa|As a result of low self esteem you can lose a sense of perspective, worry excessively and miss out on lifes opportunities.'
				+ '<br /><br />Our counselling programme will help you become more confident and sieze every opportunity that comes your way.;'
		};
	
	var button_end = {
		ru: '<div class="what-u-el" style="background: #02bc9c; height: 10em;">'
            + '<div e-name="what-u-button" class="what-u-button"><span>�� ���� ������.</span>'
                + '<span>�������� ����������� � ����!</span></div>'
	        + '</div>'
		, en: '<div class="what-u-el" style="background: #02bc9c; height: 10em;">'
            + '<div e-name="what-u-button" class="what-u-button"><span>I don�t understand what is</span>'
                + '<span>wrong with me, can you help?</span></div>'
	        + '</div>'
	};
	var arr = str_el[lang].split(';');
	var str_html_in = '';
	var e = [];
	for (var i = 0; i < arr.length - 1; i++) {
		e = arr[i].split('|');
		str_html_in += str_html.replace('{TEXT}', e[0]).replace('{BACK}', e[1]).replace('{I}', 'v-' + i);
		arr_button.push(e.length > 2 ? e[2] : ''); 
	}
	el.innerHTML = str_html_in
		+ button_end[lang];

	//command
	el = document.querySelector('.comand [name="b-52"]');
	str_html = '<div class="who l-28"><div class="who-el-1 block ln-24 f-semibold"><span class="f-14">{NAME}</span></div><div class="who-el-2 block"><span>{COMP}</span></div></div>';
	str_el = {
		ru: '���� ������:(����������� ������ ������ ������ (UNSW));'
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
			+ '��� ������:(����������� ����� ���������);'
		, en: 'Dan Chisholm:(World Health Organization, WHO);'
			+ 'Bill Yule:(King�s College London);'
			+ 'Aisyha Malik:(University of Oxford);'
			+ 'Mark van Ommeren:(WHO);'
			+ 'Nancy Baron:(Psycho-Social Services and Training Institute);'
			+ 'Pierre Bastin:(International Committee of the Red Cross);'
			+ 'Jonathan Bisson:(Cardiff University);'
			+ 'Rachel Cohen:(Common Threads);'
			+ 'Pim Cuijpers:(VU University Amsterdam);'
			+ 'JoAnne Epping-Jordan:(Seattle, USA);'
			+ 'Steve Fisher:(Basic Needs);'
			+ 'Michelle Funk:(WHO);'
			+ 'Steven Hollon:(Vanderbilt University);'
			+ 'Claudia Garcia-Moren�:(WHO);'
			+ 'Sarb Johal:(Massey University);'
			+ 'Dayle Jones:(WHO);'
			+ 'Lynne Jones:(Harvard School of Public Health);'
			+ 'Mark Jordans:(Healthnet TPO);'
			+ 'Berit Kieselbach:(WHO);'
			+ 'Katie Dawson:(University of New South Wales (UNSW));'
			+ 'Richard Bryant:(UNSW);'
			+ 'Melissa Harper:(WHO);'
			+ 'Alvin Tay:(UNSW);'
			+ 'Annet Kleiboer:(VU University Amsterdam);'
			+ 'Roos Korste:(Amsterdam, the Netherlands);'
			+ 'Anita Marini:(Rimini, Italy);'
			+ 'Laura Murray:(Johns Hopkins University);'
			+ 'Sebastiana Nkomo Da Gama:(WHO);'
			+ 'Atif Rahman:(University of Liverpool);'
			+ 'Alison Schafer:(World Vision International);'
			+ 'Marian Schilperoord:(United Nations High Commissioner for Refugees (UNHCR));'
			+ 'Yutaro Setoya:(WHO);'
			+ 'Marit Sijbrandij:(VU University Amsterdam);'
			+ 'Renato Souza:(University of Sao Paolo);'
			+ 'Wietse Tol:(Johns Hopkins University);'
			+ 'Peter Ventevogel:(UNHCR);'
			+ 'Helena Verdeli:(Colombia University);'
			+ 'Inka Weissbecker:(International Medical Corps);'
		};

	arr = str_el[lang].split(';');
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
	} else {
		el.setAttribute('start', '1');
		e1.style.transform = 'rotate(45deg)';
		e1.style.marginTop = '2.208em';
		e2.style.width = '0';
		e3.style.width = '0';
		e4.style.transform = 'rotate(-45deg)';
		e4.style.marginTop = '2.208em';
		menu.style.width = '24.2em';
		menu.classList.remove('blur');
		setTimeout(function (x) {
			x.classList.add('blur');
		}, 100, menu);
	}
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
			x.style.WebkitAnimation = x.style.animation = 'move-left .5s ease-in-out 0s 1 normal forwards';
			xg.style.WebkitAnimation = xg.style.animation = 'opacity-out .5s ease-in-out 0s 1 normal forwards';
			xw.style.WebkitAnimation = xw.style.animation = 'opacity-in .5s ease-in-out 0s 1 normal forwards';
			x.style.boxShadow = '';
			if (window.pageYOffset) {
				x.style.marginTop = ((screen.height - (screen.height / 3)) / 10) + 'em'; 
			} else {
				x.style.marginTop = '';
			}
		}, 800, e, elg, elw, v);
	} else {
		e.style.WebkitAnimation = e.style.animation = 'move-right .5s ease-in-out 0s 1 normal forwards';
		elg.style.WebkitAnimation = elg.style.animation = 'opacity-in .5s ease-in-out 0s 1 normal forwards';
		elw.style.WebkitAnimation = elw.style.animation = 'opacity-out .5s ease-in-out 0s 1 normal forwards';
		setTimeout(function (x, xv) { 
			x.style.boxShadow = '0 0 0 #fff';
			if (window.pageYOffset) {
				x.style.marginTop = ((screen.height - (screen.height / 3)) / 10) + 'em'; 
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
			var stext = str_button[lang]
				.replace('{SID}', e.getAttribute('mouse-check'))
				.replace('{NAME}', e.innerText)
				.replace('{TEXT}', arr_button[e.getAttribute('mouse-check').substr(2)])
				.replace('{IMG}', asksoft_icons(e.getAttribute('mouse-check').substr(2)));
			if (!e.querySelector('[sid="' + e.getAttribute('mouse-check') + '"]')) {
				e.innerHTML += stext;
			}
			e.style.height = '42.8em';
			setTimeout(function (x) { 
					//x.querySelector('[name="b-4"]').style.borderRadius = '1em';
					x.querySelector('[sid="' + x.getAttribute('mouse-check') + '"]').style.opacity = '1';
					x.querySelector('[sid="' + x.getAttribute('mouse-check') + '"]').style.height = '42.8em';
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
			var x = (e.parentNode.querySelectorAll('.who').length - 3) * 6;
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
				section.querySelector('.who-full span').innerHTML = name_spis[lang][0]; //'���������� ���� ������';
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
				section.querySelector('.who-full span').innerHTML = name_spis[lang][1]; //'�������� ������';
				setTimeout(function (a1, a2, a3, a4, fl) {
						a1.style.height = (a4 + 90) + 'em';
						a2.style.height = (a4 + 32) + 'em';
						a3.style.height = (a4 + 22) + 'em';
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
						who_full.who.classList.add('blur');
						ws_scroll();
					}, 800, section, b_5, b_52, x, full);
			}
		}
		else if (s == 'ws' || s == 'free-start' || s == 'what-u-button' || s == 'free-help-1' || s == 'not-odin-1') {
			location.href = 'https://wa.me/447459129021?text=' + encodeURI('Hi! I would like to know more about counseling sessions');
		}
		else if (s == 'ws-timer') {
			location.href = 'https://wa.me/447459129021?text=' + encodeURI('Hi! I would like to know more about counseling sessions. Start timer');
		}
		else if (s == 'ws-promo') {
			location.href = 'https://wa.me/447459129021?text=' + encodeURI('Hi! I would like to know more about counseling sessions. I WANT TO CHANGE MY FUTURE! (promo code: ' + (76280000 + getRandom(1, 10000)).toFixed(0) + ')');
		}
		else if (s == 'free-help-2') {
			//we-help 70.4em;
			//b-5 10.7em;
			//b-6 29.6em;
			if (e.getAttribute('status') == '2') {
				
				document.querySelector('.we-help').style.height = '93em';
				document.querySelector('.our-methods').style.marginTop = '-3.3em';
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
				document.querySelector('.we-help').style.height = '81.1em';
				document.querySelector('.our-methods').style.marginTop = '-5.7em';
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
	document.querySelector('[name="b-ws-1"]').innerHTML = i.toFixed(0) + name_spis[lang][2]; //' ������� ��������';
}

function asksoft_icons(v) {
	var s_style = 'background: url(img/all-icons-80.jpg);background-size: 37.5em 42.8em;background-repeat: no-repeat;';
	var pleft = 0;
	var ptop = -12;
	if (v >= 0 && v < 9) {
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em 0em;';
	}
	else if (v >= 9 && v < 18) {
		v -= 9;
		ptop = ptop * 1 - 40;
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 18 && v < 27) {
		v -= 18;
		ptop = ptop * 2 - (40 * 2);
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 27 && v < 36) {
		v -= 27;
		ptop = ptop * 3 - (40 * 3);
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
	}
	else if (v >= 36 && v < 45) {
		v -= 36;
		ptop = ptop * 4 - (40 * 4);
		s_style += 'background-position:' + ((pleft - (v * 40)) / 10).toFixed(2) + 'em ' + (ptop / 10).toFixed(2) + 'em;';
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
    var ln = document.querySelector('[language="change"]');
	if (ln) {
		change_language(ln.getAttribute('lng'));
	}
	body_resize();
	site_loading();
	document.addEventListener(asksoft_event['mousedown'], asksoft_down);
	document.addEventListener(asksoft_event['mousemove'], asksoft_move);
	document.addEventListener(asksoft_event['mouseup'], asksoft_up);
	document.addEventListener(asksoft_event['click'], asksoft_click);

	users_tick();
	var usersId = setInterval(users_tick, 4000);

	end_language();
});

//language beg =====================================================================================================

var ln = [
	{
		query: '[name="b-mh"] span:nth-child(1)'
		, ru: '���������������'
		, en: 'Psychological'
	}
	, {
		query: '[name="b-mh"] span:nth-child(2)'
		, ru: '������'
		, en: 'support'
	}
	, {
		query: '[e-name="menu-problem"] span:nth-child(1)'
		, ru: '����� �������� ������?'
		, en: 'What we do'
	}
	, {
		query: '[e-name="menu-help"] span:nth-child(1)'
		, ru: '��� �� ��������'
		, en: 'How we can help'
	}
	, {
		query: '[e-name="menu-our"] span:nth-child(1)'
		, ru: '���������'
		, en: 'Our therapies'
	}
	, {
		query: '[e-name="menu-comand"] span:nth-child(1)'
		, ru: '���������'
		, en: 'Psychologists'
	}
	, {
		query: '[e-name="menu-history"] span:nth-child(1)'
		, ru: '������� ��������'
		, en: 'Success stories'
	}
	, {
		query: '[e-name="free-start"] span:nth-child(1)'
		, ru: '��� � ���� ���������'
		, en: 'Get in touch'
	}
	, {
		query: '[e-lang="svyaz"] span:nth-child(1)'
		, ru: '�� ������ �� �����!'
		, en: 'We are always in touch!'
	}
	, {
		query: '[e-lang="svyaz"] span:nth-child(2)'
		, ru: '�������� ���!'
		, en: 'Write to us!'
	}
	, {
		query: '.start-page [name="b-1"] span:nth-child(1)'
		, ru: '���� ���������'
		, en: 'Have you got'
	}
	, {
		query: '.start-page [name="b-1"] span:nth-child(2)'
		, ru: '������?'
		, en: 'a minute?'
	}
	, {
		query: '.start-page [name="b-2"] span:nth-child(1)'
		, ru: '����������� �'
		, en: 'Chat with'
	}
	, {
		query: '.start-page [name="b-2"] span:nth-child(2)'
		, ru: '����������'
		, en: 'your counsellor'
	}
	, {
		query: '.start-page [name="b-3"] span:nth-child(1)'
		, ru: '����� �����������������'
		, en: 'Unlimited chatting for as long as you need'
	}
	, {
		query: '.start-page [name="b-3"] span:nth-child(3)'
		, ru: '/ ������'
		, en: '/ minute'
	}
	, {
		query: '.start-page [e-lang="begin"] span:nth-child(1)'
		, ru: '������ ���������'
		, en: 'Get started for free'
	}
	, {
		query: '.problem [name="b-1"] span:nth-child(1)'
		, ru: '������ ���������'
		, en: 'Emotions guide us through'
	}
	, {
		query: '.problem [name="b-1"] span:nth-child(2)'
		, ru: '����� ������'
		, en: 'our lives'
	}
	, {
		query: '.problem [name="b-2"] span:nth-child(1)'
		, ru: '�� ��������'
		, en: 'We understand'
	}
	, {
		query: '.problem [name="b-2"] span:nth-child(2)'
		, ru: '��������������� ������'
		, en: 'the psychology behind'
	}
	, {
		query: '.problem [name="b-2"] span:nth-child(3)'
		, ru: '���� ������ - � �����'
		, en: 'your emotions and'
	}
	, {
		query: '.problem [name="b-2"] span:nth-child(4)'
		, ru: '���������� ���'
		, en: 'can help you get'
	}
	, {
		query: '.problem [name="b-2"] span:nth-child(5)'
		, ru: '������� ���'
		, en: 'them under'
	}
	, {
		query: '.problem [name="b-2"] span:nth-child(6)'
		, ru: '������'
		, en: 'control'
	}
	, {
		query: '.problem [name="b-3"] span:nth-child(1)'
		, ru: '��� ��'
		, en: 'What are'
	}
	, {
		query: '.problem [name="b-3"] span:nth-child(2)'
		, ru: '������'
		, en: 'you concerned'
	}
	, {
		query: '.problem [name="b-3"] span:nth-child(3)'
		, ru: '���������� ?'
		, en: 'about?'
	}
	, {
		query: '.we-help [name="b-1"] span:nth-child(1)'
		, ru: '�� �������������'
		, en: 'We are here'
	}
	, {
		query: '.we-help [name="b-1"] span:nth-child(2)'
		, ru: '����� ��� ������'
		, en: 'to help you'
	}
	, {
		query: '.we-help [name="b-21"] span:nth-child(1)'
		, ru: '�������� 24/7'
		, en: 'Available 24/7'
	}
	, {
		query: '.we-help [name="b-22"] span:nth-child(1)'
		, ru: '�������� ������ �� �����, �����'
		, en: 'Counsellors are always available'
	}
	, {
		query: '.we-help [name="b-22"] span:nth-child(2)'
		, ru: '�������� ������ �� �����, �����'
		, en: 'when you need them the most.'
	}
	, {
		query: '.we-help [name="b-22"] span:nth-child(3)'
		, ru: '�������� ��� � WhatsApp'
		, en: 'Message us via WhatsApp'
	}
	, {
		query: '.we-help [name="b-23"] span:nth-child(1)'
		, ru: '�������� ���������'
		, en: 'Send message'
	}
	, {
		query: '.we-help [name="b-3"] [name="b-21"] span:nth-child(1)'
		, ru: '������� �����'
		, en: 'We respond instantly!'
	}
	, {
		query: '.we-help [name="b-3"] [name="b-22"] span:nth-child(1)'
		, ru: '���� �� �� ������� �� 1 ������,'
		, en: 'If we don�t respond within one'
	}
	, {
		query: '.we-help [name="b-3"] [name="b-22"] span:nth-child(2)'
		, ru: '�� �������� 30 �����'
		, en: 'minute, you get 30 minutes of'
	}
	, {
		query: '.we-help [name="b-3"] [name="b-22"] span:nth-child(3)'
		, ru: '������������ ���������!'
		, en: 'counselling free of charge'
	}
	, {
		query: '.we-help [name="b-33"] span:nth-child(1)'
		, ru: '��������� ������'
		, en: 'Start timer'
	}
	, {
		query: '.we-help [name="b-51"] span:nth-child(1)'
		, ru: '� ������ <u e-name="ws-timer">������� �����,</u>'
		, en: 'Now <u e-name="ws-timer">click on this</u>'
	}
	, {
		query: '.we-help [name="b-51"] span:nth-child(2)'
		, ru: '����� ��������� ���'
		, en: 'link to'
	}
	, {
		query: '.we-help [name="b-51"] span:nth-child(3)'
		, ru: '��������� � WhatsApp.'
		, en: 'message us via WhatsApp.'
	}
	, {
		query: '.we-help [name="b-51"] span:nth-child(4)'
		, ru: '�� ����!'
		, en: 'We can�t wait to hear from you!'
	}
	, {
		query: '.we-help [name="b-61"] span:nth-child(1)'
		, ru: '��� ��������, ��� �� ������ ��������'
		, en: 'It is great that you love precision'
	}
	, {
		query: '.we-help [name="b-61"] span:nth-child(2)'
		, ru: '� �������������� ;)'
		, en: 'and punctuality :)'
	}
	, {
		query: '.we-help [name="b-61"] span:nth-child(3)'
		, ru: '��, �� �������� ���� ������������'
		, en: 'But we can understand your concerns'
	}
	, {
		query: '.we-help [name="b-61"] span:nth-child(4)'
		, ru: '�� ������ ������ ������������.'
		, en: 'about your wellbeing.'
	}
	, {
		query: '.we-help [name="b-62"] span:nth-child(1)'
		, ru: '�������� �������� �� ����'
		, en: 'Use the promo code I WANT'
	}
	, {
		query: '.we-help [name="b-62"] span:nth-child(2)'
		, ru: '�������� ���� �������!�, �����'
		, en: ' TO CHANGE MY FUTURE!'
	}
	, {
		query: '.we-help [name="b-62"] span:nth-child(3)'
		, ru: '�������� ������������ �� 100 �����'
		, en: 'to get your 100-minute consultation'
	}
	, {
		query: '.we-help [name="b-62"] span:nth-child(4)'
		, ru: '���������! <u e-name="ws-promo"><b>������� �����</b></u> ���'
		, en: 'for FREE! <u e-name="ws-promo"><b>Click here</b></u> to send'
	}
	, {
		query: '.we-help [name="b-62"] span:nth-child(5)'
		, ru: '�������� ��������� ��� � WhatsApp'
		, en: 'the promo code to us via WhatsApp.'
	}
	, {
		query: '.our-methods [name="b-1"] span:nth-child(1)'
		, ru: '���� �������� �����'
		, en: 'Our methods have been'
	}
	, {
		query: '.our-methods [name="b-1"] span:nth-child(2)'
		, ru: '����������'
		, en: 'clinically'
	}
	, {
		query: '.our-methods [name="b-1"] span:nth-child(3)'
		, ru: '�������������� �'
		, en: 'proven and provide'
	}
	, {
		query: '.our-methods [name="b-1"] span:nth-child(4)'
		, ru: '��������� ����������'
		, en: 'measurable results'
	}
	, {
		query: '.our-methods [name="b-2"] span:nth-child(1)'
		, ru: '� ������� �� ���������� ������'
		, en: 'While working'
	}
	, {
		query: '.our-methods [name="b-2"] span:nth-child(2)'
		, ru: '������ � ����������� � ������'
		, en: 'with our therapists you can track'
	}
	, {
		query: '.our-methods [name="b-2"] span:nth-child(3)'
		, ru: '��������, � ��� �����:'
		, en: 'your own progress with:'
	}
	, {
		query: '.our-methods [name="b-311"] span:nth-child(1)'
		, ru: '���������������'
		, en: 'COUNSELLING'
	}
	, {
		query: '.our-methods [name="b-311"] span:nth-child(2)'
		, ru: '���������'
		, en: 'PROGRAMME'
	}
	, {
		query: '.our-methods [name="b-312"] span:nth-child(1)'
		, ru: '- ���������� �� ������� �����'
		, en: '- has been built around your needs'
	}
	, {
		query: '.our-methods [name="b-312"] span:nth-child(2)'
		, ru: '��������'
		, en: 'and focused at resolving'
	}
	, {
		query: '.our-methods [name="b-312"] span:nth-child(3)'
		, ru: ''
		, en: 'your particular case'
	}
	, {
		query: '.our-methods [name="b-312"] span:nth-child(4)'
		, ru: '- �������� ���������� �������� -'
		, en: '- includes an action plan '
	}
	, {
		query: '.our-methods [name="b-312"] span:nth-child(5)'
		, ru: '������� ����������� ������� �'
		, en: 'for you to follow. Using clear'
	}
	, {
		query: '.our-methods [name="b-312"] span:nth-child(6)'
		, ru: '������� "����"'
		, en: 'advice, personal to you'
	}
	, {
		query: '.our-methods [name="b-313"] span:nth-child(1)'
		, ru: '����� 100 ��������'
		, en: 'We have over 100 therapies to offer'
	}
	, {
		query: '.our-methods [name="b-321"] span:nth-child(1)'
		, ru: '����� ���������'
		, en: 'REPORT'
	}
	, {
		query: '.our-methods [name="b-322"] span:nth-child(1)'
		, ru: '- ��������� ������ ���� ��������'
		, en: '- you will get detailed analysis'
	}
	, {
		query: '.our-methods [name="b-322"] span:nth-child(2)'
		, ru: ''
		, en: 'of your case'
	}
	, {
		query: '.our-methods [name="b-322"] span:nth-child(3)'
		, ru: '- ��������� ������������ �'
		, en: '- recommendations and feedback'
	}
	, {
		query: '.our-methods [name="b-322"] span:nth-child(4)'
		, ru: '������������ ���������'
		, en: 'on the progress you are making'
	}
	, {
		query: '.our-methods [name="b-323"] span:nth-child(1)'
		, ru: '������� ���������'
		, en: 'Quick results'
	}
	, {
		query: '.our-methods [name="b-331"] span:nth-child(1)'
		, ru: '��������������'
		, en: 'UNLIMITED'
	}
	, {
		query: '.our-methods [name="b-331"] span:nth-child(2)'
		, ru: '���������'
		, en: 'SUPPORT'
	}
	, {
		query: '.our-methods [name="b-332"] span:nth-child(1)'
		, ru: '- ������ ������������� ��'
		, en: '- all-inclusive support'
	}
	, {
		query: '.our-methods [name="b-332"] span:nth-child(2)'
		, ru: '���������� ���� ���������'
		, en: 'throughout the entire programme'
	}
	, {
		query: '.our-methods [name="b-332"] span:nth-child(3)'
		, ru: ''
		, en: '- in-depth discussions around'
	}
	, {
		query: '.our-methods [name="b-332"] span:nth-child(4)'
		, ru: '- ���������� ����������� �'
		, en: ' your progress and support'
	}
	, {
		query: '.our-methods [name="b-332"] span:nth-child(5)'
		, ru: '����� �������'
		, en: 'with any ongoing issues'
	}
	, {
		query: '.our-methods [name="b-333"] span:nth-child(1)'
		, ru: '������ ��������'
		, en: 'Personal counsellor'
	}
	, {
		query: '.our-methods [name="b-352"] span:nth-child(1)'
		, ru: '�� �� ������ ��������� ���������, �'
		, en: 'We are always ready to go the extra mile.'
	}
	, {
		query: '.our-methods [name="b-352"] span:nth-child(2)'
		, ru: '���������� ���������������'
		, en: 'Once we have matched you to a counsellor, '
	}
	, {
		query: '.our-methods [name="b-352"] span:nth-child(3)'
		, ru: '��������� ������ ��� ��� � ���'
		, en: 'we will keep working on your therapy'
	}
	, {
		query: '.our-methods [name="b-352"] span:nth-child(4)'
		, ru: '������� ����� ��������.'
		, en: 'programme, taking into account your'
	}
	, {
		query: '.our-methods [name="b-352"] span:nth-child(5)'
		, ru: ''
		, en: 'personality and any issues you are'
	}
	, {
		query: '.our-methods [name="b-352"] span:nth-child(6)'
		, ru: ''
		, en: 'struggling with.'
	}
	, {
		query: '.comand [name="b-1"] span:nth-child(1)'
		, ru: '���� � �������'
		, en: 'It is all about teamwork'
	}
	, {
		query: '.comand [name="b-2"] span:nth-child(1)'
		, ru: '� ����������� �������,'
		, en: 'Many scientists and psychologists from '
	}
	, {
		query: '.comand [name="b-2"] span:nth-child(2)'
		, ru: '������������� � �����������'
		, en: 'the UK, Europe, Asia and America'
	}
	, {
		query: '.comand [name="b-2"] span:nth-child(3)'
		, ru: '���� ��� ������� ������,'
		, en: 'invested their skills, experience and '
	}
	, {
		query: '.comand [name="b-2"] span:nth-child(4)'
		, ru: '����������� ������ ������ �'
		, en: 'knowledge into research and developed'
	}
	, {
		query: '.comand [name="b-2"] span:nth-child(5)'
		, ru: '��������� �� ������, ������ �'
		, en: 'the methods that we use today for '
	}
	, {
		query: '.comand [name="b-2"] span:nth-child(6)'
		, ru: '�������.'
		, en: 'efficient online counselling.'
	}
	, {
		query: '.comand [name="b-4"] span:nth-child(1)'
		, ru: '�� ������ �� �������� ��������'
		, en: 'We would like to express our deepest'
	}
	, {
		query: '.comand [name="b-4"] span:nth-child(2)'
		, ru: '������������� ����� ��������'
		, en: 'gratitude to our colleagues'
	}
	, {
		query: '.comand [name="b-51"] span:nth-child(2)'
		, ru: '�� - ������!'
		, en: 'You are the best!'
	}
	, {
		query: '.comand [e-name="who-full"] span:nth-child(1)'
		, ru: '���������� ���� ������'
		, en: 'View the full list'
	}
	, {
		query: '.we-near [name="b-1"] span:nth-child(1)'
		, ru: '�� ����� ������ �����,'
		, en: 'We are always by your side, '
	}
	, {
		query: '.we-near [name="b-1"] span:nth-child(2)'
		, ru: '����� ������'
		, en: 'always ready to help'
	}
	, {
		query: '.we-near [name="b-2"] span:nth-child(1)'
		, ru: '���� ����� �������� ���� �� ����'
		, en: 'People are often left'
	}
	, {
		query: '.we-near [name="b-2"] span:nth-child(2)'
		, ru: '�� ������ ����������...'
		, en: 'alone with their concerns...'
	}
	, {
		query: '.we-near [name="b-31"] span:nth-child(1)'
		, ru: '�� ������� ���������'
		, en: 'Do you feel like you are '
	}
	, {
		query: '.we-near [name="b-31"] span:nth-child(2)'
		, ru: '������� �����?'
		, en: 'lacking support from'
	}
	, {
		query: '.we-near [name="b-31"] span:nth-child(3)'
		, ru: '������� �����?'
		, en: 'family and friends?'
	}
	, {
		query: '.we-near [name="b-41"] span:nth-child(1)'
		, ru: '��������� ��������'
		, en: 'Have you tried to substitute '
	}
	, {
		query: '.we-near [name="b-41"] span:nth-child(2)'
		, ru: '��������� �������� �'
		, en: 'professional advice with a chat '
	}
	, {
		query: '.we-near [name="b-41"] span:nth-child(3)'
		, ru: '�������� � ����, ��'
		, en: 'to a friend at a coffee shop, '
	}
	, {
		query: '.we-near [name="b-41"] span:nth-child(4)'
		, ru: '�������� ������:'
		, en: 'but have only heard: �not to '
	}
	, {
		query: '.we-near [name="b-41"] span:nth-child(5)'
		, ru: '"�� ������, ��'
		, en: 'worry, everything is '
	}
	, {
		query: '.we-near [name="b-41"] span:nth-child(6)'
		, ru: '�������"'
		, en: 'going to settle down�?'
	}
	, {
		query: '.we-near [name="b-51"] span:nth-child(1)'
		, ru: '������ ������'
		, en: 'Long-awaited visits '
	}
	, {
		query: '.we-near [name="b-51"] span:nth-child(2)'
		, ru: '� ���������'
		, en: 'to a psychologist are '
	}
	, {
		query: '.we-near [name="b-51"] span:nth-child(3)'
		, ru: '����� ������, �� ��'
		, en: 'expensive and you are not '
	}
	, {
		query: '.we-near [name="b-51"] span:nth-child(4)'
		, ru: '���� �����������?'
		, en: 'getting results you '
	}
	, {
		query: '.we-near [name="b-51"] span:nth-child(5)'
		, ru: ''
		, en: 'have expected? '
	}
	, {
		query: '.we-near [name="b-61"] span:nth-child(1)'
		, ru: '��� ����� ��'
		, en: 'Does it feel like '
	}
	, {
		query: '.we-near [name="b-61"] span:nth-child(2)'
		, ru: '��������?'
		, en: 'nobody can '
	}
	, {
		query: '.we-near [name="b-61"] span:nth-child(3)'
		, ru: ''
		, en: 'understand you?'
	}
	, {
		query: '.we-near [name="b-7"] span:nth-child(1)'
		, ru: '�������,  ������?'
		, en: "It sounds familiar, doesn't it?"
	}
	, {
		query: '.we-near [name="b-8"] span:nth-child(1)'
		, ru: '��������� ���� - ����� ����!'
		, en: "But there is a solution! "
	}
	, {
		query: '.we-history [name="b-91"] span:nth-child(1)'
		, ru: '���������� ����'
		, en: 'Listen to our '
	}
	, {
		query: '.we-history [name="b-91"] span:nth-child(2)'
		, ru: '�������'
		, en: 'clients'
	}
	, {
		query: '.we-history [name="b-921"] span:nth-child(1)'
		, ru: '������� ����� �������� - ��� ��'
		, en: 'Our clients� stories are not about their'
	}
	, {
		query: '.we-history [name="b-921"] span:nth-child(2)'
		, ru: '�������� �������.'
		, en: ' issues.'
	}
	, {
		query: '.we-history [name="b-921"] span:nth-child(3)'
		, ru: '��� - ���������� �������,'
		, en: 'These are success stories, based on '
	}
	, {
		query: '.we-history [name="b-921"] span:nth-child(4)'
		, ru: '���������� �� �����'
		, en: 'positive results achieved upon '
	}
	, {
		query: '.we-history [name="b-921"] span:nth-child(5)'
		, ru: '��������������� ����������.'
		, en: 'completion of the therapies we offer. '
	}
	, {
		query: '.we-history [name="b-922"] span:nth-child(1)'
		, ru: '� ��� ���� ���-��� ��� �������'
		, en: 'We have a solution for every case'
	}
	, {
		query: '.we-history [name="b-93"] span:nth-child(1)'
		, ru: '�� �������� ����� �� ���� �����������'
		, en: 'We help clients all over the world '
	}
	, {
		query: '.we-history [name="b-93"] span:nth-child(2)'
		, ru: '���������� �� �����������, ����������'
		, en: 'to cope with difficulties, overcome '
	}
	, {
		query: '.we-history [name="b-93"] span:nth-child(3)'
		, ru: '��������� �����������, ����� ���, ���'
		, en: 'obstacles and become the people they '
	}
	, {
		query: '.we-history [name="b-93"] span:nth-child(4)'
		, ru: '������ �������� ����.'
		, en: 'always wanted to be.'
	}
	, {
		query: '.we-history [name="b-94"] span:nth-child(1)'
		, ru: '������� ��'
		, en: 'Click on this icon'
	}
	, {
		query: '.we-history [name="b-94"] span:nth-child(3)'
		, ru: ', ����� ����������.'
		, en: ' to listen.'
	}
	, {
		query: '.not-odin [name="b-1"] span:nth-child(1)'
		, ru: '�� ����������� �'
		, en: 'Don�t struggle on your'
	}
	, {
		query: '.not-odin [name="b-1"] span:nth-child(2)'
		, ru: '���������� �������'
		, en: ' own, get support!'
	}

	, {
		query: '.not-odin [name="b-2"] span:nth-child(1)'
		, ru: '���� � ������� ����� ��������'
		, en: 'Recovery starts '
	}
	, {
		query: '.not-odin [name="b-2"] span:nth-child(2)'
		, ru: '���������� � ������� ���������'
		, en: 'with the first message'
	}

	, {
		query: '.not-odin [name="b-4"] span:nth-child(1)'
		, ru: '�������� ���������'
		, en: 'Start texting'
	}

	, {
		query: '.stress [name="b-2"] span:nth-child(1)'
		, ru: '���������� �'
		, en: 'Are '
	}
	, {
		query: '.stress [name="b-2"] span:nth-child(2)'
		, ru: '����������'
		, en: 'you '
	}
	, {
		query: '.stress [name="b-2"] span:nth-child(3)'
		, ru: '��������?'
		, en: 'stressed?'
	}

	, {
		query: '.stress [name="b-3"] span:nth-child(1)'
		, ru: '���������� ���������'
		, en: 'Try to do '
	}
	, {
		query: '.stress [name="b-3"] span:nth-child(2)'
		, ru: '������� ����������'
		, en: 'a simple exercise'
	}

	, {
		query: '.stress [name="b-4"] span:nth-child(1)'
		, ru: '������ ����������'
		, en: 'Start exercise'
	}


	, {
		query: '.karta [name="b-1"] span:nth-child(1)'
		, ru: '�� �����'
		, en: 'We are here for you'
	}

	, {
		query: '.karta [name="b-2"] span:nth-child(1)'
		, ru: '123317, �. ������,'
		, en: '90 York Way, '
	}
	, {
		query: '.karta [name="b-2"] span:nth-child(2)'
		, ru: '����������� ����������, 12'
		, en: 'N1 9AG London'
	}
	, {
		query: '.karta [name="b-2"] span:nth-child(3)'
		, ru: 'hello@1-min.ru'
		, en: 'hello@effirio.co.uk'
	}

	, {
		query: '.karta [name="b-41"] span:nth-child(2)'
		, ru: '+7 (963) 195-30-28'
		, en: '+44 7459 129021'
	}

	, {
		query: '.karta [name="b-42"] span:nth-child(1)'
		, ru: '��������� ��������� ��������� � ��������������'
		, en: 'Terms and Conditions (By sending this message you'
	}
	, {
		query: '.karta [name="b-42"] span:nth-child(2)'
		, ru: '������� �����, �� ������������ � <u>����������������</u>'
		, en: ' accept our Terms and Conditions)'
	}
	, {
		query: '.karta [name="b-42"] span:nth-child(3)'
		, ru: '<u>�����������</u>'
		, en: ''
	}

	, {
		query: '.karta [name="b-44"] span:nth-child(1)'
		, ru: '���� �� ���������� � ������� ��������, ����������'
		, en: 'If you are in a dangerous or life threatening situation'
	}
	, {
		query: '.karta [name="b-44"] span:nth-child(2)'
		, ru: '����� ����� ��� �� ������ 18 ���, �� �����������'
		, en: " - don't use this site. Instead, seek immediate help "
	}
	, {
		query: '.karta [name="b-44"] span:nth-child(3)'
		, ru: '������ ������. �������� � �������� 112 ����'
		, en: 'from these recourses.'
	}
	, {
		query: '.karta [name="b-44"] span:nth-child(4)'
		, ru: '��������� � ��� �����, <u>����� �����.</u>'
		, en: ''
	}

	, {
		query: '.karta [name="b-45"] span:nth-child(1)'
		, ru: '������ �������� ������'
		, en: 'PERSONAL THERAPIST ONLINE'
	}
	, {
		query: '.karta [name="b-45"] span:nth-child(2)'
		, ru: '� 2021 "������ �������"'
		, en: '� 2021 EFFIRIO'
	}

	, {
		query: '.ws [name="b-ws-2"]'
		, ru: '������ � ������������'
		, en: 'get tips and advice '
	}
	, {
		query: '.ws [name="b-ws-3"]'
		, ru: '����� ������'
		, en: 'right now'
	}
];

function change_language(l) {
	lang = l;
	var e = {};
	for (var i = 0; i < ln.length; i++) {
		e = document.querySelector(ln[i].query);
		if (e) {
			e.innerHTML = ln[i][lang];
		}
	}
}

function end_language() {
	if (lang == 'en') {
		document.querySelector('.what-u-button span:nth-child(1)').style.marginLeft = '1.3em';
		document.querySelector('.we-help [name="b-23"] span:nth-child(1)').style.marginLeft = '4.9em';
		document.querySelector('.we-help [name="b-33"] span:nth-child(1)').style.marginLeft = '5.5em';
		document.querySelector('.we-help [name="b-51"]').style.marginLeft = '.7em';
		document.querySelector('.our-methods [name="b-323"] span:nth-child(1)').style.marginLeft = '3em';
		document.querySelector('.our-methods [name="b-352"]').style.marginTop = '1em';
		document.querySelector('.we-near [name="b-31"]').style.marginTop = '1em';
		document.querySelector('.we-near [name="b-31"]').style.marginLeft = '-1.5em';
		document.querySelector('.we-near [name="b-41"]').style.marginLeft = '-2em';
		document.querySelector('.we-near [name="b-51"]').style.marginLeft = '-1.5em';
		document.querySelector('.we-near [name="b-61"]').style.marginTop = '1.5em';
		document.querySelector('.we-history [name="b-94"] span:nth-child(1)').style.marginLeft = '-2em';
		document.querySelector('.we-history [name="b-94"] span:nth-child(3)').style.marginLeft = '9em';
		document.querySelector('.not-odin [name="b-4"] span:nth-child(1)').style.marginLeft = '4.5em';
		document.querySelector('.stress [name="b-4"] span:nth-child(1)').style.marginLeft = '5em';
	}
	else {
		document.querySelector('.what-u-button span:nth-child(1)').style.marginLeft = '';
		document.querySelector('.we-help [name="b-23"] span:nth-child(1)').style.marginLeft = '';
		document.querySelector('.we-help [name="b-33"] span:nth-child(1)').style.marginLeft = '';
		document.querySelector('.we-help [name="b-51"]').style.marginLeft = '';
		document.querySelector('.our-methods [name="b-323"] span:nth-child(1)').style.marginLeft = '';
		document.querySelector('.our-methods [name="b-352"]').style.marginTop = '';
		document.querySelector('.we-near [name="b-31"]').style.marginTop = '';
		document.querySelector('.we-near [name="b-31"]').style.marginLeft = '';
		document.querySelector('.we-near [name="b-41"]').style.marginLeft = '';
		document.querySelector('.we-near [name="b-51"]').style.marginLeft = '';
		document.querySelector('.we-near [name="b-61"]').style.marginTop = '';
		document.querySelector('.we-history [name="b-94"] span:nth-child(1)').style.marginLeft = '';
		document.querySelector('.we-history [name="b-94"] span:nth-child(3)').style.marginLeft = '';
		document.querySelector('.not-odin [name="b-4"] span:nth-child(1)').style.marginLeft = '';
		document.querySelector('.stress [name="b-4"] span:nth-child(1)').style.marginLeft = '';
	}
}
//language end =====================================================================================================

