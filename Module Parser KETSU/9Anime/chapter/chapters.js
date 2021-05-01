function Chapters(request, extra, javascriptConfig, output) {
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

function Output(videos, images, text) {
    this.videos = videos;
    this.images = images;
    this.text = text;
}

function Videos(needsResolver, rawVideo) {
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}

function NeedsResolver(resolverIdentifier, link) {
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}

function RawVideo(video) {
    this.video = video;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function Text(text) {
    this.text = text;
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);

var output = parsedJson.output.videos;

var emptyKeyValue = [new KeyValue('', '')];
var referer = [new KeyValue('referer', 'https://9anime.ru/watch/')];
let newRequest = new ModuleRequest('', '', emptyKeyValue, null);
let extraInfo = [new KeyValue('current', '1')];

const url = new URL(parsedJson.request.url);
const params = url.search.substring(1).split('&amp;');

let serv = {};
for (const extras of parsedJson.extra.extraInfo) {
    serv[extras.key] = extras.value;
}

if (url.href.includes('google')) {
    let servers = {};

    for (const param of params) {
        let p = param.split('=');
        let key = p[0];
        servers[key] = p[1];
    }

    extraInfo.push(new KeyValue('Streamtape', servers['40']));
    extraInfo.push(new KeyValue('Vidstream', servers['41']));

    newRequest = new ModuleRequest(`https://9anime.ru/ajax/anime/episode?id=${servers['35']}`, 'get', referer, null);
} else {
    function transform(r){const e=r.substr(0,9);let t=r.substr(9);if((t=t.replace(/[ \\t\\n\\f\\r]/g,\"\")).length%4==0&&((t=t.replace(/==?$/,\"\")).length%4==1||/[^+/0-9A-Za-z]/.test(t)))return null;let n=\"\",o=0;for(let r=0;r<t.length;r++){o<<=6;const e=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\".indexOf(t[r]);if(o|=e<0?void 0:e,(r+1)%4==0&&(n+=String.fromCharCode((16711680&o)>>16),n+=String.fromCharCode((65280&o)>>8),n+=String.fromCharCode(255&o),o=remaining=0),r==t.length-1)switch(r%4){case 1:o>>=4,n+=String.fromCharCode(o);break;case 2:o>>=2,n+=String.fromCharCode((65280&o)>>8),n+=String.fromCharCode(255&o)}}try{n=decodeURIComponent(n)}catch(r){}var a=[...Array(256).keys()],i=0;for(let r=0;r<256;r+=1)a[i=(i+a[r]+e.charCodeAt(r%e.length))%256]=[a[r],a[r]=a[i]][0];for(var d=\"\",h=i=index=0;h<n.length;h+=1)a[i=(i+a[index=(index+1)%256])%256]=[a[index],a[index]=a[i]][0],d+=String.fromCharCode(n.charCodeAt(h)^a[(a[index]+a[i])%256]);return d}

    const current = parseInt(serv.current);
    const script = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
    const data = JSON.parse(script);
    const videoUrl = transform(data.url);
    let name = 'MP4UPLOAD';

    if (current == 1) {
        extraInfo = [];
        output.needsResolver = [];
        extraInfo.push(new KeyValue('current', '2'));
        extraInfo.push(new KeyValue('Vidstream', serv['Vidstream']));

        newRequest = new ModuleRequest(`https://9anime.ru/ajax/anime/episode?id=${serv['Streamtape']}`, 'get', referer, null);
    } else if (current == 2) {
        name = 'STREAMTAPE';

        extraInfo = [];
        extraInfo.push(new KeyValue('current', '3'));

        newRequest = new ModuleRequest(`https://9anime.ru/ajax/anime/episode?id=${serv['Vidstream']}`, 'get', referer, null);
    } else {
        name = 'VIDSTREAM';
    }

    let resolver = new NeedsResolver(name, new ModuleRequest(videoUrl, 'get', referer, null));
    output.needsResolver.push(resolver);
    output.rawVideo = null;
}

const extra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var chaptersObject = new Chapters(newRequest, extra, new JavascriptConfig(true, false, ''), new Output(output, null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;
