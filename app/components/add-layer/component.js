import Ember from 'ember';
import { settings } from '../../renderer/defaultSettings';
import _ from 'lodash';



export default Ember.Component.extend({
    isOpen: null,
    indexVal:null,
    type:null,

    actions: {
        addLayer (type) {
            let tempSettings = _.cloneDeep(settings);
            let item =  {
                "component": type,
                "settings": tempSettings[type]
            };
            let index = this.get('index')+1;
            if(this.get('indexVal') !== null){
                index = parseInt(this.get('indexVal'))+1 
            }
            try {
                this.get('layers.content').insertAt(index,item);
            } catch(e) {
                this.get('layers.content').insertAt(0,item);
            }
            this.set('isOpen', false);
            this.set('indexVal' , null)

        },
        toggleProperty(prop){
            this.toggleProperty(prop);
        },
        allowDragOver(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        },
        drag(el, event) {
            event.dataTransfer.setData('text/html', event.target.dataset.title) // for firefox 
            this.set('type', event.target.dataset.title)
            Ember.run.next(this, ()=> {  
                this.set('isDragging' , true)
                // $(event.target.parentNode).closest('.add-layer-toggle').addClass('dotted-line') //save 
            });
        },
        drop(event) {
            if(this.get('mini')){
                this.set('indexVal' , this.get('index'))   
            } else {
                if(event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild !== null){
                    this.set('indexVal' , event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild.id.replace(/\D/g,''))   
                }
            }  
            this.send('addLayer' , this.get('type'))

            Ember.run.next(this, ()=> {  
                let percentage = this.get('percentage');
                let mainPercentage = 100-percentage;
                this.set('percentage' , percentage)
                this.set('mainPercentage' , mainPercentage)
            });
        }

    }
});
