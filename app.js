// PARSING 

var rawModulesData = `{}`;

const request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/mprotmod/Modules-KETSU/main/modules.json', false);  
request.send(null);
if (request.status === 200) {
    rawModulesData = request.responseText;
}

console.log(rawModulesData)

let parsedRawModules = JSON.parse(rawModulesData);

let parsedModules =  {}


for (var x = 0; x < parsedRawModules.length; x++) {

    let module = parsedRawModules[x];
    let id = 'a' + x;
    let newMod = {
        categories : [],
        url : module.url,
        moduleData : undefined,
        order : (x-1),
        id : id,
        setted : false // we set this bool if the module has been drawn
    }

    try {
        newMod.categories = module.categories;
    } catch { }

    if (newMod.categories == undefined) {
        newMod.categories = [];
    }

    parsedModules[id] = newMod;
}


// WE CREATE THE SKELETON MODULES

let modulesDiv = document.querySelector('.modules-grid');


Object.entries(parsedModules).forEach(([key, value]) => {
    console.log('hello')
    console.log('key')
    modulesDiv.appendChild(createLoadingModule(value))
 });

 // PARSE MODULES AND TAGS.

 var tags = {
    modType : {
        tags : [], // here we save the id and in case we need the name we use the tagnames 
        active : "VmlkZW8=",
        addFunc : (name,id) => {
            console.log(id)
            $(document.querySelector('#left-panel').querySelector('[tagid="'+id+ '"]')).click(tagClicked)
            $(document.querySelector('.filters').querySelector('[tagid="'+id+ '"]')).click(tagClicked)

        }
    },
    language :{
        tags : [],
        active : "",
        addFunc : (name,id) => {
            let html = ' <div tagid="{TAGID}" class="pointer bg-accent-alpha bg-accent-alpha-hover elem-padding-wider tc round fs-subtitle-dynamic tc-accent fw-medium unselected">{TAGNAME}</div>'
            html = parseHtml(html.replace('{TAGID}',id).replace('{TAGNAME}',name)) ;
            addLeftMenuHtmlTag(html,'language');

            let phoneFilter = ' <div tagid="{TAGID}" class="pointer bg-accent-alpha elem-padding-wider round fs-subtitle-dynamic tc-accent tc-accent-hover bg-accent-alpha-hover fw-medium center-flex unselected"> {TAGNAME} </div>';
            phoneFilter = parseHtml(phoneFilter.replace('{TAGID}',id).replace('{TAGNAME}',name)) ;
            addPhoneFilterHtmlTag(phoneFilter,'language')
            phoneFilter = ' <div tagid="{TAGID}" class="pointer bg-accent-alpha elem-padding-wider round fs-subtitle-dynamic tc-accent tc-accent-hover bg-accent-alpha-hover fw-medium center-flex unselected"> {TAGNAME} </div>';
            phoneFilter = parseHtml(phoneFilter.replace('{TAGID}',id).replace('{TAGNAME}',name)) ;
            addActiveFilters(phoneFilter)
        }
    },
    extra :{
        tags : [],
        active : "TW9zdCBVc2Vk",
        addFunc : (name,id) => {
            let html = ' <div tagid="{TAGID}" class="pointer bg-accent-alpha bg-accent-alpha-hover elem-padding-wider tc round fs-normal-dynamic tc-accent fw-medium unselected"> {TAGNAME}</div>';
            html = parseHtml(html.replace('{TAGID}',id).replace('{TAGNAME}',name)) ;
            addLeftMenuHtmlTag(html,'extra');
            let phoneFilter = ' <div tagid="{TAGID}" class="pointer bg-accent-alpha elem-padding-wider round fs-subtitle-dynamic tc-accent tc-accent-hover bg-accent-alpha-hover fw-medium center-flex unselected"> {TAGNAME} </div>';
            phoneFilter = parseHtml(phoneFilter.replace('{TAGID}',id).replace('{TAGNAME}',name)) ;
            addPhoneFilterHtmlTag(phoneFilter,'extra')
            phoneFilter = ' <div tagid="{TAGID}" class="pointer bg-accent-alpha elem-padding-wider round fs-subtitle-dynamic tc-accent tc-accent-hover bg-accent-alpha-hover fw-medium center-flex unselected"> {TAGNAME} </div>';
            phoneFilter = parseHtml(phoneFilter.replace('{TAGID}',id).replace('{TAGNAME}',name)) ;
            addActiveFilters(phoneFilter)
        }
    },
    search :{
        tags : [],
        active : "",
        addFunc : (name,id) => {
            
        }
    },
}

var tagNames = {}

addTag('phone-search-filter',tagTypes.search)

// MARK: ASYNC DOWNLOAD MODULES 


startAsyncDownload()

 // TAGS FUNCTIONALITY
 
 function updateTagsSelection() {
    Object.entries(tags).forEach(([key, value]) => {
        for (tagID of value.tags) {
            for (element of document.querySelectorAll('[tagid="'+tagID+ '"]')) {
                if(tagID == value.active) {
                    element.classList.remove('unselected')
                }  else {
                    element.classList.remove('unselected')
                    element.classList.add('unselected')
                }
            }
           
        }
     });
}

// MODULES FUNCTIONALITY

function reorderModules() {
    // first we save the modules to the tags that are active
    var unorderedModules = {
        first : {
            modules : [],
            rules : [["extra","language"]]
        }, 
        second : {
            modules : [],
            rules : [["extra"]]
        }, 
        third : {
            modules : [],
            rules : [["language"]]
        },
        fourth : {
            modules : [],
            rules : [[]]
        },
    }

    var unloadedModules = []

    for ([key, value] of Object.entries(parsedModules)) {
        let match = false
        if (value.moduleData == undefined) {
           unloadedModules.push(key);
            continue;}
        let mFilters = [];
        let type = btoa(value.moduleData.moduleInfo.moduleType) ;
        let language =   btoa(value.moduleData.moduleInfo.moduleLenguage);
        let categories = value.categories;

        /*if (type == tags.modType.active) {
            mFilters.push("modType")
            match = true
        }*/
        
        if (language == tags.language.active){
            mFilters.push("language")
            match = true
        } 

        for (categorie of categories) {
            let encrypted =  btoa(categorie);
            if (tags.extra.active == encrypted) {
                mFilters.push("extra")
                match = true;
                break;
            }
        }
        if (!match) {
            unorderedModules.fourth.modules.push(key)
            continue;
        }

        for ([unorderKey, mValue] of Object.entries(unorderedModules)) {
            var found = false
            for (rulesArr of mValue.rules) {
                if (rulesArr.every( ai =>  mFilters.includes(ai))) {
                    found = true;
                    unorderedModules[unorderKey].modules.push(key);
                    break;
                }
            }
            if (found) {break}

        }
    }
    unorderedModules.fourth.modules = unorderedModules.fourth.modules.concat(unloadedModules)

    let searchInput = document.querySelector('input').value.toLowerCase();
    var position = -1;
    ["first","second","third","fourth"].forEach((current)=> {
        var unmatchSearch = [];
        let matchSearch = unorderedModules[current].modules.filter((id) =>{
            try {
                let modName = parsedModules[id].moduleData.moduleInfo.moduleName.toLowerCase();
                if (modName.includes(searchInput)) {
                    return id
                } else {
                    unmatchSearch.push(id);
                }
            } catch {
                "failed to categorize"
                unmatchSearch.push(id);
            }
        })
        console.log(unmatchSearch)
        position = organizeByType(matchSearch,position);
        position = organizeByType(unmatchSearch,position);

    });

    console.log(unorderedModules)

}

function organizeByType(mModules,position) {
    print("sadfadsfsadf")
    console.log(mModules)
    let organized = {
        "VmlkZW8=" : [],
        "SW1hZ2U=" : [],
        "VGV4dA==" : []
    }

    let typeOrder = [tags.modType.active] 

    var modulesOrder = ["VmlkZW8=","SW1hZ2U=","VGV4dA=="];

    modulesOrder.forEach((current)=> {
        if (!typeOrder.includes(current)) {
            typeOrder.push(current);
        }
    })

    for (id of mModules) {
        if (parsedModules[id].moduleData == undefined) {
            organized[typeOrder[typeOrder.length - 1]].push(id);
            continue;
        }
        organized[btoa(parsedModules[id].moduleData.moduleInfo.moduleType)].push(id);
    }

    
    var current = position;
    for (type of typeOrder) {
        for (id of organized[type]) {
            try {
                parsedModules[id].order = current;
                document.querySelector('#' + id).style.order = current 
            } catch {

            }
            current += 1;
        }
    }

    return current

}


  
function tagClicked(event) {
    closeMsg();
    print(event)
    $("html, body").animate({ scrollTop: 0 }, "fast");
    console.log(event.currentTarget.parentElement)
    let activeTag = tags[event.currentTarget.parentElement.id].active;
    let selectedTagId =  event.currentTarget.getAttribute('tagid');
    if (selectedTagId == tags.modType.active) {
        return;
    }
    tags[event.currentTarget.parentElement.id].active = selectedTagId

    if (activeTag == selectedTagId) {
        tags[event.currentTarget.parentElement.id].active = ""
    }
    updateTagsSelection()
    reorderModules()
}


$('.filters').toggle();

$('#bottom').height($('#phone-filter').height())



$('.filters-button').click(() => {

    $('.filters').toggle("fast" ,function () {
        $('#bottom').height($('#phone-filter').height())

    });
    requestAnimationFrame(() => {
        $('.filters-button').removeClass('rotate');
        requestAnimationFrame(() =>  {
            $('.filters-button').addClass('rotate')
            // here we add the height
    });
      });
    
})

// MARK: SEARCH STUFF

function updateSearchs(text) {
   document.querySelectorAll('input').forEach(function (elem) {
    console.log(elem)
    elem.value =text
    })
}

function updateSearchEvent(event) {
    closeMsg();
    updateSearchs(event.currentTarget.value)
    if (event.currentTarget.value == "") {
        tags.search.active = ""
    } else {
        tags.search.active = event.currentTarget.getAttribute('tagId')
    }
    document.querySelector('div[tagId="' + event.currentTarget.getAttribute('tagId') + '"]').textContent = event.currentTarget.value
    updateTagsSelection() 
    if (event.which === 13) {
        $('input').blur();
        $("html, body").animate({ scrollTop: 0 }, "fast"); 
    }
    updateTagsSelection()
    updateModuleTitleSearchMatch(event.currentTarget.value.toLowerCase())
    reorderModules()
}


function updateModuleTitleSearchMatch(searched) {
    // ik this sucks, i could have prepared the module names and arrays on the parsed object so i dont have to split them everytime etc etc.
    // alsfjaklsdfjaslkdfj its 3 am bitch.
    closeMsg();
    Object.entries(parsedModules).forEach(([key, value]) => {
            for (element of document.querySelectorAll('#' + key) ){
                console.log(element)
                let modName = element.querySelector('.fs-title-dynamic').textContent;
                let modNameArray = modName.split('');
                let modNamelower = modName.toLowerCase();
                if (!modNamelower.includes(searched)) {
                    element.querySelector('.fs-title-dynamic').innerHTML  = modName;
                continue}
                try {
                    parsedModules[key].moduleData.moduleInfo.moduleType
                } catch {
                    element.querySelector('.fs-title-dynamic').innerHTML  = modName;
                    continue;
                }
                var indexStart = modNamelower.indexOf(searched)

                var newString = modNameArray.slice(0,indexStart ).join('') + '<span class=" tc-{ACCENT} ">'+  modNameArray.slice(indexStart,indexStart + searched.length).join('') +'</span>' + modNameArray.slice(indexStart + searched.length , modNameArray.length ).join('') ;

                newString = newString.replace(/{ACCENT}/g, parsedModules[key].moduleData.moduleInfo.moduleType.toLowerCase() + 'accent');
                element.querySelector('.fs-title-dynamic').innerHTML = newString
            }
     });
}

$('input').keyup(function(event) {
    updateSearchEvent(event);
});

document.querySelectorAll('input').forEach(element => {    

    element.addEventListener("search", function(event) {
        updateSearchEvent(event)
        $('input').blur();
      });
});


$("input").blur(function(){
    $("html, body").animate({ scrollTop: 0 }, "fast"); 
  });

  // TERMS AND CONDITIONS

  $('#terms-button').click(() => {
    localStorage.terms = true;
    checkTermsAndConditions();
  });

  checkTermsAndConditions()



  $('.close').click(() => {
    closeMsg();
  });

  function closeMsg() {
    $('.msg').hide('fast');
    $('#separator-msg').hide('fast');
  }


