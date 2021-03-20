const { eventFxn } = require('.');
const { eventFakerObj } = require('../../../__test__/event');

describe('event business logic', () => {
  let newEvent;

  test('missing client_msg_id', () => {
    newEvent = eventFakerObj({ client_msg_id: null });
    expect(() => eventFxn(newEvent)).toThrow();
  });

  test('missing text', () => {
    newEvent = eventFakerObj({ text: null });
    expect(() => eventFxn(newEvent)).toThrow();
  });

  test('missing user', () => {
    newEvent = eventFakerObj({ user: null });
    expect(() => eventFxn(newEvent)).toThrow();
  });

  test('missing channel', () => {
    newEvent = eventFakerObj({ channel: null });
    expect(() => eventFxn(newEvent)).toThrow();
  });

  test('call @devson with 3 words', () => {
    newEvent = eventFakerObj({ text: 'Helo @devson you' });
    const instanceEvent = eventFxn(newEvent);
    instanceEvent.valueSetter();
    expect(instanceEvent.retval).toHaveProperty('channel', newEvent.channel);
    expect(instanceEvent.retval).toHaveProperty('blocks');
    expect(instanceEvent.retval.blocks[0].elements[0]).toHaveProperty('text', `call *${'@devson'.toUpperCase()} help*`);
  });

  test('call @devson with with first word other than hello', () => {
    newEvent = eventFakerObj({ text: 'Hey @devson' });
    const instanceEvent = eventFxn(newEvent);
    instanceEvent.valueSetter();
    expect(instanceEvent.retval).toHaveProperty('channel', newEvent.channel);
    expect(instanceEvent.retval).toHaveProperty('blocks');
    expect(instanceEvent.retval.blocks[0].elements[0]).toHaveProperty('text', `call *${'@devson'.toUpperCase()} help*`);
  });

  test('call @devson as first with next word != help', () => {
    newEvent = eventFakerObj({ text: '@devson hello' });
    const instanceEvent = eventFxn(newEvent);
    instanceEvent.valueSetter();
    expect(instanceEvent.retval).toHaveProperty('channel', newEvent.channel);
    expect(instanceEvent.retval).toHaveProperty('blocks');
    expect(instanceEvent.retval.blocks[0].elements[0]).toHaveProperty('text', `call *${'@devson'.toUpperCase()} help*`);
  });

  test('call @devson as first with next word == help', () => {
    newEvent = eventFakerObj({ text: '@devson help' });
    const instanceEvent = eventFxn(newEvent);
    instanceEvent.valueSetter();
    expect(instanceEvent.retval).toHaveProperty('channel', newEvent.channel);
    expect(instanceEvent.retval).toHaveProperty('blocks');
    expect(instanceEvent.retval.blocks[0].elements[0]).toHaveProperty('text', `call *Hello ${'@devson'.toUpperCase()}*`);
  });

  test('call Hello @devson', () => {
    newEvent = eventFakerObj({ text: 'Hello @devson' });
    const instanceEvent = eventFxn(newEvent);
    instanceEvent.valueSetter();
    expect(instanceEvent.retval).toHaveProperty('channel', newEvent.channel);
    expect(instanceEvent.retval).toHaveProperty('blocks');
  });
});
