/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';
import ENV from '../config/environment';


let theme = {};
export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model' , model);
    },
    model: async function(params){

        // If testing and parameter is not working use this 'jyu4t' for params.guid
        let node = await this.store.findRecord('node', params.guid)
        let firebaseDB = this.store.findRecord('home', params.guid)

        let jsonBlob = await firebaseDB.then((record)=>{        
            return  record.get('pageData')
        },function() {
            return false;
        });




        if(!jsonBlob){
            if( node.get('currentUserPermissions')[1] === 'write'){
                $.ajax({
                    type: "GET",
                    url: ENV.rootURL + "themes/theme_1.json",
                    async: false,
                    success: (data)=> {
                        //add to firebase  
                        let guid = {
                            id: params.guid,
                            pageData: JSON.stringify(data) 
                        };
                        let record = this.store.createRecord('home', guid);
                        record.save()

                        jsonBlob =  JSON.stringify(data);
                    }});



            }else{
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
        }



        const content = Ember.Object.create(JSON.parse(jsonBlob));
        const timeMachine = TimeMachine.Object.create({ content });
        theme = timeMachine;

        return {
            theme,
            guid: params.guid,
            node: node
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
