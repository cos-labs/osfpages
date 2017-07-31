/*global $:true*/

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
        },
        undo(){
            this.get('model.theme').undo();
        },
        redo(){
            this.get('model.theme').redo();
        }
    },
    init(){
        this._super(...arguments);
        $('body').on('click', function(e){
            console.log('a');
            if($(e.target).parents('.popover').length === 0){
                $('.popover').hide();
            }
        })
    }
});
