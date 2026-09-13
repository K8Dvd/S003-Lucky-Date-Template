// ── EDIT YOUR DATE HERE ──────────────────────────────────────────────
// month: 1-12, day: 1-31, year: e.g. 2025
// This is the ONLY place you need to type numbers. Everything else
// (the "ROLL OUR DATE" machine, the ticket, the letter, etc.) reads
// from these three numbers automatically, so it can never go out of sync.
const ANNIVERSARY_MONTH = 8; // 8 = August
const ANNIVERSARY_DAY = 14;
const ANNIVERSARY_YEAR = 2025;
// ──────────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const couple = {
  name1: "Kate",
  name2: "Your Love",
  anniversaryMonth: ANNIVERSARY_MONTH,
  anniversaryDay: ANNIVERSARY_DAY,
  anniversaryYear: ANNIVERSARY_YEAR,
  anniversary: `${MONTH_NAMES[ANNIVERSARY_MONTH - 1]} ${ANNIVERSARY_DAY}, ${ANNIVERSARY_YEAR}`,
};

// Background song. This plays straight from YouTube (audio only) when the
// visitor taps the music button — nothing is downloaded, and the player
// stays invisible, so there's no YouTube preview or click-through.
// youtubeId is just the ID from your link:
// https://youtu.be/DEhLOH7sitA -> DEhLOH7sitA
export const song = {
  title: "Our Song",
  youtubeId: "DEhLOH7sitA",
};

// Your couple video file. It already lives at /public/videos/couple-video.mp4
export const coupleVideo = {
  src: "/videos/couple-video.mp4",
  caption: "A little video of us, just because.",
};

export const hero = {
  eyebrow: "ONE VERY LUCKY DAY",
  title: "What are the odds",
  subtitle: "that I would find you?",
  description:
    "Out of all the dates, all the places, and all the people in the world... somehow, I got lucky enough to find you.",
};

export const reasons = [
  {
    number: "01",
    title: "Your smile",
    text: "I like the way your smile can make even an ordinary day feel a little brighter.",
  },
  {
    number: "02",
    title: "Your laugh",
    text: "I like hearing you laugh. Especially when I know I was the reason for it.",
  },
  {
    number: "03",
    title: "Your kindness",
    text: "I like how naturally kind you are, even when nobody is asking you to be.",
  },
  {
    number: "04",
    title: "Your weird side",
    text: "I like the silly little side of you that somehow became one of my favorite things.",
  },
  {
    number: "05",
    title: "Your comfort",
    text: "I like that being around you feels easy. Like I can finally just be myself.",
  },
  {
    number: "06",
    title: "Your patience",
    text: "I like how you stay, listen, and understand even when things aren't always easy.",
  },
  {
    number: "07",
    title: "Your little habits",
    text: "I like the tiny things you do without realizing that I notice every single one.",
  },
  {
    number: "08",
    title: "Your heart",
    text: "I like the way you care. It is one of the things that makes you, you.",
  },
  {
    number: "09",
    title: "Our memories",
    text: "I like that somehow, the most random moments become memories I never want to forget.",
  },
  {
    number: "10",
    title: "Us",
    text: "Most of all, I like us. Whatever happens, I am always grateful that our paths crossed.",
  },
];

export const photos = [
  {
    src: "/photos/photo-1.jpg",
    caption: "The beginning of another favorite memory.",
  },
  {
    src: "/photos/photo-2.jpg",
    caption: "One of those moments I wish I could keep forever.",
  },
  {
    src: "/photos/photo-3.jpg",
    caption: "Proof that ordinary days can be beautiful too.",
  },
  {
    src: "/photos/photo-4.jpg",
    caption: "A little memory worth keeping.",
  },
  {
    src: "/photos/photo-5.jpg",
    caption: "Still one of my favorite pictures of us.",
  },
  {
    src: "/photos/photo-6.jpg",
    caption: "Another page in our little story.",
  },
  {
    src: "/photos/photo-7.jpg",
    caption: "This one still makes me smile.",
  },
  {
    src: "/photos/photo-8.jpg",
    caption: "A moment I am very lucky to have.",
  },
  {
    src: "/photos/photo-9.jpg",
    caption: "Another memory I would choose again.",
  },
  {
    src: "/photos/photo-10.jpg",
    caption: "And somehow, there are still more memories to make.",
  },
];

export const scratchCards = [
  {
    label: "LUCKY CARD 01",
    image: "/scratch/scratch-1.jpg",
    caption: "You found one of my favorite memories.",
  },
  {
    label: "LUCKY CARD 02",
    image: "/scratch/scratch-2.jpg",
    caption: "A little surprise, just for you.",
  },
  {
    label: "LUCKY CARD 03",
    image: "/scratch/scratch-3.jpg",
    caption: "Another reason why I am glad I met you.",
  },
];

export const letter = {
  label: "THE PRIZE NOBODY ELSE COULD WIN",
  title: "A letter for my favorite person",
  intro: "If I could win one thing over and over again, it would be you.",
  body: `I don't know how many little decisions had to happen for our paths to cross.

Maybe it was timing.
Maybe it was coincidence.
Maybe it was just really, really good luck.

Whatever it was, I am grateful for it.

You became someone who made ordinary days feel different. Someone whose messages I look forward to, whose laugh I remember, and whose presence can make things feel a little lighter.

There are so many things I love about you, including all the tiny things you probably don't even notice about yourself.

And if life gave me the chance to go back and choose again, I would still choose the same date.

I would still choose the same person.

I would still choose us.

Thank you for being one of the best things that ever happened to me.

Happy anniversary, my love.

Here's to all the memories we already have, and all the ones we haven't made yet.`,
};

export const ending = {
  eyebrow: "JACKPOT",
  title: "Out of all the numbers in the world...",
  subtitle: "I'd still choose you.",
};