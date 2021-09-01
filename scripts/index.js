const audioElement = document.querySelector('.audio');
const button = document.querySelector('.button');
const jokeText = document.querySelector('.joke');

const toggleButton = () => {
    button.disabled = !button.disabled;
    if (!button.disabled) {
        jokeText.classList.add('joke_state')
    } else {
        jokeText.classList.remove('joke_state')
    }
}

const tellMeAJoke = (joke) => {
    VoiceRSS.speech({
        key: '4d4ab0c0e75142cfbecba4af2881bd40',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    jokeText.textContent = joke;
}

// get jokes from joke API

const getJokesFromApi = async () => {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMeAJoke(joke);
        toggleButton();
    } catch (error) {
        console.log('oops:', error);
    }
}


button.addEventListener('click', getJokesFromApi);

audioElement.addEventListener('ended', toggleButton);