export const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        if (i % 5 === 0 && i !== 0) {
            result += '-';
        }
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

