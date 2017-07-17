import Ember from 'ember';

export default Ember.Component.extend({
    file_object: null,
    actions: {
        changeSize(direction, item){
            if(direction === 'bigger') {
                this.incrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
            if(direction === 'smaller') {
                this.decrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
        },
        runOption(option, item){
            this.set('layer.settings.values.' + item.value, option);
        },
        fileDetail(file) {
            this.set('layer.settings.values.downloadLink' ,  file.data.links.download)
        },
        saveForm(){

        }
    }
});
