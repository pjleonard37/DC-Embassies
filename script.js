mapboxgl.accessToken =
    "pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoiY2xoMmNjODFtMTh4NzNzc2FhZWVibGR6cSJ9.eFd7Y9jGlJUP-dm0MBMvpg";

const map = new mapboxgl.Map({
    container: "map",
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/pjleonard37/clh1yey3t015s01p8bwzy2e4b",
    center: [-77.0498, 38.9296],
    zoom: 12
});

// Define the bounding box coordinates for Washington, DC
const bounds = [

    [
        -77.1874096044419,
        38.794609719509026
    ],
    [
        -76.89956678821437,
        39.0246853523891
    ]
];
map.setMaxBounds(bounds);

// Fetch embassy location data from Open Data DC Portal: https://opendata.dc.gov/
fetch(
    "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Cultural_and_Society_WebMercator/MapServer/0/query?outFields=*&where=1%3D1&f=geojson"
)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
        // Add a marker to the map for each embassy
        for (const feature of data.features) {
            // Create a DOM element for each marker.
            const el = document.createElement("div");
            const countryCode = getCountryCode(feature.properties.COUNTRY);
            const countryAddress = formatAddress(feature.properties.ADDRESS);

            // Add the flag with CSS
            el.className = "marker fi fi-" + countryCode;
            el.style.width = `30px`;
            el.style.height = `30px`;
            el.style.backgroundSize = "100%";

            // Add marker to the map.
            const marker = new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);

            // Create a popup
            const popup = new mapboxgl.Popup({
                closeOnClick: true,
                closeButton: false,
                focusAfterOpen: false
            })
                .setHTML("<h3>" + feature.properties.COUNTRY + "</h3><a href=" + feature.properties.WEBURL + " >" + countryAddress + "</a>");

            // Attach the popup to the marker
            marker.setPopup(popup);

            // Show the popup when the marker is clicked
            marker.on('click', () => {
                popup.addTo(map);
            });
        }
    })
    .catch((error) => console.error(error)); // Handle any errors

// Uppercase first letter of each address 
function formatAddress(str) {
    return str.split(' ').map(word => {
        if (word === 'NW') {
            return 'NW';
        } else {
            return word.charAt(0) + word.slice(1).toLowerCase();
        }
    }).join(' ');
}

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
        'Bahamas': 'bs',
        'Bahrain': 'bh',
        'Bangladesh': 'bd',
        'Barbados': 'bb',
        'Belarus': 'by',
        'Belgium': 'be',
        'Belize': 'bz',
        'Benin': 'bj',
        'Bolivia': 'bo',
        'Bosnia and Herzegovina': 'ba',
        'Botswana': 'bw',
        'Brazil': 'br',
        'Brunei Darussalam': 'bn',
        'Bulgaria': 'bg',
        'Burkina Faso': 'bf',
        'Myanmar': 'mm',
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
        'Congo, Democratic Rep.': 'cd',
        'Congo (Republic)': 'cg',
        'Costa Rica': 'cr',
        'Cote D\'Ivoire': 'ci',
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
        'European Union': 'eu',
        'Fiji': 'fj',
        'Finland': 'fi',
        'France': 'fr',
        'Gabon': 'ga',
        'Gambia, The': 'gm',
        'Georgia': 'ge',
        'Germany': 'de',
        'Ghana': 'gh',
        'Greece': 'gr',
        'Grenada': 'gd',
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
        'Micronesia': 'fm',
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
        'Slovak Republic': 'sk',
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
        'East Timor': 'tl',
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
        'Holy See (The)': 'va',
        'Venezuela': 've',
        'Vietnam': 'vn',
        'Yemen': 'ye',
        'Zambia': 'zm',
        'Zimbabwe': 'zw'
    };

    // Return the country code if found, otherwise return null
    return embassyCountries[countryName] || null;
}