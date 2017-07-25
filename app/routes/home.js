import Ember from 'ember';

/* Using static data for now. GUID will load from server */
const Layer = Ember.Object.extend();
let layers = {};

let themes = [
    {
        id: 2,
        name: "light",
        type: "light",
        background: '#eeeeee',
        color: '#333333'
    },
    {
        id: 3,
        name: "green",
        type: "dark",
        background: '#009688',
        color: '#ebebeb',
    },
    {
        id: 4,
        name: "blue",
        type: "dark",
        background: '#00BCD4',
        color: '#ffffff'
    },
    {
        id: 5,
        name: "white",
        type: "light",
        background: '#ffffff',
        color: '#333333'
    },
    {
        id: 6,
        name: "darkblue",
        type: "dark",
        background: '#31708f',
        color: '#f5f5f5'
    },
    {
        id: 7,
        name: "yellow",
        type: "light",
        background: '#f3cd59',
        color: '#333333'
    },
    {
        id: 8,
        name: "gray-blue",
        type: "dark",
        background: '#4c636c',
        color: '#ffffff'
    },
];

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
                themes,
                guid: params.guid,
                node: result
            };
        });
    }
});
