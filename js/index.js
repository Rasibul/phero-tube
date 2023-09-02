const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json();
    const data = allData.data;
    displayData(data)
}


const displayData = (allCategory) => {
    const buttonContainer = document.getElementById('daynamic-btn')
    allCategory.forEach(category => {
        const div = document.createElement('div')
        div.innerHTML = `<a onclick = "handelLoadData('${category.category_id}')" class="btn">${category.category}</a> `
        buttonContainer.appendChild(div)
    })
}

const handelLoadData = async (categoryId) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    const divContainer = document.getElementById('card-container')
    divContainer.textContent = '';
    const photoContainer = document.getElementById('photo-container')
    photoContainer.textContent = ''
    if(data.data.length === 0){
        const div = document.createElement('div')
        div.classList = 'flex flex-col justify-center items-center'
        div.innerHTML = `<img src="./img/Icon.png" alt="">
        <p class = "text-3xl font-bold text-center">Oops!! Sorry, There is no content here</p>`
        photoContainer.appendChild(div)
    }
    else{
        data.data.forEach(videos => {
            if(videos?.authors[0].verified){
                const div = document.createElement('div')
                div.innerHTML = `
                <div class="card  bg-base-100 shadow-xl">
                <figure><img class= "h-40 w-80" src="${videos?.thumbnail}" /></figure>
                <div class="card-body">
                <div class="flex gap-2">
                <img class= "h-10 w-10 rounded-full " src=${videos?.authors[0].profile_picture} />
                <h2 class="card-title text-base">${videos.title}</h2>
                </div>
                <div class="flex gap-2">
                    <h2>${videos?.authors[0].profile_name}</h2>
                    <span><img src="./img/blue.png" alt=""></span>
                </div>
                    <p>${videos?.others.views} views</p>
                </div>
              </div>
                `
                divContainer.appendChild(div)
            }
            else{
                const div = document.createElement('div')
                div.innerHTML = `
                <div class="card  bg-base-100 shadow-xl">
                <figure><img class= "h-40 w-80" src="${videos?.thumbnail}" /></figure>
                <div class="card-body">
                <div class="flex gap-2">
                <img class= "h-10 w-10 rounded-full " src=${videos?.authors[0].profile_picture} />
                <h2 class="card-title text-base">${videos.title}</h2>
                </div>
                <div class="flex gap-2">
                    <h2>${videos?.authors[0].profile_name}</h2>
                </div>
                    <p>${videos?.others.views} views</p>
                </div>
              </div>
                `
                divContainer.appendChild(div)
            }
           

    
        })
    }
  
}

// blog page functionality
const blogPage = () => {
    window.location.replace('blog.html')
   
}
const backHome = () => {
    window.location.replace('index.html')
}

loadData()
handelLoadData(1000);