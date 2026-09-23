export interface Hymn {
  number: number;
  title: string;
  category: string;
  refrain?: string;
  verses: string[];
}

export const sdahHymns: Hymn[] = [
  {
    number: 590,
    title: "Trust and Obey",
    category: "Consecration & Trust",
    refrain:
      "Trust and obey, for there's no other way to be happy in Jesus, but to trust and obey.",
    verses: [
      "When we walk with the Lord in the light of His word, what a glory He sheds on our way! While we do His good will, He abides with us still, and with all who will trust and obey.",
      "Not a shadow can rise, not a cloud in the skies, but His smile quickly drives it away; not a doubt nor a fear, not a sigh nor a tear, can abide while we trust and obey.",
      "Not a burden we bear, not a sorrow we share, but our toil He doth richly repay; not a grief nor a loss, not a frown nor a cross, but is blest if we trust and obey.",
      "But we never can prove the delights of His love until all on the altar we lay; for the favor He shows, and the joy He bestows, are for them who will trust and obey.",
      "Then in fellowship sweet we will sit at His feet, or we'll walk by His side in the way; what He says we will do, where He sends we will go; never fear, only trust and obey.",
    ],
  },
  {
    number: 1,
    title: "Praise to the Lord",
    category: "Adoration & Praise",
    verses: [
      "Praise to the Lord, the Almighty, the King of creation! O my soul, praise Him, for He is thy health and salvation! All ye who hear, now to His temple draw near; join me in glad adoration!",
      "Praise to the Lord, who o'er all things so wondrously reigneth, shelters thee under His wings, yea, so gently sustaineth! Hast thou not seen how thy desires e'er have been granted in what He ordaineth?",
      "Praise to the Lord, who doth prosper thy work and defend thee; surely His goodness and mercy here daily attend thee. Ponder anew what the Almighty can do, if with His love He befriend thee.",
      "Praise to the Lord, O let all that is in me adore Him! All that hath life and breath, come now with praises before Him. Let the Amen sound from His people again, gladly for aye we adore Him.",
    ],
  },
  {
    number: 100,
    title: "Great Is Thy Faithfulness",
    category: "Praise & Thanksgiving",
    refrain:
      "Great is Thy faithfulness! Great is Thy faithfulness! Morning by morning new mercies I see; all I have needed Thy hand hath provided; great is Thy faithfulness, Lord, unto me!",
    verses: [
      "Great is Thy faithfulness, O God my Father; there is no shadow of turning with Thee; Thou changest not, Thy compassions, they fail not; as Thou hast been Thou forever wilt be.",
      "Summer and winter and springtime and harvest, sun, moon, and stars in their courses above join with all nature in manifold witness to Thy great faithfulness, mercy, and love.",
      "Pardon for sin and a peace that endureth, Thine own dear presence to cheer and to guide; strength for today and bright hope for tomorrow, blessings all mine, with ten thousand beside!",
    ],
  },
  {
    number: 216,
    title: "When the Roll Is Called Up Yonder",
    category: "Second Coming",
    refrain:
      "When the roll is called up yonder, when the roll is called up yonder, when the roll is called up yonder, when the roll is called up yonder, I'll be there.",
    verses: [
      "When the trumpet of the Lord shall sound, and time shall be no more, and the morning breaks, eternal, bright and fair; when the saved of earth shall gather over on the other shore, and the roll is called up yonder, I'll be there.",
      "On that bright and cloudless morning when the dead in Christ shall rise, and the glory of His resurrection share; when His chosen ones shall gather to their home beyond the skies, and the roll is called up yonder, I'll be there.",
      "Let us labor for the Master from the dawn till setting sun, let us talk of all His wondrous love and care; then when all of life is over, and our work on earth is done, and the roll is called up yonder, I'll be there.",
    ],
  },
  {
    number: 381,
    title: "Holy, Holy, Holy",
    category: "Sabbath & Worship",
    verses: [
      "Holy, holy, holy! Lord God Almighty! Early in the morning our song shall rise to Thee; Holy, holy, holy, merciful and mighty! God in three Persons, blessed Trinity!",
      "Holy, holy, holy! All the saints adore Thee, casting down their golden crowns around the glassy sea; cherubim and seraphim falling down before Thee, which wert, and art, and evermore shalt be.",
      "Holy, holy, holy! Though the darkness hide Thee, though the eye of sinful man Thy glory may not see; only Thou art holy; there is none beside Thee, perfect in power, in love, and purity.",
      "Holy, holy, holy! Lord God Almighty! All Thy works shall praise Thy name, in earth, and sky, and sea; Holy, holy, holy; merciful and mighty! God in three Persons, blessed Trinity!",
    ],
  },
];

export const nzkHymns: Hymn[] = [
  {
    number: 128,
    title: "Namwandama Bwana",
    category: "Kutii na Kuamini",
    refrain:
      "Kuamini, njia pekee ni hii, Ya furaha kwa Yesu, amini ukatii.",
    verses: [
      "Namwandama Bwana, kwa alilonena, njia zangu huning'azia; Na nikimridhisha, atanidumisha, taamini nitii pia.",
      "Giza sina kwangu, wala hata wingu, yeye mara huviondoa; Woga wasiwasi, sononeko basi, huamini nitii pia.",
      "Masumbuko yote, sikitiko lote, kwa mapenzi hunilipia; Baa dhara dhiki, vivyo hubariki, taamini nitii pia.",
      "Mimi sitajua, raha sawasawa, ila yote Yesu kumtoa; Napata fadhili, na radhi kamili, taamini nitii pia.",
      "Nitamfurahia, na kumtumaini, majumbani na njia-njia; Agizo natenda; nikitumwa huenda, huamini, nitii pia.",
    ],
  },
  {
    number: 1,
    title: "Mchana Kutwa Huu",
    category: "Sikukuu ya Sabato",
    verses: [
      "Mchana kutwa huu, wa siku saba, Bwana Mungu aliuweka huru; Tuache kazi zetu, tumwabudu Yeye, ambaye ametupa uzima.",
      "Sabato ni ukumbusho wa uumbaji, raha takatifu kwa watoto Wake; Tushangilie leo, tukimpa sifa, Mwokozi wetu aliyetukomboa.",
    ],
  },
  {
    number: 24,
    title: "Chakutumaini Sina",
    category: "Imani na Tumaini",
    refrain:
      "Kwenye mwamba ninasimama, Pekee ndipo salama, Penginetepo ni mchanga.",
    verses: [
      "Chakutumaini sina, ila damu yake Bwana; Sina wema wa kutosha, dhambi zangu kuondosha.",
      "Njia yangu iwe ndefu, Yeye hunipa wokovu; Mawimbi yakinipiga, Nguvu zake zanilinda.",
      "Damu yake na agano, Ndiye tegemeo langu; Yote yatakapopita, Yeye atabaki nami.",
    ],
  },
  {
    number: 104,
    title: "Tufurahi Katika Bwana",
    category: "Kusifu na Kuabudu",
    refrain:
      "Tufurahi, tufurahi, katika Bwana daima; Tufurahi, tufurahi, kwa kuwa Bwana yu karibu.",
    verses: [
      "Tufurahi katika Bwana, sifa zake tutamwimbia; Ametutendea makuu, jina lake litukuzwe.",
      "Wema wake na fadhili, zatufuata siku zote; Tutakaa nyumbani mwake, hata milele na milele.",
    ],
  },
];