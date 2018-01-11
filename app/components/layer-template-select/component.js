/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';
import ENV from '../../config/environment';
import _ from 'lodash';

import { layouts } from '../../renderer/layouts';
import { settings } from '../../renderer/defaultSettings';
import { themes } from '../../renderer/defaultThemes';

//import * as util from "./util";



function isEven(value) {
    return (value%2 == 0);
}
//layoutKey , themeId)
let templatesList = [
    {
        'layoutName': 'landing Page',
        'layout': 'landing-page-v0.0.1',
        'themeId' : 3 ,
        'url' : ENV.rootURL +'img/blue.png',
        'colors':themes[3].theme
    }, 
    {
        'layoutName': 'Research Paper',
        'layout': 'research-paper-v0.0.1', 
        'themeId' : 1 , 
        'url' : ENV.rootURL +'img/orange.png',
        'colors':themes[1].theme
    },
    {
        'layoutName': 'Data Feature',
        'layout': 'data-feature-v0.0.1', 
        'themeId' : 2 , 
        'url' : ENV.rootURL +'img/green.png',
        'colors':themes[2].theme
    }
];

let layersAlreadyMerged = [];
function mergeUserSettings(layerType ,systemSettings , aUserLayerSetting, layerTypeIndex) { 
    let newSettings = {};
    //if the component setting type is equal to a system setting type  
    if(aUserLayerSetting[layerTypeIndex].component === layerType) { 
        Object.keys(aUserLayerSetting[layerTypeIndex].settings).reverse().forEach((setting , index)=> { 
            newSettings[Object.keys(aUserLayerSetting[layerTypeIndex].settings)[index]] = Object.values(aUserLayerSetting[layerTypeIndex].settings)[index];
        }); 
    } else {
        console.log('something went wrong')
    }
    //Take data from left and migrate any like key / values to the right | UPDATES newSettings
    return  _.defaultsDeep(newSettings, systemSettings[layerType]);
}

export default Ember.Component.extend({
    classNames: ['d-inline'],
    templates: templatesList,
    isOpen: null,
    keepContent:true,
    showContentWarrning:false,
    layoutKey:'',
    themeId:'',
    actions: {
      shouldKeepContent(layoutKey , themeId) {
        this.set('layoutKey' , layoutKey)
        this.set('themeId' , themeId)

        if(this.get('keepContent')) {
            this.send('renderTemplate' ,layoutKey , themeId);
        } else {
            this.set('showContentWarrning' , true )
        }
    },
    renderTemplate(layoutKey , themeId) {
        let currentUserLayout = [];

        let finalLayout = [];

        //get users current layout with settings 
        let currentUserLayers = this.get('model.theme.content.layers');

        //get the layout that the users wants to change to
        let layout = layouts[layoutKey];
        let removedVersionLayout = []; 
        //remove Version from layout 
        Object.values(layout).forEach((layerType , index)=> {
            //remove version from type will use later 👍👍👍👍
            layerType = layerType.substring(0, layerType.lastIndexOf('-'));
            removedVersionLayout.push(layerType)
        });

        currentUserLayers.forEach((aUserLayer , index)=> {
            currentUserLayout.push(aUserLayer.component)
        });

        //combine user and layout in to one layout
        finalLayout = _.defaults(currentUserLayout, removedVersionLayout);
        if(!this.get('keepContent')) {
            finalLayout = removedVersionLayout;
        }
        //remove all layers
        this.set('model.theme.content.layers' , [])
        //loop over layout
        let reversedIndex = finalLayout.length -1;
        finalLayout.reverse().forEach((layerType , index)=> {

            //grab all user settings and apply them to appropriate layers 
            let newSetting = mergeUserSettings(layerType , settings, currentUserLayers, reversedIndex) 
            reversedIndex--;
            if(themeId){ 
                //apply theme
                let theme = themes[themeId].theme;
                if(isEven(index)){
                    Ember.set( newSetting, "bgColor",  theme.secondaryColor); 
                    Ember.set( newSetting, "color",  theme.secondaryTextColor); 
                    Ember.set( newSetting, "alignment",  theme.alignment); 
                } else {
                    Ember.set( newSetting, "bgColor",  theme.tertiaryColor); 
                    Ember.set( newSetting, "color",  theme.tertiaryTextColor); 
                    Ember.set( newSetting, "alignment",  theme.alignment); 
                }

                //Block specific settings
                if(layerType === 'layer-title') {
                   Ember.set( newSetting, "bgColor",  theme.primaryColor); 
                   Ember.set( newSetting, "color",  theme.primaryTextColor); 
                   Ember.set( newSetting, "alignment",  theme.alignment); 
                   if(theme.blockSettings){
                    Ember.set( newSetting, "backgroundImage",  theme.blockSettings['layer-title'].backgroundImage);
                } else {
                    Ember.set( newSetting, "backgroundImage",  '');
                }
            }
        }
            //apply appropriate settings to the layer
            //build each layer based on layout layers
            let item = {
                "component": layerType,
                "settings": newSetting
            }
            //add to page
            this.get('model.theme.content.layers').insertAt(0,item)
        });

        this.set('isOpen', false);
        $('body').scrollTop(0);
        $('body').removeClass('no-scroll');
        this.send('dismissModal')
        this.set('keepContent' , true)
    },
    toggleKeepContent(){
        this.toggleProperty('keepContent')
        this.set('showContentWarrning' , false)

    },
    openOverlay(){
        this.set('isOpen', true);
        $('body').addClass('no-scroll');
    },
    closeOverlay(){
        this.set('isOpen', false);
        $('body').removeClass('no-scroll');
        this.set('keepContent' , true)
        this.set('showContentWarrning' , false)

    },
    dismiss(){
        this.set('isOpen', false);
        $('body').removeClass('no-scroll');
        this.set('keepContent' , true)
        this.set('showContentWarrning' , false)
    }, 
    modalChoice(choice) {
        this.set('keepContent' , choice)
        this.send('renderTemplate' , this.get('layoutKey') , this.get('themeId'));
    },
    dismissModal(){
        this.set('showContentWarrning' , false)
    }
}
});
