function print(anytihng) {
    console.log(anytihng)
}

function hideKeyboard(element) {
    element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
    element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
    setTimeout(function() {
        element.blur();  //actually close the keyboard
        // Remove readonly attribute after keyboard is hidden.
        element.removeAttr('readonly');
        element.removeAttr('disabled');
    }, 100);
}


function checkTermsAndConditions() {
    if (localStorage.terms) {
        $('#terms-conditions').css('display', 'none')
    }  else {
        $('#terms-conditions').css('opacity', '1')
    }
  }

function isLowerCase(str)
{
    return str == str.toLowerCase() && str != str.toUpperCase();
}

function scrollToMyDiv(element) {
    window.scroll({
      top: element.offsetTop,
      left: 0,    
      behavior: 'smooth'
    });
  }

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }


function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return ('' + S4()).toLowerCase();
}

function parseHtml(string) {
    var el = document.createElement( 'html' );
    el.innerHTML = string;
    return el.querySelector('body').querySelector('div');
}


function addModle(id,moduleData) {
    parsedModules[id].moduleData = JSON.parse(moduleData);
    let current = parsedModules[id];
    // replace the skeleton with the module div
    document.querySelector('#' + parsedModules[id].id).innerHTML = createModule(current);
    // parse the tags
    addTag(current.moduleData.moduleInfo.moduleLenguage,tagTypes.language)
    addTag(current.moduleData.moduleInfo.moduleType,tagTypes.modType)
    try {current.categories.forEach((tag)=>{
        addTag(tag,tagTypes.extra)
    })} catch{}
}


function createLoadingModule(module) {
    console.log(module)

    let html = ` <div id="{ID}" class="grid-section"> <div class="module-item elem-padding-equal bg-secondary round"> <div class="module-top bg-secondary"> <div class="grid-item left"> <img style="opacity: 0;" src="https://d1fdloi71mui9q.cloudfront.net/1JBIg7XxQ3WqZ8AAZPiz_GydL9KJ3v5AKUN1B" alt="" class="round "> <div class="skeleton-img round skeleton"></div> </div> <div class="grid-item mid bg-transparent "> <div class="fs-title-dynamic fw-bold tc-t-primary one-line skeleton round">ㅤ</div> <div class="fs-small-dynamic fw-normal tc-accent one-line round skeleton">ㅤ</div> <div class="tags one-line"> <span class="tag fs-small-dynamic elem-padding-half-equal-wide-only round tc-t-secondary skeleton">ㅤㅤㅤㅤㅤ</span> <span class="tag fs-small-dynamic elem-padding-half-equal-wide-only round tc-t-secondary skeleton">ㅤㅤㅤㅤㅤ</span> <span class="tag fs-small-dynamic elem-padding-half-equal-wide-only round tc-t-secondary skeleton">ㅤㅤㅤㅤㅤ</span> </div> </div> </div> <div class="module-bottom"> <div class=" elem-padding-half-equal"></div> <div class="hr"></div> <div class=" elem-padding-half-equal"></div> <div class="add-buttons-text"> <div class="bg-accent-alpha elem-padding-half-equal round fs-normal-dynamic tc-accent fw-normal one-line pointer skeleton"> </div> <div class="bg-accent-alpha elem-padding-half-equal round fs-normal-dynamic tc-accent fw-normal one-line pointer zetsu skeleton">ㅤ </div> <div class="bg-accent-alpha elem-padding-half-equal round fs-normal-dynamic tc-accent fw-normal one-line pointer skeleton"> </div> </div> </div> </div> </div>`;

    html = html.replace('{ID}',module.id)

    return parseHtml(html);
}

let moduleTypes = {

    VIDEO : 'Video',
    IMAGE : 'Image',
    TEXT : 'Text'

}

let replaceModule = {
    IMAGE : '{IMAGE}',
    NAME : '{NAME}',
    DEVELOPER : '{DEVELOPER}',
    VERSION : '{VERSION}',
    LANGUAGE : '{LANGUAGE}',
    WEBSITE : '{WEBSITE}',
    TAGS : '{TAGS}',
    TYPE : '{TYPE}',
    CODE : '{CODE}',
    ZETSU : '{ZETSU}', 
    KETSU : '{KETSU}',
    ADDBUTTONS : '{ADDBUTTONS}'
}

let replaceModuleData = {
    IMAGE : 'moduleImage',
    NAME : 'moduleName',
    DEVELOPER : 'developer',
    VERSION : 'moduleVersion',
    LANGUAGE : 'moduleLenguage',
    WEBSITE : 'baseURL',
    TAGS :  (module) => {
        var categories = [
            htmlTag(module.moduleData.moduleInfo.moduleType),
            htmlTag(module.moduleData.moduleInfo.moduleLenguage)
        ];
        try {module.categories.forEach((tag)=>{
            categories.push(htmlTag(tag))
        })} catch{}
        return categories.join("");
    },
    TYPE : 'moduleType',
    CODE : 'UpdateSite',
    ZETSU : (module) => {
        return 'zetsuapp://?moduleData=' + module.moduleData.moduleInfo.UpdateSite;
    }, 
    KETSU : (module) => {
        return 'ketsuapp://?moduleData=' + module.moduleData.moduleInfo.UpdateSite;

    },
    ADDBUTTONS : (module) => {
 
        return module.moduleData.moduleInfo.moduleType.toLowerCase();
    }

} 


function createModule(module) {

    let html = ` <div class="module-item elem-padding-equal bg-secondary round"> <div class="module-top bg-secondary"> <div class="grid-item left"><div class="skeleton-img round "></div> <img src="{IMAGE}" alt="" class="round bg-accent-alpha"> </div> <div class="grid-item mid bg-transparent "> <div style="width: 85%;" class="fs-title-dynamic fw-bold tc-t-primary one-line"> {NAME}</div> <div class="tags one-line"> <div class="fs-small-dynamic fw-normal tc-accent one-line">Dev: {DEVELOPER} <span class=" bg-transparent round border-thin-accent elem-padding-half-equal-wide-only">{VERSION}</span> <span class=" bg-transparent round border-thin-accent elem-padding-half-equal-wide-only">{LANGUAGE}</span> <span class=" bg-transparent round border-thin-accent elem-padding-half-equal-wide-only">{WEBSITE}</span> </div> </div> <div class="tags one-line"> {TAGS}  </div> </div> <!-- <div class="bg-transparent grid-item right center-flex"> <div class="bg-accent-alpha elem-padding-half-equal round fs-normal-dynamic border-thin-accent-hover tc-accent fw-normal one-line pointer"> Add Module</div> </div> --> <span class=" fs-small-dynamic tc-con elem-padding-fourth-equal module-type fw-bold bg-accent">{TYPE}</span> </div> <div class="module-bottom"> <div class=" elem-padding-half-equal"></div> <div class="hr"></div> <div class=" elem-padding-half-equal"></div> <div class="add-buttons-{ADDBUTTONS}"> <div class="bg-accent-alpha elem-padding-half-equal round fs-normal-dynamic border-thin-accent-hover tc-accent fw-normal one-line pointer"> <a class=" tc-accent" href="{CODE}" target="_blank">View Code</a> </div> <div class="bg-accent-alpha elem-padding-half-equal round fs-normal-dynamic border-thin-accent-hover tc-accent fw-normal one-line pointer zetsu"> <a class=" tc-accent" href="{ZETSU}" target="_blank">Add to ZETSU</a> </div> <div class="bg-accent-alpha elem-padding-half-equal round fs-normal-dynamic border-thin-accent-hover tc-accent fw-normal one-line pointer"> <a class=" tc-accent" href="{KETSU}" target="_blank">Add to KETSU</a> </div> </div> </div> </div>`;

    if (module.moduleData == undefined) {return undefined}

    let data = module.moduleData.moduleInfo;


    html = html.replace(/accent/g, data.moduleType.toLowerCase() + 'accent');

    Object.entries(replaceModule).forEach(([key, value]) => {
        let mReplaceModuleData = replaceModuleData[key]; // this is either the function or the json key
        console.log(mReplaceModuleData)
        var replaceData = undefined;
        try {
            replaceData =  mReplaceModuleData(module);
            console.log('executed')
        } catch {console.log('failed to execute function')}

        try {
            if (replaceData == undefined) {
                replaceData = data[mReplaceModuleData];
            }
        } catch {console.log('failed to replace')}       

        html = html.replace(value,replaceData)
      
    });

    return html;
}

var tagTypes = {
    modType : 'modType',
    language : 'language',
    extra : 'extra',
    search : 'search'
}

function htmlTag(tag) { // types indicates if its a moduletype tag, language tag or extra tag.
    let html = '<span tagid="{TAGID}" class="tag fs-small-dynamic elem-padding-half-equal-wide-only round tc-t-secondary">{TAGNAME}</span>';
    html = html.replace('{TAGID}',btoa(tag));
    html = html.replace('{TAGNAME}',tag);
    return html
}

function addTag(tagName,tagType) {
    let dataTags = tags[tagType];
    let idTag = btoa(tagName);
    if (dataTags.tags.includes(idTag)) {
        return
    }
    tags[tagType].tags.push(idTag);
    tagNames[idTag] = tagName;
    tags[tagType].addFunc(tagName,idTag);
}   

function addLeftMenuHtmlTag(html,category) {
    $(html).click(tagClicked);
    let skeleton = document.querySelector('#' + category).querySelector('.skeleton');
    skeleton.parentNode.insertBefore(html,skeleton );
}

function addPhoneFilterHtmlTag(html,category) {
    $(html).click(tagClicked);
    let skeleton = document.querySelectorAll('#' + category)[1].querySelector('.skeleton');
    skeleton.parentNode.insertBefore(html,skeleton );
}


function addActiveFilters(html) {
    $(html).click(tagClicked);
    let parent = document.querySelector('.active-filters ');
    parent.append(html)
}


function deleteSkeletons() {
    document.querySelector('#left-panel').querySelectorAll('.skeleton').forEach((elem)=> {
        elem.remove();
    })

    document.querySelector('#phone-filter').querySelectorAll('.skeleton').forEach((elem)=> {
        elem.remove();
    })
}


