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

function compareUserSettings(layerType ,systemSettings , userSettings) { 
    const ignoredSettings = ['backgroundImage' , 'bgColor' , 'color' , 'alignment']
    let newSettings = {};


    for(let i = 0; i < userSettings.length; i++) { //Loop over users settings           

        if(userSettings[i].component === layerType) { //if the component setting type is equal to a system setting type  
            Object.keys(userSettings[i].settings).forEach((setting , index)=> {  
                if(!ignoredSettings.includes(setting)){
                    newSettings[Object.keys(userSettings[i].settings)[index]] = Object.values(userSettings[i].settings)[index];
                }
            });         
        }
    }
    //Take data from left and migrate any like key / values to the right | UPDATES newSettings
    return  _.defaults(newSettings, systemSettings[layerType]);

}

export default Ember.Component.extend({
    classNames: ['d-inline'],
    templates: templatesList,
    isOpen: null,
    keepContent:true,
    actions: {
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
        finalLayout.reverse().forEach((layerType , index)=> {

            //grab all user settings and apply them to appropriate layers 
            let newSetting = compareUserSettings(layerType , settings, currentUserLayers) 
            console.log(newSetting)
            if(themeId){
                //apply theme
                let theme = themes[themeId].theme;

                console.log('layerType' , layerType)
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


    },
    toggleKeepContent(){
        this.toggleProperty('keepContent')
    },
    openOverlay(){
        this.set('isOpen', true);
        $('body').addClass('no-scroll');
    },
    closeOverlay(){
        this.set('isOpen', false);
        $('body').removeClass('no-scroll');
    },
    dismiss(){
        this.set('isOpen', false);
        $('body').removeClass('no-scroll');

    }
}
});
