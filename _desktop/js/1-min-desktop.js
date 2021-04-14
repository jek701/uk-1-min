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
	+ '<div name="b-3" class="block l-164 ln-24 f-bold"><span class="f-18">Ответим сразу!</div>'
	+ '<div name="b-4" e-name="button-cl" class="b-click"><div class="b-centor"><span class="f-18">Написать</span></div></div>'
	+ '<div name="b-5" class="b-img" style="{IMG}"></div>'
	+ '</div>';
function site_loading() {
	var el = document.querySelector('.what-u-feel');
	var str_html = '<div e-name="mouse-check" mouse-check="{I}" class="what-u-el" style="background: {BACK};">'
		+ '<div name="b-1" class="mouse-check">'
		+ '<div name="b-11" class="block l-162 ln-90"><span class="f-65 u">{TEXT}</span></div>'
		+ '</div>'
		+ '</div>';
	var str_el = 'ДЕПРЕССИЯ:#FFEC00:Во время депрессии очень часто ничего не хочется делать, отсутствует интерес ко всему, и ничто не приносит удовольствие.<br /><br />Вы узнаете, как можно жить полной жизнью с помощью нашей психологической программы по устранению депрессии.;'
		+ 'проблемы в отношениях:#FFE00E:Ссоры, недовольство партнером, постоянная критика, агрессия, ревность могут свидетельствовать о проблемах в отношениях.<br /><br />Решить их и достичь гармонии в паре можно с помощью нашей психологической программы.;'
		+ 'непонимание:#FFD41D:Часто кажется, что близкие и окружающие совершенно вас не понимают? Постоянно возникают конфликты?<br /><br />Попробуйте нашу психологическую программу, чтобы найти причины недопониманий и повысить качество жизни.;'
		+ 'одиночество:#FFCB11:Одинокий человек даже среди людей может считать себя ненужным, покинутым, несчастным.<br /><br />Изменить свою жизнь, сделать ее счастливее и избавиться от одиночества можно с помощью специальной психологической программы.;'
		+ 'разочарование:#FFBC3A:Бывает так, что мечты не сбываются, а представления о людях на деле оказываются ложными. И наступает разочарование.<br /><br />Избавиться от этого чувства, взглянуть на жизнь по-новому поможет индивидуальная психологическая программа.;'
		+ 'больная привязанность:#ffb048:При больной привязанности представления о жизни без определенного человека вызывают сильный страх и боль.<br /><br />Решить эту проблему, стать независимым можно с помощью психологической программы, которая разрабатывается индивидуально.;'
		+ 'страх:#ffa457:Страх может изматывать человека морально и физически, лишать его перспектив, вызывать непонимание со стороны близких.<br /><br />Избавиться от страха и обрести уверенность в себе можно с помощью нашей психологической программы.;'
		+ 'тревога:#ff9865:Неопределенность может вызывать у человека тревожные мысли, заставлять беспокоиться по пустякам. Иногда повышенная тревожность возникает и без причин.<br /><br />Узнайте, как избавиться от нее с помощью нашей психологической программы.;'
		+ 'сложности в семье:#ff8c74:Непонимание со стороны близких, частые конфликты, отсутствие тепла и уважения - семейные проблемы, которые нужно решать незамедлительно.<br /><br />Сделать это можно с помощью нашей психологической программы.;'
		+ 'апатия:#ff866a:При апатии человек ощущает безразличие, снижается интерес к общению и прежним увлечениям, отсутствуют стремления и эмоции.<br /><br />Узнайте, как вернуть вкус к жизни с помощью нашей психологической программы.;'
		+ 'нервы:#ff815c:Бывает так, что нервы напрягаются до предела, а любая мелочь выводит из состояния равновесия. Из-за этого появляются проблемы на работе и в семье.<br /><br />Узнайте, как стать спокойнее с помощью индивидуальной психологической программы.;'
		+ 'отсутствие мотивации:#ff7c4d:Низкая мотивация или ее полное отсутствие мешают достигать поставленных целей и улучшать качество жизни.<br /><br />Узнай, как побудить себя к активным действиям с помощью нашей психологической программы.;'
		+ 'нарушение сна:#ff773f:При нарушениях сна человек чувствует себя разбитым и уставшим, у него снижается концентрация, появляется раздражительность.<br /><br />Индивидуальная психологическая программа поможет наладить сон и восстановиться.;'
		+ 'агрессия:#ff7231:Из-за агрессии человек может срываться на своих близких, а затем испытывать чувство вины.<br /><br />Справиться с проблемой поможет психологическая программа, разработанная специально для вас.;'
		+ 'личная жизнь:#ff6d22:Проблемы в личной жизни приводят к снижению самооценки, плохому настроению и разочарованиям.<br /><br />Решить их и построить крепкие отношения можно с помощью нашей психологической программы.;'
		+ 'усталость:#ff6914:Из-за усталости порой все валится из рук, ощущается внутреннее опустошение, ухудшается память и сон. Нет сил вставать по утрам и общаться с окружающими.<br /><br />Вернуть жизненную энергию поможет наша психологическая программа.;'
		+ 'неуверенность в себе:#ff6406:Неуверенность в себе порождает в человеке ощущение ненужности, неполноценности. Он не верит в свои возможности, отказывается от перспектив.<br /><br />Повысить самооценку поможет специальная психологическая программа.;'
		+ 'потеря смысла жизни:#fd6006:Потеря смысла жизни может привести к апатии, депрессии или отчаянию.<br /><br />Найти этот самый смысл заново поможет индивидуальная психологическая программа.;'
		+ 'конфликты на работе:#fb5e0d:Конфликты на работе приводят к напряжению, неудовлетворенности своей деятельностью и жизнью в целом.<br /><br />Решить их без особых потерь поможет психологическая программа, которая разрабатывается под каждого индивидуально.;'
		+ 'лишний вес:#f85b15:Из-за лишнего веса страдает самооценка, появляются проблемы в личной жизни, возникают различные заболевания. Сегодня можно похудеть и без строгих диет.<br /><br />Просто попробуйте специальную психологическую программу.;'
		+ 'трудности в общении:#f5591c:Трудности в общении мешают устанавливать социальные связи и строить карьеру.<br /><br />Избавиться от них, стать коммуникабельным и уверенным в себе можно с помощью нашей психологической программы.;'
		+ 'злость:#f25724:Если сдерживать злость - она вредит здоровью. Если выражать ее - возникают конфликты с окружающими.<br /><br />Справиться с этим негативным чувством без последствий для организма и отношений поможет индивидуальная психологическая программа.;'
		+ 'принятие себя:#f0542b:Проблемы с принятием себя ведут к неудовлетворенностью жизнью, снижению ее качества, комплексам, сложностям в отношениях.<br /><br />Научиться принимать себя, достичь внутренней гармонии поможет наша психологическая программа.;'
		+ 'абьюз:#ed5233:Абьюз приводит к нарушениям физического и психического состояния. Жертвы чувствуют страх и отчаяние, но не могут выйти из токсичных отношений.<br /><br />Узнайте, как с этим справиться с помощью специальной психологической программы.;'
		+ 'стресс:#ea4f3a:Из-за частого стресса человек теряет энергию, поэтому у него снижается работоспособность и концентрация, появляются рассеянность и чрезмерная усталость.<br /><br />Узнайте, как бороться со стрессом с помощью нашей психологической программы.;'
		+ 'токсичность:#db4d47:После общения с токсичными людьми обычно портится настроение, появляется усталость и раздражительность.<br /><br />Узнайте, как правильно взаимодействовать с подобными личностями. Используйте нашу психологическую программу.;'
		+ 'самореализация:#be4b58:Сложности с самореализацией влияют на самооценку и уровень удовлетворенности жизнью.<br /><br />С помощью специальной психологической программы вы узнаете, как найти себя.;'
		+ 'опустошенность:#a24969:Опустошенный человек не чувствует внутренних сил, с трудом встает по утрам, не ощущает интереса к общению и повседневным делам.<br /><br />Справиться с этой проблемой поможет персональная психологическая программа.;'
		+ 'эмоции:#85487a:Излишние эмоции или полное их отсутствие приводят к сложностям в общении и на работе, снижают качество жизни.<br /><br />Узнайте, как решить эти проблемы с помощью индивидуальной психологической программы.;'
		+ 'поиск себя:#69468b:Поиск себя может сопровождать чувство неопределенности, страхи, неуверенность, проблемы с самооценкой.<br /><br />Узнайте, как быстро самореализоваться с помощью нашей психологической программы.;'
		+ 'закрытость:#4c449c:Излишние эмоции или полное их отсутствие приводят к сложностям в общении и на работе, снижают качество жизни.<br /><br />Узнайте, как решить эти проблемы с помощью индивидуальной психологической программы.;'
		+ 'лидерство:#3042ad:Лидеры чувствуют себя важными, нужными и значимыми. Они ощущают удовольствие от своей деятельности и каждой новой победы.<br /><br />Узнайте, как развить лидерские качества и проявить себя с помощью специальной психологической программы.;'
		+ 'напряжение:#1340bf:Излишняя напряженность приводит к плохому настроению, тревожности, усталости, снижает концентрацию, ухудшает память.<br /><br />Узнайте, как обрести спокойствие и научиться расслабляться с помощью нашей психологической программы.;'
		+ 'алкоголь:#0044ca:Алкогольная зависимость ведет к заболеваниям, проблемам в семье и на работе. Личность человека постепенно начинает разрушаться.<br /><br />Узнайте, как навсегда победить зависимость с помощью индивидуальной психологической программы.;'
		+ 'расставание:#0052ca:Расставание часто вызывает грусть, проблемы с самооценкой, сильную боль, разочарование и сожаление.<br /><br />Справиться с негативными эмоциями и подготовиться к новым отношениям поможет специальная психологическая программа.;'
		+ 'любовь:#0060c9:Любовь вызывает сильные эмоции. И не всегда позитивные. Особенно, если объект любви не отвечает взаимностью или ведет себя недостойно.<br /><br />Решить проблемы в личной жизни поможет наша психологическая программа.;'
		+ 'чувство вины:#006ec9:Чувство вины может вызывать тревогу, ухудшать настроение, снижать качество жизни.<br /><br />Наша психологическая программа, которая разрабатывается под каждого человека индивидуально, поможет избавиться от этого разрушающего чувства.;'
		+ 'утрата:#007dc9:При утрате человек может испытывать сильную боль, отчаяние, чувство вины и даже дойти до депрессии.<br /><br />Пережить тяжелое событие поможет специальная психологическая программа.;'
		+ 'адаптация:#008bc9:Адаптация взрослых и детей может сопровождаться негативным эмоциональным состоянием, повышенной тревожностью, нарушением сна.<br /><br />Узнайте, как привыкнуть к новой обстановке без последствий с помощью нашей психологической программы.;'
		+ 'буллинг:#0099c8:Буллинг или травля часто приводит к тому, что жертва начинает терять уверенность в себе. Все это может обернуться трагедией.<br /><br />Узнайте, как бороться с буллингом с помощью нашей психологической программы.;'
		+ 'карьера:#00a7c8:Сложности с построением карьеры приводят к проблемам с самооценкой, неудовлетворенности собственной жизнью.<br /><br />Наша психологическая программа научит вас добиваться успеха и двигаться вверх по карьерной лестнице.;'
		+ 'любовник:#00b3c6:Когда женщина узнает о любовнице у мужа - рушится мир. Она сравнивает себя с соперницей, падает самооценка, в голове крутится куча вопросов.<br /><br />Узнайте, как пережить измену без последствий с помощью нашей психологической программы.;'
		+ 'смена места жительства:#01b6b8:Смена места жительства может приводить к тревожности, страхам, чувству неопределенности.<br /><br />Справиться с этим и спокойно пережить переезд поможет наша психологическая программа.;'
		+ 'низкая самооценка:#01b9aa:Из-за низкой самооценки упускаются перспективы, теряются возможности, часто переживают и тревожатся по пустякам.<br /><br />Специальная психологическая программа поможет обрести уверенность в себе и повысить качество жизни.;';
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
            + '<div e-name="what-u-button" class="what-u-button"><span>Не могу понять.</span>'
                + '<span>Помогите разобраться в себе!</span></div>'
        + '</div>';

	//command
	el = document.querySelector('.comand [name="b-52"]');
	str_html = '<div class="who"><div class="who-el-1 block f-semibold"><span>{NAME}</span></div><div class="who-el-2 block"><span>{COMP}</span></div></div>';
	str_el = 'Кети Доусон:(Университет Нового Южного Уэльса (UNSW));'
		+ 'Марк ван Оммерен:(Всемирная Организация Здравоохранения - (ВОЗ));'
		+ 'Нэнси Бэрон:(Институт психосоциальных услуг и обучения);'
		+ 'Пьер Бастин:(Международный комитет Красного Креста);'
		+ 'Джонатан Биссон:(Университет Кардиффа);'
		+ 'Дэн Чизхолм:(Всемирная Организация Здравоохранения - (ВОЗ));'
		+ 'Нирджа Чоудхари:(Сангат, Индия);'
		+ 'Рэйчел Коэн:(Сommon Threads Project, США);'
		+ 'Пим Куиджперс:(Амстердамский свободный университет);'
		+ 'Джоанна Эппинг-Джордан:(Сиэтл, США);'
		+ 'Мишель Функ:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Клаудиа Гарсия-Морено:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Стивен Холлон:(Университет Вандербильта);'
		+ 'Сарб Джохал:(Университет Мэсси);'
		+ 'Дейл Джонс:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Линн Джонс:(Гарвардская школа общественного здоровья);'
		+ 'Берит Кизельбах:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Аннет Клейбоер:(Амстердамский свободный университет);'
		+ 'Роос Корсте:(Амстердам, Нидерланды);'
		+ 'Айсиха Малик:(Оксфордский университет);'
		+ 'Анита Марини:(Римини, Италия);'
		+ 'Лаура Мюррей:(Университет Джонса Хопкинса);'
		+ 'Себастьян Нкомо Да Гама:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Бхава Поудьял:(Баку, Азербайджан);'
		+ 'Атиф Рахман:(Университет Ливерпуля);'
		+ 'Элисон Шафер:(World Vision International);'
		+ 'Мариан Шильпероорд:(Управление Верховного комиссара по работе с сообщениями (УВКБ));'
		+ 'Ютаро Сетойя:(Всемирная Организация Здравоохранения - (ВОЗ);'
		+ 'Марит Сийбрандиж:(Амстердамский свободный университет);'
		+ 'Ренато Соуза:(Университет Сан-Паулу);'
		+ 'Витсе Тол:(Университет Джонса Хопкинса);'
		+ 'Питер Вентефогель:(Управление Верховного комиссара по работе с сообщениями (УВКБ));'
		+ 'Хелена Вердели:(Колумбийский университет);'
		+ 'Инка Вайсбекер:(Международный медицинский корпус);'
		+ 'Валери Висард:(Женева, Швейцария);'
		+ 'Таги Ясами:(Всемирная Организация Здравоохранения - (ВОЗ));'
		+ 'Билл Юл:(Королевский колледж Лондона);'
		+ 'Дуг Затзик:(Университет штата Вашингтон);';

	arr = str_el.split(';');
	str_html_in = '';
	e = [];
	for (var i = 0; i < arr.length - 1; i++) {
		e = arr[i].split(':');
		str_html_in += str_html.replace('{NAME}', e[0]).replace('{COMP}', e[1]);
	}
	el.innerHTML += ''
		+ str_html_in
		//+ '<div class="page-next who-full"><p>Скрыть дополнительный список</p></div>'
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
				section.querySelector('.who-full span').innerHTML = 'Посмотреть весь список';
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
				section.querySelector('.who-full span').innerHTML = 'Свернуть список';
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
			//location.href = 'https://api.whatsapp.com/send?phone=79153356488&text=' + encodeURI('Здравствуйте! Хочу узнать больше о консультации с психологом');
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
			location.href = 'https://api.whatsapp.com/send?phone=79153356488&text=' + encodeURI('Здравствуйте! Хочу узнать больше о консультации с психологом. Таймер запущен');
		}
		else if (s == 'ws-promo') {
			location.href = 'https://api.whatsapp.com/send?phone=79153356488&text=' + encodeURI('Здравствуйте! Хочу узнать больше о консультации с психологом. Я ХОЧУ ИЗМЕНИТЬ СВОЕ БУДУЩЕЕ (мой промокод: ' + (76280000 + getRandom(1, 10000)).toFixed(0) + ')');
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
	document.querySelector('[name="b-ws-1"]').innerHTML = i.toFixed(0) + ' человек получают';
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
