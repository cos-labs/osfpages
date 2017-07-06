import Ember from 'ember';

export default Ember.Controller.extend({
    editMode: false,
    actions: {
        scrollToTop(){
            $('body').animate({scrollTop:0}, '500');
        }
    }
});
