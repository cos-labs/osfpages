/*global $:true*/

import Ember from 'ember';
import {layerSettings} from './settings';


        let helpText = {
            'layer-info': 'The information section is used for displaying your project description, contributors and affiliated institutions from you OSF project.',
            'layer-title': 'The title section is used for displaying the title of your OSF project, all data here is pulled directly from your project. ',
            'layer-wiki':'The wiki section is used for displaying your project\'s wiki, all data from this section is from you OSF project.',
            'layer-file': 'The file section is used to show files from your OSF project, you can write a short description about the file.',
            'layer-image': 'The image section is used to show a banner like image.',
            'layer-link': 'The link section is used to display a link to a site, you can give a short description as well.',
            'layer-advanced': 'The Advanced section is used to make custom designs to your OSF site. you can edit this by using the inline editor.',
            'pages-menu': 'The navigation is used for navigating the site, you can add each section to the navigation in the settings of that section.',
            'layer-image-text': 'The text and image layer is used to show side by side text and images.'


        }
export default Ember.Component.extend({
    helpText,
    OSFcontent:false,
    layerSettings,
    thisLayerSettings: Ember.computed('layer.component', function(){
        return this.get('')
    }),
    file_object: null,
    showRemoveModal: false,
    showUploadModal: false,
    lastIndex: Ember.computed('layers.content.[]',function (){
        return  this.get('layers.content').length-1;
    }),
    url: Ember.computed('node', function(){
        return this.get('node.files').then(files => {
            return files.findBy('name', 'osfstorage').get('links.upload')  + '?';
        });

    }),
    uploadedImageUrl: null, // Temporary holding of uploaded image urls
    uploadErrorText: '',
    dropzoneOptions: {
        maxFiles: 1,
        method: 'PUT',
        uploadMultiple: false,
    },
    backgroundPalette: ['#9e9e9e', '#eeeeee', '#009688', '#00BCD4', '#ffffff', '#31708f', '#f07057'],
    colorPalette: ['#f8f8f8', '#333333', '#ebebeb', '#ffffff', '#f5f5f5'],
    scrollToLayer(index){
        let el = $('#layer'+index);
        let offset = el.offset();
        $('body').animate({scrollTop:offset.top}, '500');
    },
    didRender(){
        let layerContent = this.get('layer.content.component');
        if(layerContent === 'pages-menu' || layerContent === 'layer-link' || layerContent === 'layer-image-text' || layerContent === 'layer-advanced' || layerContent === 'layer-image'){
            this.set('OSFcontent', false);

        } else {
            this.set('OSFcontent', true);
        }
    },
    actions: {
        buildUrl(files) {
            return this.get('url')._result + Ember.$.param({
                kind: 'file',
                name: files[0].name,
            });
        },
        error(){
        },
        sending(_, dropzone, file, xhr/* formData */) {
            let _send = xhr.send;
            xhr.send = function() {
                _send.call(xhr, file);
            };
        },
        complete(_, dropzone, file){
            if (file.xhr === undefined) return;
            if (Math.floor(file.xhr.status / 100) === 2) {
                this.set('uploadedImageUrl' , JSON.parse(file.xhr.response).data.links.download);
            } else {
                this.set('uploadErrorText', JSON.parse(file.xhr.response).message);
            }
        },
        changeSize(direction, item){
            if(direction === 'bigger') {
                this.incrementProperty('layer.settings.' + item.value, item.incrementSize);
            }
            if(direction === 'smaller') {
                this.decrementProperty('layer.settings.' + item.value, item.incrementSize);
            }
        },
        runOption(option, item){
            this.set('layer.settings.' + item.value, option);
        },
        // Move layer
        moveBefore(index){
            let layers = this.get('layers');
            let removed = layers.objectAt(index);
            layers.insertAt(index-1, removed);
            layers.content.splice(index+1, 1);
            this.scrollToLayer(index-1);
        },
        moveAfter(index){
            let layers = this.get('layers');
            let removed = layers.objectAt(index);
            layers.insertAt(index+2, removed);
            layers.content.splice(index,1);
            this.scrollToLayer(index+1);
        },
        // Remove layer
        showRemove(){
            this.set('showRemoveModal', true);
            console.log(this.get('layerSettings'));
        },
        hideRemove(){
            this.set('showRemoveModal', false);
        },
        removeLayer () {
            let index = this.get('index');
            this.get('layers').removeAt(index);
            this.set('showRemoveModal', false);
        },
        toggleCheck(check){
            this.toggleProperty('layer.settings.' + check.value);
        },
        fileDetail(item){
            if(this.get('layer.content.component') === 'layer-image-text'){
                this.set('layer.content.settings.image' , item.get('links').download);
            }else{
                this.set('layer.settings.backgroundImage' , item.get('links').download);
            }
        },
        applyUploadedImage(){
            this.set('layer.settings.backgroundImage' , this.get('uploadedImageUrl'));
            this.set('showUploadModal', false);
            this.set('uploadedImageUrl', null);
        },
        onFileInputChange(){
        },
        showUpload(){
            this.set('showUploadModal', true);
            $('.popover').hide();
            this.set('uploadErrorText', '');
        },
        hideUpload(){
            this.set('showUploadModal', false);
        },
    }
});
