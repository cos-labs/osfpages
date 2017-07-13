import Ember from 'ember';

export default Ember.Component.extend({
    currentTheme: Ember.computed('layer.settings.properties.themeId', function(){
       return this.get('themes').find((item)=>{
           return item.id === this.get('layer.settings.properties.themeId');
       })
    }),
    actions: {
        updateTheme(newSelection){
            this.set('layer.settings.properties.themeId', newSelection.id);
        }
    }
});
