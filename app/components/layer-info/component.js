import Ember from 'ember';
import loadAll from 'ember-osf/utils/load-relationship';

export default Ember.Component.extend({
    users: Ember.A(),
    bibliographicUsers: Ember.A(),
    getAuthors: function() {
        // Cannot be called until node has loaded!
        const node = this.get('node');
        if (!node) { return };
        if(this.get('users').length > 0 || this.get('bibliographicUsers').length > 0) { return; }
        const contributors = Ember.A();
        loadAll(node, 'contributors', contributors).then(() => {
            contributors.forEach((item) => {
                this.get('users').pushObject(item.get('users'));
                if(item.get('bibliographic')){
                    this.get('bibliographicUsers').pushObject(item.get('users'));
                }
            })
        });
    },
    didReceiveAttrs() {
        this._super(...arguments);
        this.getAuthors();
    }
});
