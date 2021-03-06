
import Ember from 'ember';

export default Ember.Component.extend({
  options: {
    theme: "snow",
    modules: {
      toolbar:[
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, false] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image' , 'video' ],
      ['clean'],
      [{ 'direction': 'rtl' }],
      ]
    }
  },
  actions: {
    updateText(editor) {
      this.set('layer.content.settings.content' , editor.root.innerHTML)

    }
  }
});
