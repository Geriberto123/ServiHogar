const test = require('node:test');
const assert = require('node:assert/strict');
const { registerUser, loginUser } = require('../src/services/auth.service');

test('registerUser creates a user with a hashed password', async () => {
  const user = await registerUser({
    name: 'Ana Pérez',
    email: 'ana@example.com',
    password: 'Secret123',
    role: 'client',
  });

  assert.equal(user.email, 'ana@example.com');
  assert.equal(user.role, 'client');
  assert.ok(user.passwordHash); 
  assert.notEqual(user.passwordHash, 'Secret123');
});

test('loginUser returns a token for valid credentials', async () => {
  const result = await loginUser({
    email: 'ana@example.com',
    password: 'Secret123',
  });

  assert.ok(result.token);
  assert.equal(result.user.email, 'ana@example.com');
});
