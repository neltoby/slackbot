const { eventController } = require('.');
const { eventFakerObj } = require('../../../__test__/event');

describe('eventcontroller', () => {
  test('eventcontroller', async () => {
    const body = { event: eventFakerObj({}) };
    const res = await eventController(body);
    expect(res).toHaveProperty('body');
  });
});
