const $ = (id) => document.getElementById(id);

const show = (info, pError, element) => {
    $(info).hidden = false;
    $(pError).innerHTML = null;
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
};

const validateElement = (info, pError, msgError, element) => {
    $(info).hidden = true;
    $(pError).innerHTML = msgError;
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
};

window.onload = function () {
    let titulo = document.querySelector('.moviesAddTitulo');
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

    let formAdd = document.querySelector('form');
    let elementsForm = formAdd.elements;

    // $('title').focus();

    // $('title').addEventListener('focus', () => {
    //     $('msg-form').hidden = false;
    // });

    // $('title').addEventListener('blur', () => {
    //     $('msg-form').hidden = true;
    // });

    Array.from(elementsForm).forEach((element) => {
        if (
            element.type === 'text' ||
            element.type === 'number' ||
            element.type === 'date'
        ) {
            element.addEventListener('focus', ({ target }) => {
                show(`msg-${element.name}`, `error-${element.name}`, target);

                // $(`msg-${element.name}`).hidden = false;
                // $(`error-${element.name}`).hidden = true;
                // e.target.style.borderColor = 'inherit';
            });

            element.addEventListener('blur', function ({ target }) {
                if (!this.value.trim()) {
                    validateElement(
                        `msg-${element.name}`,
                        `error-${element.name}`,
                        `Complete el campo ${element.name}`,
                        target
                    );
                } else {
                    validateElement(`msg-${element.name}`, `error-${element.name}`, '', target);

                    switch (element.name) {
                        case 'rating':
                        case 'awards':
                            if (+element.value < 1 || +element.value > 10) {
                                validateElement(
                                    `msg-${element.name}`,
                                    `error-${element.name}`,
                                    'Debe colocar un nº entre 1 y 10',
                                    target
                                );
                            }
                            break;
                        case 'length':
                            if (+element.value < 30 || +element.value > 360) {
                                validateElement(
                                    `msg-${element.name}`,
                                    `error-${element.name}`,
                                    'Debe colocar un nº entre 30 y 360',
                                    target
                                );
                            }
                            break;
                    }
                }

                // $(`msg-${element.name}`).hidden = true;
                // if (!this.value.trim()) {
                //     $(`error-${element.name}`).hidden = false;
                // }
            });
        }
    });

    const msgErrors = [];

    formAdd.addEventListener('submit', (event) => {
        event.preventDefault();
        msgErrors.length = 0; // Limpiar mensajes de error anteriores

        for (let i = 0; i < elementsForm.length - 1; i++) {
            if (elementsForm[i].value.trim() === '') {
                msgErrors.push(
                    `El campo ${elementsForm[i].name} no puede estar vacío`
                );

                elementsForm[i].classList.add('is-invalid');
                elementsForm[i].classList.remove('is-valid');
            } else {
                elementsForm[i].classList.remove('is-invalid');
                elementsForm[i].classList.add('is-valid');
            }
        }

        if (msgErrors.length) {
            alert('Los campos señalados son obligatorios');
        } else {
            this.submit();
        }

        // if (msgErrors.length) {
        //     msgErrors.forEach((msg) => {
        //         $('box-errors').innerHTML += `<li>${msg}</li>`;
        //     });
        // } else {
        //     this.submit();
        // }
    });
};
