import { test, expect } from '@playwright/test';
import { validateEmails } from '../utils/validateEmails';

test('Email validation function', async () => {
  const input = [
    "john@test.com",
    "invalid-email",
    "mary@example.org",
    "john@test.com",
    "JOHN@test.com",
    "hello@world",
    "qa_user@company.io"
  ];
  const result = validateEmails(input); 
  expect(result.validEmails).toEqual(["john@test.com", "mary@example.org", "qa_user@company.io"]);
  expect(result.invalidEmails).toEqual(["invalid-email", "JOHN@test.com", "hello@world"]);
  expect(result.duplicateEmails).toEqual(["john@test.com"]);
});