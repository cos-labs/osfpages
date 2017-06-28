import Ember from 'ember';
import OSFAgnosticAuthControllerMixin from 'ember-osf/mixins/osf-agnostic-auth-controller';


export default Ember.Controller.extend(OSFAgnosticAuthControllerMixin, {
    session: Ember.inject.service(),
    actions: {
        login() {
            this.get('session').authenticate('authenticator:osf-token');
        }
    }
});
