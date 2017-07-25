import Ember from 'ember';

export default Ember.Component.extend({
    style: Ember.computed('layer.settings.values.color', function(){
        return Ember.String.htmlSafe('color: ' + (this.get('layer.settings.values.color') || '#333') + '; ');
    }),
    actions: {
        scrollToLayer(index){
            let el = $('#layer'+index);
            let offset = el.offset();
            $('body').animate({scrollTop:offset.top}, '500');
        }
    }
});
