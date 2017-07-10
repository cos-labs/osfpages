import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        saveForm(){
            this.set('showSettings', false);
        }
    }
});
