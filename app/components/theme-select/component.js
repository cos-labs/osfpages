import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        updateTheme(newSelection){
            this.set('currentTheme', newSelection);
        }
    }
});
