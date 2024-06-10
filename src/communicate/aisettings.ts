interface AIAccount {
  id: string;
  name: string;
  model: string;
  endpoint: string;
  apiKey: string;
  apiKeyHash: string;
  createdAt: string;
  updatedAt: string;
}

async function getAccounts(): Promise<AIAccount[]> {
  const response = await fetch("/api/accounts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  const accounts = await response.json();
  return accounts;
}

async function createAccount(account: AIAccount): Promise<AIAccount> {
  const response = await fetch("/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }

  const createdAccount = await response.json();
  return new Promise((resolve, reject) => {
    if (createdAccount) {
      resolve(createdAccount);
    } else {
      reject(new Error("create failed"));
    }
  });
}
