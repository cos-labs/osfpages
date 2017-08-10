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

export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model' , model);
    },
    model: async function(params){
        // If testing and parameter is not working use this 'jyu4t' for params.guid
        let node = await this.store.findRecord('node', params.guid)

        //get the json file from the project if it doesnt exist make a new folder 
        let folder = await node.get('files')
        let OSFStorage = await folder.objectAt(0).get('files')
        
        let OSFPages = OSFStorage.find(function(child){return child.get('name') === 'OSFPages'})
        console.log(OSFPages)
        let osfPagesChildren = await OSFPages.get('files')
        
         // let assets = osfPagesChildren.find(function(child){return child.get('name') === 'assets'})
         // let assetsChildren = await assets.get('files')
         
         // console.log(assetsChildren.objectAt(1).get('links'));

        let dataJSON = osfPagesChildren.find(function(child){return child.get('name') === 'data.json'})

        const deferred = Ember.RSVP.defer();

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", dataJSON.get('links').download+"?direct=", true);
        xhttp.withCredentials = false;
        let token = getToken();
        xhttp.setRequestHeader('Authorization', `Bearer ${token}`);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const content = Ember.Object.create(JSON.parse(this.responseText));
                const timeMachine = TimeMachine.Object.create({ content });
                theme = timeMachine;
                deferred.resolve({
                    theme,
                    guid: params.guid,
                    node: node
                });
            }
        };
        xhttp.send();

        return await deferred.promise;

    }
});
