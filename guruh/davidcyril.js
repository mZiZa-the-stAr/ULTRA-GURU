
const { gmd } = require("../guru");
const axios = require("axios");

const DC = "https://apis.davidcyril.name.ng";

const sendImg = async (Gifted, from, mek, url, caption, ctx) => {
  await Gifted.sendMessage(from, {
    image: { url },
    caption,
    contextInfo: {
      mentionedJid: [ctx.sender],
      forwardingScore: 5,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: ctx.newsletterJid,
        newsletterName: ctx.botName,
        serverMessageId: 0,
      },
    },
  }, { quoted: mek });
};

const sendTxt = async (Gifted, from, mek, text, ctx) => {
  await Gifted.sendMessage(from, {
    text,
    contextInfo: {
      mentionedJid: [ctx.sender],
      forwardingScore: 5,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: ctx.newsletterJid,
        newsletterName: ctx.botName,
        serverMessageId: 0,
      },
    },
  }, { quoted: mek });
};

const newsFormatter = (title, articles, maxItems = 6) => {
  const list = articles.slice(0, maxItems);
  let msg = `📰 *${title.toUpperCase()}*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
  list.forEach((a, i) => {
    msg += `*${i + 1}.* ${a.title}\n`;
    if (a.description) {
      const d = a.description.replace(/&#[^;]+;/g, "").trim();
      msg += `   _${d.length > 100 ? d.slice(0, 100) + "..." : d}_\n`;
    }
    if (a.source) msg += `   📡 ${a.source}\n`;
    msg += `   🔗 ${a.link}\n\n`;
  });
  msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
  return msg;
};

// ==================== FUN ====================

gmd({ pattern: "truth", aliases: ["truthquestion"], react: "🎯", category: "fun", description: "Get a random truth question" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/truth`);
      if (!data.success) return reply("❌ Could not fetch a truth question.");
      await sendTxt(Gifted, from, mek, `🎯 *TRUTH*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${data.question}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "dare", aliases: ["darequestion"], react: "🔥", category: "fun", description: "Get a random dare challenge" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/dare`);
      if (!data.success) return reply("❌ Could not fetch a dare.");
      await sendTxt(Gifted, from, mek, `🔥 *DARE*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${data.question}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "pickupline", aliases: ["flirt", "rizz"], react: "💘", category: "fun", description: "Get a random pickup line" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/pickupline`);
      if (!data.pickupline) return reply("❌ Could not fetch a pickup line.");
      await sendTxt(Gifted, from, mek, `💘 *PICKUP LINE*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n_${data.pickupline}_\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "funfact", aliases: ["fact", "randomfact"], react: "💡", category: "fun", description: "Get a random fun fact" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/fact`);
      const fact = data.fact;
      if (!fact) return reply("❌ Could not fetch a fact.");
      await sendTxt(Gifted, from, mek, `💡 *FUN FACT*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${fact}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "catfact", aliases: ["catfacts", "meow"], react: "🐱", category: "fun", description: "Get a random cat fact" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/random/catfact`);
      const fact = data.fact;
      if (!fact) return reply("❌ Could not fetch a cat fact.");
      await sendTxt(Gifted, from, mek, `🐱 *CAT FACT*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${fact}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "quote", aliases: ["inspire", "motivation", "qod"], react: "✨", category: "fun", description: "Get a random inspirational quote" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/random/quotes`);
      const q = data.quote;
      if (!q) return reply("❌ Could not fetch a quote.");
      await sendTxt(Gifted, from, mek, `✨ *QUOTE OF THE DAY*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n_"${q.text}"_\n\n— *${q.author || "Unknown"}*\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "waifu", aliases: ["randomwaifu", "animegirl"], react: "🌸", category: "fun", description: "Get a random anime waifu image" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/random/waifu`);
      if (!data.success || !data.url) return reply("❌ Could not fetch a waifu image.");
      await sendImg(Gifted, from, mek, data.url, `🌸 *Random Waifu*\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

// ==================== NEWS ====================

gmd({ pattern: "news", aliases: ["bbnews", "bbcnews", "headlines"], react: "📰", category: "news", description: "Latest BBC world news headlines" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/news/bbc`);
      if (!data.success || !data.articles?.length) return reply("❌ Could not fetch news.");
      const msg = newsFormatter("📰 BBC World News", data.articles);
      const img = data.articles.find(a => a.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "trendingnews", aliases: ["trending", "trendnews"], react: "🔥", category: "news", description: "Trending news from multiple global sources" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/news/trending`);
      if (!data.success || !data.articles?.length) return reply("❌ Could not fetch trending news.");
      const msg = newsFormatter("🔥 Trending News", data.articles);
      const img = data.articles.find(a => a.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "technews", aliases: ["techn", "devnews"], react: "💻", category: "news", description: "Latest tech news from TechCrunch, HackerNews & WIRED" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/news/tech`);
      if (!data.success || !data.articles?.length) return reply("❌ Could not fetch tech news.");
      const msg = newsFormatter("💻 Tech News", data.articles);
      const img = data.articles.find(a => a.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "enews", aliases: ["entertainmentnews", "entertainment"], react: "🎬", category: "news", description: "Latest entertainment news from Variety & Deadline" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/news/entertainment`);
      if (!data.success || !data.articles?.length) return reply("❌ Could not fetch entertainment news.");
      const msg = newsFormatter("🎬 Entertainment News", data.articles);
      const img = data.articles.find(a => a.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "aljazeera", aliases: ["aljazeeranews", "ajnews"], react: "🌍", category: "news", description: "Latest Al Jazeera world news" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/news/aljazeera`);
      if (!data.success || !data.articles?.length) return reply("❌ Could not fetch Al Jazeera news.");
      const msg = newsFormatter("🌍 Al Jazeera News", data.articles);
      const img = data.articles.find(a => a.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "hackernews", aliases: ["hn", "devnews2"], react: "👨‍💻", category: "news", description: "Latest Hacker News articles" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/news/hackernews`);
      if (!data.success || !data.articles?.length) return reply("❌ Could not fetch Hacker News.");
      const msg = newsFormatter("👨‍💻 Hacker News", data.articles);
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

// ==================== ANIME ====================

gmd({ pattern: "anime", aliases: ["animesearch", "findanime"], react: "🎌", category: "anime", description: "Search anime info — Usage: .anime <title>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Please provide an anime title.\n*Example:* .anime naruto");
    try {
      const { data } = await axios.get(`${DC}/anime/search`, { params: { q } });
      if (!data.success || !data.results?.length) return reply(`❌ No results found for *${q}*`);
      const results = data.results.slice(0, 5);
      let msg = `🎌 *ANIME SEARCH: ${q.toUpperCase()}*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      results.forEach((a, i) => {
        msg += `*${i + 1}. ${a.title}*`;
        if (a.title_english && a.title_english !== a.title) msg += ` _(${a.title_english})_`;
        msg += `\n   📺 ${a.type || "N/A"}  •  🎬 ${a.episodes || "?"}ep  •  ⭐ ${a.score || "N/A"}\n   📅 ${a.year || "N/A"}  •  📊 ${a.status || "N/A"}\n\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Showing ${results.length} of ${data.total || results.length} results_`;
      const img = results.find(r => r.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "animetrending", aliases: ["trending-anime", "hotanime"], react: "🔥", category: "anime", description: "Currently trending anime this season" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/anime/trending`);
      if (!data.success || !data.results?.length) return reply("❌ Could not fetch trending anime.");
      const results = data.results.slice(0, 8);
      let msg = `🔥 *TRENDING ANIME*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      results.forEach((a, i) => {
        const title = a.title_english || a.title;
        msg += `*${i + 1}. ${title}*\n   ⭐ Score: ${a.score || "N/A"}  •  🎬 ${a.episodes || "?"}ep  •  📊 ${a.status || "N/A"}\n`;
        if (a.genres?.length) msg += `   🏷️ ${a.genres.slice(0, 3).join(", ")}\n`;
        msg += `\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
      const img = results.find(r => r.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "animairing", aliases: ["airinganime", "currentanime"], react: "📡", category: "anime", description: "Top currently airing anime" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/anime/airing`);
      if (!data.success || !data.results?.length) return reply("❌ Could not fetch airing anime.");
      const results = data.results.slice(0, 8);
      let msg = `📡 *CURRENTLY AIRING ANIME*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      results.forEach((a, i) => {
        msg += `*${i + 1}. ${a.title}*\n   ⭐ ${a.score || "N/A"}  •  📺 ${a.type || "N/A"}  •  🎬 ${a.episodes || "?"}ep\n   👥 ${a.members ? a.members.toLocaleString() : "N/A"} members\n\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_${data.total || ""} total airing — Powered by DavidCyrilTech_`;
      const img = results.find(r => r.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "animatop", aliases: ["topanime", "bestanime"], react: "🏆", category: "anime", description: "Top ranked anime of all time" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/anime/top`);
      if (!data.success || !data.results?.length) return reply("❌ Could not fetch top anime.");
      const results = data.results.slice(0, 8);
      let msg = `🏆 *TOP ANIME OF ALL TIME*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      results.forEach((a) => {
        msg += `*#${a.rank || "?"} ${a.title}*\n   ⭐ Score: ${a.score || "N/A"}  •  📺 ${a.type || "N/A"}  •  🎬 ${a.episodes || "?"}ep\n   👥 ${a.members ? a.members.toLocaleString() : "N/A"} members\n\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
      const img = results.find(r => r.image);
      if (img) await sendImg(Gifted, from, mek, img.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

// ==================== SPORTS ====================

gmd({ pattern: "sportslive", aliases: ["livescores", "scores"], react: "🏟️", category: "sports", description: "Live scores: NBA, NFL & Premier League" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/sports/live`);
      if (!data.success) return reply("❌ Could not fetch live scores.");
      let msg = `🏟️ *LIVE SPORTS SCORES*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      const formatGames = (games, sport) => {
        if (!games?.count) return "";
        let t = `🏀 *${sport}* (${games.count} games)\n`;
        (games.games || games).slice(0, 5).forEach(g => {
          const home = g.homeTeam, away = g.awayTeam;
          const winner = home.winner ? "🏆" : away.winner ? "" : "🔵";
          t += `  ${away.shortName} ${away.score} — ${home.score} ${home.shortName} ${winner}\n`;
          t += `  📊 ${g.status} | 📺 ${g.broadcast || "N/A"}\n`;
        });
        return t + "\n";
      };
      if (data.nba) msg += formatGames(data.nba, "NBA");
      if (data.nfl) msg += formatGames(data.nfl, "NFL");
      if (data.soccer) {
        msg += `⚽ *${data.soccer.league || "Soccer"}* (${data.soccer.count} games)\n`;
        (data.soccer.games || []).slice(0, 5).forEach(g => {
          const home = g.homeTeam, away = g.awayTeam;
          msg += `  ${away.shortName} ${away.score} — ${home.score} ${home.shortName}\n`;
          msg += `  📊 ${g.status}\n`;
        });
      }
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "soccer", aliases: ["football", "premierleague", "epl"], react: "⚽", category: "sports", description: "Premier League latest scores" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/sports/soccer/scores`);
      if (!data.success || !data.games?.length) return reply("❌ No soccer scores available right now.");
      let msg = `⚽ *${data.league || "PREMIER LEAGUE"} SCORES*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      data.games.forEach(g => {
        const h = g.homeTeam, a = g.awayTeam;
        const result = h.winner ? `${h.shortName} 🏆` : a.winner ? `${a.shortName} 🏆` : "Draw";
        msg += `*${a.shortName}* ${a.score} — ${h.score} *${h.shortName}*\n`;
        msg += `  📊 ${g.status}  |  🏟️ ${g.venue || "N/A"}\n\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "nba", aliases: ["nbabasketball", "basketball"], react: "🏀", category: "sports", description: "NBA latest scores" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/sports/nba/scores`);
      if (!data.success || !data.games?.length) return reply("❌ No NBA scores available right now.");
      let msg = `🏀 *NBA SCORES*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      data.games.forEach(g => {
        const h = g.homeTeam, a = g.awayTeam;
        msg += `*${a.shortName}* ${a.score} — ${h.score} *${h.shortName}*`;
        msg += (h.winner ? ` 🏆 ${h.shortName}` : a.winner ? ` 🏆 ${a.shortName}` : "");
        msg += `\n  📊 ${g.status}  |  📺 ${g.broadcast || "N/A"}  |  🏟️ ${g.venue || "N/A"}\n\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "nfl", aliases: ["americanfootball", "nflscores"], react: "🏈", category: "sports", description: "NFL latest scores" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek } = ctx;
    try {
      const { data } = await axios.get(`${DC}/sports/nfl/scores`);
      if (!data.success || !data.games?.length) return reply("❌ No NFL scores available right now.");
      let msg = `🏈 *NFL SCORES*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      data.games.forEach(g => {
        const h = g.homeTeam, a = g.awayTeam;
        msg += `*${a.shortName}* ${a.score} — ${h.score} *${h.shortName}*`;
        msg += (h.winner ? ` 🏆 ${h.shortName}` : a.winner ? ` 🏆 ${a.shortName}` : "");
        msg += `\n  📊 ${g.status}  |  📺 ${g.broadcast || "N/A"}  |  🏟️ ${g.venue || "N/A"}\n\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

// ==================== STALK ====================

gmd({ pattern: "stalkwa", aliases: ["wachannel", "channelinfo"], react: "🔍", category: "stalk", description: "Get info about a WhatsApp channel — Usage: .stalkwa <channel url>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Please provide a WhatsApp channel URL.\n*Example:* .stalkwa https://whatsapp.com/channel/xxxx");
    if (!q.includes("whatsapp.com/channel")) return reply("❌ Invalid WhatsApp channel URL.");
    try {
      const { data } = await axios.get(`${DC}/stalk/wa`, { params: { url: q.trim() } });
      if (!data.success) return reply("❌ Could not fetch channel info.");
      let msg = `🔍 *WHATSAPP CHANNEL INFO*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n📛 *Name:* ${data.title || "N/A"}\n👥 *Followers:* ${data.followers || "0"}\n`;
      if (data.description) msg += `📝 *About:* ${data.description}\n`;
      msg += `\n_Powered by DavidCyrilTech_`;
      if (data.image) await sendImg(Gifted, from, mek, data.image, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "githubstalk", aliases: ["ghstalk", "gitinfo"], react: "🐙", category: "stalk", description: "Get GitHub user profile info — Usage: .githubstalk <username>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Please provide a GitHub username.\n*Example:* .githubstalk torvalds");
    try {
      const { data } = await axios.get(`${DC}/githubStalk`, { params: { username: q.trim() } });
      if (data.error) return reply(`❌ ${data.error}`);
      let msg = `🐙 *GITHUB PROFILE: ${data.login || q}*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      if (data.name) msg += `👤 *Name:* ${data.name}\n`;
      if (data.bio) msg += `📝 *Bio:* ${data.bio}\n`;
      if (data.company) msg += `🏢 *Company:* ${data.company}\n`;
      if (data.location) msg += `📍 *Location:* ${data.location}\n`;
      msg += `👥 *Followers:* ${data.followers || 0}  •  *Following:* ${data.following || 0}\n`;
      msg += `📦 *Public Repos:* ${data.public_repos || 0}\n`;
      if (data.blog) msg += `🌐 *Blog:* ${data.blog}\n`;
      msg += `🔗 ${data.html_url || `https://github.com/${q}`}\n`;
      msg += `\n_Powered by DavidCyrilTech_`;
      if (data.avatar_url) await sendImg(Gifted, from, mek, data.avatar_url, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "robloxstalk", aliases: ["roblox", "rbx"], react: "🎮", category: "stalk", description: "Get Roblox user profile info — Usage: .robloxstalk <username>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Please provide a Roblox username.\n*Example:* .robloxstalk Roblox");
    try {
      const { data } = await axios.get(`${DC}/stalk/roblox`, { params: { username: q.trim() } });
      if (!data.success) return reply(`❌ User *${q}* not found on Roblox.`);
      let msg = `🎮 *ROBLOX PROFILE: ${data.username || q}*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      msg += `🆔 *ID:* ${data.id || "N/A"}\n`;
      if (data.bio) msg += `📝 *Bio:* ${data.bio.slice(0, 200)}\n`;
      msg += `👥 *Followers:* ${(data.followers || 0).toLocaleString()}\n`;
      msg += `👫 *Friends:* ${(data.friends || 0).toLocaleString()}\n`;
      msg += `✅ *Verified:* ${data.verified ? "Yes" : "No"}  |  🚫 *Banned:* ${data.isBanned ? "Yes" : "No"}\n`;
      if (data.created) msg += `📅 *Joined:* ${new Date(data.created).toDateString()}\n`;
      if (data.url) msg += `🔗 ${data.url}\n`;
      msg += `\n_Powered by DavidCyrilTech_`;
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "npmstalk", aliases: ["npm", "npminfo", "pkginfo"], react: "📦", category: "stalk", description: "Get NPM package info — Usage: .npmstalk <package>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Please provide a package name.\n*Example:* .npmstalk express");
    try {
      const { data } = await axios.get(`${DC}/stalk/npm`, { params: { query: q.trim() } });
      if (!data.status) return reply(`❌ Package *${q}* not found on NPM.`);
      let msg = `📦 *NPM PACKAGE: ${data.name || q}*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      msg += `📝 *Description:* ${data.description || "N/A"}\n`;
      msg += `🔖 *Latest Version:* ${data.latestVersion || "N/A"}\n`;
      if (data.keywords?.length) msg += `🏷️ *Keywords:* ${data.keywords.slice(0, 6).join(", ")}\n`;
      if (data.homepage) msg += `🌐 *Homepage:* ${data.homepage}\n`;
      if (data.repository) msg += `🐙 *Repo:* ${data.repository.replace("git+", "")}\n`;
      if (data.lastModified) msg += `📅 *Last Updated:* ${new Date(data.lastModified).toDateString()}\n`;
      msg += `\n_Powered by DavidCyrilTech_`;
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

// ==================== SEARCH / TOOLS ====================

gmd({ pattern: "lyrics", aliases: ["songlyrics", "lrc"], react: "🎵", category: "search", description: "Get song lyrics — Usage: .lyrics <title> | <artist>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Usage: .lyrics <title> | <artist>\n*Example:* .lyrics Hello | Adele");
    const parts = q.split("|");
    if (parts.length < 2) return reply("❌ Please separate title and artist with `|`\n*Example:* .lyrics Hello | Adele");
    const [t, a] = [parts[0].trim(), parts[1].trim()];
    try {
      const { data } = await axios.get(`${DC}/lyrics`, { params: { t, a } });
      if (data.error) return reply(`❌ ${data.error}`);
      const lyrics = data.lyrics || "No lyrics found.";
      const chunks = lyrics.match(/[\s\S]{1,3000}/g) || [lyrics];
      let header = `🎵 *${data.title || t}* — _${data.artist || a}_\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      for (let i = 0; i < Math.min(chunks.length, 3); i++) {
        await sendTxt(Gifted, from, mek, i === 0 ? header + chunks[i] : chunks[i], ctx);
      }
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "imdb", aliases: ["movieinfo", "film"], react: "🎬", category: "search", description: "Search movie info on IMDB — Usage: .imdb <title>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Please provide a movie title.\n*Example:* .imdb avengers");
    try {
      const { data } = await axios.get(`${DC}/imdb`, { params: { q } });
      if (!data.success) return reply(`❌ Could not find *${q}* on IMDB.`);
      const m = data.result || data;
      let msg = `🎬 *IMDB: ${m.title || q}*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      if (m.year) msg += `📅 *Year:* ${m.year}\n`;
      if (m.rating) msg += `⭐ *Rating:* ${m.rating}/10\n`;
      if (m.genre) msg += `🏷️ *Genre:* ${m.genre}\n`;
      if (m.director) msg += `🎥 *Director:* ${m.director}\n`;
      if (m.cast) msg += `🎭 *Cast:* ${m.cast}\n`;
      if (m.plot) msg += `📖 *Plot:* ${m.plot.slice(0, 300)}${m.plot.length > 300 ? "..." : ""}\n`;
      if (m.runtime) msg += `⏱️ *Runtime:* ${m.runtime}\n`;
      if (m.url) msg += `🔗 ${m.url}\n`;
      msg += `\n_Powered by DavidCyrilTech_`;
      if (m.poster) await sendImg(Gifted, from, mek, m.poster, msg, ctx);
      else await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "fzmovies", aliases: ["fz", "fzmovie", "moviedownload"], react: "🎥", category: "movies", description: "Search FZ Movies — Usage: .fzmovies <title>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q) return reply("❌ Please provide a movie title.\n*Example:* .fzmovies avengers");
    try {
      const { data } = await axios.get(`${DC}/movies/fzmovies/search`, { params: { q } });
      if (!data.success || !data.results?.length) return reply(`❌ No results found for *${q}* on FZ Movies.`);
      const results = data.results.slice(0, 6);
      let msg = `🎥 *FZMOVIES: ${q.toUpperCase()}*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n`;
      results.forEach((m, i) => {
        msg += `*${i + 1}. ${m.title}*\n`;
        if (m.description) msg += `   _${m.description.replace(/&#[^;]+;/g, "").trim().slice(0, 100)}..._\n`;
        if (m.categories?.length) msg += `   🏷️ ${m.categories.slice(0, 3).join(", ")}\n`;
        if (m.url) msg += `   🔗 ${m.url}\n`;
        msg += `\n`;
      });
      msg += `╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n_Powered by DavidCyrilTech_`;
      await sendTxt(Gifted, from, mek, msg, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "shortlink", aliases: ["shorten", "tinyurl", "urlshorten"], react: "🔗", category: "tools", description: "Shorten a URL using TinyURL — Usage: .shortlink <url>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q } = ctx;
    if (!q || !q.startsWith("http")) return reply("❌ Please provide a valid URL.\n*Example:* .shortlink https://example.com/very-long-link");
    try {
      const { data } = await axios.get(`${DC}/tinyurl`, { params: { url: q.trim() } });
      if (!data.shortened_url) return reply("❌ Could not shorten that URL.");
      await sendTxt(Gifted, from, mek, `🔗 *URL SHORTENER*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n📌 *Original:* ${data.original_url}\n✅ *Shortened:* ${data.shortened_url}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

// ==================== AI MODELS ====================

gmd({ pattern: "aiask", aliases: ["deepseek", "guruai", "ask"], react: "🧠", category: "ai", description: "Ask the DeepSeek V3 AI a question — Usage: .aiask <question>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q, sender } = ctx;
    if (!q) return reply("❌ Please provide a question.\n*Example:* .aiask What is quantum physics?");
    try {
      await react("⏳");
      const { data } = await axios.post(`${DC}/ai/deepseek-v3`, {
        text: q,
        systemPrompt: "You are Ultra Guru MD, a helpful WhatsApp bot assistant by GuruTech. Be concise and friendly.",
        sessionId: sender.split("@")[0],
      });
      if (!data.success || !data.response) return reply("❌ AI did not respond. Try again.");
      await sendTxt(Gifted, from, mek, `🧠 *DEEPSEEK V3*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${data.response}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "gpt4", aliases: ["chatgpt", "gpt"], react: "🤖", category: "ai", description: "Ask GPT-4 a question — Usage: .gpt4 <question>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q, sender } = ctx;
    if (!q) return reply("❌ Please provide a question.\n*Example:* .gpt4 Explain black holes");
    try {
      await react("⏳");
      const { data } = await axios.get(`${DC}/ai/gpt4`, { params: { text: q, sessionId: sender.split("@")[0] } });
      const res = data.response || data.result || data.message;
      if (!res) return reply("❌ GPT-4 did not respond. Try again.");
      await sendTxt(Gifted, from, mek, `🤖 *GPT-4*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${res}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "gemini", aliases: ["googleai", "bard"], react: "♊", category: "ai", description: "Ask Google Gemini AI a question — Usage: .gemini <question>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q, sender } = ctx;
    if (!q) return reply("❌ Please provide a question.\n*Example:* .gemini Tell me a joke");
    try {
      await react("⏳");
      const { data } = await axios.get(`${DC}/ai/gemini`, { params: { text: q, sessionId: sender.split("@")[0] } });
      const res = data.response || data.result || data.message;
      if (!res) return reply("❌ Gemini did not respond. Try again.");
      await sendTxt(Gifted, from, mek, `♊ *GEMINI AI*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${res}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "llama", aliases: ["llama3", "meta-ai"], react: "🦙", category: "ai", description: "Ask LLaMA 3 AI a question — Usage: .llama <question>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q, sender } = ctx;
    if (!q) return reply("❌ Please provide a question.\n*Example:* .llama What is machine learning?");
    try {
      await react("⏳");
      const { data } = await axios.get(`${DC}/ai/llama3`, { params: { text: q, sessionId: sender.split("@")[0] } });
      const res = data.response || data.result || data.message;
      if (!res) return reply("❌ LLaMA 3 did not respond. Try again.");
      await sendTxt(Gifted, from, mek, `🦙 *LLAMA 3*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${res}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);

gmd({ pattern: "gpt4mini", aliases: ["gptmini", "quickai"], react: "⚡", category: "ai", description: "Fast GPT-4o Mini response — Usage: .gpt4mini <question>" },
  async (from, Gifted, ctx) => {
    const { reply, react, mek, q, sender } = ctx;
    if (!q) return reply("❌ Please provide a question.\n*Example:* .gpt4mini Summarize World War 2");
    try {
      await react("⏳");
      const { data } = await axios.get(`${DC}/ai/gpt4omini`, { params: { text: q, sessionId: sender.split("@")[0] } });
      const res = data.response || data.result || data.message;
      if (!res) return reply("❌ No response. Try again.");
      await sendTxt(Gifted, from, mek, `⚡ *GPT-4O MINI*\n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n${res}\n\n_Powered by DavidCyrilTech_`, ctx);
      await react("✅");
    } catch (e) { reply(`❌ Error: ${e.message}`); }
  }
);
