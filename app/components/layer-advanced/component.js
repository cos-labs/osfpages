import Ember from 'ember';

export default Ember.Component.extend({
  options: {
    theme: "snow", 
    modules: {
      toolbar: true 
      //Customized settings for when we get the inline image working
      //[
      // ['bold', 'italic', 'underline'],
      // [{ 'header': [1, 2, 3, false] }],      
      // ['blockquote', 'code-block'],
      // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      
      // [{ 'indent': '-1'}, { 'indent': '+1' }],         
      // [{ 'color': [] }, { 'background': [] }],          
      // [{ 'align': [] }],
      // ['link', 'image' , 'video' , 'formula'],
      // ['clean'],
      // [{ 'direction': 'rtl' }],
      // ]
    }
  },


  actions: {
    updateText(editor) {
      this.set('layer.content.content' , editor.root.innerHTML)

    }
  }
});
