import Ember from 'ember';

var overallpercentage = '25';
var mouseMovePageX = '';
export default Ember.Component.extend({
    isOpen: null,
    indexVal:null,
    type:null,
    isDragging:null,

    didRender(){
        let self = this;
        var i = 0;
        var dragging = false;
        $('.resizable-control').mousedown((e)=>{
            e.preventDefault();

            dragging = true;
            var main = $('.resizable-control');

            $(document).mousemove((e)=>{
                if( e.pageX <= 0){
                    main.css("left",0);  
                }else{
                    main.css("left",e.pageX);

                }
                if(e.pageX <= 200) {
                    $('.layer-wrapper').css("padding-left", "150px");
                    $('.layer-wrapper').css("padding-right", "150px");

                }else {
                    $('.layer-wrapper').css("padding-left", "50px");
                    $('.layer-wrapper').css("padding-right", "50px");
                }
                mouseMovePageX = e.pageX;





            });

        });

        $(document).mouseup((e)=>{
            if (dragging) {
             var percentage = (e.pageX / window.innerWidth) * 100;
             var mainPercentage = 100-percentage;

             $('.edit-Mode-View').css("width",percentage + "%");
             $('.holder .col-xs-3').css("width",percentage + "%");
             $('.holder .col-xs-9').css("width",mainPercentage + "%");
             $('#ghostbar').remove();
             overallpercentage = percentage;

             if( $('.edit-Mode-View').width() <= 200){
                $('.edit-Mode-View .col-xs-8').hide()
                $('.edit-Mode-View .col-xs-4').css('width' , '100%')
            }else { 
                $('.edit-Mode-View .col-xs-8').show()
                $('.edit-Mode-View .col-xs-4').css('width' , '33.33333%')
            }

            $(document).unbind('mousemove');
            dragging = false;
        }
    });
        window.onresize = (e)=> {
           $('.edit-Mode-View .col-xs-8').show()
           $('.edit-Mode-View .col-xs-4').css('width' , '33.33333%')
           $('.edit-Mode-View').css("width","25%");
           $('.holder .col-xs-3').css("width", "25%");
           $('.layer-footer .col-xs-3').css("width", "25%");
           $('.layer-footer.clearfix.row.col-xs-9').css("width","75%");
           $('.holder .col-xs-9').css("width","75%");
           $('.resizable-control').css("left", '25%');
       };
   },
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
        try{
            this.get('layers.content').insertAt(index,item);
        }catch(e){
            this.get('layers.content').insertAt(0,item);
        }
        this.set('isOpen', false);
        this.set('indexVal' , null)

    },
    toggleProperty(prop){
        this.toggleProperty(prop);
    },
    allowDragOver(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    },
    drag(el, event) {
        this.set('type', event.target.dataset.title)
        Ember.run.next(this, ()=> {  
            this.set('isDragging' , true)
                // $(event.target.parentNode).closest('.add-layer-toggle').addClass('dotted-line') //save 
            });
    },
    drop(event) {

        if(this.get('mini')){
            this.set('indexVal' , this.get('index'))   
        } else {
            if(event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild !== null){
                this.set('indexVal' , event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild.id.replace(/\D/g,''))   
            }
        }  
        this.send('addLayer' , this.get('type'))
        
        Ember.run.next(this, ()=> {  
            let percentage = overallpercentage;
            let mainPercentage = 100-percentage;
            console.log('in drop' , overallpercentage , percentage)
            $('.holder .col-xs-3').css("width",percentage + "%");
            $('.holder .col-xs-9').css("width",mainPercentage + "%");


            if(mouseMovePageX <= 200) {
                $('.layer-wrapper').css("padding-left", "150px");
                $('.layer-wrapper').css("padding-right", "150px");

            }else {
                $('.layer-wrapper').css("padding-left", "50px");
                $('.layer-wrapper').css("padding-right", "50px");
            }
        });

    }

}
});
