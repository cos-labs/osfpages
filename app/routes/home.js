import Ember from 'ember';

/* Using static data for now. GUID will load from server */

let layers = [  
    {
        sectionHeader: 'Info',
        showInMenu: true,
        component: 'info-layer',
        settings: {
            component: 'info-layer-settings',
            properties: {
                sectionTitle:"Info Title",
                showInNavigation: false,
                showDescription: true,
                showContributors: true,
                showBibliographicContributors: false,
                showAffiliatedIntuitions: true,
                themeId: 3,
            }
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


