let input = document.getElementById("search");
let content = document.getElementById("content");


// let mealImg = document.getElementById("mealImg");


// document.addEventListener("click", searchMaterial);
let inputValue;
function searchMaterial() {
    input.addEventListener("keydown", searchMaterial);
    input.addEventListener("keyup", searchMaterial);
    inputValue = input.value;
    searchMeal();
    return inputValue;
    
}

let idMeal;

let count;

async function searchMeal() {
    let url = `https://themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    let response = await fetch(url);
    let data = await response.json();
    let mealsCount = data.meals.length;

    console.log(mealsCount);
    

    content.innerHTML = "";
    
    for(let i = 0; i < mealsCount; i++){
    let meal = data.meals[i];
    let strMeal = meal.strMeal;
    let idMeal = meal.idMeal;
    let strMealThumb = meal.strMealThumb;

    count = 1 + i;

    let anchor = document.createElement("a");
    anchor.href = `details.html?id=${idMeal}`;
    let card = document.createElement("div");
    card.className = 'card';
    card.id = `${idMeal}`;
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    h3.textContent = `${count}. ${strMeal}`;
    //console.log(data.meals);
    img.src = `${strMealThumb}`;
    card.appendChild(img);
    card.appendChild(h3);
    anchor.appendChild(card);
    content.appendChild(anchor);

    highlightText();

    function highlightText() {
        let searchValue = document.getElementById("search").value.trim();
        let mealName = document.querySelectorAll("h3")[i];
        if (searchValue === "") return;
        let content = mealName.textContent;
        let regex = new RegExp(`(${searchValue})`, 'gi');
        let highlighted = content.replace(regex, `<span style="background-color: #ffe800;">$1</span>`);
        mealName.innerHTML = highlighted;
        }

            card.addEventListener("click", function (){
            details(card.id);
            });

            
    }



}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname === "/index.html") {
        input.addEventListener("keyup", searchMaterial);
        searchMaterial();
    }

    if (window.location.pathname.includes("details.html")) {
        const params = new URLSearchParams(window.location.search);
        const mealId = params.get("id");
        if (mealId) {
            details(mealId);
        }else{

            ingredients.textContent = "You had no choose any meal!!!";
           
            
        }
    }
});

    
let mealDetail = document.getElementById("mealDetail");
let ingredients = document.getElementById("ingredients");


    async function details(id){
            let detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            let detailRes = await fetch(detailUrl);
            let fullResponse = await detailRes.json();
            let dImage = fullResponse.meals[0].strMealThumb;
            let dtitle = fullResponse.meals[0].strMeal;
            let darea = fullResponse.meals[0].strArea;
            let did = id;
            
            // Gredients
            let gredient1 = fullResponse.meals[0].strIngredient1;
            let gredient2 = fullResponse.meals[0].strIngredient2;
            let gredient3 = fullResponse.meals[0].strIngredient3;
            let gredient4 = fullResponse.meals[0].strIngredient4;

            let gredient1_url = `https://themealdb.com/images/ingredients/${gredient1}.png`;
            let gredient2_url = `https://themealdb.com/images/ingredients/${gredient2}.png`;
            let gredient3_url = `https://themealdb.com/images/ingredients/${gredient3}.png`;
            let gredient4_url = `https://themealdb.com/images/ingredients/${gredient4}.png`;

            let gredient1_img = document.createElement("img");
            let gredient2_img = document.createElement("img");
            let gredient3_img = document.createElement("img");
            let gredient4_img = document.createElement("img");
            
            gredient1_img.src = `${gredient1_url}`
            gredient2_img.src = `${gredient2_url}`
            gredient3_img.src = `${gredient3_url}`
            gredient4_img.src = `${gredient4_url}`

            let gredient1_div = document.createElement("div");
            let gredient2_div = document.createElement("div");
            let gredient3_div = document.createElement("div");
            let gredient4_div = document.createElement("div");

            gredient1_div.classList.add("gredient1");
            gredient2_div.classList.add("gredient2");
            gredient3_div.classList.add("gredient3");
            gredient4_div.classList.add("gredient4");

            // Measure
            let measure1 = fullResponse.meals[0].strMeasure1;
            let measure2 = fullResponse.meals[0].strMeasure2;
            let measure3 = fullResponse.meals[0].strMeasure3;
            let measure4 = fullResponse.meals[0].strMeasure4;
            
            let result1 = document.createElement("h3");
            let result2 = document.createElement("h3");
            let result3 = document.createElement("h3");
            let result4 = document.createElement("h3");

            result1.textContent = `${measure1} ${gredient1}`;
            result2.textContent = `${measure2} ${gredient2}`;
            result3.textContent = `${measure3} ${gredient3}`;
            result4.textContent = `${measure4} ${gredient4}`;



            
            let image = document.createElement("img");
            let title = document.createElement("h3");
            let area = document.createElement("h3");
            let idM = document.createElement("h3");
            let watch = document.createElement("h3");
            let youtubeLink = document.createElement("a");
            let youtubeIcon = document.createElement("img");
            youtubeIcon.src = `youtube.png`;
            
            
            
            

            // let area = document.createElement("h3");
            let instructions = document.getElementById("instructions");
            let mlImg = document.getElementById("mlImg");
            let insructions_detail = document.createElement("h3");
            insructions_detail.textContent = `${fullResponse.meals[0].strInstructions}`;
            title.textContent = `Name: ${dtitle}`;
            area.textContent = `Area: ${darea}`;
            idM.textContent = `ID: ${did}`;
            watch.textContent = `Watch On:   `;
            //youtubeLink.textContent = `Watch on`;
            youtubeLink.target = `_blank`;
            youtubeLink.href = fullResponse.meals[0].strYoutube;
           // area.textContent = `Area: ${darea}`;
            image.src = `${dImage}`;
            mlImg.appendChild(image);
            mealDetail.appendChild(title);
            mealDetail.appendChild(area);
            mealDetail.appendChild(idM);
            mealDetail.append(watch);
            watch.append(youtubeLink);
            youtubeLink.appendChild(youtubeIcon);
            gredient1_div.append(result1, gredient1_img);
            gredient2_div.append(result2, gredient2_img);
            gredient3_div.append(result3, gredient3_img);
            gredient4_div.append(result4, gredient4_img);

            ingredients.append(gredient1_div, gredient2_div, gredient3_div, gredient4_div)
            instructions.appendChild(insructions_detail);

            //console.log(fullResponse.meals[0]);
        
        }

    
