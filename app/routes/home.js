/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';
import ENV from '../config/environment';


let theme = {};
let jsonBlob;
function showError(){
    let defaultJSON ='';
    $.ajax({
        type: "GET",
        url: ENV.rootURL + "themes/theme_error.json",
        async: false,
        success: function (data) {
            defaultJSON = data;
        }
    });
    jsonBlob =  JSON.stringify(defaultJSON);
}

let metaData = '';
export default Ember.Route.extend({
    isDragging:'',
    setupController: function(controller, model) {
        this.set('isDragging', function isDragging(){
            controller.set('isDragging', false)
        });
        controller.set('model' , model);
        document.addEventListener("dragend", this.get('isDragging'))
    },
    deactivate: function() {
        document.removeEventListener("dragend" , this.get('isDragging'))
    },
    model: async function(params){

        jsonBlob = await this.store.findRecord('home', params.guid).then((record)=>{
            return  record.get('pageData')
        },function(e) {
            console.log(e)
            return false;
        });

        let node = null;
        try{
            node = await this.store.findRecord('node', params.guid);
        }catch(e){
            showError()

        }
        if(!jsonBlob){
            metaData = JSON.stringify({'showTemplates':true});
            if( node.get('currentUserPermissions')[1] === 'write'){
                $.ajax({
                    type: "GET",
                    url: ENV.rootURL + "templates/theme_starter.json",
                    async: false,
                    success: (data)=> {
                        let guid = {
                            id: params.guid,
                            guid: params.guid,
                            pageData: JSON.stringify(data),
                            unpublishedPageData: JSON.stringify(data),
                            metaData: metaData
                        };
                        let record = this.store.createRecord('home', guid);
                        record.save()
                        jsonBlob =  JSON.stringify(data);
                    }});
            }else{
                showError()
            }
        }

        const content = Ember.Object.create(JSON.parse(jsonBlob));
        const timeMachine = TimeMachine.Object.create({ content });
        theme = timeMachine;

        return {
            theme,
            guid: params.guid,
            node: node,
            metaData:metaData
        };
    },
    actions: {
        save(guid){
            this.store.findRecord('home', guid).then(function(data) {
                data.set('pageData', JSON.stringify(theme.content));
                data.save();
            });

        }
    }
});
