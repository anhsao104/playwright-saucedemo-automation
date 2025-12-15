export function validateEmails(emails: string[]) {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  const seen = new Set<string>();
  const duplicates = new Set<string>();

  const validEmails: string[] = [];
  const invalidEmails: string[] = [];

  for (const email of emails) {
    if (!regex.test(email)) {
      invalidEmails.push(email);
      continue;
    }

    if (seen.has(email)) {
      duplicates.add(email);
    } else {
      seen.add(email);
      validEmails.push(email);
    }
  }

  return {
    validEmails,
    invalidEmails,
    duplicateEmails: [...duplicates],
  };
}
