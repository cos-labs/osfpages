import Ember from 'ember';

export default Ember.Component.extend({
    file_object: null,
    showRemoveModal: false,
    lastIndex: Ember.computed('layers.[]',function (){
        return  this.get('layers').length-1;
    }),
    currentTheme: Ember.computed('layer.settings.values.themeId', function(){
        return this.get('themes').find((item)=>{
            return item.id === this.get('layer.settings.values.themeId');
        })
    }),
    actions: {
        changeSize(direction, item){
            if(direction === 'bigger') {
                this.incrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
            if(direction === 'smaller') {
                this.decrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
        },
        runOption(option, item){
            this.set('layer.settings.values.' + item.value, option);
        },
        // Move layer
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
        },
        // Remove layer
        showRemove(){
            this.set('showRemoveModal', true);
        },
        hideRemove(){
            this.set('showRemoveModal', false);
        },
        removeLayer () {
            let index = this.get('index');
            this.get('layers').removeAt(index);
            this.set('showRemoveModal', false);
        },
        // Theme select
        updateTheme(newSelection){
            this.set('layer.settings.values.themeId', newSelection.id);
        }
    }
});
