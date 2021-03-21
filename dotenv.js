module.exports = () => {
    if(NODE_ENV !== 'production') return require('dotenv').config();
}