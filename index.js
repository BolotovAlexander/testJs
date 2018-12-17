window.onload = function() {
    initUi();
};

function initRequest(render) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8080/data.json');
    xhr.timeout = 30000; // 30 sec

    xhr.onloadstart = function() {
        console.log('запрос начат');
    };
    xhr.onprogress = function() {
        console.log('браузер получил очередной пакет данных, можно прочитать текущие полученные данные в responseText');
    };
    xhr.abort = function() {
        console.log('запрос был отменён вызовом xhr.abort()');
    };
    xhr.onerror = function() {
        console.log('произошла ошибка');
    };
    xhr.onload = function() {
        console.log('запрос был успешно (без ошибок) завершён');


        const data = JSON.parse(xhr.responseText); // превращаем строку в объект

        render(data);
    };
    xhr.ontimeout = function() {
        console.warn('запрос был прекращён по таймауту');
    };
    xhr.onloadend = function() {
        console.log('запрос был завершён (успешно или неуспешно)');
    };

    return xhr;
}

function initUi(xhr) {
    const button = document.querySelector('#submit-request');

    button.onclick = function() {
        var requestObject = initRequest(renderTable);
        requestObject.send(); // отправляет запрос
        this.parentNode.removeChild(this); // удаляет кнопку
        document.title = "JS eats my brain"; //переименовали заглавие
        document.getElementById("titleT").innerHTML="Список членов общества \"JS eats my brain\""; //изменили текст страницы
    };
}

function renderUi(data) {
    const ul = document.createElement('ul');

    data.forEach(value => {
        const li = document.createElement('li');

        for (let key in value) {
            appendDiv(li, value[key]);
        }

        li.style.border = '3px solid red';
        li.style.borderRadius = '5px';

        ul.appendChild(li);
    });

    document.body.appendChild(ul);
}

function renderUiTemplate(data) {
    let template = `<ul>`;

    data.forEach(person => {
        template += (
            `
            <li>
                <div class="name">${person.name}</div>
                <div class="email">${person.email}</div>
                <div class="balance">${person.balance}</div>
                <div class="company">${person.company}</div>
                <div class="gender">${person.gender}</div>
                <div class="age">${person.age}</div>
                <div class="eyeColor">${person.eyeColor}</div>
               
            </li>`
        );
    });
    template += `</ul>`;

    const content = document.querySelector('.content');
    content.innerHTML = template;
};


function renderTable(data) {

    let template = `
    <table>
        <thead>
         <tr class="heading">
            <th class="name" data-sort-by="name">name</th>
            <th class="email" data-sort-by="email">email</th>
            <th class="balance" data-sort-by="balance">balance</th>
            <th class="company" data-sort-by="company">company</th>
            <th class="gender" data-sort-by="gender">gender</th>
            <th class="age" data-sort-by="age">age</th>
            <th class="eye-color" data-sort-by="eyeColor">eye color</th>
        </tr>
        </thead>`;
    data.forEach(person => {
        template += (
            `
            <tr class="row">
                <td class="name">${person.name}</td>
                <td class="email">${person.email}</td>
                <td class="balance">${person.balance}</td>
                <td class="company">${person.company}</td>
                <td class="gender">${person.gender}</td>
                <td class="age">${person.age}</td>
                <td class="eyeColor">${person.eyeColor}</td>
            </tr>`
        );
    });
    template += `</table>`;
    
    const content = document.querySelector('.content');
    content.innerHTML = template;

    const sortByNameElement = document.querySelector('.heading');
    
    const sortTableByName = (event) => {debugger
        sortBy(data, event.target.dataset.sortBy);
        renderTable(data);
    };
 
    sortByNameElement.addEventListener('click', sortTableByName);
}


function appendDiv(parent, data) {
    const element = document.createElement('div');
    element.textContent = data;
    parent.appendChild(element);
}

let tumbler = 2;

function sortBy(data, key){
    
    if (tumbler % 2 == 0 ) {
        data.sort((a,b) => {
        
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
        });debugger
        tumbler++;  
    } else {
        data.sort((a,b) => {
        
            if (a[key] > b[key]) {
                return -1;
            }
            if (a[key] < b[key]) {
                return 1;
            }
        });debugger
        tumbler = 2;    
    };
}
