// Bloco de código baseado no PR de @David Gonzaga
// PR: https://github.dev/tryber/sd-012-cookmaster/pull/73
const checkFields = (fields) => (
    fields.reduce((ok, field) => ok && typeof field === 'string' && field.length, true)
);

module.exports = checkFields;
