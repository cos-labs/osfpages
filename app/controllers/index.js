import Ember from 'ember';
import ENV from '../config/environment';
import OsfTokenLoginControllerMixin from 'ember-osf/mixins/osf-token-login-controller';

export default Ember.Controller.extend(OsfTokenLoginControllerMixin, {
	starterGuid: null,
	showErrorMessage: false,
	session: Ember.inject.service(),
	didStyle: 'background: #FFC107 url('+ ENV.rootURL+'img/bg.png) no-repeat center; background-size: cover',
	actions: {
		createPage(guid){
			console.log('this is cool', this.get('starterGuid'))
			
			//check to see if the page exists 
			this.store.findRecord('node', this.get('starterGuid')).then((record)=>{  
				this.transitionTo('home', this.get('starterGuid'));
			},(e)=> {
				console.log(e)
				this.set('showErrorMessage', true)
				
				setTimeout(()=>{
					this.set('showErrorMessage', false)
				}, 2000);
			});


		}

	}
});
