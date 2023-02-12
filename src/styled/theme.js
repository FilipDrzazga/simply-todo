const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

const rules = {
    breakpoints: {
        mobile: `(min-width:${size.mobile})`,
        tablet: `(min-width:${size.tablet})`,
        laptop: `(min-width:${size.laptop})`,
        laptopL: `(min-width:${size.laptopL})`,
        desktop: `(min-width:${size.desktop})`
    },
    margin: ['0rem', '0.3rem', '0.6rem', '0.9rem', '1.2rem', '1.5rem', '1.8rem'],
    padding: ['0rem', '0.3rem', '0.6rem', '0.9rem', '1.2rem', '1.5rem', '1.8rem'],
    fontSizes: ['0.7rem', '1rem', '1.2rem', '1.5rem'],
    colors: {
        darkPurple: '#080227',
        purple: '#13044E',
        lightPurple: '#EFECFE',
        gray: '#7D8A9D',
        white: '#FFFFFF'
    },
};

export { rules };