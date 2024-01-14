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

function MainPage ( request, extra, javascriptConfig, output ) {
    this.request = request;
    this.extra = extra;
    this.javascriptConfig = javascriptConfig;
    this.output = output;
}

function ModuleRequest ( url, method, headers, httpBody ) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.httpBody = httpBody;
}

function Extra ( commands, extraInfo ) {
    this.commands = commands;
    this.extraInfo = extraInfo;
}

function Commands ( commandName, params ) {
    this.commandName = commandName;
    this.params = params;
}

function JavascriptConfig ( removeJavascript, loadInWebView, javaScript ) {
    this.removeJavascript = removeJavascript;
    this.loadInWebView = loadInWebView;
    this.javaScript = javaScript;
}

function KeyValue ( key, value ) {
    this.key = key;
    this.value = value;
}

function Output ( cellDesing, orientation, defaultLayout, paging, section, layout, data ) {
    this.cellDesing = cellDesing;
    this.orientation = orientation;
    this.defaultLayout = defaultLayout;
    this.paging = paging;
    this.section = section;
    this.layout = layout;
    this.data = data;
}

function Section ( sectionName, separator ) {
    this.sectionName = sectionName;
    this.separator = separator;
}

function Layout ( insets, visibleCellsWidthS, visibleCellsWidthM, visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing ) {
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

function Insets ( top, bottom, left, right ) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
}

function Size ( width, height ) {
    this.width = width;
    this.height = height;
}

function Ratio ( inRelation, number1, number2 ) {
    this.inRelation = inRelation;
    this.number1 = number1;
    this.number2 = number2;
}

function Data ( image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView ) {
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

function shuffle ( a ) {
    var j, x, i;
    for ( i = a.length - 1; i > 0; i-- ) {
            j = Math.floor( Math.random( ) * ( i + 1 ) );
            x = a[ i ];
            a[ i ] = a[ j ];
            a[ j ] = x;
    }
    return a;
}
var savedData = document.getElementById( 'ketsu-final-data' );
var parsedJson = JSON.parse( savedData.innerHTML );
let emptyKeyValue = [ new KeyValue( '', '' ) ];
let emptyKeyValue1 = [ new KeyValue( 'X-Requested-With', 'XMLHttpRequest' ) ];
var LoadText = parsedJson.extra.extraInfo[ 0 ].value;
const dummyQuest = new ModuleRequest( '', 'get', emptyKeyValue, null );
const streamta = new ModuleRequest( 'ketsuapp://?moduleData=https://raw.githubusercontent.com/Bilnaa/beta-ketsu/main/zoro.json', 'get', emptyKeyValue, null );
const infoText = new Data( dummyQuest, "Subs are only available on newer versions of Ketsu, on the Rapid-Cloud resolver and won't work if you have the App Store version.\nClick on this message if you are using the App Store version of KETSU and not getting subtitles. If you do so don't forget to refresh this page.", '', '', '', '', '', false, streamta, false );
let output = [ ];
var sliderArray = [ ];
var slider = document.querySelectorAll( '#slider .swiper-wrapper .swiper-slide' );
for ( let slide of slider ) {
    let title = slide.querySelector( 'img' ).alt;
    let image = slide.querySelector( 'img' ).dataset.src;
    image = new ModuleRequest( image, 'get', emptyKeyValue, '' );
    let link = 'https://zoro.to/' + slide.querySelector( '.btn.btn-secondary.btn-radius' ).href;
    link = new ModuleRequest( link, 'get', emptyKeyValue, '' );
    let description = slide.querySelector( '.desi-depion' ).innerText;
    let type = slide.querySelector( 'div.sc-detail > div:nth-child(1)' ).innerText;
    let date = 'First Aired : ' + slide.querySelector( '.scd-item.m-hide' ).innerText;
    sliderArray.push( new Data( image, title + ' ' + type, description, title, date, '', '', false, link ) );
}
var TopAiring = [ ];
var best = document.querySelectorAll( '#anime-featured > div > div > div > div:nth-child(1) > div > div.anif-block-ul > ul li' );
for ( list of best ) {
    let title = list.querySelector( 'img' ).alt;
    var link = 'https://zoro.to/' + list.querySelector( 'a' ).href;
    link = new ModuleRequest( link, 'get', emptyKeyValue, null );
    var image = list.querySelector( 'img' ).dataset.src;
    image = new ModuleRequest( image, 'get', emptyKeyValue, null );
    let ep = list.querySelector( '.tick-item.tick-sub' ).textContent.trim( );
    var language = '??';
    try {
            language = list.querySelector( 'span:nth-child(1)' ).textContent.trim( );
    } catch {}
    TopAiring.push( new Data( image, title, '', ep, language, '', '', false, link ) );
}
var LastEpisodes = [ ];
var last = document.querySelectorAll( '#main-content > section:nth-child(2) > div.tab-content > div > div.film_list-wrap div.flw-item' );
for ( list of last ) {
    let ticks =  list.querySelectorAll('.tick .tick-item');
    let title = list.querySelector( 'img' ).alt;
    var link = 'https://zoro.to/' + list.querySelector( 'a' ).href;
    link = new ModuleRequest( link, 'get', emptyKeyValue, null );
    var image = list.querySelector( 'img' ).dataset.src;
    image = new ModuleRequest( image, 'get', emptyKeyValue, null );
    let epTotal = '';
    epTotal = list.querySelector('.tick-item.tick-eps');
    if(!epTotal){
          epTotal =  ticks[0].textContent;
    } else {
        epTotal = epTotal.textContent.trim();
    }
    let ep = `${ticks[0].textContent.trim()}/${epTotal}`;
    let language = '';
    for(let i = 0; i<ticks.length; i++){
        if(ticks.length > 1 && ticks[i].classList.contains('tick-sub') && ticks[i+1].classList.contains('tick-dub')){
            language = 'SUB/DUB';
            break;
        } else if(ticks[i].classList.contains('tick-sub')){
            language = 'SUB';
            break;
        } else if(ticks[i].classList.contains('tick-dub')){
            language = 'DUB';
            break;
        }
    }
    LastEpisodes.push( new Data( image, title, 'test1', ep, language, 'test2', 'test3', false, link ) );
}
var NewAnimes = [ ];
var newanimes = document.querySelectorAll( '#main-content > section:nth-child(5) div.film_list-wrap div.flw-item' );
for ( list of newanimes ) {
    let ticks =  list.querySelectorAll('.tick.ltr .tick-item');
    let title = list.querySelector( 'img' ).alt;
    let link = 'https://zoro.to/' + list.querySelector( 'a' ).href;
    link = new ModuleRequest( link, 'get', emptyKeyValue, null );
    let image = list.querySelector( 'img' ).dataset.src;
    image = new ModuleRequest( image, 'get', emptyKeyValue, null );
    let epTotal = '';
    epTotal = list.querySelector('.tick-item.tick-eps');
    if(!epTotal){
          epTotal =  ticks[0].textContent.trim();
    } else {
        epTotal = epTotal.textContent.trim();
    }
    let ep = ``;
    if(epTotal== ''){
        ep = `${ticks[0].textContent.trim()}`
    } else {
        ep = `${ticks[0].textContent.trim()}/${epTotal}`
    }
    let language = '';
    for(let i = 0; i<ticks.length; i++){
        if(ticks.length > 1 && ticks[i].classList.contains('tick-sub') && ticks[i+1].classList.contains('tick-dub')){
            language = 'SUB/DUB';
            break;
        } else if(ticks[i].classList.contains('tick-sub')){
            language = 'SUB';
            break;
        } else if(ticks[i].classList.contains('tick-dub')){
            language = 'DUB';
            break;
        }
    }
    NewAnimes.push( new Data( image, title, '', ep, language, '', '', false, link ) );
}
let MostViewed = [ ];
var mostviewed = document.querySelectorAll( '#top-viewed-week > ul > li' );
for ( list of mostviewed ) {
    let title = list.querySelector( 'img' ).alt;
    let link = 'https://zoro.to/' + list.querySelector( 'a' ).href;
    link = new ModuleRequest( link, 'get', emptyKeyValue, null );
    let image = list.querySelector( 'img' ).dataset.src;
    image = new ModuleRequest( image, 'get', emptyKeyValue, null );
    let views = '??';
    let viewCount = list.querySelector( '.fdi-item');
    if(viewCount){
        views = viewCount.textContent.trim();
    }
    MostViewed.push( new Data( image, title, '', views, '', '', '', false, link ) );
}
let layout = new Layout( new Insets( 0, 0, 0, 0 ), 1, 1, 1, 1, 0, new Size( 400, 105 ), new Ratio( 'width', 4, 10 ), new Size( 0, 0 ), 0, 0 );
let layout1 = new Layout( new Insets( 0, 0, 10, 10 ), 1, 1, 1, 1, 0, new Size( 400, 105 ), new Ratio( 'width', 4, 10 ), new Size( 0, 0 ), 0, 0 );
output.push( new Output( CellDesings.Special3, Orientation.horizontal, DefaultLayouts.wideStrechedFull, Paging.leading, new Section( '', true ), layout, shuffle( sliderArray ) ) );
if ( LoadText == 'True' ) {
    output.push( new Output( 'CELLHelperText', Orientation.horizontal, DefaultLayouts.wideFull, Paging.centered, new Section( '', true ), layout1, [ infoText ] ) );
}
output.push( new Output( CellDesings.Special1, Orientation.horizontal, DefaultLayouts.triplets, Paging.none, new Section( 'Top Airing : ', true ), null, TopAiring ) );
output.push( new Output( CellDesings.normal1, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.leading, new Section( 'Last Episodes: ', true ), null, LastEpisodes ) );
output.push( new Output( CellDesings.wide6, Orientation.horizontal, DefaultLayouts.longDoubletsFull, Paging.none, new Section( 'New On Zoro', true ), null, NewAnimes ) );
output.push( new Output( CellDesings.normal2, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.none, new Section( 'Most Viewed Animes', true ), null, MostViewed ) );
let date = new Date( );
let year = date.getFullYear( );
let day = date.getDate( );
let month = date.getMonth( ) + 1;
let timezoneOffset = date.getTimezoneOffset( );
if ( month < 10 ) {
    month = '0' + month;
}
if ( day < 10 ) {
    day = '' + '0' + day
}
let nextRequest = `https://zoro.to/ajax/schedule/list?tzOffset=${timezoneOffset}&date=${year}-${month}-${day}`;
let MainPageObject = new MainPage( new ModuleRequest( nextRequest, 'get', emptyKeyValue1, null ), new Extra( [ new Commands( '', emptyKeyValue ) ], emptyKeyValue ), new JavascriptConfig( true, false, '' ), output );
let finalJson = JSON.stringify( MainPageObject );
savedData.innerHTML = finalJson;
