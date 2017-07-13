import Ember from 'ember';

export default Ember.Component.extend({

  didRender() {
    this._super(...arguments);  
    if(this.get("editMode")){
	    $(function() {
		    $('div#froala-editor').froalaEditor({
		      toolbarInline: true,
		      charCounterCount: false,
		      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'],
		      toolbarVisibleWithoutSelection: true
		    })
		  });
		}else{
			$('div#froala-editor').froalaEditor('destroy');
			console.log($('div#froala-editor'));
		}
	}
});
