// Liste de mots
var mots = ["JAVASCRIPT", "PENDU", "CLAVIER", "ORDINATEUR", "ECRAN", "SOURIS", "PROGRAMME", "VARIABLE", "FONCTION", "TABLEAU"];

// Variables du jeu
var motChoisi = "";
var lettresTrouvees = [];
var lettresJouees = [];
var nbErreurs = 0;
var partieTerminee = false;

// Elements du DOM
var wordDisplay = document.getElementById("word-display");
var errorsDisplay = document.getElementById("errors");
var lettersUsed = document.getElementById("letters-used");

// Fonction pour afficher le mot avec des underscores
function afficherMot() {
  var html = "";
  for (var i = 0; i < motChoisi.length; i++) {
    if (lettresTrouvees.includes(motChoisi[i])) {
      html += '<span class="letter-placeholder">' + motChoisi[i] + '</span>';
    } else {
      html += '<span class="letter-placeholder"></span>';
    }
  }
  wordDisplay.innerHTML = html;
}

// Fonction pour initialiser le jeu
function initialiserJeu() {
  motChoisi = mots[Math.floor(Math.random() * mots.length)];
  lettresTrouvees = [];
  lettresJouees = [];
  nbErreurs = 0;
  partieTerminee = false;

  errorsDisplay.textContent = "0/5";
  lettersUsed.innerHTML = "";

  // Cacher les parties du pendu
  for (var i = 1; i <= 5; i++) {
    document.getElementById("error-" + i).classList.add("hidden");
  }

  afficherMot();
}

// Lancer le jeu
initialiserJeu();
