const { enregistrerMessage } = require('./db');

async function handleMessage(client, message) {
  const numero = message.from;
  const texte = message.body.toLowerCase();
  let reponse = '';

  console.log('Message reçu :', message); // Pour le debug

  // Menu principal
  if (
    texte === 'menu' ||
    texte.includes('bonjour') ||
    texte.includes('bonsoir') ||
    texte.includes('cc') ||
    texte.includes('salut')
  ) {
    const sections = [
      {
        title: 'Nos offres',
        rows: [
          { title: '🧠 Nos services', rowId: 'services' },
          { title: '🛠️ Nos logiciels', rowId: 'logiciels' },
          { title: '📞 Contact & devis', rowId: 'contact' },
          { title: 'ℹ️ À propos de nous', rowId: 'about' },
          { title: '🌐 NOTRE SITE WEB', rowId: 'notre_site_web' },
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

  // Traitement des réponses aux listes
  const rowId = message?.listResponse?.singleSelectReply?.selectedRowId;

  if (message.type === 'list_response' && rowId) {
    switch (rowId) {
      case 'services':
        // Sous-menu des services
        const serviceSections = [
          {
            title: 'Nos services',
            rows: [
              { title: '🌐 Développement de sites web', rowId: 'site_web' },
              { title: '🛠️ Nos logiciels', rowId: 'logiciels' },
              { title: '📱 Développement d\'applications', rowId: 'applications' },
              { title: '📤 Email & WhatsApp Marketing', rowId: 'marketing' },
              { title: '🤖 Chatbots', rowId: 'chatbots' },
              { title: '🛠️ Services informatiques', rowId: 'services_info' },
              { title: '📊 Études et propositions de solutions', rowId: 'etudes_solutions' },
              { title: '🌐 NOTRE SITE WEB', rowId: 'notre_site_web' },
            ]
          }
        ];

        await client.sendListMessage(numero, {
          buttonText: 'Choisissez un service',
          description: 'Voici nos services principaux :',
          sections: serviceSections,
          title: 'Services Success Technologies'
        });

        return;

        case 'logiciels':
            const logicielsSections = [
              {
                title: 'Nos logiciels professionnels',
                rows: [
                  { title: '🏥 TOPSANTE', rowId: 'topsante' },
                  { title: '🎓 PRIMA-SOFT', rowId: 'prima' },
                  { title: '🏪 MasterPro', rowId: 'masterpro' },
                ]
              }
            ];
    
            await client.sendListMessage(numero, {
              buttonText: 'Choisissez un logiciel',
              description: 'Voici nos logiciels disponibles :',
              sections: logicielsSections,
              title: '💡 Nos logiciels'
            });
            return;
    
          case 'topsante':
            const topsanteSections = [
              {
                title: 'TOPSANTE - Détails',
                rows: [
                  { title: '📄 DÉTAIL', rowId: 'topsante_detail' },
                  { title: '🛠 INSTALLATION', rowId: 'topsante_install' },
                  { title: '🏥 STRUCTURES CONCERNÉES', rowId: 'topsante_structures' },
                  { title: '📝 FICHE DE RENSEIGNEMENT', rowId: 'topsante_fiche' },
                ]
              }
            ];
    
            await client.sendListMessage(numero, {
              buttonText: 'Choisissez une option',
              description: 'Choisissez une information sur le logiciel TOPSANTE',
              sections: topsanteSections,
              title: '🏥 Logiciel TOPSANTE'
            });
            return;
    
          case 'topsante_detail':
            reponse = `✅ Dossiers Médicaux Électroniques :
    Accédez aux dossiers médicaux des patients de manière sécurisée, avec recherche rapide et suivi.
    
    ✅ Gestion des Rendez-vous :
    Planifiez et gérez les rendez-vous pour réduire les temps d’attente.
    
    ✅ Facturation et Gestion Financière :
    Automatisez facturation, paiements et revenus pour plus de rentabilité.
    
    ✅ Gestion des Stocks :
    Suivez les médicaments et fournitures pour éviter pertes et ruptures.
    
    ✅ Analyse des Données :
    Obtenez des rapports clairs pour optimiser vos opérations.
    
    ✅ Sécurité et Conformité :
    Protégez les données de vos patients avec des mesures de sécurité avancées.`;
            break;
    
          case 'topsante_install':
            reponse = `🛠 Une solution flexible et accessible :
    - Installation locale ou en ligne
    - Multi-supports : ordinateur, tablette, smartphone
    - Personnalisable : s'adapte aux petites et grandes structures

    💰 OFFRE PROMO :
- 150 000 FCFA/an (au lieu de 200 000)
- 700 000 FCFA achat perpétuel (au lieu de 1 000 000)`;
            break;
    
          case 'topsante_structures':
            reponse = `🏫 TOPSANTE est idéal pour :
        - Centres de sante
        - CLINIQUE
        - HOPITAL
        - ÉTABLISSEMENT DE SANTÉ
        - Instituts de certification
        - Écoles techniques et privées
        
        Il s'adapte aux petites comme aux grandes structures.`;
            break;
    
          case 'topsante_fiche':
            // Envoi d'un fichier PDF
            await client.sendFile(numero, './media/fiche_topsante.pdf', 'fiche_topsante.pdf', '📎 Voici la fiche de renseignement pour TOPSANTE.');
            return;
    
            case 'prima':
                const primaSections = [
                  {
                    title: 'PRIMA-SOFT - GESTION DES CENTRES',
                    rows: [
                      { title: '📄 DÉTAIL', rowId: 'prima_detail' },
                      { title: '🛠 INSTALLATION', rowId: 'prima_install' },
                      { title: '🏫 STRUCTURES CONCERNÉES', rowId: 'prima_structures' },
                      { title: '📝 FICHE DE RENSEIGNEMENT', rowId: 'prima_fiche' },
                    ]
                  }
                ];
        
                await client.sendListMessage(numero, {
                  buttonText: 'Choisissez une option',
                  description: 'Détails sur PRIMA-SOFT, la solution pour les centres de formation.',
                  sections: primaSections,
                  title: '🎓 PRIMA-SOFT'
                });
                return;
        
              case 'prima_detail':
                reponse = `🎓 PRIMA-SOFT – Logiciel de gestion pour centres de formation et académies
        
        ✅ Gestion des Inscriptions :
        Formulaires numériques, suivi des dossiers, validation rapide.
        
        ✅ Paiements et Facturation :
        Gestion des échéances, alertes de retard, reçus automatiques.
        
        ✅ Contrats de Voyage :
        Suivi des programmes, échéances et paiements spécifiques.
        
        ✅ Suivi Académique :
        Notes, cours suivis, compétences acquises par étudiant.
        
        ✅ Relevés de Notes et Certificats :
        Générés automatiquement avec QR Code de vérification.
        
        ✅ Multi-Centre :
        Gérez plusieurs établissements avec un tableau de bord centralisé.
        
        ✅ Statistiques et Finances :
        Rapports financiers mensuels/annuels en temps réel.
        
        ✅ Sécurité :
        Accès sécurisé, gestion des rôles, conforme RGPD.`;
                break;
        
              case 'prima_install':
                reponse = `🛠 PRIMA-SOFT est :
        - Disponible en version locale ou en ligne.
        - Accessible sur ordinateur, tablette, et smartphone.
        - Facile à personnaliser selon le type d'établissement.
        Profitez de notre OFFRE PROMOTIONNELLE :
        ✅ 150 000 FCFA/an (au lieu de 200 000)
        ✅ 500 000 FCFA en achat perpétuel (au lieu de 700 000)`;
                break;
        
              case 'prima_structures':
                reponse = `🏫 PRIMA-SOFT est idéal pour :
        - Centres de formation professionnelle
        - Académies de langues
        - Instituts de certification
        - Écoles techniques et privées
        
        Il s'adapte aux petites comme aux grandes structures.`;
                break;
        
              case 'prima_fiche':
                await client.sendFile(numero, './media/fiche_prima.pdf', 'fiche_prima.pdf', '📎 Voici la fiche de renseignement pour PRIMA-SOFT.');
                return;
        
    
                case 'masterpro':
        const masterProSections = [
          {
            title: 'MASTERPRO - GESTION COMMERCIALE',
            rows: [
              { title: '📄 DÉTAIL', rowId: 'masterpro_detail' },
              { title: '🛠 INSTALLATION', rowId: 'masterpro_install' },
              { title: '🏬 STRUCTURES CONCERNÉES', rowId: 'masterpro_structures' },
              { title: '📝 FICHE DE RENSEIGNEMENT', rowId: 'masterpro_fiche' },
            ]
          }
        ];

        await client.sendListMessage(numero, {
          buttonText: 'Choisissez une option',
          description: 'Découvrez les fonctionnalités de MasterPro.',
          sections: masterProSections,
          title: '🏪 MasterPro'
        });
        return;

      case 'masterpro_detail':
        reponse = `🏪 MasterPro – Logiciel de gestion pour commerces

✅ Ventes & Facturation :
- Encaissement rapide avec impression automatique
- Remises, promotions, fidélisation
- Paiements espèces, cartes, mobile money

✅ Stocks & Approvisionnements :
- Niveau de stock en temps réel
- Alertes de rupture/surstock
- Commandes et réapprovisionnements automatisés

✅ Suivi Financier :
- Tableau de bord dépenses/recettes
- Gestion dettes, crédits clients/fournisseurs
- Rapports de rentabilité générés automatiquement

✅ Multi-Magasins & Multi-Utilisateurs :
- Gestion centralisée de plusieurs points de vente
- Rôles et permissions par employé

✅ Statistiques & Analyses :
- Produits les plus vendus
- Tendances pour anticiper les besoins
- Rapports de gestion stratégique

✅ Sécurité & Accessibilité :
- Accès sécurisé avec sauvegardes
- Utilisable en local ou en ligne sur tous supports`;
        break;

      case 'masterpro_install':
        reponse = `🛠 MasterPro s’installe :
- En local ou sur le cloud
- Utilisable sur PC, tablette, smartphone
- Facile à configurer selon votre commerce

💰 OFFRE PROMO :
- 150 000 FCFA/an (au lieu de 200 000)
- 700 000 FCFA achat perpétuel (au lieu de 1 000 000)`;
        break;

      case 'masterpro_structures':
        reponse = `🏬 MasterPro convient à :
- Supermarchés
- Boutiques
- Restaurants
- Pharmacies et dépôts
- Grossistes et distributeurs

Idéal pour tout commerce cherchant à mieux gérer ses opérations.`;
        break;

      case 'masterpro_fiche':
        await client.sendFile(numero, './media/fiche_masterpro.pdf', 'fiche_masterpro.pdf', '📎 Voici la fiche de renseignement de MasterPro.');
        return;

      case 'contact':
        reponse = `📞 Contact :\n\n📱 <a href=\"https://wa.me/22899367071\">Écrire sur WhatsApp (+228 99 36 70 71)</a>\n📱 <a href=\"https://wa.me/22893442917\">Écrire sur WhatsApp (+228 93 44 29 17)</a>\n\n📧 edavidlesage@gmail.com`;
        break;

        case 'notre_site_web':
        reponse = "🌐 SUCCESS TECHNOLOGIES :\nDécouvrez nos solutions digitales innovantes pour booster votre activité !\n👉 <a href=\"https://successtechnologies.global-petrol.org/\">Visitez notre site</a> ou <a href=\"https://wa.me/22899367071?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20vos%20solutions%20digitales%20!\">Écrivez-nous sur WhatsApp</a> !";
        break;

      case 'about':
        reponse = `ℹ️ Success Technologies :
Experts en développement, logiciels & marketing digital.`;
        break;

      // Sous-menus des services
      case 'siteweb':
        const siteWebSections = [
          {
            title: 'NOS OFFRES DE CRÉATION DE SITES WEB',
            rows: [
              { title: '🌐 Site Vitrine – 80 000 F CFA', rowId: 'site_vitrine' },
              { title: '📄 Site Multi-pages – 100 000 F CFA', rowId: 'site_multi' },
              { title: '🛒 Site E-commerce – 120 000 F CFA', rowId: 'site_ecommerce' },
              { title: '❓ Pourquoi nous choisir ?', rowId: 'site_why' }
            ]
          }
        ];

        await client.sendListMessage(numero, {
          buttonText: 'Choisissez un type de site',
          description: 'Des sites web professionnels, modernes et sécurisés.',
          sections: siteWebSections,
          title: '🌍 CRÉATION DE SITE WEB'
        });
        return;

      case 'site_vitrine':
        reponse = `🌐 SITE VITRINE – 80 000 F CFA

✅ Présentation de vos services en ligne.
✅ Design moderne et responsive (mobile/tablette).
✅ Formulaire de contact.
✅ Google Maps pour localiser votre entreprise.
✅ Hébergement + nom de domaine inclus (1 an).

💡 Idéal pour : Artisans, TPE, entrepreneurs.`;
        break;

      case 'site_multi':
        reponse = `📄 SITE MULTI-PAGES – 100 000 F CFA

✅ Toutes les fonctions du site vitrine.
✅ Pages supplémentaires : Accueil, À propos, Services, Blog, Portfolio, Contact…
✅ Galerie photos, intégration vidéos.
✅ SEO optimisé + réseaux sociaux.
✅ Hébergement + nom de domaine inclus (1 an).

💡 Idéal pour : PME, associations, professionnels.`;
        break;

      case 'site_ecommerce':
        reponse = `🛒 SITE E-COMMERCE – 120 000 F CFA

✅ Boutique en ligne complète.
✅ Paiements sécurisés (Flooz, T-Money, cartes).
✅ Gestion des produits, commandes, stocks.
✅ Suivi des commandes + comptes clients.
✅ Calcul automatique des frais de livraison.
✅ SEO optimisé.

💡 Idéal pour : Vente en ligne de produits physiques ou digitaux.`;
        break;

      case 'site_why':
        reponse = `🎯 POURQUOI CHOISIR SUCCESS TECHNOLOGIES ?

✔️ Sites performants et personnalisés.
✔️ Compatibilité mobile/tablette/PC.
✔️ Sécurité et rapidité optimales.
✔️ Assistance et support technique après mise en ligne.
✔️ Offres claires et adaptées à chaque budget.

👨‍💻 Nous vous accompagnons de la conception à la mise en ligne.`;
        break;


      case 'applications':
        reponse = `📱 Développement d'applications :
Applications mobiles et web sur mesure pour optimiser vos processus métiers.`;
        break;

      case 'marketing':
        reponse = `📤 Email & WhatsApp Marketing :
Campagnes ciblées pour améliorer votre communication et fidéliser vos clients.`;
        break;

      case 'chatbots':
            const chatbotSections = [
              {
                title: 'NOS SOLUTIONS CHATBOT',
                rows: [
                  { title: '💬 Chatbot pour Site Web', rowId: 'chatbot_web' },
                  { title: '📱 Chatbot WhatsApp', rowId: 'chatbot_whatsapp' },
                  { title: '🔗 Connexion Base de Données', rowId: 'chatbot_db' },
                  { title: '⚙️ Automatisation Avancée', rowId: 'chatbot_auto' }
                ]
              }
            ];
    
            await client.sendListMessage(numero, {
              buttonText: 'Choisissez une option',
              description: 'Des chatbots intelligents pour répondre automatiquement à vos clients.',
              sections: chatbotSections,
              title: '🤖 RÉALISATION DE CHATBOTS'
            });
            return;
    
          case 'chatbot_web':
            reponse = `💬 CHATBOT POUR SITE WEB
    
    ✅ Intégré directement sur votre site.
    ✅ Répond automatiquement aux questions fréquentes.
    ✅ Améliore l’expérience utilisateur.
    ✅ Disponible 24h/24.
    
    🎯 Objectif : guider vos visiteurs et générer plus de contacts.`;
            break;
    
          case 'chatbot_whatsapp':
            reponse = `📱 CHATBOT WHATSAPP
    
    ✅ Répond automatiquement aux messages WhatsApp.
    ✅ Fournit des infos, prend des commandes, gère les FAQ.
    ✅ Interface simple et intuitive pour les clients.
    ✅ Compatible avec WPPConnect et Venom Bot.
    
    🎯 Objectif : automatiser vos échanges clients.`;
            break;
    
          case 'chatbot_db':
            reponse = `🔗 CONNEXION BASE DE DONNÉES
    
    ✅ Le chatbot récupère dynamiquement les données (produits, disponibilités, clients, etc.).
    ✅ Idéal pour : boutique, centre de formation, service client.
    ✅ Connexion avec PostgreSQL, MySQL, MongoDB…
    
    🎯 Objectif : des réponses personnalisées et en temps réel.`;
            break;
    
          case 'chatbot_auto':
            reponse = `⚙️ AUTOMATISATION AVANCÉE
    
    ✅ Création de workflows sur mesure.
    ✅ Envoi automatique de messages selon des scénarios : bienvenue, relance, confirmation…
    ✅ Intégration avec CRM, systèmes internes ou outils marketing.
    
    🎯 Objectif : automatiser vos processus de communication et ventes.`;
            break;
    

      case 'services_info':
        reponse = `🛠️ Services informatiques :
Support technique et solutions personnalisées pour votre infrastructure IT.`;
        break;

      case 'etudes_solutions':
        reponse = `📊 Études et propositions de solutions :
Analyse de vos besoins et proposition de solutions adaptées pour optimiser vos performances.`;
        break;

      default:
        reponse = `❗ Option inconnue. Tapez *menu* pour recommencer.`;
    }

    await client.sendText(numero, reponse);
    await enregistrerMessage(numero, rowId, reponse);
    return;
  }

  // Réponse par défaut
  if (!message.isGroupMsg) {
    reponse = "Bonjour et bienvenue ! 😊 \n*Quel plaisir de vous accueillir chez Success Technologies !*\nJe suis votre assistant virtuel *prêt à vous aider* dès maintenant. \nPour découvrir mes services, tapez *MENU*  ou dites simplement *Bonjour* ou *cc*  ! \nJe suis là pour vous aider 24h/24 !";
    await client.sendText(numero, reponse);
    await enregistrerMessage(numero, texte, reponse);
  }
}

module.exports = handleMessage;
