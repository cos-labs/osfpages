import Ember from 'ember';

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
                    "content": "<p>Mauris imperdie Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla. Fusce vestibulum malesuada nisl. Fusce augue leo, tempus eget matssstis vel, imperdiet at nulla</p>",
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
                            "fontSize": 16,
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
            case 'image':
            item = {
                "sectionHeader": "Image",
                "component": "layer-image",
                "settings": {
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
            case 'title':
            item = {
                "sectionHeader": "Title",
                "component": "layer-title",
                "settings": {
                    "values": {
                        "backgroundImage": "http://localhost:4200/img/bg.png",
                        "backgroundCover": true,
                        "showNavigation": true,
                        "showTitle": true,
                        "showLead": true,
                        "showInNavigation": false,
                        "h1Size": 30,
                        "bgColor": "#333333",
                        "color": "#EEEEEE",
                        "alignment": "right",
                        "lead": "Some lead text"
                    },
                    "form": [
                    {
                        "type": "image",
                        "label": "Background image",
                        "value": "backgroundImage",
                        "validation": null
                    },
                    {
                        "type": "increment",
                        "label": "Title size",
                        "value": "h1Size",
                        "size": 20,
                        "incrementSize": 4,
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
                            "label": "Show navigation",
                            "value": "showNavigation",
                            "validation": null
                        },
                        {
                            "type": "checkbox",
                            "label": "Fit image to section size",
                            "value": "backgroundCover",
                            "validation": null
                        },
                        {
                            "type": "checkbox",
                            "label": "Show title",
                            "value": "showTitle",
                            "validation": null
                        },
                        {
                            "type": "checkbox",
                            "label": "Show lead text",
                            "value": "showLead",
                            "validation": null
                        }
                        ]
                    }
                    ]
                }
            };
            break;
            case 'info':
            item =  {
                "sectionHeader": "Info",
                "component": "layer-info",
                "settings": {
                    "values": {
                        "sectionTitle": "Info Title",
                        "showInNavigation": true,
                        "showDescription": true,
                        "showContributors": true,
                        "showBibliographicContributors": false,
                        "showAffiliatedInstitutions": true,
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
                            "label": "Show description",
                            "value": "showDescription",
                            "validation": null
                        },
                        {
                            "type": "checkbox",
                            "label": "Show contributors",
                            "value": "showContributors",
                            "validation": null
                        },
                        {
                            "type": "checkbox",
                            "label": "Show only bibliographic contributors",
                            "value": "showBibliographicContributors",
                            "validation": null
                        },
                        {
                            "type": "checkbox",
                            "label": "Show affiliated institutions",
                            "value": "showAffiliatedInstitutions",
                            "validation": null
                        }
                        ]
                    }
                    ]
                }
            };
            break;
            case 'imangeAndText':
            item = {
                "sectionHeader": "Image-Text",
                "component": "layer-image-text",
                "settings": {
                    "values": {
                        "sectionTitle": "Image and Text",
                        "showNavigation": true,
                        "showInNavigation": true,
                        "bgColor": "#ffffff",
                        "color": "#333333",
                        "alignment": "right",
                        "sectionDescription": "Mauris imperdiet ligula a mauris porttitor ultricies. Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla.",
                        "image": "http://localhost:4200/img/img.jpg"
                    },
                    "form": [
                    {
                        "type": "image",
                        "label": "choose your image",
                        "value": "image",
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
                            "label": "Show title",
                            "value": "showTitle",
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
        this.get('layers.content').insertAt(index,item);
        this.set('isOpen', false);

    },
    toggleProperty(prop){
        this.toggleProperty(prop);
    }
}
});
