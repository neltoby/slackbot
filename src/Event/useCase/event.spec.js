const { eventCase } = require('.');
const { eventFakerObj } = require('../../../__test__/event');

describe('eventcase', () => {
  test('eventcase', () => {
    const newEvent = eventFakerObj({});
    expect(eventCase(newEvent)).toHaveProperty('channel');
    expect(eventCase(newEvent)).toHaveProperty('blocks');
  });
});
