const API:string = 'https://dummyjson.com/products/categories';
const option = document.querySelector('#category') as HTMLElement;
async function allCateGory() {
    const categoriesData: string[] = await fetchDataC(API);
    let display:string ='' ;
    categoriesData.forEach( ele =>{
       display += `<option value='${ele}'>${ele[0].toUpperCase()}${ele.slice(1)}</option>`;
       
    })
    option.innerHTML += display;
}
allCateGory();

async function fetchDataC (api:string) {
    const data:string[] = await fetch(api).then( res => res.json());
    return data;
}

