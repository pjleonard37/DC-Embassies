mapboxgl.accessToken =
  "pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoic2YyV2luUSJ9.lPoix24JhyR8sljAwjHg9A";

const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/pjleonard37/clh1yey3t015s01p8bwzy2e4b",
  center: [-77.039825446125207, 38.899343807821666],
  projection: "mercator",
  zoom: 11
});

fetch(
  "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Cultural_and_Society_WebMercator/MapServer/0/query?outFields=*&where=1%3D1&f=geojson"
)
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    // Add markers to the map.
    for (const feature of data.features) {
      // Create a DOM element for each marker.
      const el = document.createElement("div");
      const countryCode = getCountryCode(feature.properties.COUNTRY);
      el.className = "marker fi fi-" + countryCode;
      el.style.width = `30px`;
      el.style.height = `30px`;
      el.style.backgroundSize = "100%";

      el.addEventListener("click", () => {
        window.alert(feature.properties.COUNTRY);
      });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    }
  })
  .catch((error) => console.error(error)); // Handle any errors

function getCountryCode(countryName) {
  // Create an object mapping country names to ISO 3166-1-alpha-2 codes
  const embassyCountries = {
    'Afghanistan': 'af',
    'Albania': 'al',
    'Algeria': 'dz',
    'Angola': 'ao',
    'Argentina': 'ar',
    'Armenia': 'am',
    'Australia': 'au',
    'Austria': 'at',
    'Azerbaijan': 'az',
    'Bahrain': 'bh',
    'Bangladesh': 'bd',
    'Belarus': 'by',
    'Belgium': 'be',
    'Benin': 'bj',
    'Bolivia': 'bo',
    'Bosnia and Herzegovina': 'ba',
    'Botswana': 'bw',
    'Brazil': 'br',
    'Bulgaria': 'bg',
    'Burkina Faso': 'bf',
    'Burma': 'mm',
    'Burundi': 'bi',
    'Cambodia': 'kh',
    'Cameroon': 'cm',
    'Canada': 'ca',
    'Cape Verde': 'cv',
    'Central African Republic': 'cf',
    'Chad': 'td',
    'Chile': 'cl',
    'China': 'cn',
    'Colombia': 'co',
    'Comoros': 'km',
    'Congo, Democratic Republic of the': 'cd',
    'Congo, Republic of the': 'cg',
    'Costa Rica': 'cr',
    'Cote d\'Ivoire': 'ci',
    'Croatia': 'hr',
    'Cuba': 'cu',
    'Cyprus': 'cy',
    'Czech Republic': 'cz',
    'Denmark': 'dk',
    'Djibouti': 'dj',
    'Dominican Republic': 'do',
    'Ecuador': 'ec',
    'Egypt': 'eg',
    'El Salvador': 'sv',
    'Equatorial Guinea': 'gq',
    'Eritrea': 'er',
    'Estonia': 'ee',
    'Ethiopia': 'et',
    'Fiji': 'fj',
    'Finland': 'fi',
    'France': 'fr',
    'Gabon': 'ga',
    'Gambia, The': 'gm',
    'Georgia': 'ge',
    'Germany': 'de',
    'Ghana': 'gh',
    'Greece': 'gr',
    'Guatemala': 'gt',
    'Guinea': 'gn',
    'Guinea-Bissau': 'gw',
    'Guyana': 'gy',
    'Haiti': 'ht',
    'Honduras': 'hn',
    'Hungary': 'hu',
    'Iceland': 'is',
    'India': 'in',
    'Indonesia': 'id',
    'Iran': 'ir',
    'Iraq': 'iq',
    'Ireland': 'ie',
    'Israel': 'il',
    'Italy': 'it',
    'Jamaica': 'jm',
    'Japan': 'jp',
    'Jordan': 'jo',
    'Kazakhstan': 'kz',
    'Kenya': 'ke',
    'Kiribati': 'ki',
    'Korea': 'kr',
    'Kosovo': 'xk',
    'Kuwait': 'kw',
    'Kyrgyzstan': 'kg',
    'Laos': 'la',
    'Latvia': 'lv',
    'Lebanon': 'lb',
    'Lesotho': 'ls',
    'Liberia': 'lr',
    'Libya': 'ly',
    'Liechtenstein': 'li',
    'Lithuania': 'lt',
    'Luxembourg': 'lu',
    'Macedonia': 'mk',
    'Madagascar': 'mg',
    'Malawi': 'mw',
    'Malaysia': 'my',
    'Maldives': 'mv',
    'Mali': 'ml',
    'Malta': 'mt',
    'Marshall Islands': 'mh',
    'Mauritania': 'mr',
    'Mauritius': 'mu',
    'Mexico': 'mx',
    'Micronesia, Federated States of': 'fm',
    'Moldova': 'md',
    'Monaco': 'mc',
    'Mongolia': 'mn',
    'Montenegro': 'me',
    'Morocco': 'ma',
    'Mozambique': 'mz',
    'Namibia': 'na',
    'Nauru': 'nr',
    'Nepal': 'np',
    'Netherlands': 'nl',
    'New Zealand': 'nz',
    'Nicaragua': 'ni',
    'Niger': 'ne',
    'Nigeria': 'ng',
    'Norway': 'no',
    'Oman': 'om',
    'Pakistan': 'pk',
    'Palau': 'pw',
    'Panama': 'pa',
    'Papua New Guinea': 'pg',
    'Paraguay': 'py',
    'Peru': 'pe',
    'Philippines': 'ph',
    'Poland': 'pl',
    'Portugal': 'pt',
    'Qatar': 'qa',
    'Romania': 'ro',
    'Russian Federation': 'ru',
    'Rwanda': 'rw',
    'Saint Kitts and Nevis': 'kn',
    'Saint Lucia': 'lc',
    'Saint Vincent and the Grenadines': 'vc',
    'Samoa': 'ws',
    'San Marino': 'sm',
    'Sao Tome and Principe': 'st',
    'Saudi Arabia': 'sa',
    'Senegal': 'sn',
    'Serbia': 'rs',
    'Seychelles': 'sc',
    'Sierra Leone': 'sl',
    'Singapore': 'sg',
    'Slovakia': 'sk',
    'Slovenia': 'si',
    'Solomon Islands': 'sb',
    'Somalia': 'so',
    'South Africa': 'za',
    'South Sudan': 'ss',
    'Spain': 'es',
    'Sri Lanka': 'lk',
    'Sudan': 'sd',
    'Suriname': 'sr',
    'Swaziland': 'sz',
    'Sweden': 'se',
    'Switzerland': 'ch',
    'Syria': 'sy',
    'Taiwan': 'tw',
    'Tajikistan': 'tj',
    'Tanzania': 'tz',
    'Thailand': 'th',
    'East-Timor': 'tl',
    'Togo': 'tg',
    'Tonga': 'to',
    'Trinidad and Tobago': 'tt',
    'Tunisia': 'tn',
    'Turkey': 'tr',
    'Turkmenistan': 'tm',
    'Tuvalu': 'tv',
    'Uganda': 'ug',
    'Ukraine': 'ua',
    'United Arab Emirates': 'ae',
    'United Kingdom': 'gb',
    'Uruguay': 'uy',
    'Uzbekistan': 'uz',
    'Vanuatu': 'vu',
    'Vatican City': 'va',
    'Venezuela': 've',
    'Vietnam': 'vn',
    'Yemen': 'ye',
    'Zambia': 'zm',
    'Zimbabwe': 'zw'
  };

  // Return the country code if found, otherwise return null
  return embassyCountries[countryName] || null;
}