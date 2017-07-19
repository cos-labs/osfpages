import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        scrollToLayer(index){
        	            console.log(JSON.stringify(this.get('layers'), null, 2))

            let el = $('#layer'+index);
            let offset = el.offset();
            $('body').animate({scrollTop:offset.top}, '500');
        }
    }
});
