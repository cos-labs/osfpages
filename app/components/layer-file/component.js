import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
       downloadFile() {
       		let fileLink = this.get('layer').settings.properties.downloadLink;
       		console.log(fileLink)

        }
	}
});
