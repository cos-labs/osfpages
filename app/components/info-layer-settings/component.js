import Ember from 'ember';

export default Ember.Component.extend({
	init() {
    	this._super(...arguments);
    	this.errors = [];

  },
  	didRender() {
    	this._super(...arguments);
    	//get the settings properties
    	var infoSettings = this.get('layer').settings.properties;
    	$.each( infoSettings, function( key, value ) {		
    		
    		if(typeof(value) === "boolean"){
    			$("#"+key).prop('checked', value);
    		}else{
    		   $("#"+key).val(value);
    		}
    		
		});


  }

});
