function mainPage() {
    const [eMail, pass] = [...document.querySelectorAll('.container input')];
    const fName = document.querySelector('.fname')
    const submitBtn = document.querySelector('.submit');
    submitBtn.addEventListener('click', logIn);

    function logIn(ev) {
        ev.preventDefault();
        if ([eMail, pass].every(el => el.value)) {
            fetch(`https://hobbies-7e6e8-default-rtdb.europe-west1.firebasedatabase.app/Users.json`)
                .then(res => {
                    if (res.status >= 200 && res.status <= 300) {
                        res.json().then(data => {
                            let found = (Object.keys(data).find(key => data[key].Email === eMail.value))
                            if (found) {
                                let foundP = document.createElement('p')
                                foundP.textContent = `Welcome ${fName.value}`;
                                document.querySelector('.container').appendChild(foundP);
                                foundP.style.color = 'green';
                                setTimeout(function () { foundP.remove(); }, 3000);
                            } else {
                                alert('There is no such user registered. Please register first!')
                            }
                            [eMail, pass].map(el => el.value = '');
                            fName.value = '';
                        })
                            .catch((err) => alert(err));
                    }
                })
        }
    }
}


