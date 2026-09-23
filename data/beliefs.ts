export interface BeliefPillar {
  id: string;
  icon: string;
  title: string;
  summary: string;
  keyScripture: string;
}

export const beliefs: BeliefPillar[] = [
  {
    id: "scripture",
    icon: "📖",
    title: "The Holy Scriptures",
    summary: "The Old and New Testaments are the written Word of God, given by divine inspiration. They are the authoritative revealer of His will and standard of character.",
    keyScripture: "2 Timothy 3:16-17",
  },
  {
    id: "trinity",
    icon: "🕊️",
    title: "The Trinity & Salvation",
    summary: "There is one God: Father, Son, and Holy Spirit. In Christ's life of perfect obedience, His substitutionary death, and resurrection, God provided the only means of salvation.",
    keyScripture: "John 3:16",
  },
  {
    id: "sabbath",
    icon: "🌅",
    title: "The Seventh-day Sabbath",
    summary: "The gracious Creator, after the six days of Creation, rested on the seventh day and instituted the Sabbath for all people as a perpetual memorial of His creative work.",
    keyScripture: "Exodus 20:8-11",
  },
  {
    id: "second-coming",
    icon: "🎺",
    title: "The Second Coming of Christ",
    summary: "The second coming of Christ is the blessed hope of the church, the grand climax of the gospel. The Savior's coming will be literal, personal, visible, and worldwide.",
    keyScripture: "Titus 2:13",
  },
  {
    id: "health",
    icon: "🌿",
    title: "Christian Wholistic Living",
    summary: "Our bodies are temples of the Holy Spirit. We are called to adopt an intelligent, healthful lifestyle and cultivate mental, emotional, and physical purity for God's glory.",
    keyScripture: "1 Corinthians 6:19-20",
  },
  {
    id: "remnant",
    icon: "📜",
    title: "The Three Angels' Messages",
    summary: "The universal church is composed of all who truly believe, called in the last days to preach the everlasting gospel and call mankind to worship the Creator.",
    keyScripture: "Revelation 14:6-12",
  },
];