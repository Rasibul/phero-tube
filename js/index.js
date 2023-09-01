const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json();
    const data = allData.data;
    // console.log(data)
    dispalyData(data)
}


const dispalyData = (allCategory) => {
    // console.log(allCategory)
    const buttonContainer = document.getElementById('daynamic-btn')
    allCategory.forEach(category => {
        // console.log(category)
        const div = document.createElement('div')
        div.innerHTML = `<a onclick = "handelLoadData('${category.category_id}')" class="btn">${category.category}</a> `
        buttonContainer.appendChild(div)
    })
}

const handelLoadData = async (categoryId) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    console.log(data.data)
    const divContainer = document.getElementById('card-container')
    divContainer.textContent = '';
    data.data.forEach(videos => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure><img class= "h-40 w-80" src="${videos?.thumbnail}" /></figure>
        <div class="card-body">
        <div class="flex gap-2">
        <img class= "h-10 w-10 rounded-full " src=${videos?.authors[0].profile_picture} />
        <h2 class="card-title">${videos.title}</h2>
        </div>
        <div class="flex gap-2">
            <h2>${videos?.authors[0].profile_name}</h2>
            <span></span>
        </div>
            <p>${videos?.others.views} views</p>
        </div>
      </div>
        `
        divContainer.appendChild(div)

    })

}


loadData()
handelLoadData(1000)