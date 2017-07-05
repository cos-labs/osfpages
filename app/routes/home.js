import Ember from 'ember';

/* Using static data for now. GUID will load from server */
const Layer = Ember.Object.extend();


let layers = Ember.A([
    Layer.create({
        sectionHeader: 'Title',
        showInMenu: true,
        component: 'layer-title',
        settings: {
            component: 'layer-title-settings',
            properties: {
                showLinks: true,
                showTitle: true,
                showInNavigation: false,
                themeId: 4,
            }
        }
    }),
    Layer.create({
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
    }),
    Layer.create({
        sectionHeader: 'Link',
        showInMenu: true,
        component: 'layer-link',
        settings: {
            component: 'layer-link-settings',
            properties: {
                sectionTitle:"Link Title",
                showInNavigation: true,
                sectionLinkDescription:"this link goes to a place",
                sectionLink:"www.example.com",
                themeId: 2,
            }
        }
    }),
    Layer.create({
        sectionHeader: 'Download',
        showInMenu: true,
        component: 'layer-file',
        settings: {
            component: 'layer-file-settings',
            description: '',
            properties: {
                sectionTitle:"Download this file",
                downloadLink: "www.example.com",
                showInNavigation: true,
                themeId: 3,
            }
        }
    }),
    Layer.create({
        sectionHeader: 'Wiki example',
        showInMenu: true,
        component: 'layer-wiki',
        settings: {
            component: 'layer-wiki-settings',
            properties: {
                sectionTitle:"Wiki example",
                showInNavigation: true,
                addShowMore: false,
                themeId: 5,
            }
        }
    })
]);


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
        background: '#ffffff',
        color: '#333333'
    }
];

export default Ember.Route.extend({
    model(params){
        return this.store.findRecord('node', 'jyu4t').then((result)=>{
            return {
                layers,
                themes,
                guid: params.guid,
                node: result
            };
        });
    }
});


