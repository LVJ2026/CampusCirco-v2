let ecoles = [];

async function chargerEcoles() {

    const liste = document.getElementById("ecole");

    const reponse = await fetch("/api/ecoles");
    const donnees = await reponse.json();

    ecoles = donnees.records;

    liste.innerHTML = "";

    ecoles
        .sort((a, b) =>
            a.fields.Ville.localeCompare(b.fields.Ville) ||
            a.fields.Ecole.localeCompare(b.fields.Ecole)
        )
        .forEach(ecole => {

            const option = document.createElement("option");

            option.value = ecole.id;
            option.textContent =
                `${ecole.fields.Ecole} (${ecole.fields.Ville})`;

            liste.appendChild(option);

        });

    liste.addEventListener("change", afficherEcole);

    afficherEcole();
}

function afficherEcole() {

    const id = Number(document.getElementById("ecole").value);

    const ecole = ecoles.find(e => e.id === id);

    if (!ecole) return;

    document.getElementById("uai").textContent = ecole.fields.UAI ?? "";
    document.getElementById("ville").textContent = ecole.fields.Ville ?? "";
    document.getElementById("type").textContent = ecole.fields.Type ?? "";
    document.getElementById("formation").textContent = ecole.fields.Type_de_formation ?? "";
    document.getElementById("nb").textContent = ecole.fields.Nb_enseignants ?? "";

chargerSeances();
}

async function chargerSeances() {

    const zone = document.getElementById("seances");

    const reponse = await fetch("/api/seances");
    const donnees = await reponse.json();

    zone.innerHTML = "<pre>" + JSON.stringify(donnees.records, null, 2) + "</pre>";

}

document.addEventListener("DOMContentLoaded", chargerEcoles);

