import Ember from 'ember';

export default Ember.Controller.extend({
    isAdmin: Ember.computed('node', function(){
        return this.get('model.node.currentUserPermissions').includes('admin');
    }),
    editMode: false,
    currentMode: Ember.computed('editMode', function(){
        return this.get('editMode') ? 'View Mode' : 'Edit Mode';
    }),
    actions: {
        scrollToTop(){
            $('body').animate({scrollTop:0}, '500');
        },
        toggleEditMode(){
            this.toggleProperty('editMode');
        }
    }
});
