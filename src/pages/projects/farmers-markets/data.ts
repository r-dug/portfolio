// Louisville farmers markets — 2026 season.
// Compiled from market websites, the All Tree Roots 2026 guide, multi-source
// verification, and logged-in Facebook vendor lineups (June 2026).
// Schedules shift; verify a specific date on the market's own page before relying on it.

export interface Vendor {
  name: string
  url?: string
}

export interface MarketDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  hours: string
  note?: string
}

export type VendorSource = 'official' | 'facebook' | 'sparse' | 'none'

export interface Market {
  slug: string
  name: string
  neighborhood: string
  address: string
  /** Used to build a Google Maps search link. */
  mapsQuery: string
  days: MarketDay[]
  season: string
  yearRound?: boolean
  website: string
  /** Official published roster page, if one exists. */
  vendorListUrl?: string
  vendorSource: VendorSource
  /** How the vendor list was obtained, shown as a caveat. */
  vendorNote?: string
  vendors: Vendor[]
  payment?: string[]
  highlights: string[]
  flags?: string[]
}

export const SEASON_LABEL = '2026 season'

export const MARKETS: Market[] = [
  {
    slug: 'bardstown-road',
    name: 'Bardstown Road Farmers Market',
    neighborhood: 'Highlands',
    address: '1722 Bardstown Rd, Louisville, KY',
    mapsQuery: '1722 Bardstown Rd, Louisville, KY',
    days: [
      { day: 'Saturday', hours: '9am–12pm', note: 'Dec–Mar: 10am–12pm' },
    ],
    season: 'Year-round',
    yearRound: true,
    website: 'https://www.bardstownroadfarmersmarket.com/',
    vendorListUrl: 'https://www.bardstownroadfarmersmarket.com/farmers-1',
    vendorSource: 'official',
    vendorNote: 'Published roster (~30 vendors weekly; this is a partial list).',
    payment: ['SNAP', 'Credit/Debit'],
    highlights: [
      'Two adjacent locations (1722 & 1733 Bardstown Rd).',
      'Produce, cut flowers, plants, pastured meats, cheese, eggs, baked goods, prepared foods, honey, jams.',
    ],
    vendors: [
      { name: 'Pure Pollen Flowers', url: 'https://purepollenflowers.com' },
      { name: 'Facing West Farm', url: 'http://www.localharvest.org/farms/M25390' },
      { name: 'Wild Carrot Farm', url: 'http://www.wildcarrotfarmky.com/' },
      { name: "Thieneman's Greenhouse", url: 'http://www.thienemans.com/' },
      { name: 'Red Clover', url: 'http://rootedredclover.com/' },
      { name: 'Happy Jack Pumpkin & Produce', url: 'https://www.facebook.com/pages/Happy-Jacks-Pumpkin-Farm/121260991222702' },
      { name: 'Jackson Produce', url: 'https://jacksonsproduce.com/' },
      { name: 'Wells Made Co.', url: 'https://wellsmadeco.com' },
      { name: 'Byrnside Orchard' },
      { name: 'Full Heart Farm' },
      { name: 'Groce Family Farm', url: 'https://grocefamilyfarm.com/' },
      { name: 'Red Hot Roasters', url: 'https://www.facebook.com/RedHotRoasters/' },
      { name: 'Lueboe Press' },
      { name: 'On Tapp Dairy', url: 'https://www.ontappdairy.com/' },
    ],
  },
  {
    slug: 'beulah-church',
    name: "Beulah Church Farmers' Market",
    neighborhood: 'Fern Creek',
    address: '6704 Bardstown Rd, Louisville, KY',
    mapsQuery: '6704 Bardstown Rd, Louisville, KY 40291',
    days: [
      { day: 'Monday', hours: '3–7pm', note: 'Outdoor (summer), through late Oct' },
      { day: 'Saturday', hours: '10am–1pm', note: 'Indoor (winter), from mid/late Nov' },
    ],
    season: 'Mon outdoor through late Oct; Sat indoor from mid-Nov',
    website: 'https://www.facebook.com/people/Beulah-Church-Farmers-Market-Fern-Creek-KY/100037660703524/',
    vendorListUrl: 'https://www.facebook.com/people/Beulah-Church-Farmers-Market-Fern-Creek-KY/100037660703524/',
    vendorSource: 'facebook',
    vendorNote: 'From Facebook weekly lineups.',
    highlights: [
      'Beulah Presbyterian Church parking lot; moves indoors (Ramsey Building) in winter.',
      'Produce, eggs, honey, jams, baked goods, crafts.',
    ],
    vendors: [
      { name: 'Deutsch Family Farm' },
      { name: 'B & D Creations' },
      { name: "Jennifer's Sweets" },
      { name: 'Luke 9:23' },
      { name: 'Gutnurish' },
      { name: "Bubba's Lemonade" },
      { name: 'Heavenly Hills Bakery' },
      { name: 'Singing Cat Jewelry' },
    ],
  },
  {
    slug: 'crescent-hill',
    name: 'Crescent Hill Farmers Market',
    neighborhood: 'Crescent Hill',
    address: '201 S Peterson Ave, Louisville, KY',
    mapsQuery: '201 S Peterson Ave, Louisville, KY 40206',
    days: [{ day: 'Thursday', hours: '3–6pm' }],
    season: 'June 4 – Oct 29',
    website: 'https://www.facebook.com/crescenthillfarmersmarketlou',
    vendorSource: 'sparse',
    vendorNote: 'Market posts no full roster; names below are what surfaced in posts.',
    highlights: [
      'Crescent Hill United Methodist Church parking lot.',
      'Produce, meats, flowers, baked goods, coffee, soaps.',
    ],
    vendors: [
      { name: 'Jacksons Produce', url: 'https://jacksonsproduce.com/' },
      { name: 'Tunes with Trent' },
    ],
  },
  {
    slug: 'douglass-loop',
    name: 'Douglass Loop Farmers Market',
    neighborhood: 'Highlands',
    address: '2005 Douglass Blvd, Louisville, KY',
    mapsQuery: '2005 Douglass Blvd, Louisville, KY 40205',
    days: [{ day: 'Saturday', hours: '10am–2pm' }],
    season: 'Apr 4 – Dec 19',
    website: 'https://www.douglassloopfarmersmarket.org/',
    vendorListUrl: 'https://www.douglassloopfarmersmarket.org/',
    vendorSource: 'official',
    vendorNote: 'Full published roster — 35 vendors, all linked.',
    highlights: [
      'Outdoor, in the Douglass Boulevard Christian Church lot.',
      'Live music; produce, meats, cheese, breads, prepared/multi-ethnic foods, arts & crafts.',
    ],
    vendors: [
      { name: 'Barr Farms', url: 'https://www.barrfarmsky.com/' },
      { name: 'Garey Farms', url: 'https://www.facebook.com/gareyfarms/' },
      { name: "Pavel's Garden", url: 'https://www.pavelsgarden.com/' },
      { name: 'Quarles Farm', url: 'https://quarlesfarm.com/index.html' },
      { name: 'Valley Spirit Farm', url: 'https://www.facebook.com/valleyspiritfarm/' },
      { name: 'Slaughter Family Farm', url: 'https://slaughterfamilyfarm.com/' },
      { name: 'Rootbound Farm', url: 'https://www.rootboundfarm.com/' },
      { name: 'Holden Farm', url: 'https://www.facebook.com/theholdenfarm/' },
      { name: 'Kephart Acres', url: 'https://www.kephartacres.com/' },
      { name: 'Highland Moor', url: 'https://www.highlandmoor.com/' },
      { name: 'Bellaire Blooms', url: 'https://www.bellairebloomsky.com/' },
      { name: 'The Herb Shack', url: 'https://www.theherbshack.com/' },
      { name: 'Above The Dirt', url: 'https://www.abovethedirtgardenshop.com/' },
      { name: 'Among the Oaks Herb Farm', url: 'https://amongtheoaksfarmstead.com/' },
      { name: 'Urban Microgreens', url: 'https://www.urbanmicrogreensky.com/' },
      { name: 'Fresh Air A&A', url: 'https://www.facebook.com/freshairana' },
      { name: 'Honeybear Farms KY', url: 'https://www.honeybearfarmsky.com/' },
      { name: 'Red Hot Roasters', url: 'https://redhotroasters.com/' },
      { name: 'Sa Sa Samosa Kitchen', url: 'https://sasasamosakitchen.com/' },
      { name: 'Galilee Kitchen', url: 'https://galileekitchen.square.site/' },
      { name: 'Boone Creek Creamery', url: 'https://boone-creek-creamery-226626.square.site/' },
      { name: 'Earthy Browns', url: 'https://earthybrowns.com/' },
      { name: 'Sirocco Ridge Farm', url: 'http://www.siroccoridgefarm.com/' },
      { name: 'Sugar Beam Cookies', url: 'https://sugarbeamcookies.square.site/' },
      { name: 'The Italian Loaf', url: 'https://www.instagram.com/theitalianloaf/' },
      { name: 'Wiltshire Pantry', url: 'https://wiltshirepantry.com/' },
      { name: 'McTavish Blade & Shear', url: 'https://www.facebook.com/profile.php?id=100063618876805' },
      { name: 'Beelight Luminaries', url: 'https://beelightluminaries.com/' },
      { name: 'Lexington Pasta', url: 'https://www.lexingtonpasta.com/' },
      { name: 'Springhurst Bakery', url: 'https://springhurstbakery.com/' },
      { name: 'Schulz Woodcraft', url: 'https://www.schulzwoodcrafts.com/' },
      { name: 'The Infinite Thread', url: 'https://www.facebook.com/theinfinitethread' },
      { name: 'Tuko Farm', url: 'https://tukofarm.com/about-tuko-farm/' },
      { name: 'Durt Studios', url: 'https://www.durtstudios.com/' },
      { name: 'Kentucky River Wood Craft', url: 'https://www.kyriverwood.com/' },
    ],
  },
  {
    slug: 'east-end',
    name: 'East End Farmers Market',
    neighborhood: 'Middletown',
    address: '13060 Factory Ln, Louisville, KY',
    mapsQuery: '13060 Factory Ln, Louisville, KY 40245',
    days: [
      { day: 'Saturday', hours: '9am–2pm' },
      { day: 'Tuesday', hours: '2–6pm', note: 'May run a shorter season than Saturday' },
    ],
    season: 'Feb 7 – Oct 31 (separate winter market follows)',
    website: 'https://www.eastendfm.com/',
    vendorListUrl: 'https://www.facebook.com/eastendfm/',
    vendorSource: 'facebook',
    vendorNote: 'Posts a full weekly lineup (40+ vendors). Representative May 30 lineup below — vendors rotate week to week.',
    highlights: [
      'Free admission and free parking; outdoor, rain or shine.',
      'Themed events, live music, food trucks, a Young Entrepreneurs Club.',
      'Across from Forest Springs Kroger.',
    ],
    vendors: [
      { name: 'Night Owl Farms' },
      { name: "Annie May's Sweet Cafe", url: 'https://www.anniemayssweetcafe.com/' },
      { name: 'The Sourdough Affair Co.', url: 'https://thesourdoughaffairco.com/' },
      { name: 'BahrAss Honey' },
      { name: "Tini's Crafthouse" },
      { name: 'Black Lavender Co.', url: 'https://blacklavenderco.com/' },
      { name: "Tay's Macarons" },
      { name: 'The Doughminion' },
      { name: 'Violet & Flour' },
      { name: 'Colliver Coffee Company' },
      { name: 'Diente de Leon' },
      { name: "Best's Kosher Hot Dog Cart" },
      { name: 'Oak and Barrel Meats' },
      { name: 'Wigglewow', url: 'https://wigglewow.com/' },
      { name: 'Honey Acres Farm' },
      { name: 'Kentucky Family Bakery' },
      { name: 'Paradise Island Tea' },
      { name: 'Brownie & Batter' },
      { name: 'TaylorMade Spices' },
    ],
  },
  {
    slug: 'eastwood-village',
    name: 'Eastwood Village Farmers Market',
    neighborhood: 'Eastwood',
    address: '15201 Shelbyville Rd, Louisville, KY',
    mapsQuery: '15201 Shelbyville Rd, Louisville, KY 40245',
    days: [{ day: 'Saturday', hours: '8am–12pm' }],
    season: 'May 10 – Sept 27',
    website: 'https://www.eastwoodfarmers.com',
    vendorListUrl: 'https://www.facebook.com/eastwoodvillagecouncilfarmersmarket',
    vendorSource: 'facebook',
    vendorNote: 'From the pinned Facebook vendor list.',
    highlights: [
      'Greenhouse parking lot of Highview Baptist Church.',
      'Live music; organic produce, meats, cheeses, flowers, baked goods, crafts.',
    ],
    vendors: [
      { name: 'Bagdad Blooms' },
      { name: 'Berserker Brew' },
      { name: 'Bluegrass Beef' },
      { name: 'Boone Creek Creamery', url: 'https://boone-creek-creamery-226626.square.site/' },
      { name: 'Boxes and Boards' },
      { name: 'Bramble & Birds' },
      { name: 'Bristol Beds (pet beds)' },
      { name: 'Cardinal Creations' },
      { name: 'Floyds View Farm' },
      { name: 'Honey Bear Farms', url: 'https://www.honeybearfarmsky.com/' },
      { name: 'Jac N Jill Bakery' },
      { name: 'Joyful Anchor' },
      { name: 'Kaufman Farms' },
      { name: 'La Tres Jolie' },
      { name: 'Modern B Candles' },
      { name: 'Renew the Halls' },
      { name: "Scott & Sarah's Woodcrafts" },
      { name: 'Simplii Farms' },
      { name: 'Skinner Farms' },
      { name: "Teri & Lori's Confectionery" },
      { name: 'The Berry Patch' },
      { name: 'The Block Deli' },
      { name: 'Warren Farmstead' },
      { name: 'West Sixth Brewery' },
      { name: 'Bread and Butter Bakery' },
      { name: 'Abol Coffee Truck' },
    ],
  },
  {
    slug: 'gray-street',
    name: "Gray Street Farmers' Market",
    neighborhood: 'Downtown / LOUMED',
    address: '316 E Chestnut St, Louisville, KY 40202',
    mapsQuery: '316 E Chestnut St, Louisville, KY 40202',
    days: [{ day: 'Thursday', hours: '10:30am–1:30pm' }],
    season: 'June 4 – Sept 24',
    website: 'https://publichealth.louisville.edu/community-partnerships/gray-street-farmers-market',
    vendorListUrl: 'https://www.facebook.com/UofLGSFM/',
    vendorSource: 'sparse',
    vendorNote: 'Market posts photo lineups without names; few vendors named publicly.',
    payment: ['SNAP', 'KY Double Dollars', 'Senior FMNP'],
    highlights: [
      'At the new LOUMED Commons. Rain or shine.',
      'Double Dollars matches SNAP up to $20/week — tripled the first Thursday of each month.',
      'Produce, meat, breads, honey, herbs.',
    ],
    vendors: [
      { name: 'Soap Addiction' },
      { name: 'Common Earth Gardens (Catholic Charities refugee-farmer program)', url: 'https://cclou.org/gethelp/foodsecurity/common-earth-gardens/' },
    ],
  },
  {
    slug: 'jeffersontown',
    name: 'Jeffersontown Farmers Market',
    neighborhood: 'Jeffersontown',
    address: '10434 Watterson Trail, Jeffersontown, KY',
    mapsQuery: '10434 Watterson Trail, Jeffersontown, KY 40299',
    days: [{ day: 'Saturday', hours: '8am–12pm' }],
    season: 'Apr 25 – Oct 24',
    website: 'https://www.facebook.com/JeffersontownFarmersMarket/',
    vendorSource: 'none',
    vendorNote: 'No vendor names published anywhere — the Facebook feed is announcements only. Contact: Barbara Carby (502) 267-8333.',
    payment: ['SNAP', 'KY Double Dollars', 'Senior FMNP'],
    highlights: [
      'Under the covered Gaslight Square Pavilion. City-run; 25+ vendors.',
      'Produce, baked goods, meats.',
    ],
    vendors: [],
  },
  {
    slug: 'norton-commons',
    name: 'Norton Commons Farmers Market',
    neighborhood: 'Prospect',
    address: '6301 Moonseed St, Prospect, KY',
    mapsQuery: '6301 Moonseed St, Prospect, KY 40059',
    days: [{ day: 'Sunday', hours: '12–3pm' }],
    season: 'Apr 26 – Nov 1',
    website: 'https://www.facebook.com/NortonCommonsFarmersMarket/',
    vendorSource: 'facebook',
    vendorNote: 'Named in posts and comments (no formal roster).',
    highlights: [
      "North Village area; 'more of a festival than a market.' Free parking.",
      'Eggs, meats, veggies, cakes/cookies, BBQ, dog treats, crafts.',
    ],
    vendors: [
      { name: 'Hillside Chickens' },
      { name: "Granny's Delights", url: 'https://grannysdelightsshop.square.site/' },
      { name: 'The Popcorn Station' },
      { name: 'Sweet Layers Bakery' },
      { name: 'Sunny Acres Farm' },
      { name: 'Edna Mae Culinary' },
      { name: "Steve's Woodcrafters" },
      { name: "Floyd's View Farm" },
      { name: 'My Oh My Lollies', url: 'https://www.ohmylollies.com/' },
    ],
  },
  {
    slug: 'old-louisville',
    name: "Old Louisville Farmer's Market",
    neighborhood: 'Old Louisville',
    address: 'Central Park (6th St & Park Ave), Louisville, KY',
    mapsQuery: 'Central Park, 6th St & Park Ave, Louisville, KY 40208',
    days: [
      { day: 'Saturday', hours: '9am–12:30pm', note: 'Select / alternating Saturdays' },
      { day: 'Wednesday', hours: '5:30–9pm', note: 'Sep 30 Night Market only' },
    ],
    season: 'Select Saturdays, May 16 – Nov 14',
    website: 'https://www.oldloufarmersmarket.com/schedule',
    vendorListUrl: 'https://www.facebook.com/oldloufarmersmarket',
    vendorSource: 'sparse',
    vendorNote: 'Does not post a full roster; a few vendors named in posts.',
    payment: ['EBT/SNAP', 'KY Double Dollars'],
    highlights: [
      'New for 2026: moved to Central Park (shaded picnic tables, splash pad).',
      'Live music; alternating-Saturday schedule plus a Sep 30 Wednesday Night Market.',
    ],
    flags: [
      'Market dates: May 16, 30; Jun 13, 27; Jul 11, 25; Aug 8, 22; Sep 5, 19; Oct 17, 31; Nov 14 (+ Sep 30 night market).',
    ],
    vendors: [
      { name: 'Gifted Hands Pastries & More' },
      { name: 'Big Springs Farm', url: 'https://thebigspringsfarm.com' },
    ],
  },
  {
    slug: 'phoenix-hill-nulu',
    name: "Phoenix Hill NuLu Farmer's Market",
    neighborhood: 'NuLu / Phoenix Hill',
    address: '1007 E Jefferson St, Louisville, KY 40204',
    mapsQuery: '1007 E Jefferson St, Louisville, KY 40204',
    days: [{ day: 'Tuesday', hours: '3–6pm' }],
    season: 'Through end of October (2026 start TBA)',
    website: 'https://phoenixhillnulufarmersmarket.org/',
    vendorListUrl: 'https://www.facebook.com/PhoenixHillNuLuFarmersMarket',
    vendorSource: 'facebook',
    vendorNote: 'Posts a weekly "what our farmers will have." Small, produce-focused.',
    payment: ['Cash', 'Credit/Debit', 'SNAP', 'Senior FM'],
    highlights: [
      "In the lot of Fresh Start Growers' Supply / The Plant Kingdom / Climb NuLu.",
      'By the Phoenix Hill Neighborhood Association & Fresh Start Growers’ Supply.',
    ],
    flags: ['2026 dates not yet posted — verify before relying.'],
    vendors: [
      { name: 'Barr Farms', url: 'https://www.barrfarmsky.com/' },
      { name: 'Eastward Gardens', url: 'https://eastwardgardens.com/' },
      { name: 'Peterson Family Farm' },
      { name: 'Full Heart Farm' },
    ],
  },
  {
    slug: 'rainbow-blossom',
    name: 'Rainbow Blossom Farmers Market',
    neighborhood: 'St. Matthews',
    address: '3738 Lexington Rd, Louisville, KY 40207',
    mapsQuery: '3738 Lexington Rd, Louisville, KY 40207',
    days: [{ day: 'Sunday', hours: '12–4pm' }],
    season: 'May 10 – Nov 22',
    website: 'https://www.rainbowblossom.com/farmers-market',
    vendorListUrl: 'https://www.rainbowblossom.com/farmers-market',
    vendorSource: 'official',
    vendorNote: 'Published 2026 roster (~23 vendors). Per-vendor links via search; a few uncertain matches omitted.',
    highlights: [
      'Produce, organic meats, eggs, baked goods, preserves, ready-to-eat items, crafts.',
    ],
    flags: ['Reportedly does not accept SNAP/EBT (unconfirmed).'],
    vendors: [
      { name: "Annie May's Sweet Cafe", url: 'https://www.anniemayssweetcafe.com/' },
      { name: 'Black Lavender Co.', url: 'https://blacklavenderco.com/' },
      { name: 'CeyoLanka Spices', url: 'https://www.ceyolankaspices.com/' },
      { name: 'Eastward Gardens', url: 'https://eastwardgardens.com/' },
      { name: 'Galilee Kitchen', url: 'https://galileekitchen.square.site/' },
      { name: "Harper's Emporium", url: 'https://www.facebook.com/Harpersemporiumlou/' },
      { name: "Jackson's Produce", url: 'https://jacksonsproduce.com/' },
      { name: 'Krafty Koala', url: 'https://www.facebook.com/people/The-Krafty-Koala/61551473867152/' },
      { name: 'Oh My Lollies', url: 'https://www.ohmylollies.com/' },
      { name: 'Rochner Woodworks', url: 'https://www.instagram.com/rochner_woodworks/' },
      { name: 'Springhurst Bakery', url: 'https://springhurstbakery.com/' },
      { name: 'Sudsy Budsy Handmade Soap', url: 'https://www.instagram.com/sudsybudsyhandmadesoap/' },
      { name: 'The Sourdough Affair Co', url: 'https://thesourdoughaffairco.com/' },
      { name: "Vee's Herbal Exchange", url: 'https://www.veesherbal.com/' },
      { name: 'Full Heart Farm' },
      { name: 'Indigo Upcycle' },
      { name: 'Nine Lives Creations' },
      { name: 'Yarn and Petals' },
    ],
  },
  {
    slug: 'riverside',
    name: 'Riverside Farmers Market',
    neighborhood: 'Farnsley-Moremen Landing',
    address: '7410 Moorman Rd, Louisville, KY',
    mapsQuery: '7410 Moorman Rd, Louisville, KY 40272',
    days: [{ day: 'Sunday', hours: '10am–1pm', note: 'Closed Sep 6 (Labor Day)' }],
    season: 'June 7 – Sept 27',
    website: 'https://riverside-landing.org/2026-riverside-farmers-market/',
    vendorListUrl: 'https://www.facebook.com/farnsleymoremen1837/',
    vendorSource: 'sparse',
    vendorNote: 'Posts product categories, not vendor names.',
    highlights: [
      'Historic Farnsley-Moremen Landing, under the open-air pavilion.',
      'Produce + crafts; live music, free kids art activity.',
    ],
    vendors: [
      { name: 'Soul Fire Company Food Truck' },
      { name: 'A Tri' },
    ],
  },
  {
    slug: 'saint-matthews',
    name: 'Saint Matthews Farmers Market',
    neighborhood: 'St. Matthews',
    address: '4100 Shelbyville Rd, Louisville, KY',
    mapsQuery: '4100 Shelbyville Rd, Louisville, KY 40207',
    days: [{ day: 'Saturday', hours: '8am–12pm' }],
    season: 'May 9 – Sept 26',
    website: 'https://smfarmersmarket.com/',
    vendorListUrl: 'https://smfarmersmarket.com/on-site-vendors/',
    vendorSource: 'official',
    vendorNote: 'Full published roster (on-site farms, prepared vendors, and alternates).',
    highlights: [
      'Beargrass Christian Church parking lot — 20th season.',
      '40+ farms/vendors; hot breakfast. Live music weekly; kids activities.',
    ],
    vendors: [
      { name: 'Coulter’s Good Earth Farm', url: 'http://coulterfarm.com/' },
      { name: 'Gallrein Farms', url: 'http://www.gallreinfarms.com' },
      { name: 'Garey Farms', url: 'http://www.gareyfarms.com/' },
      { name: 'Groce Farm', url: 'https://grocefamilyfarm.com/' },
      { name: 'Happy Jack Farm', url: 'https://www.happyjackspumpkins.com/' },
      { name: 'Harmony Fields Farm', url: 'http://www.harmonyfieldsfarm.com/contact' },
      { name: 'Metro Mushrooms', url: 'https://metromushrooms.com/' },
      { name: 'On Tapp Dairy', url: 'https://www.ontappdairy.com/' },
      { name: 'Rootbound Farm', url: 'https://www.rootboundfarm.com/' },
      { name: 'Slaughter Family Farm', url: 'https://slaughterfamilyfarm.com/' },
      { name: 'Triple J Farm', url: 'https://triplejfarm.org/' },
      { name: 'Wild Geese Flowers', url: 'http://wildgeeseflowers.com' },
      { name: 'Burnt Barn Farm', url: 'https://www.facebook.com/burntbarnfarm/' },
      { name: 'Bourbon Joys', url: 'https://www.bourbonjoys.com/' },
      { name: 'Khayat Oil', url: 'https://khayatoil.com/' },
      { name: 'Lexington Pasta', url: 'https://www.lexingtonpasta.com/' },
      { name: 'MeSalsa', url: 'https://www.mesalsa.com/' },
      { name: 'Sig Luscher Brewery', url: 'https://www.sigluscherbrewery.com/' },
      { name: 'SaSa Samosas', url: 'https://sasasamosakitchen.com/shop/' },
      { name: 'Sunergos Coffee', url: 'https://sunergosmobile.square.site/' },
      { name: 'Wildflour Bakehouse', url: 'http://wildflourbakehouseky.com/' },
      { name: 'Wigglewow Dog Treats', url: 'https://wigglewow.com/' },
      { name: 'Zoops Scoops Ice Cream', url: 'https://www.zoopscoopsicecream.com/' },
    ],
  },
  {
    slug: 'shively',
    name: 'Shively Farmers & Artisans Market',
    neighborhood: 'Shively',
    address: '2900 Ralph Ave, Louisville, KY',
    mapsQuery: '2900 Ralph Ave, Louisville, KY 40216',
    days: [{ day: 'Saturday', hours: '10am–2pm', note: 'Select / alternating Saturdays' }],
    season: 'Select Saturdays, June 6 – Oct 24',
    website: 'https://www.facebook.com/shivelyfarmersmarketky',
    vendorSource: 'sparse',
    vendorNote: 'Mostly registration/community posts; few vendors named.',
    payment: ['KY Double Dollars', 'Senior FMNP'],
    highlights: [
      'Vision of Hope Church; city-run.',
      'Farm produce plus artisan/craft vendors.',
    ],
    flags: [
      'Dates: Jun 6, 20; Jul 4, 18; Aug 1, 15, 29; Sep 12, 26; Oct 10, 24.',
    ],
    vendors: [{ name: 'EVAUGHNJ' }],
  },
  {
    slug: 'westport-road-baptist',
    name: 'Westport Road Baptist Farmers Market',
    neighborhood: 'Northeast Louisville',
    address: '9707 Westport Rd, Louisville, KY',
    mapsQuery: '9707 Westport Rd, Louisville, KY 40241',
    days: [
      { day: 'Saturday', hours: '9am–1pm' },
      { day: 'Saturday', hours: '11am–1pm', note: 'Winter market: Nov 1 & 15, Dec 6 & 20' },
    ],
    season: 'Apr 25 – Oct 24 (+ winter market)',
    website: 'https://www.facebook.com/westportrdbaptistfarmersmarket/',
    vendorListUrl: 'https://www.facebook.com/westportrdbaptistfarmersmarket/',
    vendorSource: 'facebook',
    vendorNote: 'From shared vendor posts.',
    highlights: [
      'Westport Road Baptist Church lower parking lot, outdoor.',
      'Farmers, craft vendors, prepared meals.',
    ],
    vendors: [
      { name: "Happy Jack's Pumpkin Farm", url: 'https://www.happyjackspumpkins.com/' },
      { name: 'Sandy Roots Farmacy' },
      { name: "Judy's Diamond Art" },
      { name: 'A Time to Sew' },
      { name: 'GlennLeigh Farm LLC' },
      { name: 'Caketails Alcohol Infused Desserts' },
      { name: 'Deutsch Farm' },
      { name: 'Shawn Gregory' },
    ],
  },
]

import vendorCategories from './vendor-categories.json'

const VENDOR_CATEGORIES = vendorCategories as Record<string, string[]>

/** Master list of vendor categories, in display order for filter chips. */
export const ALL_CATEGORIES = [
  'Produce',
  'Meat & eggs',
  'Dairy & cheese',
  'Baked goods',
  'Sweets',
  'Prepared food',
  'Coffee & tea',
  'Beverages',
  'Honey',
  'Flowers & plants',
  'Pantry',
  'Body & home',
  'Crafts & art',
  'Pet',
  'Music & services',
] as const

export function vendorCategoriesFor(name: string): string[] {
  return VENDOR_CATEGORIES[name] ?? []
}

/** Unique vendor categories present at a market, in master-list order. */
export function marketCategories(m: Market): string[] {
  const present = new Set(m.vendors.flatMap(v => vendorCategoriesFor(v.name)))
  return ALL_CATEGORIES.filter(c => present.has(c))
}

export function getMarket(slug: string): Market | undefined {
  return MARKETS.find(m => m.slug === slug)
}

/** Unique weekday labels across all markets, in week order. */
export function allDays(): string[] {
  const order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const present = new Set(MARKETS.flatMap(m => m.days.map(d => d.day)))
  return order.filter(d => present.has(d as MarketDay['day']))
}

export const ICS_PATH = '/farmers-markets/louisville_farmers_markets_2026.ics'
export const CSV_PATH = '/farmers-markets/louisville_farmers_markets_maps.csv'

// Published Google My Map (built from the CSV import).
const MYMAPS_MID = '1LccIGTtbCWSqjGg3Wn-gcIzFsyMEbmw'
export const MYMAPS_EMBED = `https://www.google.com/maps/d/embed?mid=${MYMAPS_MID}&ehbc=2E312F`
export const MYMAPS_VIEW = `https://www.google.com/maps/d/viewer?mid=${MYMAPS_MID}`

export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
