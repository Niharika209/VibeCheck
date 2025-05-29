export const vibeProfiles = [ {
    title: "The Cozy Dreamer",
    emoji: "🛋️💭",
    description: "You're a relaxed soul who enjoys comfort, deep thoughts, and moments of peace. You recharge by cocooning into your space and drifting into imagination or soft music."
  },
  {
    title: "The Hype Machine",
    emoji: "🎉🔥",
    description: "You're all about energy and fun! Parties, bold fashion, and big weekend plans are your thing. Your vibe is infectious, and you light up every room you enter."
  },
  {
    title: "The Nature Child",
    emoji: "🌿🌞",
    description: "You feel most alive in nature — be it hiking mountains, soaking in the sun, or breathing in forest air. Your grounded energy is refreshing and rooted in the present moment."
  },
  {
    title: "The Mysterious Owl",
    emoji: "🌙🦉",
    description: "You're introspective, calm, and a deep thinker. Your vibe is a mix of wisdom and wonder, often misunderstood but always valuable."
  },
  {
    title: "The Indie Explorer",
    emoji: "🎧🧭",
    description: "You like doing things your own way. Whether it’s offbeat music or solo café dates, you’re the adventurous spirit that thrives on discovery and creativity."
  },
  {
    title: "The Chaotic Good",
    emoji: "🤪⚡",
    description: "You're a beautiful mess of energy, ideas, and emotions. You thrive in organized chaos and bring life to mundane moments."
  },
  {
    title: "The Soft Aesthetic",
    emoji: "🍃📖",
    description: "You romanticize life. With cozy vibes, a love for art and books, and calm surroundings, you float through days with gentle charm."
  },
  {
    title: "The Bollywood Protagonist",
    emoji: "🎬❤️",
    description: "High on drama and emotions, you feel everything intensely — from soulful music to romantic monologues. Life *is* a movie and you’re the star."
  },
  {
    title: "The Lowkey Hustler",
    emoji: "💻☕",
    description: "You're calm on the outside, but there’s a storm of productivity brewing inside. While others relax, you build your future — quietly, stylishly."
  },
  {
    title: "The Spiritual Rebel",
    emoji: "🔥🧘",
    description: "You seek meaning in chaos. Journaling, meditating, and having deep conversations over coffee is your jam. You're as mindful as you are wild."
  }
 ];

export function analyzeVibe(answers) {
  const points = {
    cozy: 0,
    hype: 0,
    nature: 0,
    owl: 0,
    indie: 0,
    chaotic: 0,
    aesthetic: 0,
    bollywood: 0,
    hustle: 0,
    spiritual: 0
  };

  // Mood
  if (["🥱", "😐", "🥺"].includes(answers[1])) points.cozy++;
  if (["😎", "🤪"].includes(answers[1])) points.hype++, points.chaotic++;
  if (["😩", "😠"].includes(answers[1])) points.chaotic++, points.owl++;

  // Weekend Activity
  if (answers[2].includes("Hiking")) points.nature++;
  if (answers[2].includes("Reading")) points.cozy++, points.owl++;
  if (answers[2].includes("Dancing")) points.hype++, points.bollywood++;
  if (answers[2].includes("Cafes")) points.indie++, points.aesthetic++;
  if (answers[2].includes("Concert")) points.hype++;

  // Music Genre
  switch (answers[3]) {
    case "pop":
      points.hype++;
      break;
    case "punjabi":
      points.hype++;
      points.bollywood++;
      break;
    case "haryanvi":
      points.chaotic++;
      break;
    case "lofi":
      points.cozy++;
      points.aesthetic++;
      break;
    case "desi_hiphop":
      points.hustle++;
      points.chaotic++;
      break;
    case "classical":
      points.owl++;
      points.spiritual++;
      break;
    case "indie":
      points.indie++;
      break;
  }

  // Comfort Food
  if (answers[4].includes("Chocolate") || answers[4].includes("Maggi")) points.cozy++;
  if (answers[4].includes("Pizza") || answers[4].includes("Fries")) points.hype++;

  // Vacation
  if (answers[5].includes("Beach") || answers[5].includes("Rainforest")) points.nature++;
  if (answers[5].includes("City")) points.hustle++;
  if (answers[5].includes("Historical")) points.aesthetic++;

  // Recharge
  if (answers[6].includes("Journaling")) points.spiritual++;
  if (answers[6].includes("Sleeping")) points.cozy++;
  if (answers[6].includes("Cooking")) points.aesthetic++;
  if (answers[6].includes("Talking to someone")) points.owl++;

  // Fashion
  if (answers[7].includes("Streetwear")) points.hype++;
  if (answers[7].includes("Minimalist")) points.aesthetic++;
  if (answers[7].includes("Boho")) points.indie++;
  if (answers[7].includes("Formal")) points.hustle++;
  if (answers[7].includes("Sporty")) points.chaotic++;

  // Friday night
  if (answers[8].includes("Clubbing")) points.hype++;
  if (answers[8].includes("Gaming")) points.chaotic++;
  if (answers[8].includes("Reading")) points.cozy++;
  if (answers[8].includes("Goals")) points.hustle++;
  if (answers[8].includes("Conversations")) points.spiritual++;

  // Animal
  if (answers[9].includes("Owl")) points.owl++;
  if (answers[9].includes("Panda")) points.cozy++;
  if (answers[9].includes("Fox")) points.chaotic++;

  // Drink
  if (answers[10].includes("Coffee")) points.hustle++;
  if (answers[10].includes("Bubble Tea")) points.indie++;
  if (answers[10].includes("Hot Chocolate")) points.cozy++;

  // Movie
  if (answers[11].includes("Romantic")) points.bollywood++;
  if (answers[11].includes("Horror")) points.chaotic++;
  if (answers[11].includes("Fantasy")) points.aesthetic++;

  // Friend type
  if (answers[12].includes("Therapist") || answers[12].includes("Listener")) points.owl++, points.spiritual++;
  if (answers[12].includes("Clown") || answers[12].includes("Chaotic")) points.chaotic++;

  // Body feeling
  if (answers[13].includes("Tired")) points.cozy++;
  if (answers[13].includes("Energized")) points.hype++;
  if (answers[13].includes("Anxious")) points.owl++;

  // Surrounding
  if (answers[14].includes("Cozy") || answers[14].includes("Peaceful")) points.cozy++;
  if (answers[14].includes("Chaotic")) points.chaotic++;
  if (answers[14].includes("Serene")) points.spiritual++;

  // Find the profile with the highest points
  const topVibeKey = Object.keys(points).reduce((a, b) =>
    points[a] > points[b] ? a : b
  );

  // Match key to profile
  const keyToProfile = {
    cozy: 0,
    hype: 1,
    nature: 2,
    owl: 3,
    indie: 4,
    chaotic: 5,
    aesthetic: 6,
    bollywood: 7,
    hustle: 8,
    spiritual: 9
  };

  return vibeProfiles[keyToProfile[topVibeKey]];
}
