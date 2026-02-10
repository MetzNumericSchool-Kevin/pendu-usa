// les mots a deviner
const mots = ["JAVASCRIPT", "PENDU", "CLAVIER", "ORDINATEUR", "ECRAN", "SOURIS", "PROGRAMME", "VARIABLE", "FONCTION", "TABLEAU"];

let motChoisi = "";
let lettresTrouvees = [];
let lettresJouees = [];
let nbErreurs = 0;
let partieTerminee = false;
let serieVictoires = 0;
let record = 0;

// on recupere les elements html
const wordDisplay = document.getElementById("word-display");
const errorsDisplay = document.getElementById("errors");
const recordDisplay = document.getElementById("record");
const lettersUsed = document.getElementById("letters-used");
const modal = document.getElementById("game-over-modal");
const gameResult = document.getElementById("game-result");
const btnNouvelle = document.querySelectorAll(".btn-primary")[0];
const btnRejouer = document.querySelector("#game-over-modal .btn-primary");
const btnRegles = document.querySelector(".btn-outline");
const rulesModal = document.getElementById("rules-modal");


// cette fonction affiche le mot avec des _ pour les lettres pas encore trouvées
function afficherMot() {
  let html = "";
  for (let i = 0; i < motChoisi.length; i++) {
    if (lettresTrouvees.includes(motChoisi[i])) {
      html += '<span class="letter-placeholder">' + motChoisi[i] + '</span>';
    } else {
      html += '<span class="letter-placeholder"></span>';
    }
  }
  wordDisplay.innerHTML = html;
}


// on initialise le jeu (appelé au debut et quand on rejoue)
function initialiserJeu() {
  // mot aleatoire
  motChoisi = mots[Math.floor(Math.random() * mots.length)];
  lettresTrouvees = [];
  lettresJouees = [];
  nbErreurs = 0;
  partieTerminee = false;

  errorsDisplay.textContent = "0/5";
  lettersUsed.innerHTML = "";

  // on cache le dessin du pendu
  for (let i = 1; i <= 5; i++) {
    document.getElementById("error-" + i).classList.add("hidden");
  }

  afficherMot();

  // on recupere le record dans le localStorage
  let savedRecord = localStorage.getItem("record");
  if (savedRecord) {
    record = parseInt(savedRecord);
  }
  if (record > 0) {
    recordDisplay.textContent = record;
  } else {
    recordDisplay.textContent = "-";
  }
}

// quand le joueur tape une lettre
function jouerLettre(lettre) {
  if (motChoisi.includes(lettre)) {
    // la lettre est dans le mot
    lettresTrouvees.push(lettre);
    afficherMot();

    // on ajoute un badge vert
    let badge = document.createElement("span");
    badge.className = "badge badge-success";
    badge.textContent = lettre;
    lettersUsed.appendChild(badge);

    // on verifie si le joueur a gagné
    let gagne = true;
    for (let i = 0; i < motChoisi.length; i++) {
      if (!lettresTrouvees.includes(motChoisi[i])) {
        gagne = false;
      }
    }
    if (gagne) {
      victoire();
    }

  } else {
    // la lettre n'est pas dans le mot
    nbErreurs++;
    errorsDisplay.textContent = nbErreurs + "/5";

    // on montre la partie du pendu
    document.getElementById("error-" + nbErreurs).classList.remove("hidden");

    // badge rouge
    let badge = document.createElement("span");
    badge.className = "badge badge-error";
    badge.textContent = lettre;
    lettersUsed.appendChild(badge);

    if (nbErreurs === 5) {
      defaite();
    }
  }
}


function victoire() {
  partieTerminee = true;
  serieVictoires++;

  // nouveau record ?
  if (serieVictoires > record) {
    record = serieVictoires;
    localStorage.setItem("record", record);
    recordDisplay.textContent = record;
  }

  gameResult.textContent = "Bravo ! Vous avez trouvé le mot : " + motChoisi;
  modal.showModal();
}

function defaite() {
  partieTerminee = true;
  serieVictoires = 0;
  gameResult.textContent = "Perdu ! Le mot était : " + motChoisi;
  modal.showModal();
}


// --- ecouteur clavier ---
document.addEventListener("keydown", function(e) {
  if (partieTerminee) return;

  let lettre = e.key.toUpperCase();

  // on verifie que c'est bien une lettre
  if (lettre.length !== 1 || lettre < "A" || lettre > "Z") return;

  // deja jouée ?
  if (lettresJouees.includes(lettre)) return;

  lettresJouees.push(lettre);
  jouerLettre(lettre);
});

// bouton nouvelle partie
btnNouvelle.addEventListener("click", function() {
  initialiserJeu();
});

// bouton rejouer (dans la modal)
btnRejouer.addEventListener("click", function() {
  modal.close();
  initialiserJeu();
});

// bouton regles
btnRegles.addEventListener("click", function() {
  rulesModal.showModal();
});

// on lance le jeu !
initialiserJeu();
