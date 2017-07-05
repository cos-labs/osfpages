import Ember from 'ember';

export default Ember.Component.extend({
	file_object: null,
	actions: {
       fileDetail(file) {
       		this.set('layer.settings.properties.downloadLink' , file._internalModel.__data.links.download)
        },

        nodeDetail(node) {
            this.transitionToRoute('nodes.detail', node);
        }

	}
});
