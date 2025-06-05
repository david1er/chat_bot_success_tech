const wppconnect = require('@wppconnect-team/wppconnect');
const handleMessage = require('./messageHandler');

wppconnect
  .create({
    session: 'browser',
    catchQR: (base64Qrimg, asciiQR) => {
      console.log('QR Code reçu, scannez-le avec WhatsApp :');
      console.log(asciiQR);
    },
    pathNameToken: './tokens/',
    headless: true,
    puppeteerOptions: {
      args: ['--no-sandbox'],
    }
  })
  .then((client) => {
    console.log('✅ Client connecté avec succès');
    client.onMessage((message) => handleMessage(client, message));
  })
  .catch((error) => {
    console.error('Erreur de connexion :', error);
  });
