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
            let item;
            switch(type) {
                case 'wiki' :
                item = {
                    "component": "layer-wiki",
                    "settings": tempSettings['layer-wiki']
                };
                break;
                case 'file':
                item = {
                    "component": "layer-file",
                    "settings": tempSettings['layer-file']
                };
                break;
                case 'link':
                item = {
                    "component": "layer-link",
                    "settings": tempSettings['layer-link']
                };
                break;
                case 'advanced':
                item = {
                    "component": "layer-advanced",
                    "content": "<p>Mauris imperdie Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla. Fusce vestibulum malesuada nisl. Fusce augue leo, tempus eget matssstis vel, imperdiet at nulla</p>",
                    "settings": tempSettings['layer-advanced']
                };
                break;
                case 'image':
                item = {
                    "component": "layer-image",
                    "settings": tempSettings['layer-image']
                };
                break;
                case 'navigation':
                item = {
                    "component": "pages-menu",
                    "settings": tempSettings['pages-menu']
                };
                break;
                case 'title':
                item = {
                    "component": "layer-title",
                    "settings": tempSettings['layer-title']
                };
                break;
                case 'info':
                item =  {
                    "component": "layer-info",
                    "settings": tempSettings['layer-info']
                };
                break;
                case 'imangeAndText':
                item = {
                    "component": "layer-image-text",
                    "settings": tempSettings['layer-image-text']
                };
                break;
            }
            let index = this.get('index')+1;
            if(this.get('indexVal') !== null){
                index = parseInt(this.get('indexVal'))+1 
            }
            try {
                console.log(this.get('layers.content'))
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
                console.log('ddvd' , this.get('percentage'))
                this.set('percentage' , percentage)
                this.set('mainPercentage' , mainPercentage)
            });
        }

    }
});
