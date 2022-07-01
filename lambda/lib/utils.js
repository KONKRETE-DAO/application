
exports.generateRandomCode = (digitsNumber) => {
    return (Math.floor(Math.random() * (Math.pow(10, digitsNumber)))).toString().padStart(digitsNumber, '0');
}