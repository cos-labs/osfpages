/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';
import ENV from '../config/environment';


let theme = {};

export default Ember.Route.extend({
    beforeModel(){
        $.ajax({
            type: "GET",
            url: ENV.rootURL + "themes/theme_1.json",
            async: false,
            success: function (data) {
                const content = Ember.Object.create(data);
                const timeMachine = TimeMachine.Object.create({ content });
                theme = timeMachine;
            }});
    },
    model(params){
        // If testing and parameter is not working use this 'jyu4t' for params.guid
        return this.store.findRecord('node', params.guid).then((result)=>{
            return {
                theme,
                guid: params.guid,
                node: result
            };
        });
    }
});
