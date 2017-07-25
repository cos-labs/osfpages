import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('guided-tours', 'Integration | Component | guided tours', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{guided-tours}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#guided-tours}}
      template block text
    {{/guided-tours}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
