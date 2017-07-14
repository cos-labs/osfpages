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
                case 'advanced': // Update when link is ready
                    item = Layer.create({
                        sectionHeader: 'Advanced',
                        showInMenu: true,
                        component: 'layer-advanced',
                        content:'<h3>Click to edit the Advanced Layer</h3><div><img src="http://xxntkd86l336rq5h3k2kbv9l.wpengine.netdna-cdn.com/wp-content/uploads/sites/62/2017/02/cowork-6-1.jpg" style="width: 552px; height: 368.099px;" class="fr-fic fr-fil fr-dii">Mauris imperdiet <strong>ligula a mauris porttitor ultricies.</strong> Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla. Fusce vestibulum malesuada nisl. Fusce augue leo, tempus eget mattis vel, imperdiet at nulla.</div>',
                        settings: {
                            component: 'layer-advanced-settings',
                            properties: {
                                sectionTitle:"Info advanced",
                                showInNavigation: true,
                                themeId: 7,
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
