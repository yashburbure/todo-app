import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js"
const firebaseConfig = {
  apiKey: "AIzaSyBWfpBHd_Nesj7_BPOjio9yVjTLRoFVFII",
  authDomain: "to-do-app-23875.firebaseapp.com",
  databaseURL: "https://to-do-app-23875-default-rtdb.firebaseio.com",
  projectId: "to-do-app-23875",
  storageBucket: "to-do-app-23875.appspot.com",
  messagingSenderId: "741523181823",
  appId: "1:741523181823:web:e6a0bdc894fe7487b6bcca",
  measurementId: "G-7L3R1GLZMR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let text = document.getElementById("todo-input").value;
  set(ref(db, 'users/' + text), {
    text: text,
    status: "active"
  });
  document.getElementById("todo-input").value = "";
})
function getdata() {
  const dbref = ref(db);
  get(child(dbref, "users")).
    then((snapshot) => {
      let items = [];
      snapshot.forEach((cs) => {
        let temp = cs.val();
        // console.log(temp);
        items.push({
          text: temp.text,
          status: temp.val
        });
      })
      generatitem(items);
    })
}
function generatitem(items) {
  let itemsHTML = "";
  let len = items.length;
  let itemsleft =
    ` 
    <div class="items-left">
      ${len} items left
    </div>
    <div class="item-statuses">
      <span class="active">All</span>
      <span>Active</span>
      <span>Completed</span>
    </div>
    <div class="items-clear">
      <span>Clear completed</span>
    </div>
  
  `;
  items.forEach((item) => {
    itemsHTML += `
    <div class="todo-item">
      <div class="check">
          <div class="check-mark">
              <img src="./assets/icon-check.svg">
          </div>
      </div>
      <div class="todo-text" id=${item.text}>
          ${item.text}
      </div>
    </div>
    `;
  });
  document.querySelector(".todo-items").innerHTML = itemsHTML;
  document.getElementById("todo-items-info-id").innerHTML = itemsleft;
  createventlistner();
}
function find_user(range) {
  let selecter = document.querySelectorAll(".todo-text");
  for (let i = 0; i <= range; i++) {
    if (i == range) {
      let text = selecter[i].textContent;
      let user = text.replace(/\s+/g, ' ').trim()
      return user;
    }
  }
}
function createventlistner() {
  let event_list = document.querySelectorAll(".check-mark");

  for (let i = 1; i < event_list.length; i++) {
    let username = find_user(i - 1);
    event_list[i].addEventListener("click", () => {
      const starCountRef = ref(db, 'users/' + username);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data.status === "active") {
          const postData = {
            text: data.text,
            status: "completed"
          };
          const updates = {};
          updates['/users/' + username] = postData;
          return update(ref(db), updates);
        } 
        else if(data.status==="completed"){
          const postData = {
            text: data.text,
            status: "active"
          };
          const updates = {};
          updates['/users/' + username] = postData;
          return update(ref(db), updates);
        }
      }, {
        onlyOnce: true
      });
    })
  }
}

getdata();