function register() {

    const [eMail, pass] = [...document.querySelectorAll('.container input')];
    const fName = document.querySelector('.fname')
    const register = document.querySelector('.register');
    register.addEventListener('click', checkIfRegistered);

    let url = 'https://hobbies-7e6e8-default-rtdb.europe-west1.firebasedatabase.app/Users.json';
    function checkIfRegistered(ev) {
        ev.preventDefault();
        if ([eMail, pass].every(el => el.value)) {
            fetch(`${url}`)
                .then(res => {
                    if (res.status >= 200 && res.status <= 300) {
                        res.json()
                            .then(data => {
                                if ((Object.keys(data).find(key => data[key].Email === eMail.value))) {
                                    let errorP = document.createElement('p')
                                    errorP.textContent = `${eMail.value} is already registered`;
                                    document.querySelector('.container').appendChild(errorP);
                                    errorP.style.color = 'red';
                                    setTimeout(function () { errorP.remove(); }, 3000);
                                } else {
                                    createNew(eMail.value, pass.value, fName.value)
                                }
                                [eMail, pass].map(el => el.value = '');
                                fName.value = '';
                            })
                            .catch((err) => alert(err));
                    }
                })
        }
    }
    function createNew(email, fname, password) {
        fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify({
                Email: email,
                FirstName: fname,
                password: password
            })
        })
            .then(res => {
                if (!(res.status >= 200 && res.status <= 300)) {
                    throw new Error(`Status error - ${res.status}`);
                }
            })
            .then(data => console.log(data))
            .catch(err => alert(err));
    }
}

