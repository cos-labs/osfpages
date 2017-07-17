import Ember from 'ember';

export default Ember.Component.extend({
    showSelect: false,
    actions: {
        fileDetail(file) {
            this.set('showSelect', false);
            this.set('layer.settings.values.downloadLink' ,  file.data.links.download)
        },
        showSelect(){
            this.set('showSelect', true);
        },
        hideSelect(){
            this.set('showSelect', false);
        }
	}
});
