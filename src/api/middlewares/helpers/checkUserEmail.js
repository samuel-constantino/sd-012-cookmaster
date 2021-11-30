// Bloco de código baseado no PR de @David Gonzaga
// PR: https://github.dev/tryber/sd-012-cookmaster/pull/73
const checkUserEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

module.exports = checkUserEmail;