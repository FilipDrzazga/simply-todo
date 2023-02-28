const authMessageHandler = (errors) => {
    switch (errors) {
        case "login":
            return {
                message: 'Welcome back.',
                messageDescripction: 'Enjoy your family app.',
                icon: 'circle-check',
                iconColor: 'green'
            }
        case "create-account":
            return {
                message: 'Well done.',
                messageDescripction: 'Thanks for creating new account.',
                icon: 'circle-check',
                iconColor: 'green'
            }
            case "reset-password":
            return {
                message: 'Well done.',
                messageDescripction: 'Your reset link was sended to your email.',
                icon: 'circle-check',
                iconColor: 'green'
            }
        case "auth/email-already-in-use":
            return {
                message: 'Ooops!',
                messageDescripction: 'User email already exist. Try to login.',
                icon: 'circle-xmark',
                iconColor: 'red'
            }
        case "auth/user-not-found":
            return {
                message:'Ooops!',
                messageDescripction:`User doesn't exist. Try to create account.`,
                icon:'circle-xmark',
                iconColor:'red',
            }
        case "auth/wrong-password":
            return {
                message:'Ooops!',
                messageDescripction:`Wrong password or email adress. `,
                icon:'circle-xmark',
                iconColor:'red',
            }
        case "auth/invalid-email":
            return {
                message:'Ooops!',
                messageDescripction:`Wrong password or email adress. `,
                icon:'circle-xmark',
                iconColor:'red',
            }
        default:
            return '';
    };
};

export { authMessageHandler };
