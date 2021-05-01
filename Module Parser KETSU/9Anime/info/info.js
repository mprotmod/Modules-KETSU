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
var parsedJson = JSON.parse(savedData.innerText);
let emptyKeyValue = [new KeyValue('Referer', parsedJson.request.url)];
let commands = [new Commands('', emptyKeyValue)];
let newRequest = new ModuleRequest('', '', emptyKeyValue, null);

let dict = { current: '', data: ''};

for (const data of parsedJson.global.variables) {
    dict[data.key] = data.value;
}

const info = document.querySelector('.info');
const metaArr = info.querySelectorAll('.meta > div > div');
let meta = {};

for (const m of metaArr) {
    let re = m.textContent.split(':');
    const key = re[0].trim().replace(' ', '-').toLowerCase();
    const value = re[1].trim();
    meta[key] = value;
}

var episodes = [];
var type = meta.type ? meta.type : 'TV';
var status = meta.status ? meta.status : 'On Going';
var genres = meta.genre ? meta.genre.split(', ') : [];
var desc = '';
var title = info.querySelector('h1.title').textContent.trim();
var image = document.querySelector('#info > .thumb > div > img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);

try {
    desc = info.querySelector('p[itemprop=description]').textContent;
} catch { }

try {
    if (desc.length == 0) {
        desc = info.querySelector('p[itemprop=depion]').textContent;
    }
} catch { }

desc = desc.replace(/\"/, '');

if (dict['current'] != parsedJson.request.url) {
    newRequest = new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null);
    commands = [
        new Commands('helperFunction', [
            new KeyValue('isCustomRequest', 'true'),
            new KeyValue('name', 'example')
        ])
    ];
} else {
    let newEpisodes = decodeURIComponent(dict['data']);

    let htmlObject = document.createElement('div');
    htmlObject.innerHTML = newEpisodes;

    const eps = htmlObject.querySelectorAll('.episodes > li > a');

    for (const ep of eps) {
        let title = ep.textContent.trim();
        title = title.includes('Full') ? title : `Episode ${title}`;
    
        let sources = JSON.parse(ep.dataset.sources);
        let link = 'https://google.com/?';
    
        for (const key in sources) {
            link += link.length == 20 ? `${key}=${sources[key]}` : `&${key}=${sources[key]}`;
        }
    
        const obj = new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
        episodes.push(obj);
    }
}

let infoPageObject = new Info(newRequest, new Extra(commands, emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, 'Anime', type, 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;