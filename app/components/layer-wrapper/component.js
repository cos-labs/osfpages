import Ember from 'ember';

export default Ember.Component.extend({
    showSettings: false,
    actions: {
        showSettings (){
            this.set('showSettings', true);
        }
    }
});
