import Ember from 'ember';

/* Using static data for now. GUID will load from server */

let layers = [
    {
        sectionHeader: 'Section header',
        showInMenu: true,
        data: {
            type: 'wiki',
            source: 'some source'
        },
        settings: {
            themeId: 3,
            truncate: false
        }
    }
];


let themes = [
    {
        id: 1,
        background: '#eeeeee',
        color: '#333333'
    }
];

export default Ember.Route.extend({
    model(params){
        console.log(params)
        return {
            layers,
            themes,
            guid: params.guid
        }
    }
});


