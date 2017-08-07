import Ember from 'ember';
import ENV from '../../config/environment';


export default Ember.Component.extend({
	didStyle: 'background: #FFC107 url('+ ENV.rootURL+'img/bg.png) no-repeat center; background-size: cover'
});
