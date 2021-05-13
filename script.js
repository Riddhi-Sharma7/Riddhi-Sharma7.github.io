const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container1');
container.setAttribute('id', 'container1');
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://reqres.in/api/users?delay=3', true);

const load = document.createElement('div');
load.setAttribute('class', 'loader');
root.append(load);

var response1;
var count = 1;
  
request.onload = function () {

  load.remove();
  response1 = JSON.parse(this.response);
  response1.data.sort(dynamic_sort("first_name"));

  if (request.status >= 200 && request.status < 400) {
    buildHTML(response1);
    
  }
}

//sorting the user profiles
var select = document.getElementById('sort');
select.onclick = function (e) {

  var x = document.getElementById("sort").selectedIndex;
  var y = document.getElementById("sort").options;
  if (x != 0) {
    document.getElementById('container1').innerHTML = "";
    response1.data.sort(dynamic_sort(y[x].value));
     buildHTML(response1);
    
  }

}

function buildHTML(response1){
  response1.data.forEach(user => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('id', user.id);
    count++;

    const img = document.createElement('img');
    img.src = user.avatar;

    const p = document.createElement('p');
    p.textContent = user.first_name + " " + user.last_name;

    container.appendChild(card);
    card.appendChild(img);
    card.appendChild(p);


  });

}

function dynamic_sort(property) {
  var sort_order = 1;

  return function (a, b) {

    if (a[property] < b[property]) {
      return -1 * sort_order;
    }
    else if (a[property] > b[property]) {
      return 1 * sort_order;
    }
    else {
      return 0;
    }
  }

}



container.onclick = function (e) {
  if (e.target) {

    var link = 'https://reqres.in/api/users?id=' + e.path[0].id;

    console.log(e);
    request.open('GET', link, true);

    request.onload = function () {
      var res = JSON.parse(this.response);
      console.log(res);
      const modalImg = document.getElementById('avatar');
      modalImg.src = res.data.avatar;

      const modalId = document.getElementById('id');
      modalId.textContent = res.data.id;

      const modalname = document.getElementById('name');
      modalname.textContent = res.data.first_name + res.data.last_name;

      const modalemail = document.getElementById('email');
      modalemail.textContent = res.data.email;

    }

    var mymodal = document.getElementById('MyModal');
    mymodal.style.display = 'block';
    request.send();
  }
};

const close = document.getElementById('close');
close.onclick = function () {
  var mymodal = document.getElementById('MyModal');
  mymodal.style.display = 'none';

}


request.send();
