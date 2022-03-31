"use strict";

var form = document.getElementById('userForm');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  console.log("hola");
  var data = new FormData(form);
  var obj = {};
  data.forEach(function (value, key) {
    return obj[key] = value;
  });
  console.log(data); // fetch('/users', {
  //     method: 'POST', body: JSON.stringify(obj),
  //     headers: { "Content-Type": "application/json" }
  // }).then(res => res.json()).then(json => console.log(json))

  fetch('/users', {
    method: 'POST',
    body: data
  });
});