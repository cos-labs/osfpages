import Ember from 'ember';

export default Ember.Component.extend({
  options: {
    theme: "snow",
    modules: {
      toolbar: [
      [{header: [2, 3, 4, false]}],
      ["bold", "italic", "underline", "strike"],
      [{"color": []}],
      [{"list": "ordered"}, {"list": "bullet"}],
      [{"indent": "-1"}, {"indent": "+1"}],
      [{"align": []}],
      ["link"],
      ["clean"]
      ]
    }
  },

  actions: {
    updateText(editor) {
      this.set('layer.content' , editor.root.innerHTML)
    }
  },
  didRender() {
    this._super(...arguments); 
   // console.log(this.get('layer.content') , this.get('quill-editor'))


   //this.$('div.ql-editor').text(this.get('layer.content'));

    if(this.get("editMode") && !this.get('showSettings')){

	//     $(() => {
	// 	    this.$('div#froala-editor').froalaEditor({
	// 	      toolbarInline: true,
	// 	      charCounterCount: false,
	// 	      imageStyles: {
	// 		    circle: 'Circle',
	// 		    padding: 'Padding',
	// 		  },
	// 	      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'],
	// 	      toolbarVisibleWithoutSelection: true
	// 	    });

	// 	    //Save to model
	// 	    this.$('div#froala-editor').on('froalaEditor.contentChanged froalaEditor.initialized',(e, editor) => {
	// 	        this.set('layer.content' , editor.html.get());
	// 	      }).froalaEditor();
	// 	  });
  }else{
	// 		this.$('div#froala-editor').froalaEditor('destroy');
	// 		this.$('div#froala-editor').addClass( "fr-view" );
  }
}
});
