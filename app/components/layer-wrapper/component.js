import Ember from 'ember';

export default Ember.Component.extend({
    showSettings: false,
    theme: Ember.computed('themes', function(){
        return this.get('themes')[this.get('layer.settings.properties.themeId')]
    }),
    actions: {
        showSettings (){
            this.set('showSettings', true);
        }
    }
});
