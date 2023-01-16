

function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';


    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please add some text');
        return;
    }

    generateImageRequest(prompt, size);


}

function showSpinner() {
    document.querySelector('.socket').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.socket').classList.remove('show');
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner();


        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if (!response.ok) {
            hideSpinner();
            throw new Error('That image could not be generated')
        }

        const data = await response.json();
        // console.log(data);

        const imageUrl = data.data;

        document.querySelector('#image').src = imageUrl;

        hideSpinner();

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }

}



document.querySelector('#image-form').addEventListener('submit', onSubmit);
