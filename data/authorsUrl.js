const authorURL = [
  "https://www.glowday.com/blog/authors/victoria-palmer",
  "https://www.glowday.com/blog/authors/dr-wafaa-el-mouhebb",
  "https://www.glowday.com/blog/authors/disha-daswaney",
  "https://www.glowday.com/blog/authors/claire-battista",
  "https://www.glowday.com/blog/authors/lauren-turner",
  "https://www.glowday.com/blog/authors/nanu-miah",
  "https://www.glowday.com/blog/authors/dr-rachel-aarons",
  "https://www.glowday.com/blog/authors/amerley-ollennu",
  "https://www.glowday.com/blog/authors/dr-natasah-verma",
  "https://www.glowday.com/blog/authors/ness-griffiths",
  "https://www.glowday.com/blog/authors/alison-stankard-totes-inappropes",
  "https://www.glowday.com/blog/authors/dr-dorota-chudek",
  "https://www.glowday.com/blog/authors/dr-jessica-halliley",
  "https://www.glowday.com/blog/authors/dr-anatalia-moore",
  "https://www.glowday.com/blog/authors/dr-veerle-rotsaert",
  "https://www.glowday.com/blog/authors/cheryl-cain",
  "https://www.glowday.com/blog/authors/dr-sonia",
  "https://www.glowday.com/blog/authors/tracey-dennison",
  "https://www.glowday.com/blog/authors/the-aesthetic-medics",
  "https://www.glowday.com/blog/authors/emma-collier",
  "https://www.glowday.com/blog/authors/mary-munro-guest-author",
  "https://www.glowday.com/blog/authors/piroska-cavell",
  "https://www.glowday.com/blog/authors/dr-daniel-hunt",
  "https://www.glowday.com/blog/authors/kelly-davies",
  "https://www.glowday.com/blog/authors/mary-munro",
  "https://www.glowday.com/blog/authors/lisa-barrett",
  "https://www.glowday.com/blog/authors/acquisition-aesthetics",
  "https://www.glowday.com/blog/authors/dr-ana-mansouri",
  "https://www.glowday.com/blog/authors/natalie-haswell",
  "https://www.glowday.com/blog/authors/bryony-elder",
  "https://www.glowday.com/blog/authors/dr-harmony",
  "https://www.glowday.com/blog/authors/hannah-russell",
  "https://www.glowday.com/blog/authors/dr-malaika-smith",
  "https://www.glowday.com/blog/authors/hannah-swingler",
  "https://www.glowday.com/blog/authors/dr-steven-land",
  "https://www.glowday.com/blog/authors/keysha-davis",
  "https://www.glowday.com/blog/authors/dr-raquel-amado",
  "https://www.glowday.com/blog/authors/lucy-foster",
  "https://www.glowday.com/blog/authors/dr-emmaline-ashley",
  "https://www.glowday.com/blog/authors/beth-hall",
  "https://www.glowday.com/blog/authors/margaret-hill",
]

// Get the author slug from the author URL

const authorSlug = authorURL.map((url) => {
  return url.split("/").pop()
})

export default authorSlug
