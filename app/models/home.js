import DS from 'ember-data';

export default DS.Model.extend({
	pageData: DS.attr('string'),
	unpublishedPageData: DS.attr('string')
});
