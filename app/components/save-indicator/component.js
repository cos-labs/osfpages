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

			$('.checkbox , .settings-wrapper button, .theme-block').on( "click", function() {
				self.send('save');
			})

		}else{
			$( ".holder" ).unbind("keyup");
			$('.checkbox , .settings-wrapper button, .theme-block').unbind("click");

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
