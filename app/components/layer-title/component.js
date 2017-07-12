import Ember from 'ember';

export default Ember.Component.extend({
    titleStyle: Ember.computed('layer.settings.properties.h1Size', function(){
        let size = this.get('layer.settings.properties.h1Size') || 30;
        return Ember.String.htmlSafe('font-size: ' + size + 'px;');
    })
});
