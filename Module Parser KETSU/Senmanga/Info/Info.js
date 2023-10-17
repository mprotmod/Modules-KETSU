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
var type = 'Manga';
try {
    type = document.querySelector('div.info > div:nth-child(5)').textContent.trim();
} catch {}
var status = document.querySelector('div.info > div:nth-child(2)').textContent.trim();
var genres = [];
genres = Array.from(document.querySelectorAll('div.info > div:nth-child(1) a')).map(g => g.textContent);
var desc = '';
try {
    desc = document.querySelector('div.series-info > div.summary').textContent.trim();
} catch {}
var title = document.querySelector('.cover img').alt;
var image = document.querySelector('.cover img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var chapters = document.querySelectorAll('.chapter-list li');
for (var x = 0; x < chapters.length; x++) {
    let link = chapters[x].querySelector('a').href;
    let name = chapters[x].querySelector('a').textContent;
    let chapter = new Chapter(name, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
    episodes.push(chapter);
}
let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('',
    emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title,
    parsedJson.request, desc, genres, status, '', type, 'Chapters : ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;