
const { gmd } = require("../guru");
const { getSetting, setSetting } = require("../guru/database/settings");
const { safeNewsletterFollow, OWNER_CHANNELS, PROFESSOR_EMOJIS } = require("../guru/connection/connectionHandler");

gmd(
  {
    pattern: "channels",
    aliases: ["mychannel", "mychannels", "channelinfo", "chinfo"],
    react: "📡",
    category: "owner",
    description: "View auto-followed channels and their react status",
  },
  async (from, Gifted, conText) => {
    const { reply, react, isSuperUser, botFooter } = conText;
    if (!isSuperUser) {
      await react("❌");
      return reply("❌ Owner Only Command!");
    }
    try {
      let extraChannels = [];
      const extra = await getSetting("OWNER_CHANNELS");
      if (extra) {
        extraChannels = extra.split(",").map((j) => j.trim()).filter((j) => j.endsWith("@newsletter"));
      }
      const channelReact = await getSetting("CHANNEL_AUTOREACT");
      const allChannels = [...new Set([...OWNER_CHANNELS, ...extraChannels])];

      let msg =
        `📡 *CHANNEL MANAGER*\n` +
        `${"─".repeat(30)}\n\n` +
        `🔁 *Auto-React:* ${channelReact === "false" ? "🔴 OFF" : "🟢 ON"}\n` +
        `🎭 *React Style:* Random Professor Emojis\n` +
        `📊 *Total Channels:* ${allChannels.length}\n\n` +
        `*📌 TRACKED CHANNELS:*\n`;

      allChannels.forEach((jid, i) => {
        const isDefault = OWNER_CHANNELS.includes(jid);
        msg += `\n${i + 1}. \`${jid}\`\n`;
        msg += `   ${isDefault ? "🔒 Built-in (always active)" : "➕ Custom"}\n`;
      });

      msg +=
        `\n${"─".repeat(30)}\n` +
        `📘 *Commands:*\n` +
        `• \`.addchannel <jid>\` — add channel\n` +
        `• \`.removechannel <jid>\` — remove channel\n` +
        `• \`.channelreact on/off\` — toggle reactions\n` +
        `• \`.followchannels\` — manually re-follow all\n\n` +
        `> _${botFooter}_`;

      await react("✅");
      await reply(msg);
    } catch (err) {
      await react("❌");
      await reply(`❌ Error: ${err.message}`);
    }
  }
);

gmd(
  {
    pattern: "addchannel",
    aliases: ["setchannel", "trackchannel"],
    react: "➕",
    category: "owner",
    description: "Add a channel to auto-follow and auto-react list. Usage: .addchannel 1234567890@newsletter",
  },
  async (from, Gifted, conText) => {
    const { reply, react, isSuperUser, q, botFooter } = conText;
    if (!isSuperUser) {
      await react("❌");
      return reply("❌ Owner Only Command!");
    }
    if (!q) return reply("❌ Provide a channel JID!\nExample: `.addchannel 120363406649804510@newsletter`");
    const jid = q.trim();
    if (!jid.endsWith("@newsletter")) return reply("❌ Invalid channel JID! Must end with `@newsletter`");

    try {
      const current = await getSetting("OWNER_CHANNELS");
      const existing = current ? current.split(",").map((j) => j.trim()).filter(Boolean) : [];
      if (OWNER_CHANNELS.includes(jid) || existing.includes(jid)) {
        return reply(`⚠️ Channel \`${jid}\` is already being tracked!`);
      }
      existing.push(jid);
      await setSetting("OWNER_CHANNELS", existing.join(","));
      await safeNewsletterFollow(Gifted, jid);
      await react("✅");
      await reply(
        `✅ *Channel Added & Followed!*\n\n` +
        `📡 \`${jid}\`\n\n` +
        `✨ Will now auto-follow and auto-react to posts from this channel.\n\n` +
        `> _${botFooter}_`
      );
    } catch (err) {
      await react("❌");
      await reply(`❌ Error: ${err.message}`);
    }
  }
);

gmd(
  {
    pattern: "removechannel",
    aliases: ["delchannel", "untrackchannel"],
    react: "➖",
    category: "owner",
    description: "Remove a custom channel from auto-react list. Usage: .removechannel 1234567890@newsletter",
  },
  async (from, Gifted, conText) => {
    const { reply, react, isSuperUser, q, botFooter } = conText;
    if (!isSuperUser) {
      await react("❌");
      return reply("❌ Owner Only Command!");
    }
    if (!q) return reply("❌ Provide a channel JID!\nExample: `.removechannel 120363406649804510@newsletter`");
    const jid = q.trim();

    if (OWNER_CHANNELS.includes(jid)) {
      return reply(`⚠️ \`${jid}\` is a built-in channel and cannot be removed.\nBuilt-in channels always remain active.`);
    }

    try {
      const current = await getSetting("OWNER_CHANNELS");
      const existing = current ? current.split(",").map((j) => j.trim()).filter(Boolean) : [];
      const idx = existing.indexOf(jid);
      if (idx === -1) return reply(`⚠️ Channel \`${jid}\` is not in the custom list.`);
      existing.splice(idx, 1);
      await setSetting("OWNER_CHANNELS", existing.join(","));
      await react("✅");
      await reply(
        `✅ *Channel Removed!*\n\n` +
        `📡 \`${jid}\` removed from auto-react tracking.\n\n` +
        `> _${botFooter}_`
      );
    } catch (err) {
      await react("❌");
      await reply(`❌ Error: ${err.message}`);
    }
  }
);

gmd(
  {
    pattern: "channelreact",
    aliases: ["togglechreact", "chreact", "autochreact"],
    react: "🎭",
    category: "owner",
    description: "Toggle auto-react to channel posts on/off. Usage: .channelreact on",
  },
  async (from, Gifted, conText) => {
    const { reply, react, isSuperUser, q, botFooter } = conText;
    if (!isSuperUser) {
      await react("❌");
      return reply("❌ Owner Only Command!");
    }
    const val = (q || "").toLowerCase().trim();
    if (!["on", "off"].includes(val)) return reply("❌ Usage: `.channelreact on` or `.channelreact off`");
    try {
      const setting = val === "on" ? "true" : "false";
      await setSetting("CHANNEL_AUTOREACT", setting);
      await react("✅");
      await reply(
        `${val === "on" ? "✅" : "🔴"} *Channel Auto-React ${val.toUpperCase()}*\n\n` +
        `${val === "on"
          ? `🎭 Will now randomly react to posts from tracked channels using professor emojis.\n\nEmojis: ${PROFESSOR_EMOJIS.slice(0, 8).join(" ")} ...`
          : "😴 Auto-react is now disabled for all channels."
        }\n\n> _${botFooter}_`
      );
    } catch (err) {
      await react("❌");
      await reply(`❌ Error: ${err.message}`);
    }
  }
);

gmd(
  {
    pattern: "followchannels",
    aliases: ["rechannels", "refollowchannels", "followall"],
    react: "📡",
    category: "owner",
    description: "Manually re-follow all tracked channels",
  },
  async (from, Gifted, conText) => {
    const { reply, react, isSuperUser, botFooter } = conText;
    if (!isSuperUser) {
      await react("❌");
      return reply("❌ Owner Only Command!");
    }
    try {
      let extraChannels = [];
      const extra = await getSetting("OWNER_CHANNELS");
      if (extra) {
        extraChannels = extra.split(",").map((j) => j.trim()).filter((j) => j.endsWith("@newsletter"));
      }
      const allChannels = [...new Set([...OWNER_CHANNELS, ...extraChannels])];
      let succeeded = 0;
      let failed = 0;
      for (const jid of allChannels) {
        const ok = await safeNewsletterFollow(Gifted, jid);
        if (ok) succeeded++; else failed++;
      }
      await react("✅");
      await reply(
        `📡 *Channel Follow Complete*\n\n` +
        `✅ Followed: ${succeeded}\n` +
        `❌ Failed: ${failed}\n` +
        `📊 Total: ${allChannels.length}\n\n` +
        `> _${botFooter}_`
      );
    } catch (err) {
      await react("❌");
      await reply(`❌ Error: ${err.message}`);
    }
  }
);

gmd(
  {
    pattern: "professoremojis",
    aliases: ["profemojis", "channelemojis", "reactemojis"],
    react: "🎓",
    category: "owner",
    description: "View all professor emojis used for channel auto-reactions",
  },
  async (from, Gifted, conText) => {
    const { reply, react, isSuperUser, botFooter } = conText;
    if (!isSuperUser) {
      await react("❌");
      return reply("❌ Owner Only Command!");
    }
    await react("✅");
    await reply(
      `🎓 *Professor React Emojis*\n\n` +
      `These emojis are used randomly when auto-reacting to channel posts:\n\n` +
      PROFESSOR_EMOJIS.join("  ") +
      `\n\n📊 *Total:* ${PROFESSOR_EMOJIS.length} emojis\n\n> _${botFooter}_`
    );
  }
);
