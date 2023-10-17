const DefaultLayouts = {
	ultraWideFull: 'ultraWideFull',
	ultraWide: 'ultraWide',
	wideFull: 'wideFull',
	wide: 'wide',
	wideStrechedFull: 'wideStrechedFull',
	wideStrechedFullDouble: 'WideStrechedFullDouble',
	wideStreched: 'wideStreched',
	wideStrechedDouble: 'wideStrechedDouble',
	wideStrechedFullList: 'wideStrechedFullList',
	wideStrechedList: 'wideStrechedList',
	doublets: 'doublets',
	doubletsDouble: 'doubletsDouble',
	doubletsFull: 'doubletsFull',
	doubletsFullDouble: 'doubletsFullDouble',
	doubletsConstant: 'doubletsConstant',
	doubletsDoubleConstant: 'doubletsDoubleConstant',
	doubletsFullConstant: 'doubletsFullConstant',
	doubletsFullDoubleConstant: 'doubletsFullDoubleConstant',
	longDoublets: 'longDoublets',
	longDoubletsDouble: 'longDoubletsDouble',
	longDoubletsFull: 'longDoubletsFull',
	longDoubletsFullDouble: 'longDoubletsFullDouble',
	longDoubletsConstant: 'longDoubletsConstant',
	longDoubletsDoubleConstant: 'longDoubletsDoubleConstant',
	longDoubletsFullConstant: 'longDoubletsFullConstant',
	longDoubletsFullDoubleConstant: 'longDoubletsFullDoubleConstant',
	triplets: 'triplets',
	tripletsDouble: 'tripletsDouble',
	tripletsFull: 'tripletsFull',
	tripletsFullDouble: 'tripletsFullDouble',
	tripletsConstant: 'tripletsConstant',
	tripletsDoubleConstant: 'tripletsDoubleConstant',
	tripletsFullConstant: 'tripletsFullConstant',
	tripletsFullDoubleConstant: 'tripletsFullDoubleConstant',
	longTriplets: 'longTriplets',
	longTripletsDouble: 'longTripletsDouble',
	longTripletsFull: 'longTripletsFull',
	longTripletsFullDouble: 'longTripletsFullDouble',
	longTripletsConstant: 'longTripletsConstant',
	longTripletsDoubleConstant: 'longTripletsDoubleConstant',
	longTripletsFullConstant: 'longTripletsFullConstant',
	longTripletsFullDoubleConstant: 'longTripletsFullDoubleConstant',
	none: ''
};
const CellDesings = {
	Special1: 'Special1',
	Special2: 'Special2',
	Special3: 'Special3',
	CELLHelperText: 'CELLHelperText',
	small1: 'small1',
	small2: 'small2',
	normal1: 'normal1',
	normal2: 'normal2',
	normal3: 'normal3',
	normal4: 'normal4',
	normal5: 'normal5',
	normal6: 'normal6',
	normal7: 'normal7',
	wide1: 'wide1',
	wide2: 'wide2',
	wide3: 'wide3',
	wide4: 'wide4',
	wide5: 'wide5',
	wide6: 'wide6',
	wide7: 'wide7',
	wide8: 'wide8',
	wide9: 'wide9',
	wide10: 'wide10',
	wide11: 'wide11'
};
const Paging = {
	leading: 'leading',
	centered: 'centered',
	none: ''
};
const Orientation = {
	horizontal: 'horizontal',
	vertical: 'vertical'
};

function MainPage(request, extra, javascriptConfig, output) {
	this.request = request;
	this.extra = extra;
	this.javascriptConfig = javascriptConfig;
	this.output = output;
}

function ModuleRequest(url, method, headers, httpBody) {
	this.url = url;
	this.method = method;
	this.headers = headers;
	this.httpBody = httpBody;
}

function Extra(commands, extraInfo) {
	this.commands = commands;
	this.extraInfo = extraInfo;
}

function Commands(commandName, params) {
	this.commandName = commandName;
	this.params = params;
}

function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
	this.removeJavascript = removeJavascript;
	this.loadInWebView = loadInWebView;
	this.javaScript = javaScript;
}

function KeyValue(key, value) {
	this.key = key;
	this.value = value;
}

function Output(cellDesing, orientation, defaultLayout, paging, section, layout, data) {
	this.cellDesing = cellDesing;
	this.orientation = orientation;
	this.defaultLayout = defaultLayout;
	this.paging = paging;
	this.section = section;
	this.layout = layout;
	this.data = data;
}

function Section(sectionName, separator) {
	this.sectionName = sectionName;
	this.separator = separator;
}

function Data(image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView) {
	this.image = image;
	this.title = title;
	this.description = description;
	this.field1 = field1;
	this.field2 = field2;
	this.field3 = field3;
	this.field4 = field4;
	this.isChapter = isChapter;
	this.link = link;
	this.openInWebView = openInWebView;
}

function getValueFromKey(keys, key) {
	for (var x = 0; x < keys.length; x++) {
		let tKey = keys[x];
		if (tKey.key == key) {
			return tKey.value;
		}
	}
	return '';
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let output = parsedJson.output;
let emptyKeyValue = [new KeyValue('', '')];
var extraInfo = parsedJson.extra.extraInfo;
var count = parseInt(getValueFromKey(extraInfo, 'count'));
var lastAnime = [];
anime = document.querySelectorAll('.col-12.col-md-6.badge-pos-1');
for (list of anime) {
	let title = list.querySelector('.h5 a').textContent;
	var link = list.querySelector('a').href;
	link = new ModuleRequest(link, 'get', emptyKeyValue, null);
	var image = '';
	try {
		image = list.querySelector('.item-thumb img').srcset.split(' ')[4];
	} catch {}
	if (image == null) {
		image = list.querySelector('.item-thumb img').src;
	}
	image = new ModuleRequest(image, 'get', emptyKeyValue, null);
	try {
		var ep = 'Épisode ' + list.querySelector('.btn-link').textContent;
		if (ep.includes('FILM')) {
			ep = 'Film'
		}
	} catch (e) {
		ep = ''
	};
	lastAnime.push(new Data(image, title, '', ep, '', '', '', false, link));
}
output.push(new Output(CellDesings.normal1, Orientation.vertical, DefaultLayouts.longTripletsFullConstant, Paging.leading, new Section('Derniers épisodes VF', true), null, lastAnime));
count = count + 1;
extraInfo[0].value = '' + count;
var nextRequest = getValueFromKey(extraInfo, '' + count);
let MainPageObject = new MainPage(new ModuleRequest('', 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;