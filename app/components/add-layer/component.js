import Ember from 'ember';
const Layer = Ember.Object.extend();

export default Ember.Component.extend({
    isOpen: null,
    actions: {
        addLayer (type) {
            let item;
            switch(type) {
                case 'wiki' :
                    item = Layer.create({
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
                    });
                    break;
                case 'file':
                    item = Layer.create({
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
                    });
                    break;
                case 'link':
                    item = Layer.create({
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
                    });
                    break;
                case 'advanced':
                    item = Layer.create({
                        sectionHeader: 'Advanced',
                        component: 'layer-advanced',
                        content:'<div><img src="http://xxntkd86l336rq5h3k2kbv9l.wpengine.netdna-cdn.com/wp-content/uploads/sites/62/2017/02/cowork-6-1.jpg" style="width: 552px; height: 368.099px;" class="fr-fic fr-fil fr-dii">Mauris imperdiet <strong>ligula a mauris porttitor ultricies.</strong> Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla. Fusce vestibulum malesuada nisl. Fusce augue leo, tempus eget mattis vel, imperdiet at nulla.</div>',
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
                    });
                    break;
                case 'image':
                    item = Layer.create({
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
                    });
                    break;
            }
            let index = this.get('index')+1;
            this.get('layers').insertAt(index,item);
            this.set('isOpen', false);

        },
        toggleProperty(prop){
            this.toggleProperty(prop);
        }
    }
});
