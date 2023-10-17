function Info(request, extra, javascriptConfig, output) {
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
function Chapter(chapName, link,openInWebView) {
    this.chapName = chapName;
    this.link = link;
    this.openInWebView = openInWebView;
}
function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
    this.image = image;
    this.link = link;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.chapters = chapters;
}

var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];
const imgsHeaders = [new KeyValue('Referer', parsedJson.request.url.split('/manga')[0])];

var image = document.querySelector('.bigcover > .ime > img').src;
image = new ModuleRequest(image, 'get', imgsHeaders, null);
var title = document.querySelector('.infox > h1').textContent;
var desc = '';
try { desc = document.querySelector('.entry-content-single').textContent.trim(); } catch{}
var genres = [];
var sortie = '';
var statut = '';

for (let info of document.querySelector('.spe').querySelectorAll('span')) {
    if (info.textContent.includes('Statut')) { statut = info.textContent.split(': ')[1]; }
    else if (info.textContent.includes('Sortie')) { sortie = info.textContent.split(': ')[1]; }
    else if (info.textContent.includes('Genre')) { genres = Array.from(info.querySelectorAll('a')).map(g => g.textContent); }
}

var chapters = Array.from(document.querySelectorAll('.lchx.mobile > a')).map(chap => 
    new Chapter(chap.textContent.trim(), new ModuleRequest(chap.href, 'get', emptyKeyValue, null), false)
);
chapters.reverse();

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, sortie, statut, 'Scans: ' + chapters.length, '', chapters));

savedData.innerHTML = JSON.stringify(infoPageObject);