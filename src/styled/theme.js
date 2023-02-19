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
    margin: ['0.4rem', '0.9rem', '1.2rem', '1.5rem', '1.8rem', '2.4rem','2.6rem'],
    padding: ['0rem', '0.3rem', '0.6rem', '0.9rem', '1.2rem', '1.5rem', '1.8rem'],
    fontSizes: ['0.8rem', '1rem', '1.2rem', '1.5rem', '2rem', '2.1rem'],
    colors: {
        darkPurple: '#080227',
        purple: '#13044E',
        lightPurple: '#E3DDFF',
        gray: '#7D8A9D',
        lightGray:'#F9FAFF',
        placeholder: '#D0D5DC',
        inputFocus: '#1C53F4',
        inputFocusOutline: '#1C53F450',
        white: '#FFFFFF'
    },
};

export { rules };