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
                        sectionHeader : 'Wiki',
                        component: 'layer-wiki',
                        settings: {
                            component: 'layer-wiki-settings',
                            properties: {
                                sectionTitle: 'Wiki example',
                                showInNavigation: true,
                                addShowMore: false,
                                themeId: 5
                            }
                        }
                    });
                    break;
                case 'file':
                    item = Layer.create({
                        sectionHeader : 'Download',
                        component: 'layer-file',
                        settings: {
                            component: 'layer-file-settings',
                            description: 'Add description',
                            properties: {
                                sectionTitle: 'Download example',
                                showInNavigation: true,
                                themeId: 2
                            }
                        }
                    });
                    break;
                case 'link': // Update when link is ready
                    item = Layer.create({
                        sectionHeader : 'Link',
                        component: 'layer-link',
                        settings: {
                            component: 'layer-link-settings',
                            description: 'Add link description',
                            properties: {
                                sectionTitle: 'Link example',
                                showInNavigation: true,
                                themeId: 1
                            }
                        }
                    });
                    break;
                case 'image': // Update when link is ready
                    item = Layer.create({
                        sectionHeader: 'Image',
                        showInMenu: false,
                        component: 'layer-image',
                        settings: {
                            component: 'layer-image-settings',
                            properties: {
                                height: 500,
                                url: 'http://localhost:4200/img/sample.jpg',
                                themeId: 3,
                            }
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
