import Ember from 'ember';

export default Ember.Component.extend({

	init() {
    	this._super(...arguments);
    	this.errors = [];

  },
  	didInsertElement() {
    	this._super(...arguments);
  },
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
