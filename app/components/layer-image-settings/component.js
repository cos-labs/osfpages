import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        saveForm(){

        },
        layerHeight(direction){
            let amount = direction === 'smaller' ? -10 : 10;
            this.set('layer.settings.properties.height', this.get('layer.settings.properties.height') + amount);
        }
    }
});
