import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    currentWiki: null,
    wikis: Ember.computed('node', function(){
        let wikis = this.get('node.wikis');
        let wikiId = this.get('layer.settings.wikiId');
        this.get('node.wikis').then((result)=>{
            let loadedWiki = result.find(function (item) {
                return item.get('id') === wikiId;
            });
            this.set('currentWiki', loadedWiki);
        });
        return wikis;
    }),
    loadCurrentWiki() {
        let currentWiki = this.get('currentWiki');
        let url = currentWiki.get('links.download');
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
    actions: {
        selectWiki(selected){
            this.set('layer.settings.wikiId', selected.get('id'));
            this.set('currentWiki', selected);
            this.loadCurrentWiki();
        }
    }
});
