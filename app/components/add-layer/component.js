import Ember from 'ember';



export default Ember.Component.extend({
    isOpen: null,
    indexVal:null,
    type:null,


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
                        "sectionTitle": "Wiki example",
                        "showInNavigation": true,
                        "addShowMore": false,
                        "bgColor": "#FFFFFF",
                        "color": "#333333",
                        "alignment": "center"
                    }
                };
                break;
                case 'file':
                item = {
                    "sectionHeader": "File",
                    "component": "layer-file",
                    "settings": {
                        "component": "layer-settings",
                        "sectionTitle": "Download this file",
                        "sectionDescription": "",
                        "showFileviewer": true,
                        "showDownload": true,
                        "downloadLink": "",
                        "buttonText":"Download",
                        "showInNavigation": true,
                        "bgColor": "#FFFFFF",
                        "alignment": "center",
                        "color": "#333333"
                    }
                };
                break;
                case 'link':
                item = {
                    "sectionHeader": "Link",
                    "component": "layer-link",
                    "settings": {
                        "component": "layer-settings",
                        "sectionTitle": "Link Title",
                        "showInNavigation": true,
                        "sectionDescription": "this link goes to a place",
                        "sectionLink": "www.example.com",
                        "bgColor": "#FFFFFF",
                        "alignment": "center",
                        "color": "#333333"
                    }
                };
                break;
                case 'advanced':
                item = {
                    "sectionHeader": "custom",
                    "component": "layer-advanced",
                    "content": "<p>Mauris imperdie Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla. Fusce vestibulum malesuada nisl. Fusce augue leo, tempus eget matssstis vel, imperdiet at nulla</p>",
                    "settings": {
                        "sectionTitle": "Custom text block",
                        "backgroundImage": "https://image.ibb.co/kCgzp5/confectionary.png",
                        "showInNavigation": true,
                        "bgColor": "#FFFFFF",
                        "alignment": "center",
                        "color": "#333333"
                    }
                };
                break;
                case 'image':
                item = {
                    "sectionHeader": "Image",
                    "component": "layer-image",
                    "settings": {
                        "component": "layer-settings",
                        "height": 500,
                        "backgroundImage": "http://localhost:4200/img/sample.jpg",
                        "backgroundCover": true,
                        "bgColor": "#FFFFFF",
                        "color": "#333333"
                    }
                };
                break;
                case 'navigation':
                item = {
                    "sectionHeader": "Navigation",
                    "component": "pages-menu",
                    "settings": {
                        "component": "layer-settings",
                        "fontSize": 16,
                        "bgColor": "#FFFFFF",
                        "color": "#333333",
                        "alignment": "center",
                        "stickToTop":false,
                    }
                };
                break;
                case 'title':
                item = {
                    "sectionHeader": "Title",
                    "component": "layer-title",
                    "settings": {
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
                    }
                };
                break;
                case 'info':
                item =  {
                    "sectionHeader": "Info",
                    "component": "layer-info",
                    "settings": {
                        "sectionTitle": "Info Title",
                        "showInNavigation": true,
                        "showDescription": true,
                        "showContributors": true,
                        "showBibliographicContributors": false,
                        "showAffiliatedInstitutions": true,
                        "bgColor": "#FFFFFF",
                        "alignment": "center",
                        "color": "#333333"
                    }
                };
                break;
                case 'imangeAndText':
                item = {
                    "sectionHeader": "Image-Text",
                    "component": "layer-image-text",
                    "settings": {
                        "sectionTitle": "Image and Text",
                        "showNavigation": true,
                        "showInNavigation": true,
                        "bgColor": "#ffffff",
                        "color": "#333333",
                        "alignment": "right",
                        "sectionDescription": "Mauris imperdiet ligula a mauris porttitor ultricies. Praesent ut fringilla orci. Proin feugiat auctor augue non rutrum. Sed ac metus in augue dignissim malesuada non et sem. Pellentesque ut metus odio. Integer fringilla nulla id leo consequat, a sollicitudin sapien fringilla.",
                        "image": "http://localhost:4200/img/img.jpg"
                    }
                };
                break;
            }
            let index = this.get('index')+1;
            if(this.get('indexVal') !== null){
                index = parseInt(this.get('indexVal'))+1 
            }
            this.get('layers.content').insertAt(index,item);
            this.set('isOpen', false);
            this.set('indexVal' , null)

        },
        toggleProperty(prop){
            this.toggleProperty(prop);
        },
        allowDragOver(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            $('.add-layer-toggle').addClass('dotted-line');
            // $(event.target.parentNode).closest('.add-layer-toggle').addClass('dotted-line') //save 
            $('.drag-drop-area').css('padding' , '5px');
            $('.drop-zone-plus').css('display' , 'block');
            $('.plus').css('display' , 'none');
            return false;
        },
        drag(el, event) {
            console.log("dragging");
            this.set('type', event.target.dataset.title)
            
            Ember.run.next(this, function() {  
                $('.plus').css('display' , 'block');
                $('.dotted-line-small').css('display' , 'block');
                $('.drag-drop-area').css('padding' , '5px');
            });
       },
       dragStop(event) {
            $('.add-layer-toggle').removeClass('dotted-line');
            $('.drag-drop-area').css('padding' , '0px');
            $('.drop-zone-plus').css('display' , 'none');
            $('.dotted-line-small').css('display' , 'none');
            $('.plus').css('display' , 'none');
        },
        drop(event) {
             
            if(this.get('mini')){
                this.set('indexVal' , this.get('index'))   
            } else {
                this.set('indexVal' , event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild.id.replace(/\D/g,''))   
            }  
            this.send('addLayer' , this.get('type'))

        }

    }
});
