import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        scrollToLayer(index){
            debugger;
            let el = $('#layer'+index);
            let offset = el.offset();
            $('body').animate({scrollTop:offset.top}, '500');
        }
    }
});
