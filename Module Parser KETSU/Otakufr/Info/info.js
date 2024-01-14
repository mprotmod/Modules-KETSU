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

function Chapter(chapName, link, openInWebView) {
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

function getStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        let data = array[x].innerText;
        if (data.includes(match)) {
            return data.replace(match, '').trim();
        }
    }
}

function getHtmlStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        let data = array[x].innerText;
        if (data.includes(match)) {
            return array[x];
        }
    }
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
var episodes = [];
var type = 'empty';
var status = 'Unknown';
var genres = Array.from(document.querySelectorAll('ul > li:nth-child(5) > ul li a')).map(g => g.textContent.trim());
var otherinfos = document.querySelectorAll('.list-unstyled li');
for (var i = 0; i < otherinfos.length; i++) {
    let data = otherinfos[i].innerText;
    if (data.includes('Type:')) {
        type = data.replace('Type:', '').trim();
    } else if (data.includes('Studio d\'animation:')) {
        studio = data.replace('Studio d\'animation:', '').trim();
    } else if (data.includes('Statut:')) {
        status = data.replace('Statut:', '').trim();
    }
}
var desc = '';
var synopsysdiv = document.querySelectorAll('.episode.fz-sm.synop p');
for (var x = 1; x < synopsysdiv.length; x++) {
    desc = desc + synopsysdiv[x].innerText;
}
var descdiv = document.querySelector('div.depion');
if (descdiv) {
    desc = descdiv.innerText;
}
var title = document.querySelector('figure > img').title;
var image = document.querySelector('figure > img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var chapters = document.querySelectorAll('div.float-right > a');
for (var i = chapters.length - 1; i >= 0; i--) {
    var element = chapters[i];
    var fixedLink = element.href;
    var episodeName = element.innerText.split('\n')[0];
    let chapter = new Chapter(episodeName, new ModuleRequest(fixedLink, 'get', emptyKeyValue, null), false);
    episodes.push(chapter);
}
let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, studio, type, 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;
