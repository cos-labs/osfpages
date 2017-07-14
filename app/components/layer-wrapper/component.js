import Ember from 'ember';

export default Ember.Component.extend({

    showSettings: false,
    theme: Ember.computed('themes', 'layer.settings.properties.themeId', function(){
        return this.get('themes').filter((item)=>{
            return item.id === this.get('layer.settings.properties.themeId');
        })[0];
    }),
    lastIndex: Ember.computed('layers',function (){
       return  this.get('layers').length-1;
    }),
    style: Ember.computed('theme', 'layer.settings.backgroundImage', 'layer.settings.properties.height', function(){
        let bgColor = 'background-color: ' + this.get('theme.background') + '; ';
        let bgImage = '';
        if(this.get('layer.component') === 'layer-image'){
            bgImage = 'background-image: url(' + this.get('layer.settings.properties.url') + '); '
        } else if (this.get('layer.settings.backgroundImage')){
            bgImage = 'background-image: url(' + this.get('layer.settings.backgroundImage') + '); '
        }
        let height = this.get('layer.settings.properties.height') ? 'height: ' + this.get('layer.settings.properties.height') + 'px;' : '';
        let color = 'color: ' + this.get('theme.color') + '; '
        return Ember.String.htmlSafe(bgColor + bgImage + color + height);
    }),
    actions: {
        showSettings (){
            this.set('showSettings', true);
        },
        moveBefore(index){
            let layers = this.get('layers');
            let removed = layers.objectAt(index);
            layers.insertAt(index-1, removed);
            layers.removeAt(index+1);
        },
        moveAfter(index){
            let layers = this.get('layers');
            let removed = layers.objectAt(index);
            layers.insertAt(index+2, removed);
            layers.removeAt(index);
        }
    }
});
