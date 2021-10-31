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
function Search(request, extra, separator, javascriptConfig, output) {
    this.request = request;
    this.extra = extra;
    this.separator = separator;
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

function Layout(insets, visibleCellsWidthS, visibleCellsWidthM, visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing) {
    this.insets = insets;
    this.visibleCellsWidthS = visibleCellsWidthS;
    this.visibleCellsWidthM = visibleCellsWidthM;
    this.visibleCellsWidthL = visibleCellsWidthL;
    this.visibleCellsHeight = visibleCellsHeight;
    this.heightForVisibleCells = heightForVisibleCells;
    this.cellSize = cellSize;
    this.ratio = ratio;
    this.constant = constant;
    this.horizontalSpacing = horizontalSpacing;
    this.verticalSpacing = verticalSpacing;
}

function Insets(top, bottom, left, right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
}

function Size(width, height) {
    this.width = width;
    this.height = height;
}

function Ratio(inRelation, number1, number2) {
    this.inRelation = inRelation;
    this.number1 = number1;
    this.number2 = number2;

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

function quickData(link, image, title, field1) {
    return new Data(image, title, 'unknown', field1, 'unknown', 'unknown', 'unknown', false, link);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var savedData = document.getElementById('ketsu-final-data');

var parsedJson = JSON.parse(savedData.innerHTML);

let output = [];
let results = [];
let emptyKeyValue = [new KeyValue('', '')];
let newRequest = new ModuleRequest('', '', emptyKeyValue, null);
let urlRequest = parsedJson.request.url.replace('amp;', '');

if (!urlRequest.includes('verified=')) {
    function b(c,d){const e=a();return b=function(f,g){f=f-0x17b;let h=e[f];return h;},b(c,d);}function a(){const B=['6tCqVBE','undefined','charCodeAt','fromCharCode','4547290DSyZwj','1610030vrNEuQ','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/','12kvXduw','length','keys','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789','127938dVjCWE','41880267YQXxyJ','36eIYtjD','5984728rjbiiv','3887644widBDk','1810776ceyzYY','7UMOtiQ'];a=function(){return B;};return a();}(function(c,d){const z=b,e=c();while(!![]){try{const f=-parseInt(z(0x186))/0x1+-parseInt(z(0x188))/0x2*(parseInt(z(0x181))/0x3)+parseInt(z(0x185))/0x4+-parseInt(z(0x18c))/0x5*(parseInt(z(0x17d))/0x6)+parseInt(z(0x187))/0x7*(-parseInt(z(0x184))/0x8)+parseInt(z(0x183))/0x9*(parseInt(z(0x17b))/0xa)+parseInt(z(0x182))/0xb;if(f===d)break;else e['push'](e['shift']());}catch(g){e['push'](e['shift']());}}}(a,0xdfffb));function enc(c){const A=b;let f='',g='',j=A(0x180);for(let q=0x0;q<0x10;q++)g+=j['charAt'](Math['floor'](Math['random']()*j[A(0x17e)]));let k=[...Array(0x100)[A(0x17f)]()],l=0x0;for(let s=0x0;s<0x100;s++)k[l=(l+k[s]+g['charCodeAt'](s%g[A(0x17e)]))%0x100]=[k[s],k[s]=k[l]][0x0];for(var m='',o=l=index=0x0;o<c[A(0x17e)];o+=0x1)k[l=(l+k[index=(index+o)%0x100])%0x100]=[k[index],k[index]=k[l]][0x0],m+=String[A(0x18b)](c[A(0x18a)](o)^k[(k[index]+k[l])%0x100]);for(let v=0x0;v<m[A(0x17e)];v++)if(g[A(0x18a)](v)>0xff)return null;for(u=0x0;u<m[A(0x17e)];u+=0x3){let w=[void 0x0,void 0x0,void 0x0,void 0x0];w[0x0]=m[A(0x18a)](u)>>0x2,w[0x1]=(0x3&m[A(0x18a)](u))<<0x4;if(m[A(0x17e)]>u+0x1)w[0x1]|=m[A(0x18a)](u+0x1)>>0x4;w[0x2]=isNaN(m[A(0x18a)](u+0x1))?undefined:(0xf&m['charCodeAt'](u+0x1))<<0x2;if(m['length']>u+0x2)w[0x2]|=m[A(0x18a)](u+0x2)>>0x6;w[0x3]=isNaN(m[A(0x18a)](u+0x2))?undefined:0x3f&m[A(0x18a)](u+0x2);for(let y=0x0;y<w[A(0x17e)];y++){typeof w[y]==A(0x189)?f+='=':f+=0x0<=w[y]&&w[y]<0x40?A(0x17c)[w[y]]:'';}}return g+f;}
    let keyword = new URL(urlRequest).searchParams.get('keyword');
    let page = new URL(urlRequest).searchParams.get('page');
    let origin = new URL(urlRequest).origin;
    let keywordEnc = encodeURIComponent(enc(keyword));
    newRequest = new ModuleRequest(`${origin}/search?keyword=${keyword.replace(/\\s/g, '+')}&verified=${keywordEnc}&page=${page}`, 'get', emptyKeyValue, null);
} else {
    const animeList = document.querySelectorAll('.anime-list > li');

    for (const anime of animeList) {
        const title = anime.querySelector('.name').textContent.trim();

        let link = anime.querySelector('.name').href;
        link = new URL(link, parsedJson.request.url).href;
        link = new ModuleRequest(link, 'get', emptyKeyValue, null);

        let image = anime.querySelector('.poster > img').src;
        image = new ModuleRequest(image, 'get', emptyKeyValue, null);

        const tag = anime.querySelector('.poster > .tag').textContent.trim();
        const tags = Array.from(anime.querySelectorAll('.poster > .taglist > span')).map(t => t.className.toUpperCase());
        const language = tags.includes('DUB') ? 'DUB' : 'SUB';
        let type = 'TV';

        for (const stag of tags) {
            switch (stag) {
                case 'MOVIE':
                case 'SPECIAL':
                case 'OVA':
                case 'ONA':
                    type = stag;
                    break;
                default:
                    break;
            }
        }

        const obj = new Data(image, title, tag, language, type, 'unknown', 'unknown', false, link, false);
        results.push(obj);
    }

    let horizontalLayout = new Layout(new Insets(10, 10, 10, 10), 1, 2, 3, 1, 500, new Size(400, 400), new Ratio('width', 4, 11), new Size(0, 0), 10, 10);
    output.push(new Output(CellDesings.wide11, Orientation.vertical, DefaultLayouts.none, Paging.none, new Section('', false), horizontalLayout, results));
}

let searchPageObject = new Search(newRequest, new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), '', new JavascriptConfig(true, false, ''), output);

var finalJson = JSON.stringify(searchPageObject);
savedData.innerHTML = finalJson;
