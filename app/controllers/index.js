import Ember from 'ember';
import ENV from '../config/environment';
import OsfTokenLoginControllerMixin from 'ember-osf/mixins/osf-token-login-controller';

export default Ember.Controller.extend(OsfTokenLoginControllerMixin, {
	starterGuid: null,
	showErrorMessage: false,
	isLoading:false,
	session: Ember.inject.service(),
	didStyle: 'background: #FFC107 url('+ ENV.rootURL+'img/bg.png) no-repeat center; background-size: cover',
	actions: {
		loadPage() {
			this.set('isLoading', true)
			this.transitionToRoute('home', 'fze7g').then(()=>{
				this.set('isLoading', false)
			})
		},
		createPage(){
			this.set('isLoading', true)
			let guid = this.get('starterGuid');
			//check to see if the page exists 
			this.store.findRecord('node', guid).then((record)=>{  
				this.transitionToRoute('home', guid);
			},(e)=> {
				this.set('showErrorMessage', true)
				this.set('isLoading', false)
				
				setTimeout(()=>{
					this.set('showErrorMessage', false)

				}, 2000);
			});


		}

	}
});
