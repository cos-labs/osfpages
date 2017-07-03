import Ember from 'ember';

/* Using static data for now. GUID will load from server */

let layers = [
    {
        sectionHeader: 'Info',
        showInMenu: true,
        component: 'layer-info',
        settings: {
            component: 'layer-info-settings',
            properties: {
                sectionTitle:"Info Title",
                showInNavigation: true,
                showDescription: true,
                showContributors: true,
                showBibliographicContributors: false,
                showAffiliatedIntuitions: true,
                themeId: 2,
            }
        }
    },
    {
        sectionHeader: 'Info',
        showInMenu: true,
        component: 'layer-info',
        settings: {
            component: 'layer-info-settings',
            properties: {
                sectionTitle:"Info Title",
                showInNavigation: true,
                showDescription: true,
                showContributors: true,
                showBibliographicContributors: false,
                showAffiliatedIntuitions: true,
                themeId: 2,
            }
        }
    }
];

let themes = {
    1: {
        id: 1,
        name: "dark",
        background: '#9e9e9e',
        color: '#f8f8f8'
    },
    2: {
        id: 2,
        name: "light",
        background: '#eeeeee',
        color: '#333333'
    }
};

export default Ember.Route.extend({
    model(params){
        return this.store.findRecord('node', 'a3rz4').then((result)=>{
            return {
                layers,
                themes,
                guid: params.guid,
                node: result
            };
        });
    }
});


