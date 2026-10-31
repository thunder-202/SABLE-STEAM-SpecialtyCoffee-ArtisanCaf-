import heroEspressoBar from './assets/images/hero_espresso_bar_1793352937796.jpg';
import espressoExtraction from './assets/images/espresso_shot_extraction_1793352939008.jpg';
import brownButterLatte from './assets/images/brown_butter_latte_1793352940592.jpg';
import honeyFlatWhite from './assets/images/honey_flat_white_1793352942568.jpg';
import vanillaColdBrew from './assets/images/vanilla_cold_brew_1793352943656.jpg';
import sydneyCafeInterior from './assets/images/sydney_cafe_interior_1793352944989.jpg';
import artisanPastries from './assets/images/artisan_cafe_pastries_1793352947387.jpg';
import oakStoneSeating from './assets/images/oak_stone_seating_1793352947853.jpg';
import morningCoffeeTable from './assets/images/morning_coffee_table_1793352949284.jpg';

export const IMAGES = {
  hero: heroEspressoBar,
  extraction: espressoExtraction,
  brownButterLatte,
  honeyFlatWhite,
  vanillaColdBrew,
  interior: sydneyCafeInterior,
  pastries: artisanPastries,
  seating: oakStoneSeating,
  conversation: morningCoffeeTable,
};

export const MENU_CATEGORIES = [
  {
    id: 'all',
    label: 'All Offerings',
    subtitle: 'Daily espresso bar, seasonal signatures, tea & morning viennoiserie',
  },
  {
    id: 'espresso',
    label: 'Espresso',
    subtitle: 'Pulled on our pressure-profiled bar using seasonal single-origin & house lots',
  },
  {
    id: 'signature',
    label: 'Signature Drinks',
    subtitle: 'House-crafted infusions, cultured butter emulsions & slow cold extractions',
  },
  {
    id: 'tea',
    label: 'Tea & Other Drinks',
    subtitle: 'Single-cultivar Japanese matcha, wet-leaf spiced chai & botanical infusions',
  },
  {
    id: 'bakery',
    label: 'Bakery & Light Bites',
    subtitle: 'Baked fresh before dawn using cultured Australian butter & heritage grains',
  },
];

export const MENU_ITEMS = [
  // Espresso
  {
    id: 'espresso-shot',
    category: 'espresso',
    categoryLabel: 'Espresso',
    name: 'Espresso',
    price: '$4.50',
    serving: 'Hot · Double Ristretto',
    description:
      'Syrupy double extraction of our Reservoir House Blend with tasting notes of dark cacao nib, roasted hazelnut, and blood orange.',
    featuredImage: espressoExtraction,
    featuredCaption: 'Reservoir House Blend — calibrated each morning for clarity and sweetness.',
  },
  {
    id: 'americano',
    category: 'espresso',
    categoryLabel: 'Espresso',
    name: 'Americano',
    price: '$5.00',
    serving: 'Hot or Iced',
    description:
      'Double espresso lengthened over triple-filtered mineral water to preserve floral aromatics and a clean, lingering finish.',
  },
  {
    id: 'flat-white',
    category: 'espresso',
    categoryLabel: 'Espresso',
    name: 'Flat White',
    price: '$5.50',
    serving: 'Hot · 6 oz Ceramic',
    description:
      'A Sydney staple: sweet double ristretto folded seamlessly beneath thin, glossy Riverina whole-milk microfoam.',
  },
  {
    id: 'cappuccino',
    category: 'espresso',
    categoryLabel: 'Espresso',
    name: 'Cappuccino',
    price: '$5.50',
    serving: 'Hot · 6 oz Ceramic',
    description:
      'Rich double espresso crowned with structured, velvety milk foam and finely grated Daintree single-origin dark chocolate.',
  },
  {
    id: 'cafe-latte',
    category: 'espresso',
    categoryLabel: 'Espresso',
    name: 'Café Latte',
    price: '$5.80',
    serving: 'Hot or Iced · 8 oz',
    description:
      'Silky steamed milk poured over caramel-forward espresso for a gentle, rounded morning cup.',
  },

  // Signature Drinks
  {
    id: 'brown-butter-latte',
    category: 'signature',
    categoryLabel: 'Signature Drinks',
    name: 'Brown Butter Latte',
    price: '$7.20',
    serving: 'Hot · House Signature',
    description:
      'Slow-toasted cultured brown butter emulsion whisked into double espresso, textured milk, and a whisper of Murray River sea salt.',
    featuredImage: brownButterLatte,
    featuredCaption: 'Brown Butter Latte — nutty toasted milk solids balanced with dark espresso.',
  },
  {
    id: 'honey-cinnamon-flat-white',
    category: 'signature',
    categoryLabel: 'Signature Drinks',
    name: 'Honey Cinnamon Flat White',
    price: '$7.00',
    serving: 'Hot · House Signature',
    description:
      'Raw Blue Mountains yellow-box blossom honey melted under double ristretto, silky microfoam, and freshly milled Ceylon cinnamon.',
    featuredImage: honeyFlatWhite,
    featuredCaption: 'Honey Cinnamon Flat White — wildflower warmth with delicate spice.',
  },
  {
    id: 'vanilla-bean-cold-brew',
    category: 'signature',
    categoryLabel: 'Signature Drinks',
    name: 'Vanilla Bean Cold Brew',
    price: '$7.50',
    serving: 'Iced · 18-Hour Steep',
    description:
      'Washed Ethiopian heirloom coffee cold-steeped for eighteen hours, served over crystal block ice with cold-whisked vanilla bean cream.',
    featuredImage: vanillaColdBrew,
    featuredCaption: 'Vanilla Bean Cold Brew — crisp stone-fruit cold brew beneath aromatic cream.',
  },
  {
    id: 'iced-maple-latte',
    category: 'signature',
    categoryLabel: 'Signature Drinks',
    name: 'Iced Maple Latte',
    price: '$7.20',
    serving: 'Iced · Shaken to Order',
    description:
      'Double espresso briskly chilled with pure amber maple reduction and poured over cold milk and hand-cut clear ice.',
  },

  // Tea and Other Drinks
  {
    id: 'matcha-latte',
    category: 'tea',
    categoryLabel: 'Tea & Other Drinks',
    name: 'Matcha Latte',
    price: '$6.80',
    serving: 'Hot or Iced · Ceremonial Grade',
    description:
      'First-harvest Uji shade-grown matcha whisked by hand in warm spring water and layered with lightly sweetened oat or dairy milk.',
  },
  {
    id: 'chai-latte',
    category: 'tea',
    categoryLabel: 'Tea & Other Drinks',
    name: 'Chai Latte',
    price: '$6.50',
    serving: 'Hot or Iced · House Brewed',
    description:
      'Whole-leaf Assam black tea simmered slowly with crushed green cardamom, fresh ginger root, cassia bark, and raw bush honey.',
  },
  {
    id: 'seasonal-iced-tea',
    category: 'tea',
    categoryLabel: 'Tea & Other Drinks',
    name: 'Seasonal Iced Tea',
    price: '$6.50',
    serving: 'Iced · Botanical Infusion',
    description:
      'Cold-infused white peony leaf steeped overnight with roasted Adelaide Hills white peach and fragrant native lemon myrtle.',
  },

  // Bakery and Light Bites
  {
    id: 'butter-croissant',
    category: 'bakery',
    categoryLabel: 'Bakery & Light Bites',
    name: 'Butter Croissant',
    price: '$6.50',
    serving: 'Baked Daily at 5:30 am',
    description:
      'Seventy-two-hour cold-fermented pastry laminated with Pepe Saya cultured butter for a shatteringly crisp golden crust.',
    featuredImage: artisanPastries,
    featuredCaption:
      'Morning Viennoiserie — cultured butter croissants and seasonal tarts baked before dawn.',
  },
  {
    id: 'almond-croissant',
    category: 'bakery',
    categoryLabel: 'Bakery & Light Bites',
    name: 'Almond Croissant',
    price: '$8.50',
    serving: 'Twice-Baked Viennoiserie',
    description:
      'Filled generously with roasted Riverland almond frangipane, brushed with citrus blossom syrup, and crowned with flaked almonds.',
  },
  {
    id: 'banana-bread',
    category: 'bakery',
    categoryLabel: 'Bakery & Light Bites',
    name: 'Banana Bread',
    price: '$8.00',
    serving: 'Toasted to Order · V',
    description:
      'Caramelised Queensland cavendish banana and dark muscovado loaf, served warm with whipped espresso-salted cultured butter.',
  },
  {
    id: 'seasonal-fruit-tart',
    category: 'bakery',
    categoryLabel: 'Bakery & Light Bites',
    name: 'Seasonal Fruit Tart',
    price: '$9.50',
    serving: 'Limited Morning Batch · V',
    description:
      'Crisp hazelnut sablé pastry filled with Madagascar vanilla diplomat cream, glazed Black Genoa figs, and crushed pistachio.',
  },
  {
    id: 'sourdough-toast',
    category: 'bakery',
    categoryLabel: 'Bakery & Light Bites',
    name: 'Sourdough Toast',
    price: '$9.00',
    serving: 'Two Thick Slices · V',
    description:
      'Wood-fired heritage wheat country sourdough served with cultured sea-salt butter and your choice of house fig conserve or whipped ricotta.',
    featuredImage: morningCoffeeTable,
    featuredCaption:
      'Heritage Sourdough & Morning Flat Whites — unhurried mornings by the window.',
  },
];

export const SIGNATURE_SHOWCASE = [
  {
    index: '01',
    name: 'Brown Butter Latte',
    temperature: 'Served Hot',
    price: '$7.20 AUD',
    notes: 'Toasted Milk Solids · Dark Cacao · Sea Salt',
    description:
      'Clarified Australian cultured butter slowly browned with whole vanilla pod, emulsified with our double espresso and velvety textured milk for a warm, savory-sweet depth.',
    image: brownButterLatte,
    alt: 'Hot Brown Butter Latte served in a speckled stoneware ceramic cup on raw travertine stone with brass spoon',
  },
  {
    index: '02',
    name: 'Honey Cinnamon Flat White',
    temperature: 'Served Hot',
    price: '$7.00 AUD',
    notes: 'Yellow-Box Honey · Ceylon Alba · Roasted Hazelnut',
    description:
      'Our tribute to Sydney’s defining coffee ritual—elevated with unfiltered Blue Mountains blossom honey and micro-milled true cinnamon over a syrupy double ristretto.',
    image: honeyFlatWhite,
    alt: 'Australian Honey Cinnamon Flat White in matte ivory ceramic cup on walnut coaster with cinnamon dusting',
  },
  {
    index: '03',
    name: 'Vanilla Bean Cold Brew',
    temperature: 'Served Iced',
    price: '$7.50 AUD',
    notes: '18-Hour Cold Steep · Stone Fruit · Vanilla Cream',
    description:
      'Single-origin Ethiopian Yirgacheffe steeped cold for eighteen hours to unlock jasmine and bergamot clarity, finished over block ice with silky vanilla bean cream.',
    image: vanillaColdBrew,
    alt: 'Tall fluted glass of Vanilla Bean Cold Brew over clear ice with swirling Madagascar vanilla cream',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'cafe-interior',
    category: 'The Café Interior',
    title: 'Sunlight Across Limewash & Timber',
    caption:
      'Designed for unhurried mornings in Surry Hills, pairing hand-trowelled warm ivory plaster with sculpted Tasmanian oak communal tables and aged brass pendants.',
    image: sydneyCafeInterior,
    alt: 'Wide architectural view of SABLE & STEAM café interior with warm limewash walls, olive banquettes, and oak tables',
    gridClass: 'md:col-span-8 aspect-[16/10]',
  },
  {
    id: 'seating-materials',
    category: 'Natural Materials & Seating',
    title: 'Fluted Oak, Honed Travertine & Olive Linen',
    caption:
      'Quiet corner banquettes upholstered in muted olive woven linen invite lingering over a second cup or an afternoon notebook session.',
    image: oakStoneSeating,
    alt: 'Corner seating area with fluted oak joinery, travertine stone table, and muted olive linen banquette',
    gridClass: 'md:col-span-4 aspect-[3/4]',
  },
  {
    id: 'coffee-preparation',
    category: 'Coffee Preparation',
    title: 'Calibrated Extraction to the Gram',
    caption:
      'Every espresso lot is dialed in each morning for water minerality, grind geometry, and extraction yield before the doors open at 6:30 am.',
    image: espressoExtraction,
    alt: 'Macro view of a brass portafilter extracting rich tiger-striped espresso into a handmade ribbed ceramic cup',
    gridClass: 'md:col-span-5 aspect-[4/3]',
  },
  {
    id: 'coffee-conversation',
    category: 'Coffee & Conversation',
    title: 'Dappled Morning Light by the Window',
    caption:
      'Ceramic cups thrown by local New South Wales potters alongside heritage sourdough toast under leafy street-level windows.',
    image: morningCoffeeTable,
    alt: 'Two ceramic cups of specialty flat white coffee and sourdough toast on a warm timber table by a sunlit window',
    gridClass: 'md:col-span-7 aspect-[4/3]',
  },
  {
    id: 'pastries-desserts',
    category: 'Pastries & Desserts',
    title: 'Dawn-Baked Laminated Viennoiserie',
    caption:
      'Small-batch butter croissants, twice-baked almond pastries, and glazed seasonal fig tarts set on stoneware platters each morning.',
    image: artisanPastries,
    alt: 'Flaky butter croissants, almond croissants, and seasonal fig tart arranged on a ceramic platter over travertine',
    gridClass: 'md:col-span-6 aspect-[4/3]',
  },
  {
    id: 'filter-bar',
    category: 'Pour-Over & Tasting Bar',
    title: 'Hand-Poured Single-Origin Filter',
    caption:
      'Our walnut tasting bar showcases rotating micro-lots brewed to order via glass carafe for delicate tea-like clarity.',
    image: heroEspressoBar,
    alt: 'Barista hand-pouring freshly brewed filter coffee into a handmade warm ivory ceramic cup at the walnut bar',
    gridClass: 'md:col-span-6 aspect-[4/3]',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'There is a rare stillness here even at eight on a Tuesday morning. You sit along the olive banquette, watch the light hit the limewash wall, and drink a flat white that tastes genuinely considered from first sip to last.',
    author: 'Claire H.',
    context: 'Architectural Designer · Surry Hills Local',
  },
  {
    quote:
      'The Brown Butter Latte could easily have been overly sweet anywhere else, yet here it is balanced, nutty, and savory enough to let the espresso shine. Paired with a warm butter croissant, it has ruined ordinary chain coffee for me.',
    author: 'Marcus T.',
    context: 'Editorial Photographer · Paddington',
  },
  {
    quote:
      'Walking up to the walnut tasting bar feels more like visiting a quiet neighborhood wine room than a rushed city café. The baristas talk through single-origin filter notes without an ounce of pretension.',
    author: 'Priya N.',
    context: 'Book Editor · Redfern',
  },
];
