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
var genresArray = [];
var script = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
var json = JSON.parse(script);
var genres = json.data.attributes.tags;
for (genre of genres) {
    genre = genre.attributes.name.en;
    genresArray.push(genre);
}
var type = json.data.attributes.originalLanguage.toUpperCase();
var statut = json.data.attributes.status;
var genres = [];
try {
    var desc = json.data.attributes.depion.en.trim();
} catch (e) {
    var desc = json.data.attributes.depion.ja;
    if (desc == null) {
        desc = '';
    }
}
var title = json.data.attributes.title.en;
if (title == undefined) {
    title = json.data.attributes.title.ja
}
var relationships = json.data.relationships;
for (relationship of relationships) {
    if (relationship.type == 'cover_art') {
        var coverArt = relationship.attributes.fileName;
    }
}
var image = 'https://uploads.mangadex.org/covers/' + json.data.id + '/' + coverArt;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var nextRequest = `https://api.mangadex.org/manga/${json.data.id}/feed?order[chapter]=asc&order[volume]=asc&limit=500&translatedLanguage[]=en`;
let infoPageObject = new Info(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genresArray, status, 'Manga', type, 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;