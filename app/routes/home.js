import Ember from 'ember';

/* Using static data for now. GUID will load from server */
const Layer = Ember.Object.extend();


let layers = Ember.A([
    Layer.create({
        sectionHeader: 'Title',
        component: 'layer-title',
        settings: {
            component: 'layer-settings',
            values: {
                backgroundImage: 'http://localhost:4200/img/bg.png',
                backgroundCover: true,
                showNavigation: true,
                showTitle: true,
                showLead: true,
                showInNavigation: false,
                h1Size: 30,
                themeId: 6,
                alignment: 'right',
                lead: 'Some lead text',
            },
            form: [
                {
                    type: 'text',
                    label: 'Background image',
                    value: 'backgroundImage',
                    validation: null,
                },
                {
                    type: 'text',
                    label: 'Lead text',
                    value: 'lead',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show navigation',
                    value: 'showNavigation',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Fit image to section size',
                    value: 'backgroundCover',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show title',
                    value: 'showTitle',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show lead text',
                    value: 'showLead',
                    validation: null,
                },
                {
                    type: 'increment',
                    label: 'Title size',
                    value: 'h1Size',
                    size: 20,
                    incrementSize: 4,
                    validation: null,
                },
                {
                    type: 'select',
                    label: 'Alignment',
                    value: 'alignment',
                    options: ['left','center', 'right'],
                    validation: null,
                },

            ]
        }
    }),
    Layer.create({
        sectionHeader: 'Advanced',
        component: 'layer-advanced',
        content:'<h3>Click to edit the Advanced Layer</h3><div><img src="http://xxntkd86l336rq5h3k2kbv9l.wpengine.netdna-cdn.com/wp-content/uploads/sites/62/2017/02/cowork-6-1.jpg" style="width: 552px; height: 368.099px;" class="fr-fic fr-fil fr-dii">Mauris imperdiet <strong>ligula a mauris porttitor ultricies.</strong> Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla. Fusce vestibulum malesuada nisl. Fusce augue leo, tempus eget mattis vel, imperdiet at nulla.</div>',
        settings: {
            component: 'layer-settings',
            values: {
                sectionTitle:"Advanced",
                showInNavigation: true,
                themeId: 5,
            },
            form: [
                {
                    type: 'checkbox',
                    label: 'Show in navigation',
                    value: 'showInNavigation',
                    validation: null,
                },
            ]
        }
    }),
    Layer.create({
        sectionHeader: 'Info',
        component: 'layer-info',
        settings: {
            component: 'layer-settings',
            values: {
                sectionTitle:"Info Title",
                showInNavigation: true,
                showDescription: true,
                showContributors: true,
                showBibliographicContributors: false,
                showAffiliatedInstitutions: true,
                themeId: 2,
            },
            form: [
                {
                    type: 'checkbox',
                    label: 'Show in navigation',
                    value: 'showInNavigation',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show description',
                    value: 'showDescription',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show contributors',
                    value: 'showContributors',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show only bibliographic contributors',
                    value: 'showBibliographicContributors',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show affiliated institutions',
                    value: 'showAffiliatedInstitutions',
                    validation: null,
                }
            ]
        }
    }),
    Layer.create({
        sectionHeader: 'Link',
        component: 'layer-link',
        settings: {
            component: 'layer-settings',
            values: {
                sectionTitle:"Link Title",
                showInNavigation: true,
                sectionDescription:"this link goes to a place",
                sectionLink:"www.example.com",
                themeId: 5,
            },
            form: [
                {
                    type: 'checkbox',
                    label: 'Show in navigation',
                    value: 'showInNavigation',
                    validation: null,
                },
                {
                    type: 'text',
                    label: 'Link address',
                    value: 'sectionLink',
                    validation: null,
                },
            ]
        }
    }),
    Layer.create({
        sectionHeader: 'Image',
        component: 'layer-image',
        settings: {
            component: 'layer-settings',
            values: {
                height: 500,
                url: 'http://localhost:4200/img/sample.jpg',
                themeId: 3,
            },
            form: [
                {
                    type: 'text',
                    label: 'Image link',
                    value: 'url',
                    validation: null,
                },
                {
                    type: 'increment',
                    label: 'Section height',
                    value: 'height',
                    incrementSize: 20,
                    validation: null,
                }
            ]
        }
    }),
    Layer.create({
        sectionHeader: 'Download',
        component: 'layer-file',
        settings: {
            component: 'layer-settings',
            values: {
                sectionTitle:"Download this file",
                sectionDescription:"",
                showFileviewer: true,
                downloadLink: '',
                showInNavigation: true,
                themeId: 6,
            },
            form: [
                {
                    type: 'checkbox',
                    label: 'Show in navigation',
                    value: 'showInNavigation',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Show file viewer',
                    value: 'showFileviewer',
                    validation: null,
                }
            ]
        }
    }),
    Layer.create({
        sectionHeader: 'Wiki example',
        component: 'layer-wiki',
        settings: {
            component: 'layer-settings',
            wikiId: '',
            values: {
                sectionTitle:"Wiki example",
                showInNavigation: true,
                addShowMore: false,
                themeId: 5,
            },
            form: [
                {
                    type: 'checkbox',
                    label: 'Show in navigation',
                    value: 'showInNavigation',
                    validation: null,
                },
                {
                    type: 'checkbox',
                    label: 'Add show more',
                    value: 'addShowMore',
                    validation: null,
                }
            ]
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
