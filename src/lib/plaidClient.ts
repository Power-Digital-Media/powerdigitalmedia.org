import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const plaidEnv = process.env.PLAID_ENV || "sandbox";
const clientId = process.env.PLAID_CLIENT_ID || "sandbox-client-id";
const clientSecret = process.env.PLAID_SECRET || "sandbox-secret";

const basePath = PlaidEnvironments[plaidEnv] || PlaidEnvironments.sandbox;

const configuration = new Configuration({
    basePath,
    baseOptions: {
        headers: {
            "PLAID-CLIENT-ID": clientId,
            "PLAID-SECRET": clientSecret,
        },
    },
});

export const plaidClient = new PlaidApi(configuration);
