
import Ember from 'ember';

export default Ember.Component.extend({
  options: {
    theme: "snow", 
    modules: {
      toolbar:[
       [{ 'header': [ 3, false] }]  
      ]    
    }
  },


  actions: {
    updateText(editor) {
      this.set('layer.content.settings.sectionDescription' , editor.root.innerHTML)
    }
  }
});
