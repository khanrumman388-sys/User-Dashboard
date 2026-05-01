let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let user = localStorage.getItem('user');

// Auto login
if(user){
  showDashboard();
}

function login(){
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;
  if(u && p){
    localStorage.setItem('user',u);
    showDashboard();
  }
}

function logout(){
  localStorage.removeItem('user');
  location.reload();
}

function showDashboard(){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('sidebar').classList.remove('hidden');
  document.getElementById('main').classList.remove('hidden');
  renderTasks();
}

function showSection(sec){
  document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
  document.getElementById(sec).classList.remove('hidden');
  document.getElementById('title').innerText = sec.toUpperCase();
  if(sec==='analytics') drawChart();
}

function addTask(){
  let name = prompt('Task name');
  if(!name) return;
  tasks.push({name, status:'Pending'});
  save();
}

function toggle(i){
  tasks[i].status = tasks[i].status==='Pending'?'Completed':'Pending';
  save();
}

function del(i){
  tasks.splice(i,1);
  save();
}

function save(){
  localStorage.setItem('tasks',JSON.stringify(tasks));
  renderTasks();
}

function renderTasks(){
  let list=document.getElementById('taskList');
  list.innerHTML='';

  let completed=0;

  tasks.forEach((t,i)=>{
    if(t.status==='Completed') completed++;
    list.innerHTML += `\n    <tr>\n      <td>${t.name}</td>\n      <td onclick="toggle(${i})" style="cursor:pointer">${t.status}</td>\n      <td><button class="delete-btn" onclick="del(${i})">Delete</button></td>\n    </tr>`;
  });

  document.getElementById('totalTasks').innerText=tasks.length;
  document.getElementById('completedTasks').innerText=completed;
  document.getElementById('pendingTasks').innerText=tasks.length-completed;
}

function drawChart(){
  let completed = tasks.filter(t=>t.status==='Completed').length;
  let pending = tasks.length - completed;

  new Chart(document.getElementById('chart'),{
    type:'doughnut',
    data:{
      labels:['Completed','Pending'],
      datasets:[{data:[completed,pending]}]
    }
  });
}