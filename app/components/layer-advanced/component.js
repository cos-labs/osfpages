import Ember from 'ember';

export default Ember.Component.extend({

  didRender() {
    this._super(...arguments); 
    this.$('div#froala-editor').html(this.get('layer.content'));
    if(this.get("editMode") && this.get('showSettings') == false){
	    $(() => {
		    this.$('div#froala-editor').froalaEditor({
		      toolbarInline: true,
		      charCounterCount: false,
		      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'],
		      toolbarVisibleWithoutSelection: true
		    });

		    //Save to model
		    this.$('div#froala-editor').on('froalaEditor.contentChanged froalaEditor.initialized',(e, editor) => {
		        this.set('layer.content' , editor.html.get());
		      }).froalaEditor();
		  });
		}else{
			this.$('div#froala-editor').froalaEditor('destroy');
			this.$('div#froala-editor').addClass( "fr-view" );
		}

	}
});
