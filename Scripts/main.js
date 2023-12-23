var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("producDesc");
var productList;
var productID = 0;

if (localStorage.getItem("productList") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
}

function addProduct() {
  if (
    validateProductName() == true &&
    validateProductPrice() == true &&
    validateProductModel() == true &&
    validateProductDesc() == true
  ) {
    if (productList.length != 0) {
      while (productID <= productList[productList.length - 1].id) {
        productID++;
      }
    }
    var product = {
      name: productName.value,
      price: productPrice.value,
      model: productModel.value,
      desc: productDesc.value,
      id: productID,
    };
    productList.push(product);
    displayProduct(productList);
    clearForm();
    localStorage.setItem("productList", JSON.stringify(productList));
  }
}

function displayProduct(products) {
  var tableContent = "";
  for (var i = 0; i < products.length; i++) {
    tableContent += `<tr>
    <td>${i + 1}</td>
    <td>${products[i].newName ? products[i].newName : products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].model}</td>
    <td>${products[i].desc}</td>
    <td><button onclick="setUpdateProduct(${
      products[i].id
    })" class="btn btn-warning btn-sm">Update</button></td>
    <td><button onclick="deleteProduct(${
      products[i].id
    })" class="btn btn-danger btn-sm">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = tableContent;
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productModel.value = "";
  productDesc.value = "";
}

function deleteProduct(sentID) {
  index = productList.findIndex((item) => item.id === sentID);
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct(productList);
}

function searchItem(term) {
  var foundedItems = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      productList[i].newName = productList[i].name.replace(
        term,
        `<span class="text-danger">${term}</span>`
      );
      foundedItems.push(productList[i]);
    }
  }
  displayProduct(foundedItems);
}

var productIndex;

function setUpdateProduct(sentID) {
  index = productList.findIndex((item) => item.id === sentID);
  productIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productModel.value = productList[index].model;
  productDesc.value = productList[index].desc;
  document.getElementById("addProductBtn").classList.add("d-none");
  document
    .getElementById("updateProductBtn")
    .classList.replace("d-none", "d-block");
}

function updatefun() {
  productList[productIndex].name = productName.value;
  productList[productIndex].price = productPrice.value;
  productList[productIndex].model = productModel.value;
  productList[productIndex].desc = productDesc.value;
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
  document.getElementById("addProductBtn").classList.remove("d-none");
  document
    .getElementById("updateProductBtn")
    .classList.replace("d-block", "d-none");
}

function validateProductName() {
  var regex = /^[A-Z][\s\S]{1,9}$/;
  // return regex.test(productName.value);
  if (regex.test(productName.value) == true) {
    productName.classList.remove("is-invalid");
    document.getElementById("invalidName").classList.add("d-none");
    return true;
  } else {
    productName.classList.add("is-invalid");
    document.getElementById("invalidName").classList.remove("d-none");
    return false;
  }
}

function validateProductPrice() {
  var regex = /^(([1-9][0-9]{3})|10000)$/;
  if (regex.test(productPrice.value) == true) {
    productPrice.classList.remove("is-invalid");
    document.getElementById("invalidPrice").classList.add("d-none");
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    document.getElementById("invalidPrice").classList.remove("d-none");
    return false;
  }
}

function validateProductModel() {
  var regex = /^(TV|Mobile|Laptop)$/;
  if (regex.test(productModel.value) == true) {
    productModel.classList.remove("is-invalid");
    document.getElementById("invalidModel").classList.add("d-none");
    return true;
  } else {
    productModel.classList.add("is-invalid");
    document.getElementById("invalidModel").classList.remove("d-none");
    return false;
  }
}

function validateProductDesc() {
  var regex = /^[\s\S]{1,250}$/;
  if (regex.test(productDesc.value) == true) {
    productDesc.classList.remove("is-invalid");
    document.getElementById("invalidDesc").classList.add("d-none");
    return true;
  } else {
    productDesc.classList.add("is-invalid");
    document.getElementById("invalidDesc").classList.remove("d-none");
    return false;
  }
}
