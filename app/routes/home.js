/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';
import ENV from '../config/environment';


let theme = {};

function getToken() {
    let token;
    const session = window.localStorage['ember_simple_auth-session'];
    if (session) {
        token = JSON.parse(session).authenticated;
        if ('attributes' in token) {
            return token.attributes.accessToken;
        }
        return token;
    }
}

// function httpRequest(method, url , params, node , resolve){

//     const deferred = Ember.RSVP.defer();

//     let xhttp = new XMLHttpRequest();
//     xhttp.open(method, url, true);
//     xhttp.withCredentials = false;
//     let token = getToken();
//     xhttp.setRequestHeader('Authorization', `Bearer ${token}`);

//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200 ) {
//             const content = Ember.Object.create(JSON.parse(this.responseText));
//             const timeMachine = TimeMachine.Object.create({ content });
//             theme = timeMachine;
//             console.log(this.responseText)
//             if(resolve){
//                 deferred.resolve({
//                     theme,
//                     guid: params.guid,
//                     node: node
//                 });
//             }else{
//                 deferred.resolve(JSON.parse(this.responseText));
//             }
//         }
//     };
//     xhttp.send();
//     return deferred.promise;
// }


export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model' , model);
    },
    model: async function(params){

        let defaultJSON ='';
        $.ajax({
            type: "GET",
            url: ENV.rootURL + "themes/theme_1.json",
            async: false,
            success: function (data) {
                defaultJSON = data;
            }});




        let firebaseDB = this.store.findRecord('home', params.guid)



        console.log(firebaseDB)
        let jsonBlob = await firebaseDB.then((file)=>{        
            return  file.get('guid')
        },function(reason) {
            return false;

        });

        // If testing and parameter is not working use this 'jyu4t' for params.guid
        let node = await this.store.findRecord('node', params.guid)
        

        if(!jsonBlob){
            console.log('in blob lets add this guid' )
            //add to firebase  
            var guid = {
                id: params.guid,
                guid: JSON.stringify(defaultJSON) 
            };
            var record = this.store.createRecord('home', guid);
            record.save()

        }


        const content = Ember.Object.create(JSON.parse(jsonBlob));
        const timeMachine = TimeMachine.Object.create({ content });
        theme = timeMachine;

        console.log(theme)
        return {
            theme,
            guid: params.guid,
            node: node
        };
    }
});
