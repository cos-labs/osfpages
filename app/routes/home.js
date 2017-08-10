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

function httpRequest(method, url , params, node , resolve){

    const deferred = Ember.RSVP.defer();

    let xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.withCredentials = false;
    let token = getToken();
    xhttp.setRequestHeader('Authorization', `Bearer ${token}`);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 ) {
            const content = Ember.Object.create(JSON.parse(this.responseText));
            const timeMachine = TimeMachine.Object.create({ content });
            theme = timeMachine;
            
            if(resolve){
                deferred.resolve({
                    theme,
                    guid: params.guid,
                    node: node
                });
            }else{
                deferred.resolve(JSON.parse(this.responseText));
            }
        }
    };
    xhttp.send();
    return deferred.promise;
}


export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model' , model);
    },
    model: async function(params){
        //Slow load times because OSF doesnt have filters on materializedPath and we cant filter on queryRecord  which would be faster.
            // this.store.queryRecord('file', {'filter': {'materializedPath':'/OSFPages/data.json'}})

        // let putMessage = await httpRequest('PUT' , `${ENV.OSF.waterbutlerUrl}v1/resources/${params.guid}/providers/osfstorage/?kind=folder&name=OSFPages`)
        // if(putMessage == 409){


            // var data = {
            //     guid: '5989b2e58ca57e0258f301b5'
            // };
            // var record = this.store.createRecord('home', data);
            
            // record.save()



            console.log(this.store.findAll('home'))

            let firebaseDB = this.store.findAll('home');

            let dataGUID = await firebaseDB.then((files)=>{return files.objectAt(0).get('guid')})
        // // If testing and parameter is not working use this 'jyu4t' for params.guid
        let node = await this.store.findRecord('node', params.guid)


        // //  //get the json file from the project if it doesnt exist make a new folder 
        // let folder = await node.get('files')
        // let OSFStorage = await folder.objectAt(0).get('files')
        
        // let OSFPages = ''
        // if( OSFStorage.find(function(child){return child.get('name') === 'OSFPages'})){
        //     OSFPages = OSFStorage.find(function(child){return child.get('name') === 'OSFPages'})
        // }else{
        //     httpRequest('PUT' , `${ENV.OSF.waterbutlerUrl}v1/resources/${params.guid}/providers/osfstorage/?kind=folder&name=OSFPages`)
        //     OSFPages = OSFStorage.find(function(child){return child.get('name') === 'OSFPages'})

        // }
        // let osfPagesChildren = await OSFPages.get('files')//
        //  // let assets = osfPagesChildren.find(function(child){return child.get('name') === 'assets'})
        //  // let assetsChildren = await assets.get('files')


        //  let dataJSON = osfPagesChildren.find(function(child){return child.get('name') === 'data.json'})
         //dataJSON.get('links').download+"?direct="


         let JSONData = await httpRequest('GET' , `${ENV.OSF.waterbutlerUrl}v1/resources/${params.guid}/providers/osfstorage/${dataGUID}?direct=` , params , node, true );



         return JSONData;
     // }else{
     //    httpRequest('PUT' , `${ENV.OSF.waterbutlerUrl}v1/resources/${params.guid}/providers/osfstorage/OSFPages?kind=folder&name=assets`)
     // }
 }
});
