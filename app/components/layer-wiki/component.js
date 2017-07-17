import Ember from 'ember';
import config from 'ember-get-config';


export default Ember.Component.extend({
    session: Ember.inject.service(),
    currentWiki: null,
    showSelect: false,
    reloadWiki: Ember.computed('layer.settings.wikiId', function(){
        this.get('node.wikis').then((result)=>{
            if(!this.get('layers.settings.wikiID')){
                this.loadFirstWiki();
            }
            this.loadWikiWithId();
        })
    }),
    loadFirstWiki(){
        this.set('currentWiki', this.get('node.wikis').objectAt(0));
        this.loadCurrentWiki();
    },
    loadWikiWithId(){
        let wiki;
        let wikiId = this.get('layer.settings.wikiId');
        if(wikiId){
            wiki = this.get('node.wikis').find(function(item){
                return item.get('id') === wikiId;
            });
            this.set('currentWiki', wiki);
            this.loadCurrentWiki();
        }
    },
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
    init(){
        this._super(...arguments);
        this.get('reloadWiki');
    },
    actions: {
        showSelect(){
            this.set('showSelect', true);
        },
        hideSelect(){
            this.set('showSelect', false);
        },
        selectWiki(selected){
            this.set('layer.settings.wikiId', selected.get('id'));
            this.set('currentWiki', selected);
            this.loadCurrentWiki();
            this.set('showSelect', false);

        }
    }
});
