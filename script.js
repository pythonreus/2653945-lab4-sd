//listen for the button click
document.getElementById("submit").addEventListener("click",()=>{
    let name_holder = document.getElementById("country-name");
    let country_name = name_holder.value;
    name_holder.value = "";

    clear_the_screen();

    fetch(`https://restcountries.com/v3.1/name/${ country_name }`)
        .then((response) => response.json())
        .then((data) =>{
            // deal with our data
            console.log(data);

            //get capital data
            let cap = data[0].capital[0];
            //get population data
            let popu = data[0].population;
            //get the region data
            let reg = data[0].region;
            //get the country flag
            let flag = data[0].flags.png;
            //get the bordering countries
            let borders = data[0].borders;

            
            // first get the country info
            display_data(country_name,cap,popu,reg,flag);

            // the get the neighbours info
            process_bordering_countries(borders);
           
        })
        .catch((err) => {
            alert(`${country_name} does not exists`);
        });
    
});

function display_data(country_name,cap,popu,reg,flag){
    let country_info = document.getElementById("country-info");

     //create a heading
    //  let heading = document.createElement("h2");
    //  heading.textContent = country_name;

     //creating an unordered list
     let list = document.createElement("ul");
     //creating the capital element
     let capital = document.createElement("li");
     capital.innerText = `Capital: ${cap}`;
     //creating the population element
     let population = document.createElement("li");
     population.innerText = `Population: ${popu}`;
     //creating the region element
     let region = document.createElement("li");
     region.innerText = `Region: ${reg}`;
     //creating the flag element
     let country_flag = document.createElement("li");
     //create an image tag
     let country_image = document.createElement("img");
     country_image.src = flag;
     country_flag.innerHTML = `Flag:`;

     //displaying the data
     list.appendChild(capital);
     list.appendChild(population);
     list.appendChild(region);
     list.appendChild(country_flag);
     list.appendChild(country_image);
     //country_info.appendChild(heading);
     country_info.appendChild(list);

}

function process_bordering_countries(borders){
    let border_countries = document.getElementById("bordering-countries");

    //create an unordered list
    let countries = document.createElement("ul");
    //create the heading
    let heading = document.createElement("li");
    heading.textContent = "Bordering-Countries";

    countries.appendChild(heading);
    
   
    //now i have to deal with the neighbouring countries
    borders.forEach(country => {
        fetch(`https://restcountries.com/v3.1/alpha/${ country }`)
        .then((response) => response.json())
        .then((data) =>{
            //get the country name
            let common_name = data[0].name.common;
            let country_flag = data[0].flags.png;

            //create the country li element
            let country = document.createElement("li");
            country.textContent = `${ common_name }`;

            //create the image tag
            let country_image = document.createElement("img");
            country_image.src = country_flag;

            countries.appendChild(country);
            countries.appendChild(country_image);
            border_countries.appendChild(countries);

        })
        .catch((err) => console.log(err));
    });

};

function clear_the_screen(){
    let border_countries = document.getElementById("bordering-countries");
    let country_info = document.getElementById("country-info");
    border_countries.innerHTML = "";
    country_info.innerHTML = "";
}

