(function () {
  var CHARACTERS = [
    {
      id: "leo",
      name: "Leo",
      role: "Lead presence — Chairman of the Block",
      lines: [
        "Yeah, I run this block. Not 'cause I'm loud — 'cause I'm right.",
        "Everybody wants smoke till the smoke actually shows up.",
        "You lost? Nah. You found the right corner.",
        "Purple diamond don't shine for just anybody. It shined for you today.",
        "Ask around. They'll tell you — I don't repeat myself twice."
      ]
    },
    {
      id: "rico",
      name: "Rico",
      role: "Style specialist — Public Relations",
      lines: [
        "Presentation is power, my friend. Look at me — case closed.",
        "I could talk my way out of a parking ticket and INTO a discount.",
        "You want smooth? I invented smooth. Everybody else rents it.",
        "The crew looks effortless because I make sure of it. That's the job.",
        "Come back when you're ready to look this good. I'll wait."
      ]
    },
    {
      id: "mustachio",
      name: "Mustachio",
      role: "Silent muscle — Head of Security",
      lines: [
        "...",
        "You good. Just checking.",
        "Loyalty's the only currency that don't devalue.",
        "I don't need to raise my voice. Never have.",
        "Stand there long enough, you'll understand why nobody tests me twice."
      ]
    },
    {
      id: "bonny",
      name: "Bonny",
      role: "Bold protector — Enforcement of Standards",
      lines: [
        "I read the room before you walked in. I already know how this goes.",
        "Two steps ahead. Always. That's not luck, that's discipline.",
        "Pressure's just information. I use it, I don't fold to it.",
        "Somebody's gotta keep this crew honest. Might as well be me.",
        "Come back when you're actually ready to move — I'll be here."
      ]
    },
    {
      id: "quita",
      name: "Quita",
      role: "Quiet soldier",
      lines: [
        "People underestimate quiet. That's their mistake, not mine.",
        "I keep the timing. I keep the secrets. Both matter more than talk.",
        "You'll never see me coming. That's kind of the point.",
        "Patience wins ugly situations. I've got plenty of both.",
        "Watch long enough and you'll learn more than any question gets you."
      ]
    },
    {
      id: "arf",
      name: "A.R.F.",
      role: "Guardian presence — Transportation & Heavy Matters",
      lines: [
        "Heavy chain. Heavier loyalty. Don't test the math.",
        "I show up first, I leave last. Every time. No exceptions.",
        "Kindness ain't weakness on this block — but don't confuse the two.",
        "You need something moved, someone protected, or both — I'm your guy.",
        "This crew's anchor doesn't drift. Neither do I."
      ]
    },
    {
      id: "sirjamz",
      name: "Sir Jamz",
      role: "Vehicle care & good vibes",
      lines: [
        "Purple paint, clean interior, zero excuses. That's the standard.",
        "Take care of your ride, your ride takes care of you. Simple math.",
        "Night drives hit different when the car's right. Trust me on this one.",
        "I don't do rust, I don't do rattles, I don't do sloppy.",
        "Roll with me, we're taking the long way home tonight."
      ]
    }
  ];

  var layer = document.getElementById("hotspotLayer");
  var overlay = document.getElementById("charOverlay");
  var nameEl = document.getElementById("charName");
  var roleEl = document.getElementById("charRole");
  var lineEl = document.getElementById("charLine");
  var talkBtn = document.getElementById("talkBtn");
  var theaterBtn = document.getElementById("theaterBtn");
  var theaterOverlay = document.getElementById("theaterOverlay");
  var active = null;
  var lineIndex = 0;

  function initials(name) {
    return name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 3).toUpperCase();
  }

  CHARACTERS.forEach(function (c) {
    var btn = document.createElement("button");
    btn.className = "hotspot";
    btn.type = "button";
    btn.setAttribute("aria-label", "Talk to " + c.name);
    btn.innerHTML =
      '<span class="avatar-disc">' + initials(c.name) + '</span>' +
      '<span class="hotspot-label">' + c.name + '</span>';
    btn.addEventListener("click", function () { openChar(c); });
    layer.appendChild(btn);
  });

  function openChar(c) {
    active = c;
    lineIndex = 0;
    nameEl.textContent = c.name;
    roleEl.textContent = c.role;
    lineEl.textContent = c.lines[0];
    overlay.classList.add("open");
  }

  talkBtn.addEventListener("click", function () {
    if (!active) return;
    lineIndex = (lineIndex + 1) % active.lines.length;
    lineEl.textContent = active.lines[lineIndex];
  });

  theaterBtn.addEventListener("click", function () {
    theaterOverlay.classList.add("open");
  });

  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      overlay.classList.remove("open");
      theaterOverlay.classList.remove("open");
    });
  });

  [overlay, theaterOverlay].forEach(function (ov) {
    ov.addEventListener("click", function (e) {
      if (e.target === ov) ov.classList.remove("open");
    });
  });
})();
