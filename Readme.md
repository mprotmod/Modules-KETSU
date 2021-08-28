# KETSU Modules

This repository is a place where developers can contribute modules for the app KETSU.

The objective for this repository is to create a place to centralize modules for the app KETSU.

This repository is not related to KETSU developer / owner or anyone related to this app (KETSU) directly.

## Modules Library

Click [here](https://mprotmod.github.io/Modules-KETSU/index.html) to acces to the modules.

## Updates

New modules and updates will be pushed by contributors eventually, so bookmark this repository to stay up to date.

## Documentation

Click [here](https://appketsu.github.io/KETSU-Documentation/) to acces to the KETSU documentation.

## Contribute

1. Create a folder with the module / resolver name inside the modules / resolvers folders depending on what you want to create.

2. Inside the folder you will have to include the javascript of the mainpage, search, info, and chapters along with the module itself on a json file.

3. Option 1: Add your module compressed and encoded with the ketsuapp://?moduleData= url scheme  to the index.html inside it´s section type and replace all the {} with info about your module info. 

3. Option 2: Add a link to the .json where your module is on this repository (without compression or encoding) on the ketsuapp://?moduleData= url scheme. to the index.html inside it´s section type and replace all the {} with info about your module info. 

Template

```html

<div class="maxHeight zero overflow relative marginBottom">
    <img class="shadow maxWidth rounded absolute img-fluid"
        src="{module image}"
        alt="...">
    <div style="margin-left: 6.5rem; margin-right: 6.5rem;" class=" fullHeight">
        <p><strong>{Module name} | {Language}</strong></p>
        <p class="desc">Version: {version} | Developer: {Your nick name}</p>
    </div>
    <div class="fullHeight addButton container-fluid fullHeight">
        <div class="row align-items-center fullHeight">
            <a href="{Your module compressed encoded or the url to the raw .json}">
                <button type="button" class="btn btn-dark shadow">Add</button>
            </a>
        </div>
    </div>
    <div class="separator"></div>
</div>
<!-- module space-->
```

[Compress Site](https://www.textfixeres.com/html/comprimir-html.php) 

[Encoding Site](https://www.urlencoder.org/)




