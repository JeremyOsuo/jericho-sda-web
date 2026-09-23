export interface CampPhoto {
  id: string;
  image: string;
  title: string;
  caption: string;
  day?: string;
}

export interface DayScheduleItem {
  time: string;
  program: string;
  facilitator?: string;
  coordinator?: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  choirsOnDuty: string[];
  timeKeeper?: string;
  schedule: DayScheduleItem[];
}

export const campMeetingYear = "2026";
export const campMeetingDates = "9th – 15th August 2026";
export const campMeetingTheme = "Grounded In The Bible; Obey, Trust and Live";
export const campMeetingScripture = "Isaiah 1:19, 20";
export const campMeetingScriptureFull =
  "If you are willing and obedient, you shall eat the good of the land; But if you refuse and rebel, you shall be devoured by the sword; For the mouth of the Lord has spoken.";
export const campMeetingThemeSong = "SDAH 590 / NZK 128";
export const campMeetingChiefGuest = "Pr. David Azael Mmbaga (ECD)";
export const campMeetingHostPastor = "Pst. Hudson Machoka";
export const campMeetingAssocPastor = "Pst. Falex Okeyo";
export const campMeetingFirstElder = "Eld. Nathan Khamala";
export const campMeetingCampChair = "Eld. William Obonyo";
export const campMeetingPaybill = "752922";
export const campMeetingAccount = "Camp Meeting Offering";
export const campMeetingPoster = "/camp-poster-2026.jpeg";
export const campMeetingPdf = "/camp-meeting-2026.pdf";

export const campMeetingElders = [
  "Eld. Nathan Khamala (First Elder)",
  "Eld. William Obonyo (Camp Chair)",
  "Eld. Christopher Ombati",
  "Eld. John Ndung'u",
  "Eld. Harrison Murithi",
  "Eld. Charles Omollo",
  "Eld. Vincent Samuel",
];

export const guestSpeakers = [
  {
    name: "Pr. David Azael Mmbaga",
    role: "Chief Guest • ECD Director",
    portfolio:
      "Family Ministries Director, Adventist Possibility Ministries Director, Revival & Reformation Director (ECD)",
    bio: "Preached the main sermon series calling all to behold the cross of Christ, receive new life, and prepare for His soon return.",
  },
  {
    name: "Pst. Hudson Machoka",
    role: "Host Pastor",
    portfolio: "Jericho SDA Church",
    bio: "Led the pastoral team, welcoming members and guests to seek spiritual renewal and divine transformation through obedience to God's Word.",
  },
  {
    name: "Pst. Falex Okeyo",
    role: "Associate Pastor",
    portfolio: "Jericho SDA Church",
    bio: "Encouraged the church to embrace this sacred week as a spiritual Feast of Tabernacles with families and neighbors.",
  },
  {
    name: "Pr. Bilcox Okul",
    role: "Guest Pastor",
    portfolio: "Maranatha SDA District, Lake Victoria Field",
    bio: "Facilitated daily Bible Study and evening Bible Prophecy lectures calling members to decisive spiritual action.",
  },
  {
    name: "EV. Carolyn Ajewa",
    role: "Facilitator & Counselor",
    portfolio: "Master Guide, Women's & Music Ministries",
    bio: "Conducted Morning Devotions, Spirit of Prophecy (SOP) sessions, and daily congregational intercessory prayers.",
  },
  {
    name: "Pr. Cephas Ang'ira",
    role: "Guest Pastor",
    portfolio: "Nyamira West Field",
    bio: "Facilitated daily Christian Leadership seminars and Stewardship lectures on faithfulness in tithes and offerings.",
  },
  {
    name: "Ev. Charles Nyakinda",
    role: "Evangelist",
    portfolio: "Karen Community SDA Church",
    bio: "Facilitated Christian Education seminars and shared inspirational musical items.",
  },
  {
    name: "Lt Ev. Samuel Wainaina",
    role: "Guest Evangelist",
    portfolio: "Health & Literature Evangelism",
    bio: "Led daily Health seminars and Book Promotion sessions.",
  },
];

export const themeSongsLyrics = {
  sdah590: {
    title: "SDAH 590 - Trust and Obey",
    author: "John H. Sammis",
    description:
      "A classic Adventist hymn emphasizing unwavering surrender to God's commandments.",
    stanzas: [
      {
        num: 1,
        lines: [
          "When we walk with the Lord in the light of His word,",
          "What a glory He sheds on our way!",
          "While we do His good will, He abides with us still,",
          "And with all who will trust and obey.",
        ],
      },
    ],
    refrain:
      "Trust and obey, for there's no other way to be happy in Jesus, but to trust and obey.",
  },
  nzk128: {
    title: "NZK 128 - Namwandama Bwana",
    author: "Nyimbo Za Kristo",
    description:
      "Wimbo wa kiroho unaotukumbusha uaminifu na amani ya kutii maagizo ya Mwokozi.",
    stanzas: [
      {
        num: 1,
        lines: [
          "Namwandama Bwana, kwa alilonena, njia zangu huning'azia,",
          "Na nikimridhisha, atanidumisha, taamini nitii pia.",
        ],
      },
    ],
    refrain:
      "Kuamini, njia pekee ni hii, Ya furaha kwa Yesu, amini ukatii.",
  },
};

export const campDailyRecap: DaySchedule[] = [
  {
    day: "Sunday",
    date: "9th August 2026",
    choirsOnDuty: [
      "Nyali SDA Church Choir",
      "Jericho SDA Church Choir",
      "Young Adults Choir",
      "Ambassadors Choir",
      "AMM Choir",
      "AWM Choir",
      "Marvelous In Christ",
      "Children's Choir",
      "JOPS",
    ],
    schedule: [
      {
        time: "2:30 PM - 3:45 PM",
        program: "Sing Inspiration",
        facilitator: "Choristers & Pianist",
        coordinator: "Lillian Nyangie",
      },
      {
        time: "3:45 PM - 4:15 PM",
        program: "Official Opening & Introduction of Guests",
        facilitator: "Pr. Machoka & Eldership",
        coordinator: "Eld. Khamala",
      },
      {
        time: "4:15 PM - 4:30 PM",
        program: "Music Interlude",
        facilitator: "Nyali SDA Choir & Jericho SDA Choir",
        coordinator: "Lillian Nyangie",
      },
      {
        time: "4:30 PM - 5:30 PM",
        program: "Opening Sermonette",
        facilitator: "Pr. David Mmbaga (ECD)",
        coordinator: "Eld. Khamala",
      },
    ],
  },
  {
    day: "Monday",
    date: "10th August 2026",
    timeKeeper: "Christine Alivitsa",
    choirsOnDuty: [
      "Nyali SDA Church Choir",
      "AMM Choir",
      "Jericho SDA Church Choir",
      "Marvelous in Christ",
    ],
    schedule: [
      { time: "5:45 AM - 6:00 AM", program: "Praise & Worship", facilitator: "Choristers", coordinator: "Gideon Oloo" },
      { time: "6:00 AM - 7:00 AM", program: "Morning Devotion", facilitator: "EV. Carolyn Ajewa", coordinator: "Evans Johny" },
      { time: "8:00 AM - 8:45 AM", program: "Leadership Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Edwin Binge" },
      { time: "8:45 AM - 9:30 AM", program: "Bible Study", facilitator: "Pr. Bilcox Okul", coordinator: "Godwin Ocholla" },
      { time: "9:30 AM - 10:00 AM", program: "Book Promotion", facilitator: "Lt Ev. Samuel Wainaina", coordinator: "Sabina Irungu" },
      { time: "10:20 AM - 11:00 AM", program: "Spirit of Prophecy (SOP)", facilitator: "EV. Carolyn Ajewa", coordinator: "Felix Ogango" },
      { time: "11:00 AM - 11:20 AM", program: "Congregational Prayer", facilitator: "EV. Carolyn Ajewa", coordinator: "Hazel Osuo" },
      { time: "11:30 AM - 12:45 PM", program: "Mid-day Sermon", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Omollo" },
      { time: "2:00 PM - 2:45 PM", program: "Health Seminar", facilitator: "Lt Ev. Samuel Wainaina", coordinator: "Sylvia Ongidi" },
      { time: "2:45 PM - 3:45 PM", program: "Stewardship Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Eld. Osuo" },
      { time: "3:45 PM - 5:15 PM", program: "Family Life", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Mokua" },
      { time: "5:45 PM - 7:00 PM", program: "Bible Prophecy", facilitator: "Pr. Bilcox Okul", coordinator: "Eld. Ndung'u" },
    ],
  },
  {
    day: "Tuesday",
    date: "11th August 2026",
    timeKeeper: "Christine Alivitsa",
    choirsOnDuty: [
      "Young Adults Choir",
      "Nyali SDA Church Choir",
      "Jericho SDA Church Choir",
    ],
    schedule: [
      { time: "6:00 AM - 7:00 AM", program: "Morning Devotion", facilitator: "EV. Carolyn Ajewa", coordinator: "Evans Johny" },
      { time: "8:00 AM - 8:45 AM", program: "Leadership Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Felix Randiga" },
      { time: "8:45 AM - 9:30 AM", program: "Bible Study", facilitator: "Pr. Bilcox Okul", coordinator: "Phelgona Midamba" },
      { time: "10:20 AM - 11:00 AM", program: "Spirit of Prophecy (SOP)", facilitator: "EV. Carolyn Ajewa", coordinator: "Felix Ogango" },
      { time: "11:00 AM - 11:20 AM", program: "Congregational Prayer", facilitator: "EV. Carolyn Ajewa", coordinator: "Hazel Osuo" },
      { time: "11:30 AM - 12:45 PM", program: "Mid-day Sermon", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Muriithi" },
      { time: "2:00 PM - 2:45 PM", program: "Health Seminar", facilitator: "Lt Ev. Samuel Wainaina", coordinator: "Sylvia Ongidi" },
      { time: "2:45 PM - 3:45 PM", program: "Stewardship Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Eld. Osuo" },
      { time: "3:45 PM - 5:15 PM", program: "Family Life", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Mokua" },
      { time: "5:45 PM - 7:00 PM", program: "Bible Prophecy", facilitator: "Pr. Bilcox Okul", coordinator: "Eld. Vincent" },
    ],
  },
  {
    day: "Wednesday",
    date: "12th August 2026",
    timeKeeper: "Christine Alivitsa",
    choirsOnDuty: [
      "Jewels of Purpose (JOPS)",
      "Marvelous in Christ",
      "Nyali SDA Church Choir",
      "Jericho SDA Church Choir",
    ],
    schedule: [
      { time: "6:00 AM - 7:00 AM", program: "Morning Devotion", facilitator: "EV. Carolyn Ajewa", coordinator: "Evans Johny" },
      { time: "8:00 AM - 8:45 AM", program: "Leadership Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Abraham Owino" },
      { time: "8:45 AM - 9:30 AM", program: "Bible Study", facilitator: "Pr. Bilcox Okul", coordinator: "Emma Okello" },
      { time: "10:20 AM - 11:00 AM", program: "Spirit of Prophecy (SOP)", facilitator: "EV. Carolyn Ajewa", coordinator: "Felix Ogango" },
      { time: "11:00 AM - 11:20 AM", program: "Congregational Prayer", facilitator: "EV. Carolyn Ajewa", coordinator: "Hazel Osuo" },
      { time: "11:30 AM - 12:45 PM", program: "Mid-day Sermon", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Ombati" },
      { time: "2:00 PM - 2:45 PM", program: "Education Seminar", facilitator: "Ev. Charles Nyakinda", coordinator: "Linet Kaunda" },
      { time: "2:45 PM - 3:45 PM", program: "Stewardship Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Eld. Osuo" },
      { time: "3:45 PM - 5:15 PM", program: "Family Life", facilitator: "Pr. David Mmbaga", coordinator: "Mrs. Nyairo" },
      { time: "5:45 PM - 7:00 PM", program: "Bible Prophecy", facilitator: "Pr. Bilcox Okul", coordinator: "Eld. Obonyo" },
    ],
  },
  {
    day: "Thursday",
    date: "13th August 2026",
    timeKeeper: "Christine Alivitsa",
    choirsOnDuty: [
      "AWM Choir",
      "Nyali SDA Church Choir",
      "Jericho SDA Church Choir",
    ],
    schedule: [
      { time: "6:00 AM - 7:00 AM", program: "Morning Devotion", facilitator: "EV. Carolyn Ajewa", coordinator: "Evans Johny" },
      { time: "8:00 AM - 8:45 AM", program: "Leadership Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Grace Khamala" },
      { time: "8:45 AM - 9:30 AM", program: "Bible Study", facilitator: "Pr. Bilcox Okul", coordinator: "Joannes Okoth" },
      { time: "10:20 AM - 11:00 AM", program: "Spirit of Prophecy (SOP)", facilitator: "EV. Carolyn Ajewa", coordinator: "Felix Ogango" },
      { time: "11:00 AM - 11:20 AM", program: "Congregational Prayer", facilitator: "EV. Carolyn Ajewa", coordinator: "Hazel Osuo" },
      { time: "11:30 AM - 12:45 PM", program: "Mid-day Sermon", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Khamala" },
      { time: "2:00 PM - 2:45 PM", program: "Education Seminar", facilitator: "Ev. Charles Nyakinda", coordinator: "Linet Kaunda" },
      { time: "2:45 PM - 3:45 PM", program: "Stewardship Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Eld. Osuo" },
      { time: "3:45 PM - 5:15 PM", program: "Family Life", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Mokua" },
      { time: "5:45 PM - 7:00 PM", program: "Bible Prophecy", facilitator: "Pr. Bilcox Okul", coordinator: "Eld. Muriithi" },
    ],
  },
  {
    day: "Friday",
    date: "14th August 2026",
    timeKeeper: "Christine Alivitsa",
    choirsOnDuty: [
      "Ambassadors Choir",
      "Nyali SDA Church Choir",
      "Jericho SDA Church Choir",
    ],
    schedule: [
      { time: "6:00 AM - 7:00 AM", program: "Morning Devotion", facilitator: "EV. Carolyn Ajewa", coordinator: "Hazel Osuo" },
      { time: "8:00 AM - 9:00 AM", program: "Leadership Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Rose Binge" },
      { time: "9:00 AM - 10:00 AM", program: "Bible Study", facilitator: "Pr. Bilcox Okul", coordinator: "Cathy Okoth" },
      { time: "10:40 AM - 11:20 AM", program: "Stewardship Seminar", facilitator: "Pr. Cephas Ang'ira", coordinator: "Eld. Osuo" },
      { time: "11:40 AM - 11:55 AM", program: "Congregational Prayer", facilitator: "EV. Carolyn Ajewa", coordinator: "Deborah Omondi" },
      { time: "12:00 PM - 1:00 PM", program: "Mid-day Sermon", facilitator: "Pr. David Mmbaga", coordinator: "Eld. Vincent" },
      { time: "2:00 PM - 5:00 PM", program: "Sabbath Preparation", facilitator: "Congregation", coordinator: "Deacons / Deaconesses" },
      { time: "5:30 PM - 6:10 PM", program: "Sing Inspiration", facilitator: "Choristers", coordinator: "Lillian Nyangie" },
      { time: "6:10 PM - 7:00 PM", program: "Evening Vespers Sermon", facilitator: "Pr. Bilcox Okul", coordinator: "Eld. Obonyo" },
    ],
  },
  {
    day: "Sabbath",
    date: "15th August 2026",
    choirsOnDuty: [
      "AWM Choir (Special Item after mission)",
      "JESDA Youths & AMB (Closing Item after Sabbath School)",
      "Jewels of Purpose (Offertory)",
      "Marvelous in Christ (Offertory)",
      "Nyali Church Choir (Special Item)",
      "Jericho Church Choir (Special Item)",
    ],
    schedule: [
      { time: "7:15 AM - 8:00 AM", program: "Praise & Worship", facilitator: "Choristers", coordinator: "Lillian Nyangie" },
      { time: "8:00 AM - 9:50 AM", program: "Sabbath School Service", facilitator: "SS Superintendents", coordinator: "Morgan Osano" },
      { time: "9:50 AM - 10:10 AM", program: "Congregational Prayer", facilitator: "EV. Carolyn Ajewa", coordinator: "Hazel Osuo" },
      { time: "10:10 AM - 12:45 PM", program: "Divine Service (Sermon by Pr. David Mmbaga)", facilitator: "Pr. Machoka, Guest Speakers & Eldership", coordinator: "Eld. Khamala & Pr. Machoka" },
      { time: "12:45 PM - 1:45 PM", program: "Fellowship Lunch", facilitator: "Catering Committee", coordinator: "Ann Nyatuka" },
      { time: "1:45 PM - 3:00 PM", program: "Afternoon Song Service", facilitator: "Choristers", coordinator: "Gideon Oloo" },
      { time: "3:00 PM - 4:30 PM", program: "Farewell & Guest Remarks", facilitator: "All Guests", coordinator: "Pr. Machoka" },
      { time: "4:30 PM - 5:00 PM", program: "Closing Sermonette", facilitator: "Pr. David Mmbaga", coordinator: "Pr. Machoka" },
      { time: "5:00 PM - 5:10 PM", program: "Benediction & Consecration", facilitator: "Eld. Nathan Khamala", coordinator: "Eldership" },
    ],
  },
];

export const campMeetingSlides: CampPhoto[] = [
  { id: "slide-1", image: "/church-1.jpg", title: "Sanctuary & Camp Grounds", caption: "Jericho congregation assembling for the annual convocation.", day: "Sabbath Consecration" },
  { id: "slide-2", image: "/church-2.jpg", title: "Songs of Zion & Praise", caption: "Nyali SDA Choir and Jericho Choir leading uplifting music.", day: "Mid-week Praise" },
  { id: "slide-3", image: "/church-3.jpg", title: "Proclamation of the Word", caption: "Exposition of the Holy Scriptures led by visiting ministers.", day: "Revival Hour" },
  { id: "slide-4", image: "/church-4.jpg", title: "Family Devotion & Prayer", caption: "Morning Manna and congregational intercessory prayer led by Ev. Carolyn Ajewa.", day: "Family Seminar" },
  { id: "slide-5", image: "/church-5.jpg", title: "Pathfinder & Youth Fellowship", caption: "Young adults and Ambassadors choirs actively serving.", day: "Youth Day" },
  { id: "slide-6", image: "/church-6.jpg", title: "Early Morning Intercession", caption: "Seeking God's transforming grace at dawn.", day: "Morning Manna" },
  { id: "slide-7", image: "/church-7.jpg", title: "Sabbath School Lesson Dialogue", caption: "Studying the foundational truths of the Word.", day: "Sabbath School" },
  { id: "slide-8", image: "/church-8.jpg", title: "Choral Melodies of Zion", caption: "Singing ambassadors lifting melodies of hope and Christ's return.", day: "Music Ministry" },
  { id: "slide-9", image: "/church-9.jpg", title: "Health & Temperance Seminar", caption: "Practical lessons on Christian living by Lt Ev. Samuel Wainaina.", day: "Health Ministry" },
  { id: "slide-10", image: "/church-10.jpg", title: "Youth Missionary Rally", caption: "Empowering believers for literature and neighborhood evangelism.", day: "AY Outreach" },
  { id: "slide-11", image: "/church-11.jpg", title: "Sacred Rite of Baptism", caption: "Public declaration of faith in Jesus Christ.", day: "High Sabbath" },
  { id: "slide-12", image: "/church-12.jpg", title: "Fellowship Agape Feast", caption: "Breaking bread as one united family in Christ Jesus.", day: "Thanksgiving Meal" },
  { id: "slide-13", image: "/church-13.jpg", title: "Pastoral Anointing & Prayer", caption: "Pastors and elders interceding for families and the sick.", day: "Consecration" },
  { id: "slide-14", image: "/church-14.jpg", title: "The Closing Charge", caption: "Going forth to live out obedience and faith in our community.", day: "Closing Vespers" },
  { id: "slide-15", image: "/church-15.jpg", title: "Pr. David Azael Mmbaga (ECD)", caption: "Keynote evangelist delivering the camp meeting revival sermon series.", day: "Guest Keynote" },
  { id: "slide-16", image: "/church-16.jpg", title: "Congregational Worship", caption: "The sanctuary filled with worshipers during the Divine Worship Hour.", day: "Divine Hour" },
  { id: "slide-17", image: "/church-17.jpg", title: "Eldership & Ordained Platform", caption: "Pastoral team and serving elders leading the order of worship.", day: "Platform Ministry" },
  { id: "slide-18", image: "/church-18.jpg", title: "Deaconry in Holy Service", caption: "Dedicated deacons ensuring order, hospitality, and reverent logistics.", day: "Deaconry Care" },
  { id: "slide-19", image: "/church-19.jpg", title: "Dorcas Benevolence Society", caption: "Women's Ministries extending hospitality, care, and food distribution.", day: "Dorcas Welfare" },
  { id: "slide-20", image: "/church-20.jpg", title: "Adventist Men's Organization (AMO)", caption: "Men of faith united in fellowship, prayer, and mission support.", day: "Men's Ministry" },
  { id: "slide-21", image: "/church-21.jpg", title: "Children's Ministries & Beginners", caption: "Nurturing the youngest disciples in scripture memory verses and song.", day: "Children's Chapel" },
  { id: "slide-22", image: "/church-22.jpg", title: "Camp Meeting Pavilion Tent", caption: "Overflow marquee accommodating attendees from visiting district churches.", day: "Camp Pavilion" },
  { id: "slide-23", image: "/church-23.jpg", title: "Stewardship & Consecrated Giving", caption: "Members presenting faithful tithes and sacrificial camp meeting offerings.", day: "Sacrificial Giving" },
  { id: "slide-24", image: "/church-24.jpg", title: "Youth Camporee & Drills", caption: "Pathfinders and Adventurers demonstrating marching, drills, and honors.", day: "Pathfinder Honors" },
  { id: "slide-25", image: "/church-25.jpg", title: "Camp Chorale & Orchestra", caption: "Instrumentalists and vocalists uniting in sacred choral harmonies.", day: "Sacred Harmonies" },
  { id: "slide-26", image: "/church-26.jpg", title: "Vespers Sundown Consecration", caption: "Welcoming the sacred hours of Sabbath at sunset with songs and prayer.", day: "Friday Vespers" },
  { id: "slide-27", image: "/church-27.jpg", title: "Intercessory Prayer Bands", caption: "Kneeling before God in united plea for community revival and reformation.", day: "Prayer Vigil" },
  { id: "slide-28", image: "/church-28.jpg", title: "Commissioning & Benediction", caption: "The final benediction sending forth disciples grounded in the Word of God.", day: "Benediction" },
];