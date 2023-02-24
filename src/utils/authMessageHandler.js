const authMessageHandler = (errors = false) => {
    if (!errors) {
        return {
            message: 'Well done.',
            messageDescripction: 'Thanks for creating new account.',
            icon: 'circle-check',
            iconColor: 'green'
        }
    }
    switch (errors) {
        case "auth/email-already-in-use":
            return {
                message: 'Ooops!',
                messageDescripction: 'User email already exist. Try to login.',
                icon: 'circle-xmark',
                iconColor: 'red'
            }
        default:
            return '';
    };
};

export { authMessageHandler };
// "auth/email-already-in-use"
// "auth/invalid-email"
// "auth/wrong-password"
