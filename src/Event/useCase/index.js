const makeEventCase = require('./event');

const eventCase = makeEventCase();

exports.eventCase = (props) => eventCase(props);
