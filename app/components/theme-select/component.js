import Ember from 'ember';

export default Ember.Component.extend({
    currentTheme: Ember.computed('layer.settings.values.themeId', function(){
       return this.get('themes').find((item)=>{
           return item.id === this.get('layer.settings.values.themeId');
       })
    }),
    actions: {
        updateTheme(newSelection){
            this.set('layer.settings.values.themeId', newSelection.id);
        }
    }
});
