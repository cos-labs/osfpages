import Ember from 'ember';

export default Ember.Component.extend({
	isTitle: Ember.computed('type', function() {
	  return this.get('type')== "title";
	}),
  	didRender() {
	    this._super(...arguments); 
	    this.$('div#froala-editor').html(this.get('layer.settings.properties.sectionDescription'));
	    if(this.get("editMode") && !this.get('showSettings')){
		    $(() => {
			    this.$('div#froala-editor').froalaEditor({
			      toolbarInline: true,
			      charCounterCount: true,
	  			  multiLine: false,
	  			  imagePaste: false,
	  			  charCounterMax: 140,
	  			  pastePlain: true,
	  			  pasteAllowedStyleProps: [],
				  quickInsertButtons: [],
			      toolbarButtons: ['bold', 'italic', 'underline' ,'align',  'undo', 'redo'],
			      toolbarVisibleWithoutSelection: true
			    });

			    //Save to model
			    this.$('div#froala-editor').on('froalaEditor.contentChanged froalaEditor.initialized',(e, editor) => {
			        this.set('layer.settings.properties.sectionDescription' , editor.html.get());
			      }).froalaEditor();
			  });
			}else{
				this.$('div#froala-editor').froalaEditor('destroy');
				this.$('div#froala-editor').addClass( "fr-view" );
			}

	},
});