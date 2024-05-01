const allDataApi: string = "https://dummyjson.com/products?limit=100";
const main = document.querySelector("main") as HTMLElement;
const select = document.querySelector("#category") as HTMLOptionElement;
const boxCarBtn = document.querySelector(".boxCartBtn") as HTMLButtonElement;
const serach = document.querySelector("#serach") as HTMLInputElement;
const countProduct = document.querySelector(".counter") as HTMLDivElement;
let user:string = JSON.parse(sessionStorage.getItem('e-basketUser') || '[]');
let userNameP:string | null = user.length > 0 ? user.split('@')[0] : null;
if(countProduct != null) {
  
   productCounter();
}

interface Data {
  brand: string;
  category: string;
  description: string;
  discountPercentage: string;
  id: string;
  images: string[];
  price: string;
  rating: string;
  stock: string;
  thumbnail: string;
  title: string;
}

interface userItemData {
  id: string;
  count: number;
  userName : string | null
}

async function fetchDataP(url: string):Promise<Data[]> {
  try{
  const data: Data[] = await fetch(url)
    .then((res) => res.json())
    .then((response) => response.products)
    .catch((e) => {
      throw e;
    });

  return data;
  }catch(e) {
    throw(e);
  }finally {
    loader.style.display ='none';
  }
}

async function displayAllProuct(api: string = allDataApi, searchData:Data[] | null = null):Promise<void> {
  try {
    let data = await fetchDataP(api);
    if(searchData != null) {
      data = searchData;
    }
    let display: string = "";
    data.forEach((element) => {
      display += `
          <div class='box'>
            <div class="img">
                <img src="${element.thumbnail}" alt="product image"/>
            </div>
            <div class="info">
              <p>Name:<span>${element.title}</span></p>
              <p>Price:<span>${element.price}₹</span></p>
            </div>
            <div class="boxBtn">
                <button class="btn btn-primary" onclick='fullDetails(${element.id})'>More</button>
                <button class="btn btn-primary boxCartBtn" onclick="addToCart(${element.id})" >Add</button>
            </div>
          </div>
        `;
    });
    main.innerHTML = display;
  } catch (e) {
    console.log(e);
  } finally {
  }
}
displayAllProuct();

select.addEventListener("change", (): void => {
  if (select.value != "all") {
    let filterUrl: string = `https://dummyjson.com/products/category/${select.value}`;
    loader.style.display = 'block';
    displayAllProuct(filterUrl);
  } else {
    loader.style.display = 'block';
    displayAllProuct(allDataApi);
  }
});

function fullDetails(id: string):void {
  location.href = `./html/product.html?id=${id}`;
}

function addToCart(id: string) {
  if (userLogin.length > 0) {
    let userItem: userItemData[] = JSON.parse(localStorage.getItem("userItem") || "[]" );
    let filterData: number = userItem.findIndex((ele) => ((ele.id == id) && (userNameP == ele.userName)));

    if (filterData > -1) {
      userItem[filterData].count = userItem[filterData].count + 1;
    } else {
      let obj: userItemData = {
        id: id,
        count: 1,
        userName : userNameP
      };
      userItem.push(obj);
    }
    localStorage.setItem("userItem", JSON.stringify(userItem));
    productCounter();
  } else {
    alert("you must login for add to cart!!!!");
  }
}

function productCounter():void {
  let userItem: userItemData[] = JSON.parse(localStorage.getItem("userItem") || "[]" );
  let count  = 0;
  
  userItem.forEach( ele => {
    if(ele.userName == userNameP) {
      count += ele.count;
    }
  });
  console.log(count);
 countProduct.textContent = String(count); 
}

serach.addEventListener("input",async ():Promise<void> =>{
  let data:Data[] = await fetchDataP(allDataApi);
  let filterData = data.filter( ele => ele.title.toLocaleLowerCase().includes(serach.value.toLowerCase()));
  loader.style.display = 'block';
  displayAllProuct(allDataApi,filterData);
})