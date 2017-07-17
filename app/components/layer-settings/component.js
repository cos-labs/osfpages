import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        changeSize(direction, item){
            if(direction === 'bigger') {
                this.incrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
            if(direction === 'smaller') {
                this.decrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
        }
    }
});
