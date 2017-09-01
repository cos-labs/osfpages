# Contributing to OSF Pages

#### Creating issues
You are encouraged to create issues to improve the functionality of osfpages. 
- Please make clear in your ticket whether you are requesting bug fix, enhancement or feature by adding [BUG]. [ENHANCEMENT] or [FEATURE] before your ticket. 
- Please describe your request clearly and in the main text of your issue say more about where and how you encountered the bug or where and how you would like the feature to be added. 

A ticket title example:

    [BUG] Contributor list in information layer not showing full name with 3 words in name
    
#### How to make the best issue

First, please make sure that the issue has not already been reported by searching through the issue archives. 

When submitting an issue, be as descriptive as possible: 
* What you did (step by step)
    * Where does this happen on the OSF?
* What you expected
* What actually happened 
    * Check the JavaScript console in the browser (e.g. In Chrome go to View → Developer → JavaScript console) and report errors 
    * If it's an issue with staging, report whether or not it also occurs on production 
    * If an error was generated, report what time it occurred, and the specific URL.
* Potential causes 
* Suggest a solution
    * What will it look like when this issue is resolved? 

Include pictures (e.g., in OSX press Cmd+Shift+4 to draw a box to screenshot)


--- 
### Contributing code
Please make a fork and local installation of osfpages for your development environment. Use readme in project root to install and run osfpages. Send Pull Requests to osfpages and notify developers when it's ready. 

Use this short tutorial for detailed steps on contributing to projects. 

http://kbroman.org/github_tutorial/pages/fork.html 


#### Adding Layers
Osf pages uses a modular structure of layers to provide different types of content. You can add further functionality by introducing new layers. Each layer has settings that go through the same component so your settings need to follow the same data structure as shown below. 


#### Layer data structure

Below is an example of the data structure of a layer. 

Values depend on what information will be included in the layers. These depend on layer type and settings. Settings change these values and the value they change is represented in form data structure in 'value' field. 

Settings components are under 'form' and toggled settings are under 'form.settings'. Currently there is no validation but these fields will be used for validation requirements. 

```json
{
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
            "h1Size": 46,
            "bgColor": "#333333",
            "color": "#EEEEEE",
            "alignment": "center",
            "lead": "Reproducible study of solar powered lighthouses"
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
}
   ```
