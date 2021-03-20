const buildResponseClass = require('./response')
const makeResponseClass = buildResponseClass()

exports.makeResponseClass = props => makeResponseClass(props)