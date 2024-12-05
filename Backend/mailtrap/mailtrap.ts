import { MailtrapClient } from "mailtrap";


export const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN!,  // Non-null Assertion - will always have a valid value (i.e., not undefined or null).
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Fork&Feast",
};
