import Ember from 'ember';

export default Ember.Component.extend({
    open: null,
    actions: {
        addLayer (type) {
            console.log('add ' + type);
        },
        toggleProperty(prop){
            this.toggleProperty(prop);
        }
    }
});
