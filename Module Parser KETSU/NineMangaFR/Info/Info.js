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

var image = document.querySelector('.bookface > img').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
var title = document.querySelector('[itemprop=\"name').textContent;
var desc = '';
var statut = '';
var author = '';
var chapters = [];

try { var genres = Array.from(document.querySelector('[itemprop=\"genre').querySelectorAll('a')).map(genre => genre.textContent); }
catch { var genres = ['Manga', title]; }

try { 
    desc = document.querySelector('p[itemprop=\"depion\"]').textContent.replace('Résumé: ', ''); 
    statut = document.querySelector('.red').textContent;
    author = document.querySelector('a[itemprop=\"author\"]').textContent;
} catch {}

for (chapter of document.querySelector('.silde').querySelectorAll('li > a')) {
    let chapTitle = chapter.title.replaceAll('\n', '').trim();
    let chapLink = chapter.href.replace('.html', '-10-1.html');
    chapters.push(new Chapter(chapTitle,new ModuleRequest(chapLink,'get',emptyKeyValue,null),false));
}
chapters.reverse();

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, statut, 'Chaps: ' + chapters.length, author, '', chapters));

savedData.innerHTML = JSON.stringify(infoPageObject);