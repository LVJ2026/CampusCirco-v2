async function chargerEcoles() {

    const liste = document.getElementById("ecole");

    try {

        const reponse = await fetch("/api/ecoles");

        if (!reponse.ok) {
            throw new Error("Erreur " + reponse.status);
        }

        const donnees = await reponse.json();

        liste.innerHTML = "";

        donnees.records
            .sort((a, b) =>
                a.fields.Ville.localeCompare(b.fields.Ville) ||
                a.fields.Ecole.localeCompare(b.fields.Ecole)
            )
            .forEach(ecole => {

                const option = document.createElement("option");

                option.value = ecole.fields.UAI;

                option.textContent =
                    `${ecole.fields.UAI} — ${ecole.fields.Ecole} (${ecole.fields.Ville})`;

                liste.appendChild(option);

            });

    } catch (e) {

        console.error(e);

        liste.innerHTML =
            "<option>Erreur de chargement</option>";

    }

}

document.addEventListener("DOMContentLoaded", chargerEcoles);