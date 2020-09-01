/** @format */

"use strict";
import { IncomingWebhook } from "@slack/webhook";

const handler = async (event, context) => {
  const slackWebhookURL = process.env.SLACK_WEBHOOK_URL;
  let ev = null;

  if (!slackWebhookURL) {
    throw new Error("Environment variables SLACK_WEBHOOK_URL must be set.");
  }

  try {
    ev = JSON.stringify(event, null, 4);
  } catch {
    ev = event;
  }

  const webhook = new IncomingWebhook(slackWebhookURL);

  try {
    await webhook.send({
      text: "",
      username: "Koyeb Event Notifier",
      icon_url: "https://www.koyeb.com/static/apple-touch-icon.png",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `New event :zap: of type *${context.event.type}* handled!`,
          },
        },
      ],
      attachments: [
        {
          color: "#36a64f",
          title: "Event details",
          text: `Source: *${context.event.source}* - Subject: *${context.event.subject}*`,
          fields: [
            {
              title: "Event details",
              value: ev,
              short: false,
            },
          ],
          footer: "Koyeb",
          footer_icon: "https://www.koyeb.com/static/apple-touch-icon.png",
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

module.exports.handler = handler;
