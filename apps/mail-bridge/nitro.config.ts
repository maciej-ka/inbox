import { defineNitroConfig } from 'nitropack/config';

interface MailDomainEntries {
  name: string;
  postalId: string;
}

export default defineNitroConfig({
  // Nitro options
  // TODO: create runtimeconfig group keys to clean up this file
  runtimeConfig: {
    url: process.env.MAILBRIDGE_URL,
    key: process.env.MAILBRIDGE_KEY,
    postalUrl: process.env.MAILBRIDGE_POSTAL_URL,
    postalControlPanel: process.env.MAILBRIDGE_POSTAL_CONTROL_PANEL,
    postalUser: process.env.MAILBRIDGE_POSTAL_USER,
    postalPass: process.env.MAILBRIDGE_POSTAL_PASSWORD,
    postalDefaultIpPool: process.env.MAILBRIDGE_POSTAL_DEFAULT_IP_POOL,
    postalPersonalServerOrg: process.env.MAILBRIDGE_POSTAL_PERSONAL_SERVER_ORG,
    postalWebhookPublicKey: process.env.MAILBRIDGE_POSTAL_WEBHOOK_PUBLIC_KEY,
    mailDomainPublic: JSON.parse(
      process.env.MAIL_DOMAIN_PUBLIC
    ) as MailDomainEntries[],
    mailDomainPremium:
      (JSON.parse(process.env.MAIL_DOMAIN_PREMIUM) as MailDomainEntries[]) ||
      [],
    postalWebhookUrl:
      process.env.MAILBRIDGE_POSTAL_WEBHOOK_URL || process.env.MAILBRIDGE_URL,
    defaultLimits: {
      sendLimit: 15,
      messageRetentionDays: 14,
      outboundSpamThreshold: 5,
      rawMessageRetentionDays: 7,
      rawMessageRetentionSize: 512
    }
  }
});