/*global $:true*/

import Ember from 'ember';
import _ from 'lodash';



export default Ember.Controller.extend({
    queryParams: ['editMode'],
    showNotSavedModal: false,
    published: false,
    saved: false,
    isOpen: Ember.computed('node', async function(){ 
        let node = await this.get('model.node')
        console.log(this.get('model.node'))
        this.set('isOpen', !node.get('public') )


        $( document ).ready(function() {
            $('.alert-message').css('display' , 'block')
        });
    }),
    unpublishedChanges:  Ember.computed('editMode', function() {
        return this.store.findRecord('home', this.get('model.guid')).then((record)=>{ 

            let unpublishedPageData = record.get('unpublishedPageData');
            let pageData =  record.get('pageData');

            if(_.isEqual(unpublishedPageData, pageData)){
                this.set('unpublishedChanges', false)
            }else{
                this.set('unpublishedChanges', true)
            }
        });
    }),
    savedPageData: "",
    isAdmin: Ember.computed('node', function(){
        this.send('canUserEdit')
        return this.get('model.node.currentUserPermissions').includes('admin');
    }),
    databaseData: Ember.observer('editMode', function(){
        $(document).ready(()=>{
            this.send('canUserEdit')

            let database = this.store.findRecord('home', this.get('model.guid'))

            if(this.get('editMode')){
                database.then((record)=>{ 
                    let pageData = record.get('unpublishedPageData');
                    if(pageData === null){
                        pageData =  record.get('pageData');
                    }
                    this.set('model.theme.content' , JSON.parse(pageData))
                    this.set('savedPageData' , JSON.parse(pageData).layers) //save a version of pagedata so we can see if any changes have been made
                });

            }else{
                database.then((record)=>{ 
                    let pageData = record.get('pageData');
                    this.set('model.theme.content' , JSON.parse(record.get('pageData')))
                });
            }

        });
    }),
    editMode: false,
    actions: {
        canUserEdit(){
            if(!this.get('model.node.currentUserPermissions').includes('admin')){
                this.set('editMode' , false)
            }
        },
        scrollToTop(){
            $('body').animate({scrollTop:0}, '500');
        },
        checkSaveState(){
            if(this.get('editMode')){
                if(_.isEqual(this.get('savedPageData'), this.get('model.theme.content.layers') )){//check to see if changes have been made
                    this.send('toggleEditMode')
                }else{
                    this.send('toggleModal', true)
                    //this.set('showNotSavedModal' , true)
                }
            }else{
                this.send('toggleEditMode')
            }

        },
        toggleEditMode(shouldSave){

            if(shouldSave){
                this.send('save' , this.get('model.guid') )
            }
            this.toggleProperty('editMode');
            this.send('toggleModal', false)
            //this.set('showNotSavedModal' , false)


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
        publish(){//publish will take unpublished data and put it in to page data on backend 
            this.set('unpublishedChanges', false);
            this.set('published' , true)
            this.send('save' , this.get('model.guid') )
            this.store.findRecord('home', this.get('model.guid')).then((data)=> {
                data.set('pageData',  data.get('unpublishedPageData'));
                data.save();
            });
            setTimeout(()=>{
                this.set('published' , false)
                this.set('unpublishedChanges', false);

            }, 2000);
        },
        save(guid){
            this.set('unpublishedChanges', false);
            if(!this.get('published')){
                this.set('saved' , true)
            }
            if(this.get('editMode')){
                this.store.findRecord('home', this.get('model.guid')).then((data)=> {
                    data.set('unpublishedPageData', JSON.stringify(this.get('model.theme.content')));
                    data.save();
                });
            }

            this.set('savedPageData' , this.get('model.theme.content.layers')) //save a version of pagedata so we can see if any changes have been made

            setTimeout(()=>{
                this.set('saved' , false)
                this.set('unpublishedChanges', true);
            }, 2000);
        },
        toggleModal(state){
            this.set('showNotSavedModal' , state)
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
