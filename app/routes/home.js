import Ember from 'ember';

/* Using static data for now. GUID will load from server */
const Layer = Ember.Object.extend();

let layers = {};
 $.ajax({
        type: "GET",
        url: "/themes/theme_1.json",
        async: false,
        success: function (data, status, jqXHR) {
            console.log(data)
            layers = data;
        }});


let themes = [
    {
        id: 1,
        name: "dark",
        type: "dark",
        background: '#9e9e9e',
        color: '#f8f8f8'
    },
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
        name: "orange",
        type: "light",
        background: '#f07057',
        color: '#ffffff'
    }
];

export default Ember.Route.extend({
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
