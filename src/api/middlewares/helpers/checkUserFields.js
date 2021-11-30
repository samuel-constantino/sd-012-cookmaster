const checkUserFields = (fields) => (
    fields.reduce((ok, field) => ok && typeof field === 'string' && field.length, true)
);

module.exports = checkUserFields;
