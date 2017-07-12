import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        saveForm(){
            this.set('showSettings', false);
        },
        titleSize (direction){
            let value = direction === 'bigger' ? 4 : -4;
            this.set('layer.settings.properties.h1Size', this.get('layer.settings.properties.h1Size') + value);
        },
        alignContent (alignment) {
            this.set('layer.settings.properties.alignment', alignment);
        }
    }
});
