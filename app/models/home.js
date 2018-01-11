import DS from 'ember-data';

export default DS.Model.extend({
	guid: DS.attr('string'),
	pageData: DS.attr('string'),
	unpublishedPageData: DS.attr('string'),
	metaData: DS.attr('string')
});
