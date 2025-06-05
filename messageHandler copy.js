const { enregistrerMessage } = require('./db');

async function handleMessage(client, message) {
  const numero = message.from;
  const texte = message.body.toLowerCase();
  let reponse = '';

  console.log('Message reçu :', message); // 🔍 Pour le debug

  // 👉 Cas du menu principal
  if (texte === 'menu') {
    const sections = [
      {
        title: 'Nos offres',
        rows: [
          { title: '🧠 Nos services', rowId: 'services' },
          { title: '🛠️ Nos logiciels', rowId: 'logiciels' },
          { title: '📞 Contact & devis', rowId: 'contact' },
          { title: 'ℹ️ À propos de nous', rowId: 'about' },
        ]
      }
    ];

    await client.sendListMessage(numero, {
      buttonText: 'Choisissez une option',
      description: 'Bienvenue chez Success Technologies 👋',
      sections,
      title: 'Menu principal'
    });

    return;
  }

  // 👉 Cas où le message est une réponse à la liste
  const rowId = message?.listResponse?.singleSelectReply?.selectedRowId;

  if (message.type === 'list_response' && rowId) {
    switch (rowId) {
      case 'services':
        reponse = `✅ Voici nos services :
🌐 Création de sites
💻 Dév. d'applications
📤 Email & WhatsApp Marketing
🤖 Chatbots`;
        break;

      case 'logiciels':
        reponse = `💡 Nos logiciels :
🏥 TOPSANTE
🎓 PRIMA-SOFT
🏪 MasterPro`;
        break;

      case 'contact':
        reponse = `📞 Contact :
📱 +228 99 36 70 71 / 93 44 29 17
📧 edavidlesage@gmail.com`;
        break;

      case 'about':
        reponse = `ℹ️ Success Technologies :
Experts en dev, logiciels & marketing digital.`;
        break;

      default:
        reponse = `❗ Option inconnue. Tapez *menu* pour recommencer.`;
    }

    await client.sendText(numero, reponse);
    await enregistrerMessage(numero, rowId, reponse);
    return;
  }

  // 👉 Cas par défaut
  if (!message.isGroupMsg) {
    reponse = `❗ Commande non reconnue.\nTapez *menu* pour voir les options.`;
    await client.sendText(numero, reponse);
    await enregistrerMessage(numero, texte, reponse);
  }
}

module.exports = handleMessage;
