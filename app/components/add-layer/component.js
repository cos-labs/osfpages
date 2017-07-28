import Ember from 'ember';
const Layer = Ember.Object.extend();

export default Ember.Component.extend({
    isOpen: null,
    actions: {
        addLayer (type) {
            let item;
            switch(type) {
                case 'wiki' :
                item = {
                    "sectionHeader": "Wiki example",
                    "component": "layer-wiki",
                    "settings": {
                        "component": "layer-settings",
                        "wikiId": "",
                        "values": {
                            "sectionTitle": "Wiki example",
                            "showInNavigation": true,
                            "addShowMore": false,
                            "bgColor": "#FFFFFF",
                            "color": "#333333"
                        },
                        "form": [
                        {
                            "type": "settings",
                            "items": [
                            {
                                "type": "checkbox",
                                "label": "Show in navigation",
                                "value": "showInNavigation",
                                "validation": null
                            },
                            {
                                "type": "checkbox",
                                "label": "Add show more",
                                "value": "addShowMore",
                                "validation": null
                            }
                            ]
                        }
                        ]
                    }
                };
                break;
                case 'file':
                item = {
                    "sectionHeader": "Download",
                    "component": "layer-file",
                    "settings": {
                        "component": "layer-settings",
                        "values": {
                            "sectionTitle": "Download this file",
                            "sectionDescription": "",
                            "showFileviewer": true,
                            "downloadLink": "",
                            "showInNavigation": true,
                            "bgColor": "#FFFFFF",
                            "color": "#333333"
                        },
                        "form": [
                        {
                            "type": "settings",
                            "items": [
                            {
                                "type": "checkbox",
                                "label": "Show in navigation",
                                "value": "showInNavigation",
                                "validation": null
                            },
                            {
                                "type": "checkbox",
                                "label": "Show file viewer",
                                "value": "showFileviewer",
                                "validation": null
                            }
                            ]
                        }
                        ]
                    }
                };
                break;
                case 'link':
                item = {
                    "sectionHeader": "Link",
                    "component": "layer-link",
                    "settings": {
                        "component": "layer-settings",
                        "values": {
                            "sectionTitle": "Link Title",
                            "showInNavigation": true,
                            "sectionDescription": "this link goes to a place",
                            "sectionLink": "www.example.com",
                            "bgColor": "#FFFFFF",
                            "color": "#333333"
                        },
                        "form": [
                        {
                            "type": "settings",
                            "items": [
                            {
                                "type": "checkbox",
                                "label": "Show in navigation",
                                "value": "showInNavigation",
                                "validation": null
                            },
                            {
                                "type": "text",
                                "label": "Link address",
                                "value": "sectionLink",
                                "validation": null
                            }
                            ]
                        }
                        ]
                    }
                };
                break;
                case 'advanced':
                item = {
                    "sectionHeader": "Advanced",
                    "component": "layer-advanced",
                    "content": "<div><img src=\"http://localhost:4200/img/img.jpg\" style=\"width: 552px; height: 368.099px;\" class=\"fr-fic fr-fil fr-dii\">Mauris imperdiet <strong>ligula a mauris porttitor ultricies.</strong> Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla. Fusce vestibulum malesuada nisl. Fusce augue leo, tempus eget mattis vel, imperdiet at nulla.</div>",
                    "settings": {
                        "component": "layer-settings",
                        "values": {
                            "sectionTitle": "Advanced",
                            "showInNavigation": true,
                            "bgColor": "#FFFFFF",
                            "color": "#333333"
                        },
                        "form": [
                        {
                            "type": "settings",
                            "items": [
                            {
                                "type": "checkbox",
                                "label": "Show in navigation",
                                "value": "showInNavigation",
                                "validation": null
                            }
                            ]
                        }
                        ]
                    }
                };
                break;
                case 'image':
                item = {
                    "sectionHeader": "Image",
                    "component": "layer-image",
                    "settings": {
                        "component": "layer-settings",
                        "values": {
                            "height": 500,
                            "url": "http://localhost:4200/img/sample.jpg",
                            "bgColor": "#FFFFFF",
                            "color": "#333333"
                        },
                        "form": [
                        {
                            "type": "image",
                            "label": "Image link",
                            "value": "url",
                            "validation": null
                        },
                        {
                            "type": "increment",
                            "label": "Section height",
                            "value": "height",
                            "incrementSize": 20,
                            "validation": null
                        }
                        ]
                    }
                };
                break;
                case 'navigation':
                item = {
                    "sectionHeader": "Navigation",
                    "component": "pages-menu",
                    "settings": {
                        "component": "layer-settings",
                        "values": {
                            "height": 150,
                            "bgColor": "#FFFFFF",
                            "color": "#333333",
                            "alignment": "center",
                            "stickToTop":false,

                        },
                        "form": [
                        {
                            "type": "increment",
                            "label": "Section height",
                            "value": "height",
                            "incrementSize": 20,
                            "validation": null
                        },
                        {
                            "type": "alignment",
                            "label": "Alignment",
                            "value": "alignment",
                            "options": [
                            "left",
                            "center",
                            "right"
                            ],
                            "validation": null
                        },
                        {
                         "type": "settings",
                         "items": [
                         {
                            "type": "checkbox",
                            "label": "Stick to top of page on scroll",
                            "value": "stickToTop",
                            "validation": null
                        }
                        ]
                    }
                    ]
                }
            };
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
