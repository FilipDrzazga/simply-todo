const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const rules = {
    breakpoints: {
        mobile: `(min-width:${size.mobile})`,
        tablet: `(min-width:${size.tablet})`,
        laptop: `(min-width:${size.laptop})`,
        laptopL: `(min-width:${size.laptopL})`,
        desktop: `(min-width:${size.desktop})`
    },
    space: ['0rem', '0.3rem', '0.6rem', '0.9rem', '1.2rem', '1.5rem', '1.8rem'],
    fonts: 'Roboto, sans-serif, Arial',
    fontSizes: ['0.4rem', '0.8rem', '1.2rem', '1.6rem', '2rem'],
    colors: {
        darkPurple: '#080227',
        purple: '#13044E',
        lightPurple: '#EFECFE',
        gray: '#7D8A9D',
        white: '#FFFFFF'
    },
};