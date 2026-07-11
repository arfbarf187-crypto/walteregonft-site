(function () {
  // Leo Chat — in-character scripted assistant. Runs entirely client-side,
  // no backend/API required, so it works on a static GitHub Pages site.
  var RULES = [
    {
      match: /(hi|hello|hey|yo|sup|what.?s up)/i,
      replies: [
        "Yeah, I hear you. What's on your mind?",
        "You found the right corner. Talk to me.",
        "Sup. You picked a good night to stop by."
      ]
    },
    {
      match: /(confiden|identity|real|fake|mask|pretend|hide)/i,
      replies: [
        "Confidence ain't loud. It's just knowing who you are.",
        "You save a lot of energy the day you stop pretending.",
        "People switch up depending who's watching — that's their business. I don't play that game."
      ]
    },
    {
      match: /(merch|shirt|chain|jacket|poster|buy|shop|product|store)/i,
      replies: [
        "Rico picked the fits, I just wear 'em well. Check the Merch page — the Leo x Crew Shirt is the one people ask about most.",
        "You want gear? Signature H/C Chain and the Walter Ego Varsity Jacket are both on the Merch page. Go look."
      ],
      cta: { label: "See Merch", href: "merch.html" }
    },
    {
      match: /(podcast|podcatz|episode|jay paws|organ paws)/i,
      replies: [
        "Podcatz is where the real conversations happen. Jay Paws and Organ Paws never agree on anything — that's half the show.",
        "Episode 2, 'No Masks Allowed' — that one hit different. Go watch it."
      ],
      cta: { label: "Podcast Episodes", href: "podcast.html#episodes" }
    },
    {
      match: /(clubhouse|block|crew|hood)/i,
      replies: [
        "The block is the block. Everybody's got a role, everybody earns their spot.",
        "Clubhouse is where we're always at. Purple lights, real people, no acting."
      ],
      cta: { label: "Meet the Crew", href: "block.html" }
    },
    {
      match: /(bye|later|out|gotta go|leaving)/i,
      replies: [
        "Bet. Come back when you're ready to move.",
        "Alright. Ask around — I don't repeat myself twice."
      ]
    }
  ];

  var FALLBACKS = [
    "Ask around. They'll tell you — I don't repeat myself twice.",
    "That's a conversation for the clubhouse. Come find me there.",
    "I hear you. Say more, or ask about the crew, the podcast, or the merch."
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function respond(text) {
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i].match.test(text)) {
        return { text: pick(RULES[i].replies), cta: RULES[i].cta };
      }
    }
    return { text: pick(FALLBACKS) };
  }

  function init() {
    var launcher = document.getElementById("leoChatLauncher");
    var panel = document.getElementById("leoChatPanel");
    var closeBtn = document.getElementById("leoChatClose");
    var form = document.getElementById("leoChatForm");
    var input = document.getElementById("leoChatInput");
    var log = document.getElementById("leoChatLog");
    if (!launcher || !panel || !form || !input || !log) return;

    function addMsg(who, text, cta) {
      var row = document.createElement("div");
      row.className = "leo-chat-msg " + (who === "leo" ? "from-leo" : "from-user");
      var bubble = document.createElement("div");
      bubble.className = "leo-chat-bubble";
      bubble.textContent = text;
      row.appendChild(bubble);
      log.appendChild(row);
      if (cta) {
        var link = document.createElement("a");
        link.className = "leo-chat-cta";
        link.href = cta.href;
        link.textContent = cta.label + " →";
        log.appendChild(link);
      }
      log.scrollTop = log.scrollHeight;
    }

    launcher.addEventListener("click", function () {
      panel.classList.toggle("open");
      if (panel.classList.contains("open") && log.children.length === 0) {
        addMsg("leo", "Yeah? You caught me on the block. What's up.");
      }
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        panel.classList.remove("open");
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      addMsg("user", text);
      input.value = "";
      setTimeout(function () {
        var r = respond(text);
        addMsg("leo", r.text, r.cta);
      }, 350);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
