const cartApi = "https://dummyjson.com/products?limit=100";
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
const span = document.querySelector("#totalPrice") as HTMLSpanElement;
const userCartName: string = JSON.parse(
  sessionStorage.getItem("e-basketUser") || "[]"
);
const n = userCartName.split("@")[0];

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

interface Storage {
  id: string;
  count: number;
}

async function fetchData(api: string): Promise<Data[]> {
  const productData: Data[] = await fetch(api)
    .then((res) => res.json())
    .then((res) => res.products)
    .catch((e) => console.log(e));
  return productData;
}

async function displayCart() {
  let cartData: Storage[] = JSON.parse(
    localStorage.getItem("userItem") || "[]"
  );
  let allProduct: Data[] = await fetchData(cartApi);

  let totalPrice: number = 0;
  let display: string = "";
  let count = 1;
  cartData.forEach((ele, index) => {
    let price: number = 0;

    allProduct.forEach((element) => {
      if (n == ele.userName) {
        if (ele.id == element.id) {
          price = ele.count * parseInt(element.price);
          display += `
                   <tr>
                        <td>${count}</td>
                        <td>${element.title}</td>
                        <td><img src="${element.thumbnail}" alt="img" height="100px" width="100px"/></td>
                        <td><button onclick="add(${index})">+</button> ${ele.count} <button onclick="minus(${index})">-</button></td>
                        <td>${price}₹</td>
                        <td></td>
                   </tr>`;
          count++;
          totalPrice += price;
        }
      }
    });
  });
  tbody.innerHTML = display;
  span.innerHTML = String(totalPrice) + "₹";
}
displayCart();

function add(id: number) {
  let cartData: { id: string; count: number }[] = JSON.parse(
    localStorage.getItem("userItem") || "[]"
  );
  cartData[id].count = cartData[id].count + 1;
  localStorage.setItem("userItem", JSON.stringify(cartData));
  displayCart();
}

function minus(id: number) {
  let cartData: Storage[] = JSON.parse(
    localStorage.getItem("userItem") || "[]"
  );
  if (cartData[id].count > 1) {
    cartData[id].count = cartData[id].count - 1;
  } else {
    cartData = removeData(id, cartData);
  }
  localStorage.setItem("userItem", JSON.stringify(cartData));
  displayCart();
}

function removeData(id: number, cartData: Storage[]): Storage[] {
  cartData.splice(id, 1);
  localStorage.setItem("userItem", JSON.stringify(cartData));
  return cartData;
}
