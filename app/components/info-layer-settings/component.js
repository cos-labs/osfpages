import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
	    saveForm() {
			console.log(JSON.stringify(this.get('layer').settings.properties));
	    },
	     selectTheme(theme) {
	     	this.get('layer').settings.properties.themeId
      		this.set('theme', theme);
    	}
  }

});
