/*global $:true*/

import Ember from 'ember';
import _ from 'lodash';


const pi = 3.14159265359;

function cosPow6Intg(x) {
    return x - ((15 * Math.sin(2 * pi * x)) / (44 * pi)) - ((3 * Math.sin(4 * pi * x)) / (44 * pi)) - ((Math.sin(6 * pi * x)) / (132 * pi));
}

// Make our transition nice'n'smooth
function animate(propertySetter, start, end, speed, units, animationCompletedCallback) {
    units = units || 0;
    propertySetter(start + units);

    // Should be in all modern browsers now.
    // We could run a check and if need be use `Date.now()`.
    const start_time = performance.now();
    const change = end - start;
    const duration = Math.abs(change * speed) + 1000;

    (function step() {
        const time_now = performance.now();
        const elapsed_time = time_now - start_time;
        requestAnimationFrame(function(ts) { // requestAnimationFrame() === Butter.
            propertySetter(start + change * cosPow6Intg(elapsed_time / duration) + units);
            if (elapsed_time >= duration) {
                propertySetter(end + units);
                return;
            }
            step();
        });
    }());
}



export default Ember.Controller.extend({
    queryParams: ['editMode'],
    showNotSavedModal: false,
    published: false,
    saved: false,
    isLoading:false,
    container:'',
    type:null,
    isDragging:false,
    blockOverviewHeight:'',

    percentage:'0',
    mainPercentage:'100',
    isResizing: false,
    sublimeView: 'block',
    draggableBlocks: '33.33333',
    layerPadding: '0 50px',
    resizableControl: '',

    isOpen: Ember.computed('node', async function(){ 
        let node = await this.get('model.node')
        this.set('isOpen', !node.get('public') )

        $( document ).ready(function() {
            $('.alert-message').show();
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
    holderCSSEditMode:  Ember.computed('editMode', function() {
        if(this.get('editMode')){
            return 'col-xs-9'
        }else{
            return  'col-xs-12'
        }

        this.set('container' , 'container')
    }),

    savedPageData: "",
    isAdmin: Ember.computed('node', function(){
        this.send('canUserEdit')
        if(this.get('model.node')){    
            return this.get('model.node.currentUserPermissions').includes('admin');
        }else{
            return false;
        }

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

        console.log('edit mode changed')

        if(!this.get('editMode')){
            this.set('mainPercentage' , '100')
            this.set('percentage' , '0')  
            this.set('layerPadding' , '0 150px')
            this.set('resizableControl' , '25%')
            this.set('sublimeView' , 'block')
            this.set('draggableBlocks' , '33.33333') 

        } else {
            this.set('mainPercentage' , '75')
            this.set('percentage' , '25')  


        }
    }),
    editMode: false,
    actions: {
        canUserEdit(){
            if(this.get('model.node') !== null){
                if(!this.get('model.node.currentUserPermissions').includes('admin')){
                    this.set('editMode' , false)
                }
            }else{
                this.set('editMode' , false)

            }
        },
        scrollToTop(){
            $('html').animate({scrollTop:0}, '500');
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
            this.set('isLoading', true)          
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
                this.set('isLoading', false)
            }, 2000);
        },
        save(guid){
            this.set('isLoading', true)
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
                this.set('isLoading', false)
            }, 2000);
        },
        toggleModal(state){
            this.set('showNotSavedModal' , state)
        },
        scrollToLayer(index){
            let id = 'layer'+index;

            const rect = document.getElementById(id).getBoundingClientRect();
            const anchorOffset = window.pageYOffset + rect.top - 70;
            animate(
                y => window.scrollTo(0, y),
                window.scrollY,
                anchorOffset,
                0.2,
                null
                );


        },
        moveResizableControl(e) { 
            e.preventDefault();
            this.set('isResizing' , true)

            const mouseMove = (e) => {

                if(e.pageX <= 200) {
                    this.set('layerPadding' , '0 150px')
                    this.set('sublimeView' , 'none')
                    this.set('draggableBlocks' , '100')

                }else {
                    this.set('layerPadding' , '0 50px')
                    this.set('sublimeView' , 'block')
                    this.set('draggableBlocks' , '33.33333') 
                }

                var percentage = (e.pageX / window.innerWidth) * 100;
                if(percentage >= 33.33){
                    percentage = 33.33;
                }
                var mainPercentage = 100-percentage;


                this.set('mainPercentage' , mainPercentage)
                this.set('percentage' , percentage)  

                if( e.pageX <= 0){
                    this.set('resizableControl' , '0px')
                }else if(e.pageX >= $( document ).width()/3) { 
                    this.set('resizableControl' , $( document ).width()/3 +'px')

                }else{
                    this.set('resizableControl' , e.pageX+'px')
                }

            };

            const mouseUp = (e) => {
                if (this.get('isResizing')) {
                    document.removeEventListener('mousemove' , mouseMove);
                    document.removeEventListener('mouseup' , mouseUp);
                    this.set('isResizing' , false);
                }
            };
            document.addEventListener('mousemove', mouseMove);   
            document.addEventListener('mouseup', mouseUp);
        }

    },
    init(){
        this._super(...arguments);
        $('body').on('click', function(e){
            if($(e.target).parents('.popover').length === 0){
                $('.popover').hide();
            }
        })


        window.onresize = (e)=> {
            if(this.get('editMode')){
                this.set('resizableControl' , '25%')
                this.set('draggableBlocks' , '33.33333') 
                this.set('sublimeView' , 'block')
                this.set('mainPercentage' , '75')
                this.set('percentage' , '25')  
                this.set('layerPadding' , '0 50px')
            }
        };


    }
});
