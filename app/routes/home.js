import Ember from 'ember';

/* Using static data for now. GUID will load from server */

let layers = [
    {
        sectionHeader: 'Info',
        showInMenu: true,
        data: {
            type: 'info',
        },
        settings: {
            themeId: 2,
            showDescription: true,
           showAuthors: true
        }
    },
    {
        sectionHeader: 'Title',
        showInMenu: true,
        data: {
            type: 'wiki',
            source: 'some source'
        },
        settings: {
            themeId: 2,
            truncate: false
        }
    },
    {
        sectionHeader: 'Example Wiki Page',
        showInMenu: true,
        data: {
            type: 'wiki',
            source: 'some source'
        },
        settings: {
            themeId: 1,
            truncate: false
        }
    }
];


let themes = [
    {
        id: 1,
        background: '#eeeeee',
        color: '#333333'
    },
    {
        id: 2,
        background: '#666666',
        color: '#f8f8f8'
    }
];

export default Ember.Route.extend({
    model(params){
        return {
            layers,
            themes,
            guid: params.guid
        }
    }
});


