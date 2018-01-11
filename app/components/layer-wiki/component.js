import Ember from 'ember';
import config from 'ember-get-config';


export default Ember.Component.extend({
    session: Ember.inject.service(),
    currentWiki: null,
    showSelect: true,
    isTruncated: false,
    wikiContent: null,
    marginTop: Ember.computed('editMode', function(){
        if(this.get('editMode')){
            return 'margin-top';
        }
        return '';
    }),
    reloadWiki: Ember.computed('layer.settings.wikiId', function(){
        this.get('node.wikis').then(()=>{
            if(!this.get('layers.settings.wikiID')){
                this.loadFirstWiki();
            }
            this.loadWikiWithId();
        })
    }),
    didRender() { 
    },
    loadFirstWiki(){
        let firstWiki = this.get('node.wikis').objectAt(0) || 'none';  // Add string when no wiki returned
        this.set('currentWiki', firstWiki );
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
        if(currentWiki === 'none') {
           this.set('wikiContent', 'This project does not have any Wikis yet');
        }
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
            this.set('wikiContent', data);
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

        },
        toggleShow(){
            this.toggleProperty('isTruncated');
        }
    }
});
