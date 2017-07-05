import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    currentWiki: null,
    wikis: Ember.computed('node', function(){
        return this.get('node.wikis');
    }),
    actions: {
        selectWiki(id){
            this.set('currentWiki', id);
            this.loadCurrentWiki();
        }
    },
    loadCurrentWiki() {
        let url = this.get('currentWiki').get('links.download');
        let headers = {};
        let authType = config['ember-simple-auth'].authorizer;
        this.get('session').authorize(authType, (headerName, content) => {
            headers[headerName] = content;
        });
        Ember.$.ajax({
            method: 'GET',
            headers,
            url
        }).done(data => {
            this.get('layer').set('wikiContent', data);
        });
    },
    init(){
        this._super(...arguments);
        let currentWiki = this.get('currentWiki');
        if(currentWiki){
            this.loadCurrentWiki();
        }
    }

});
