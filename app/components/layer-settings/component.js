import Ember from 'ember';

const helpText = {
    'layer-info': 'The information section is used for displaying your project description, contributors and affiliated institutions from you OSF project.',
    'layer-title': 'The title section is used for displaying the title of your OSF project, all data here is pulled directly from your project.',
    'layer-wiki':'The wiki section is used for displaying your project\'s wiki, all data from this section is from you OSF project.',
    'layer-file': 'The file section is used to show files from your OSF project, you can write a short description about the file.',
    'layer-image': 'The image section is used to show a banner like image.',
    'layer-link': 'The link section is used to display a link to a site, you can give a short description as well.',
    'layer-advanced': 'The Advanced section is used to make custom designs to your OSF site. you can edit this by using the inline editor.'
}

export default Ember.Component.extend({
    helpText,
    file_object: null,
    showRemoveModal: false,
    lastIndex: Ember.computed('layers.content.[]',function (){
        return  this.get('layers.content').length-1;
    }),
    backgroundPalette: ['#9e9e9e', '#eeeeee', '#009688', '#00BCD4', '#ffffff', '#31708f', '#f07057'],
    colorPalette: ['#f8f8f8', '#333333', '#ebebeb', '#ffffff', '#f5f5f5'],
    scrollToLayer(index){
        let el = $('#layer'+index);
        let offset = el.offset();
        $('body').animate({scrollTop:offset.top}, '500');
    },
    actions: {
        changeSize(direction, item){
            if(direction === 'bigger') {
                this.incrementProperty('layer.settings.values.' + item.get('value'), item.get('incrementSize'));
            }
            if(direction === 'smaller') {
                this.decrementProperty('layer.settings.values.' + item.get('value'), item.get('incrementSize'));
            }
        },
        runOption(option, item){
            this.set('layer.settings.values.' + item.get('value'), option);
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
            this.toggleProperty('layer.settings.values.' + check.get('value'));
        }
    }
});
