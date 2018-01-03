/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';
import ENV from '../../config/environment';
import _ from 'lodash';



function mergeJSON(o1, o2) {
       //console.log(o1 , o2)

    var tempNewObj = o1;

    //if o1 is an object - {}
    if (o1.length === undefined && typeof o1 !== "number") {
        $.each(o2, function(key, value) {
            if (o1[key] === undefined) {
                tempNewObj[key] = value;
            } else {
                tempNewObj[key] = mergeDeep(o1[key], o2[key]);
            }
        });
    } else if (o1.length > 0 && typeof o1 !== "string") {//else if o1 is an array - []
        $.each(o2, function(index) {
            if (JSON.stringify(o1).indexOf(JSON.stringify(o2[index])) === -1) {
                tempNewObj.push(o2[index]);
            }
        });
    } else {//handling other types like string or number
        //taking value from the second object o2
        //could be modified to keep o1 value with tempNewObj = o1;
        tempNewObj = o2;
    }

    return tempNewObj;
};




export default Ember.Component.extend({
    classNames: ['d-inline'],
    themeList: [
        {
            id: 1,
            name: 'All',
            thumb: ENV.rootURL +'img/all.png',
            description: 'Includes all section types.'
        },
        {
            id: 2,
            name: 'Wiki',
            thumb: ENV.rootURL +'img/wiki.png',
            description: 'A basic page with title and wiki page.'
        },
        {
            id: 3,
            name: 'File',
            thumb: ENV.rootURL +'img/file.png',
            description: 'Title and file sections ideal for showcasing papers.'
        },
        {
            id: 4,
            name: 'Institution',
            thumb:  ENV.rootURL +'img/institution.png',
            description: 'Example of an institution homepage.'
        },
        {
            id: 5,
            name: 'Portfolio',
            thumb: ENV.rootURL +'img/portfolio.png',
            description: 'Example of a portfolio page'
        },
        {
            id: 6,
            name: 'RPP',
            thumb: ENV.rootURL +'img/rpp.png',
            description: 'Example of Reproducibility Project: Psychology'
        },
    ],
	isOpen: null,
	actions: {
		renderTemplate(id) {
			let self = this;
			let theme = `theme_${id}.json`;
			$.ajax({
				type: 'GET',
				url: ENV.rootURL +'templates/' + theme,
				async: false,
				success: function(data) {
                    var content = Ember.Object.create(data);
                    var currentContent = self.get('theme.content');

                    var removedLayers = [];

                    let count = [];
                    for(let i = 0; i < currentContent.layers.length; i++) {       
                        for(let k = 0; k < content.layers.length; k++) {
                            let allowed = true;
                            if(_.hasIn(count, k)){
                                allowed = false;
                            }
                            //👍 14  
                            if(currentContent.layers[i].component === content.layers[k].component) {
                                if(allowed){
                            
                                    content.layers[k].settings = _.defaults(currentContent.layers[i].settings , content.layers[k].settings )
                                    count.push(k)
                                    break;
                                }else {
                                    removedLayers.push(currentContent.layers[i])
                                    console.log('LAYER REMOVED', currentContent.layers[i])
                                }
                            }
                        }
                   }

                    content.layers = _.union(content.layers, removedLayers);
                    console.log('at end LAYER REMOVED' , content.layers)

                    const timeMachine = TimeMachine.Object.create({ content });




                    self.set('theme', timeMachine);
					self.set('isOpen', false);

                    self.set('showTemplates' , false) //strange right?
                    self.set('model.metaData.showTemplates' , false)

                    $('body').scrollTop(0);
                    $('body').removeClass('no-scroll');
                }
			});
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
