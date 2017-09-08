/*
 *   Definition of settings bar components by component type.
 *   If you define a new component, you may define settings for them here or use default
 */

let layerSettings = {
        "layer-title": [
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
            },
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
            }
        ],
        "pages-menu": [
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
            }
        ],
        "layer-info": [
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
            }
        ],
        "layer-link" : [
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
            }
        ],
        "layer-image-text": [
            {
                "type": "settings",
                "items": [

                    {
                        "type": "checkbox",
                        "label": "Fit image to section size",
                        "value": "backgroundCover",
                        "validation": null
                    }
                ]
            },
            {
                "type": "image",
                "label": "Background image",
                "value": "image",
                "validation": null
            },
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
            }
        ],
        "layer-image": [
            {
                "type": "settings",
                "items": [

                    {
                        "type": "checkbox",
                        "label": "Fit image to section size",
                        "value": "backgroundCover",
                        "validation": null
                    }
                ]
            },
            {
                "type": "image",
                "label": "Background image",
                "value": "backgroundImage",
                "validation": null
            },
            {
                "type": "increment",
                "label": "Section height",
                "value": "height",
                "incrementSize": 20,
                "validation": null
            }
        ],
        "layer-file": [
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
            }
        ],
        "layer-advanced": [
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
            },
            {
                "type": "image",
                "label": "Background image",
                "value": "backgroundImage",
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
            }
        ],
        "layer-wiki": [
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
            }
        ]
}

export {
    layerSettings
};
