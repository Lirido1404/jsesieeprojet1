
let i1 = document.getElementById('ville');
let nomVille = "";
i1.addEventListener('input',(e)=>{
    nomVille = e.target.value;
    console.log(nomVille);
})

let b1 = document.getElementById("buttonsubmit");



const tryFetchCommunes = async () => {
    try {
        const res = await fetch("codecommunes.csv");
        
        
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
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
            throw new Error(`HTTP error! Status: ${res.status}`);
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
            console.log("Code Ville : ", codeVille)
        } 
    })
    
    


    if(filteredjsonCodesCommunesData){
        jsonCrimeData = await tryfetchfichier();
        console.log("Code Ville 2 : ",codeVille)
    }
    

    if(jsonCrimeData){
        if(jsonCrimeData[0].CODGEO_2024 === 1001){
            console.log("même type")
        }else{
            let int = parseInt(jsonCrimeData[0].CODGEO_2024);
            if(int === 1001){
                console.log("même type2")
            }
        }
    }
})();
