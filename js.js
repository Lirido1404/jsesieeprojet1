let i1 = document.getElementById('ville');
let nomVille = "";

i1.addEventListener('input', async (e) => {
    nomVille = e.target.value;
    let codeCommunes = await tryFetchCommunes();
    let filteredVilles = codeCommunes.filter((el) => 
        el.nom_commune_postal.includes(nomVille.toUpperCase())
    );

    // Suppression des doublons par le nom de la commune
    let uniqueFilteredVille = filteredVilles.filter((value, index, self) =>
        index === self.findIndex((t) => t.nom_commune_postal === value.nom_commune_postal)
    );

    console.log(uniqueFilteredVille);
});




let b1 = document.getElementById("buttonsubmit");


let i2 = document.getElementById("annee");
let annee = "";
i2.addEventListener('input',(e)=>{
    annee = e.target.value;
})



const tryFetchCommunes = async () => {
    try {
        const res = await fetch("codecommunes.csv");


        if (!res.ok) {
            throw new Error("nan");
        }

        const csvDataCommunes = await res.text(); 

        return Papa.parse(csvDataCommunes, {
            header: true, 
            skipEmptyLines: true 
        }).data;
    } catch (err) {
        console.error("Erreur lors du chargement des données CSV :", err);
        return null; 
    }
};












const tryfetchfichier = async () => {
    try {
        const res = await fetch("crimedata.csv");

        if (!res.ok) {
            throw new Error("nan");
        }

        const csvData = await res.text(); 

        return Papa.parse(csvData, {
            header: true, 
            skipEmptyLines: true 
        }).data;
    } catch (err) {
        console.error("Erreur lors du chargement des données CSV :", err);
        return null; 
    }
};
const handleClick = async () => {
    let filteredjsonCodesCommunesData;
    const jsonCodesCommunesData = await tryFetchCommunes();
    if (jsonCodesCommunesData && nomVille) {
        filteredjsonCodesCommunesData = jsonCodesCommunesData.filter((el) => {
            return el.nom_commune_postal === nomVille.toUpperCase();
        });
    }
    return filteredjsonCodesCommunesData[0]; 
};




(async () => {
    let jsonCrimeData;
    let filteredjsonCodesCommunesData;
    let codeVille;
    

    b1.addEventListener('click',async ()=>{
        filteredjsonCodesCommunesData =  await handleClick();
        console.log(filteredjsonCodesCommunesData);
        if(filteredjsonCodesCommunesData){
            codeVille = parseInt(filteredjsonCodesCommunesData.code_commune_INSEE);
            console.log("Code Ville : ", codeVille);
            jsonCrimeData = await tryfetchfichier();

            let filteredjsonCrimeData = jsonCrimeData.filter((el)=>{
                return annee ? parseInt(el.CODGEO_2024) === codeVille && parseInt(el.annee) === parseInt(annee) : parseInt(el.CODGEO_2024) === codeVille
            })
            console.log(filteredjsonCrimeData);


        } 
    })
})();