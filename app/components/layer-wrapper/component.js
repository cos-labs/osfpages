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
    adjustSize: Ember.computed('showSettings', function(){
        if(this.get('showSettings')){
            let settingsHeight = this.$().find('.layer-settings').innerHeight();
            let contentHeight = this.$().find('.layer-content').innerHeight();
            if(settingsHeight > contentHeight){
                this.$().find('.layer-content').innerHeight(settingsHeight);
            } else {
                this.$().find('.layer-settings').innerHeight(contentHeight);

            }
        } else {
            this.$().find('.layer-content').height('auto');
        }
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
