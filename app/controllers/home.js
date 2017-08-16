/*global $:true*/

import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['editMode'],
    timer: null,
    isAdmin: Ember.computed('node', function(){
        return this.get('model.node.currentUserPermissions').includes('admin');
    }),
    saving: Ember.observer('editMode', function(){
       $(document).ready(()=>{
        if(this.get('editMode')){
            this.set('timer', setInterval(()=>{
                this.store.findRecord('home', this.get('model.guid')).then((data)=> {
                    data.set('pageData', JSON.stringify(this.get('model.theme.content')));
                    data.save();
                });
            }, 5000));
        }else{
            window.clearInterval(this.get('timer'));
        }

    }); 

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
            if(this.get('model.theme').get('canUndo')){
                this.get('model.theme').undo();
            }
        },
        redo(){
            if(this.get('model.theme').get('canRedo')) {
                this.get('model.theme').redo();
            }
        }
    },
    init(){
        this._super(...arguments);
        $('body').on('click', function(e){
            if($(e.target).parents('.popover').length === 0){
                $('.popover').hide();
            }
        })
    }
});
