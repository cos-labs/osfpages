import Ember from 'ember';

export default Ember.Component.extend({
    isOpen: null,
    actions: {
        addLayer (type) {

        },
        toggleProperty(prop){
            this.toggleProperty(prop);
        }
    }
});
