import Ember from 'ember';

let layers = {};

export default Ember.Route.extend({
    beforeModel(){
        $.ajax({
            type: "GET",
            url: "/themes/theme_1.json",
            async: false,
            success: function (data) {
                layers = data;
            }});
    },
    model(params){
        // If testing and parameter is not working use this 'jyu4t' for params.guid
        return this.store.findRecord('node', params.guid).then((result)=>{
            return {
                layers,
                guid: params.guid,
                node: result
            };
        });
    }
});
