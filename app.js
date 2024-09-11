// qlobal deyisenlerin teyini
        let tasks = [];  
        let currentFilter = 'all';  
//yeni tapsiriq elave etmek
        document.getElementById('addTaskButton').onclick = function() {  
            addTask();  
        };  

        document.getElementById('taskInput').addEventListener('keypress', function(event) {  
            if (event.key === 'Enter') {  
                addTask();  
            }  
        });  
// yeni tapsirirq yaratmaq
        function addTask() {  
            const taskInput = document.getElementById('taskInput');  
            const taskName = taskInput.value.trim();  
            
            if (taskName) {  
                // Yeni tapşırığı siyahının başlanğıcına əlavə edir  
                tasks.unshift({ name: taskName, completed: false });  
                taskInput.value = '';  
                renderTasks();  
            }  
        }  
//tapsiriq siyahisini yenilemek
        function renderTasks() {  
            const taskUl = document.getElementById('taskUl');  
            taskUl.innerHTML = '';  

            tasks.forEach((task, index) => {  
                if (currentFilter === 'all' ||   
                    (currentFilter === 'completed' && task.completed) ||   
                    (currentFilter === 'pending' && !task.completed)) {  
                    
                    const li = document.createElement('li');  
                    li.className = 'flex items-center justify-between  border border-[#E1E1E1] mb-[6px]';  
                     li.innerHTML = `  
                         <div class="flex items-center h-[40px] pl-[8px]  ">  
                             <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})" class="mr-2">  
                             <span class="${task.completed ? 'line-through' : ''}">${task.name}</span>  
                         </div>  
                         <div class="flex items-center pr-[8px] gap-[8px]">  
                             <button class="bg-[#0085FF] size-[20px] text-[10px] rounded-[5px] text-white " onclick="editTask(${index})"><i class="fa fa-pen"></i> </button>  
                             <button class="bg-[#FF0000] size-[20px] rounded-[5px] text-[10px] text-white " onclick="deleteTask(${index})"><i class="fa fa-trash"></i></button>  
                         </div>  
                     `;  
                    taskUl.appendChild(li);  
                }  
            });  
        }  
//tamamlamaq
        function toggleTask(index) {  
            tasks[index].completed = !tasks[index].completed;  
            renderTasks();  
        }  
//redakte etmek
        function editTask(index) {  
            const newTaskName = prompt('İşi redaktə edin:', tasks[index].name);  
            if (newTaskName) {  
                tasks[index].name = newTaskName.trim();  
                renderTasks();  
            }  
        }  
//silmek
        function deleteTask(index) {  
            tasks.splice(index, 1);  
            renderTasks();  
        }  
//filter
        function filterTasks(filter) {  
            currentFilter = filter;  
            renderTasks();  
        }  