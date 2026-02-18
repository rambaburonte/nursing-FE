// Utility to fetch country list from a public API
interface CountryData {
  name?: {
    common?: string;
    official?: string;
  };
}

interface BackupCountryData {
  country: string;
}

export async function fetchCountries(): Promise<string[]> {
    try {
        // Try primary API
        const res = await fetch('https://restcountries.com/v3.1/all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            // Add timeout
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!res.ok) throw new Error('Failed to fetch countries from primary API');

        const data: CountryData[] = await res.json();

        // Extract and sort country names, including all sovereign states and territories
        const countries = data
            .map((c: CountryData) => c.name?.common || c.name?.official)
            .filter((name: string | undefined): name is string => name !== undefined && name.trim().length > 0)
            .sort((a: string, b: string) => a.localeCompare(b));

        // Remove duplicates
        const uniqueCountries = [...new Set(countries)];

        return uniqueCountries;

    } catch (error) {
        console.warn('Primary countries API failed, using fallback list:', error);

        // Try secondary API as backup
        try {
            const backupRes = await fetch('https://countriesnow.space/api/v0.1/countries', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                signal: AbortSignal.timeout(5000)
            });

            if (backupRes.ok) {
                const backupData = await backupRes.json();
                if (backupData.data && Array.isArray(backupData.data)) {
                    return backupData.data
                        .map((c: BackupCountryData) => c.country)
                        .filter((name: string) => name && name.trim().length > 0)
                        .sort((a: string, b: string) => a.localeCompare(b));
                }
            }
        } catch (backupError) {
            console.warn('Backup countries API also failed:', backupError);
        }

        // Comprehensive fallback list with all possible countries and territories
        return [
            'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
            'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
            'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
            'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
            'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
            'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
            'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
            'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
            'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
            'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
            'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
            'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
            'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea',
            'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
            'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
            'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
            'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
            'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
            'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
            'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
            // Additional countries and territories
            'American Samoa', 'Anguilla', 'Aruba', 'Bermuda', 'British Indian Ocean Territory', 'British Virgin Islands',
            'Cayman Islands', 'Christmas Island', 'Cocos (Keeling) Islands', 'Cook Islands', 'Curaçao', 'Falkland Islands',
            'Faroe Islands', 'French Guiana', 'French Polynesia', 'Gibraltar', 'Greenland', 'Guadeloupe', 'Guam', 'Guernsey',
            'Heard Island and McDonald Islands', 'Hong Kong', 'Isle of Man', 'Jersey', 'Macau', 'Martinique', 'Mayotte',
            'Montserrat', 'New Caledonia', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Pitcairn Islands',
            'Puerto Rico', 'Réunion', 'Saint Barthélemy', 'Saint Helena', 'Saint Martin', 'Saint Pierre and Miquelon',
            'Sint Maarten', 'South Georgia and the South Sandwich Islands', 'Svalbard and Jan Mayen', 'Tokelau',
            'Turks and Caicos Islands', 'U.S. Virgin Islands', 'Wallis and Futuna', 'Western Sahara', 'Åland Islands',
            'Other'
        ];
    }
}