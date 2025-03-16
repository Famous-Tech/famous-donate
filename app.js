const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Clé API TikesPam
const TIKESPAM_API_KEY = process.env.TIKESPAM_API_KEY || '';

// Configuration des vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Famous Tech - Donnons une alternative au banditisme par le développement web',
    page: 'home'
  });
});

app.get('/donate', (req, res) => {
  res.render('donate', { 
    title: 'Soutenez notre initiative - Famous Tech',
    page: 'donate'
  });
});

app.get('/success', (req, res) => {
  res.render('success', { 
    title: 'Merci pour votre soutien - Famous Tech',
    page: 'success'
  });
});

app.get('/failed', (req, res) => {
  res.render('failed', { 
    title: 'Paiement échoué - Famous Tech',
    page: 'failed'
  });
});

// Traitement du formulaire de don
app.post('/process-donation', (req, res) => {
  // Récupération des données du formulaire
  const { amount, donationFrequency, customAmount, fullName, email, phone } = req.body;
  
  // Détermination du montant final (montant sélectionné ou montant personnalisé)
  const finalAmount = customAmount ? customAmount : amount;
  
  // Redirection vers la page de paiement TikesPam
  res.render('payment-redirect', {
    title: 'Redirection vers le paiement - Famous Tech',
    page: 'payment',
    item_name: donationFrequency === 'monthly' ? 'Don mensuel - Famous Tech' : 'Don unique - Famous Tech',
    amount: finalAmount,
    email: email,
    phone: phone,
    client_name: fullName,
    success_url: `${req.protocol}://${req.get('host')}/success`,
    failed_url: `${req.protocol}://${req.get('host')}/failed`,
    api_key: TIKESPAM_API_KEY
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
}); 
