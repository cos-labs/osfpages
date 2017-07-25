import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['editMode'],
    isAdmin: Ember.computed('node', function(){
        return this.get('model.node.currentUserPermissions').includes('admin');
    }),
    editMode: false,
    actions: {
        scrollToTop(){
            $('body').animate({scrollTop:0}, '500');
        },
        toggleEditMode(){
            this.toggleProperty('editMode');
        }
    }
});
