import Ember from 'ember';

export default Ember.Component.extend({
	isSaving: false,
	typingTimer: null,
	didRender(){
		let self = this;

		if(this.get('editMode')){
			$( ".holder" ).keyup(function() {
				self.send('save');
			});

		}else{
			$( "body" ).unbind("keyup");
		}
	},
	actions : {
		save(){
			this.set('isSaving' , true);
			clearTimeout(this.get('typingTimer'));
			let typingTimer = setTimeout(
				function() {
					this.set('isSaving' , false);
				}.bind(this), 1000);
			this.set('typingTimer' , typingTimer);
		}
	}
});
