import Ember from 'ember';
import ENV from '../config/environment';
import OsfTokenLoginControllerMixin from 'ember-osf/mixins/osf-token-login-controller';

export default Ember.Controller.extend(OsfTokenLoginControllerMixin, {
    starterGuid: null,
    session: Ember.inject.service(),
    didStyle: 'background: #FFC107 url('+ ENV.rootURL+'img/bg.png) no-repeat center; background-size: cover'
});
