let getId = x => document.getElementById(x);
let getSel = s => document.querySelector(s);
let getClass = c => document.getElementsByClassName(c);
// text styles

getId('bold').onclick = function () {
    getId('text-block').classList.toggle('bold')
}
getId('italic').onclick = function () {
    getId('text-block').classList.toggle('italic')
}
getId('underline').onclick = function () {
    getId('text-block').classList.toggle('underline')
}
getId('stroke').onclick = function () {
    getId('text-block').classList.toggle('stroke')
}

// alighn text
getId('right').onclick = function () {
    getId('text-block').classList.add('right');
    getId('text-block').classList.remove('center', 'left');
}
getId('left').onclick = function () {
    getId('text-block').classList.add('left');
    getId('text-block').classList.remove('center', 'right');

}
getId('center').onclick = function () {
    getId('text-block').classList.add('center');
    getId('text-block').classList.remove('right', 'left');

}

// font size
let size = document.querySelector('.size')
for (let i = 0; i < size.options.length; i++) {
    size.options[i].style.fontSize = size.options[i].value;
}
size.onchange = function () {
    getId('text-block').style.fontSize = this.value;
}
// font family
let fontFamilys = document.querySelector('.fontFamily')
for (let i = 0; i < fontFamilys.options.length; i++) {
    fontFamilys.options[i].style.fontFamily = fontFamilys.options[i].value
}
fontFamilys.onchange = function () {
    getId('text-block').style.fontFamily = this.value;
}


// edit textarea

function editText() {
    getSel(".edit-block").style.display = "block";
    getId("mainBtns").style.display = "none";

    getId("area-block").style.display = "block";
    getId("text-block").style.display = "none";
    getId("editArea").value = getId("text-block").innerHTML;
}
// change text color

function changeColors() {
    getId("colors-style").style.display = "block";
    let list = document.getElementsByClassName('parts-item');
    for (let i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            getId("text-block").style.color = event.target.style.backgroundColor;
        }
    }
}


function closeBg() {
    getId("images-colors").style.display = "none";
}
// change of background color

function changeBackground() {
    getId('img').style.display = 'none';
    getId("images-colors").style.display = "block";
    getSel(".bg-colors").style.display = "block";
    getSel('.file').style.display = "none";
    let list = document.getElementsByClassName('parts-item');
    for (let i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            document.body.style.backgroundColor = event.target.style.backgroundColor;
        }
    }
}
// add background image
function changeImage() {
    getSel(".bg-colors").style.display = "none";
    getSel('.file').style.display = "none";
    getId('img').style.display = 'block';
    document.body.style.background = event.target.style.backgroundImage;

}
// choose image from file
function chooseFile() {
    getId('img').style.display = 'none';
    getSel('.file').style.display = "block";
    getSel(".bg-colors").style.display = "none";
    let file = document.querySelector('.file');
    file.addEventListener('change', function (event) {
        console.log(event);
        const url = URL.createObjectURL(event.target.files[0]);
        document.body.style.backgroundImage = `url(${url})`;
    })

}
// button save text
function saveText() {
    getSel(".edit-block").style.display = "none";
    getId("mainBtns").style.display = "block";
    getId("mainBtns").style.display = "flex";
    getId("area-block").style.display = "none";
    getId("text-block").style.display = "block";
    getId("text-block").innerHTML = getId("editArea").value;
}


function createUl() {
    let amountLi = getSel('.count-li').value;
    let listStyle = getSel('.mark-li').value;
    // ul validation

    if (amountLi == '' || listStyle == 'choose ul type mark...') {
        document.getElementById('unvalidUl').innerHTML = 'заповніть пусті поля';
        return false;
    } else if (isNaN(amountLi)) {
        document.getElementById('unvalidUl').innerHTML = 'введіть число у першому полі';
        return false;
    }
    //  ul creation
    else {
        getId("editArea").value += `<ul type="${listStyle}">`;
        for (let i = 1; i <= amountLi; i++) {
            getId("editArea").value += `<li>item ${i}</li>`
        }
        getId("editArea").value += "</ul>";
    }
}

function resetUl() {
    getSel('.create-ul').reset();
    document.getElementById('unvalidUl').remove()
}



function createOl() {
    // ol validation

    let amountOl = getSel('.count-ol').value;
    let listOl = getSel('.mark-ol').value;

    if (amountOl == '' || listOl == 'choose ol type mark...') {
        document.getElementById('unvalidOl').innerHTML = 'заповніть пусті поля';
        return false;
    } else if (isNaN(amountOl)) {
        document.getElementById('unvalidOl').innerHTML = 'введіть число у першому полі';
        return false;
    }
    //  ol creation 
    else {
        getId("editArea").value += `<ol type="${listOl}">`;
        for (let i = 1; i <= amountOl; i++) {
            getId("editArea").value += `<li>item</li>`
        }
        getId("editArea").value += "</ol>";
    }
}

function resetOl() {
    getSel('.create-ol').reset();
    document.getElementById('unvalidOl').remove()
}



function chooseTable() {
    getId("create-table").style.display = "block";

}


function createTable() {
    //  validation table form
    let fail = 0;
    let tableForm = document.querySelector('.create-table');
    let fields = document.querySelectorAll('.field');
    let createTableBtn = getId('createTableBtn');
    createTableBtn.addEventListener('click', function (event) {

        let errors = tableForm.querySelectorAll('.error')
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].value) {
                let error = document.createElement('div');
                error.className = 'error';
                error.style.color = 'red';
                error.innerHTML = 'Заповніть поле';
                tableForm[i].parentElement.insertBefore(error, fields[i]);
                fail++;
            }

        }
        for (let i = 0; i < fields.length - 2; i++) {
            if (isNaN(tableForm[i].value)) {
                fields[i].style.borderColor = 'red';
                let error = document.createElement('div');
                error.className = 'error';
                error.style.color = 'red';
                error.innerHTML = 'Введіть число!';
                tableForm[i].parentElement.insertBefore(error, fields[i]);
                fail++;

            }

        }
        // create table
        if (fail == 0) {
            let countTr = getSel('.count-tr');
            let countTd = getSel('.count-td');
            let widthTd = getSel('.width-td');
            let heightTd = getSel('.height-td');
            let widthBorder = getSel('.border-width');
            let styleBorder = getSel('.border-style');
            let colorBorder = getSel('.border-color');
            getId("editArea").value += '<table>';
            for (let i = 0; i < countTr.value; i++) {
                getId("editArea").value += '<tr>';
                for (let i = 0; i < countTd.value; i++) {
                    getId("editArea").value += `<td style="width:${widthTd.value}px;height:${heightTd.value}px;border:${widthBorder.value}px ${styleBorder.value} ${colorBorder.value};">TD</td>`;
                }
                getId("editArea").value += '</tr>';

            }
            getId("editArea").value += '<table>';
        }
    })
}
// validation sign in form


function validateLock() {

    let login = document.forms['sign-form']['login'].value;
    let password = document.forms['sign-form']['password'].value;
    if (login !== 'admin' || password !== 'admin') {
        document.getElementById('passf').innerHTML = 'перевірте пароль або логін';
        return false;
    } else
        getSel('.modal').style.display = "none";
}