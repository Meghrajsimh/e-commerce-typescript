const APIOneProduct:string = 'https://dummyjson.com/products/';
const prodcutDisplay = document.querySelector('.product') as HTMLDivElement;
const url = new URLSearchParams(location.search);
const id = url.get('id');
let userOneProduct:string = JSON.parse(sessionStorage.getItem('e-basketUser') || '[]');
let userNameOneProduct:string | null =userOneProduct.length > 0 ? userOneProduct.split('@')[0] : null; 
const session:string = JSON.parse(sessionStorage.getItem('e-basketUser')|| '[]');

interface Data  {
    brand: string,
    category: string,
    description : string,
    discountPercentage : string,
    id : string,
    images:string[],
    price : string
    rating : string 
    stock : string
    thumbnail: string,
    title: string
}

async function displayProduct() {
    let url = `${APIOneProduct}${id}`
    let product:Data = await fetch(url).then( res  => res.json())
                                       .catch(e => console.log(e));
    let stock = 'Not Avialable';
    if(parseInt(product.stock) > 0) {
       stock = "Avialable";
    }
    const display = `
        <div class='productBox'>
            <div class="productImg">
               <img src="${product.thumbnail}" alt="productImage"/>
            </div>
            <div class="productInfo">
                <h5>Brand: <span>${product.brand}</span></h5>
                <h5>Name: <span>${product.title}</span></h5>
                <h5>Rating: <span>${product.rating}</span></h5>
                <h5>Price: <span>${product.price}₹</span></h5>
                <h5>Stock: <span>${stock}</span></h5>
                <h5>Discount: <span>${product.discountPercentage}%</span></h5>
                <h5>Description: <span>${product.description}</span></h5>
                <button class="btn btn-primary" onclick='addToCartOne(${product.id})'>Add</button>
            <div>
        </div>
    `;
    prodcutDisplay.innerHTML = display;
}
displayProduct();

function addToCartOne(id: string) {
    if (session.length > 0) {
      let userItem: userItemData[] = JSON.parse(localStorage.getItem("userItem") || "[]" );
      let filterData: number = userItem.findIndex((ele) => ((ele.id == id) && (userNameOneProduct == ele.userName)));
  
      if (filterData > -1) {
        userItem[filterData].count = userItem[filterData].count + 1;
      } else {
        let obj: userItemData = {
          id: id,
          count: 1,
          userName : userNameOneProduct
        };
        userItem.push(obj);
      }
      localStorage.setItem("userItem", JSON.stringify(userItem));
      productCounter();
    } else {
      alert("you must login for add to cart!!!!");
    }
}