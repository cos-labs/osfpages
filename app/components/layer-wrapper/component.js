import Ember from 'ember';

export default Ember.Component.extend({
    showSettings: false,
    theme: Ember.computed('themes', 'layer.settings.properties.themeId', function(){
        return this.get('themes').filter((item)=>{
            return item.id === this.get('layer.settings.properties.themeId');
        })[0];
    }),
    actions: {
        showSettings (){
            this.set('showSettings', true);
        }
    }
});
