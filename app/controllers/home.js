/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';


export default Ember.Controller.extend({
    queryParams: ['editMode'],
    timer: null,
    isAdmin: Ember.computed('node', function(){
        return this.get('model.node.currentUserPermissions').includes('admin');
    }),
    saving: Ember.observer('editMode', function(){
        $(document).ready(()=>{
            let firebaseDB = this.store.findRecord('home', this.get('model.guid'))

            if(this.get('editMode')){//AND CHECK IF THE MODEL ISDIRTY 

                //get unpublishedPageData
                firebaseDB.then((record)=>{ 
                    let unpublishedPageData = record.get('unpublishedPageData');
                    this.set('model.theme.content' , JSON.parse(record.get('unpublishedPageData')))  
                });




               // this.set('timer', setInterval(()=>{

                    // this.store.findRecord('home', this.get('model.guid')).then((data)=> {
                    //     console.log(this.get('model.theme.content'))
                    //     data.set('unpublishedPageData', JSON.stringify(this.get('model.theme.content')));
                    //     data.save();
                    // });
                //}, 5000));
            }else{
                window.clearInterval(this.get('timer'));
                firebaseDB.then((record)=>{ 
                    let pageData = record.get('pageData');
                    this.set('model.theme.content' , JSON.parse(record.get('pageData')))  
                });
            }

        }); 
    }),
    editMode: false,
    actions: {
        scrollToTop(){
            $('body').animate({scrollTop:0}, '500');
        },
        toggleEditMode(){
            this.send('save' , this.get('model.guid') )
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
        },
        publish(){//publish will take unplblished data and put it in to page data on firebase 
            this.send('save' , this.get('model.guid') )
            this.store.findRecord('home', this.get('model.guid')).then((data)=> {               
                data.set('pageData',  data.get('unpublishedPageData'));
                data.save();
            });
        },
        save(guid){
            if(this.get('editMode')){
               this.store.findRecord('home', this.get('model.guid')).then((data)=> {
                    data.set('unpublishedPageData', JSON.stringify(this.get('model.theme.content')));
                    data.save();
                });
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
