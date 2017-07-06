import Ember from 'ember';

export default Ember.Component.extend({
    showSettings: false,
    showLayer : true,
    didReceiveAttrs() {
        this._super(...arguments);
        if(this.get('layer').component === 'layer-title'){
            this.set('showLayer', false);

        }else{
          this.set('showLayer', true);
        }
     },
    theme: Ember.computed('themes', 'layer.settings.properties.themeId', function(){
        return this.get('themes').filter((item)=>{
            return item.id === this.get('layer.settings.properties.themeId');
        })[0];
    }),
    lastIndex: Ember.computed('layers',function (){
       return  this.get('layers').length-1;
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
