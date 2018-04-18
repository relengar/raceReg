function selectRun(evt) {
    $('.card').removeClass('selected');
    $('.tag').removeClass('hidden');
    $('.card').each((i, card) => {
        if ($.contains(card, evt.target)) {
            $(card).addClass('selected');
            $('.tag', card).addClass('hidden');
            $('#form').removeClass('hidden');
            $('.stepNum').removeClass('selected');
            $('.stepNum')[1].setAttribute("class", "stepNum selected")
        }
    });
}

function submit() {
    console.log('evt')
    $('.formContainer input').removeClass('error');
    if (checkInputs()) {
        $('#code').text(`${String(Math.random()).substr(2,4)} ${String(Math.random()).substr(2,4)} ${String(Math.random()).substr(2,4)}`)
        $('.whiteStripe').removeClass('hidden');
        $('.stepNum').removeClass('selected');
        $('.stepNum')[2].setAttribute("class", "stepNum selected");
    }
}

function checkInputs() {
    const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/g
    const telRe = /([0-9])[^a-z\[\]{}!@#$%^&*()=+,<>`~]{5,}/g
    const validators = {
        'email' : val => { return emailRe.test(val) },
        'phone' : val => { return telRe.test(val) },
        'postcode' : val => { return (val && !isNaN(parseInt(val)) && val.length === 5) }
    }
    let allValid = true;
    $('.formContainer input').each((i, input) => {
        let valid = input.value.trim() !== "";
        valid = validators[input.id] ? validators[input.id](input.value) : valid;
        !valid ? $(input).addClass('error') : null;
        allValid = allValid ? valid : allValid;
    });
    return allValid;
}

function register() {
    $('#footer').removeClass('hidden');
    $('.stepNum').removeClass('selected');
    $('.stepNum')[3].setAttribute("class", "stepNum selected");
}

window.onload = function() {
    $('button').on('click', evt => {
        evt.preventDefault();
        submit();
    });
    $('.card').on('click', evt => selectRun(evt))
}
