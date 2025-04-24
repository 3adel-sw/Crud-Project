let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAll = document.getElementById("deleteAll");
let search = document.getElementById("search");
let mood = "create"; // Create or Update
let updateIndex; // Update Index
let tmp;

// Get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// Create Product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = []; // Empty Array
}
// Show Data on Page Load
showData();

// Check if Local Storage Exist

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro; // Update Product
    mood = "create"; // Reset Mood to Create
    submit.innerHTML = "Create"; // Reset Submit Button Text
    count.style.display = "block"; // Show Count Input
  }

  // save Local Storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  // Show Data
  showData();
  //
  // Clear Inputs
  clearData();
};

// Create Inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.background = "#a00d02";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  // Delete Data All
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAllData()">Delete All : ${dataPro.length}</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
  // howData(); // Show Data
}

// Delete

function deleteData(i) {
  dataPro.splice(i, 1); // Delete from Array
  localStorage.product = JSON.stringify(dataPro); // Save to Local Storage
  showData(); // Show Data
}

// count

// Update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update"; // Update Mode
  tmp = i; // Update Index
  scroll({
    top: 0,
    behavior: "smooth",
  });
  category.value = dataPro[i].category;
  deleteData(i);
}
// Search
let searchMood = "title"; // Search by Title or Category
function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMood = "category";
  }
  if (id === "searchCategory") {
    searchMood = "category";
    search.placeholder = "Search by Category";
  }
  search.focus(); // Focus on Search Input
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.includes(search.value.toLowerCase())) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(search.value.toLowerCase())) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// Clean data

// Delete Data All
function deleteAllData() {
  if (confirm("Are you sure you want to delete all data?")) {
    localStorage.clear(); // Clear Local Storage

    dataPro.splice(0);

    showData();
  }
}
