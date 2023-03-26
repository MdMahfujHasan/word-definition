document.getElementById('btn-search').addEventListener('click', function () {
    const inputWord = document.getElementById('input-word');
    const inputWordValue = inputWord.value;
    loadSearchedWord(inputWordValue);
    inputWord.value = '';
    document.getElementById('synonyms-container').style.display = 'block';
    document.getElementById('antonyms-container').style.display = 'block';
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.classList.add('border-solid');
    detailsContainer.classList.add('border-2');
    detailsContainer.classList.add('border-rose-400');
})

const loadSearchedWord = async searchText => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displaySearchedWord(data);
}

const displaySearchedWord = words => {
    const definitionContainer = document.getElementById('definition-container');
    const synonymContainer = document.getElementById('synonyms-container');
    const antonymsContainer = document.getElementById('antonyms-container');
    words.forEach(word => {
        console.log(word);
        const meanings = word.meanings;
        // console.log(meanings);
        meanings.forEach(meaning => {
            const { partOfSpeech, definitions, synonyms, antonyms } = meaning;
            definitions.forEach(definition => {
                // console.log(definition.definition);
                const li = document.createElement('li');
                li.innerText = definition.definition;
                console.log(li)
                definitionContainer.appendChild(li);
            })
            synonyms.forEach(synonym => {
                // console.log(synonym);
                const span = document.createElement('span');
                span.innerText = synonym ? synonym + ', ' : '';
                synonymContainer.appendChild(span);
            })
            antonyms.forEach(antonym => {
                // console.log(antonym);
                const span = document.createElement('span');
                span.innerText = antonym ? antonym + ', ' : '---';
                antonymsContainer.appendChild(span);
                antonymsContainer.style
            })
        })
        const phonetics = word.phonetics;
        phonetics.forEach(phonetic => {
            // console.log(phonetic.audio); flex justify-center items-center
            document.getElementById('word-audio').innerHTML = `
            <div>
                <audio controls>
                    <source src="${phonetic.audio}">
                </audio>
                <div class="mt-2">
                    <p class="text-center"><a style="color: black" target="_blank" href="${word.sourceUrls[0]}"><b>Source: </b><span class="underline">${word.sourceUrls[0]}</span></a></p>
                </div>
            </div>
            `;
        })
        document.getElementById('word-details').innerHTML = `
        <h2 class="text-7xl font-semibold">${word.word}</h2>
        <p class="text-2xl">${word.phonetic}</p>
        <p class="font-medium italic">${word.meanings[0].partOfSpeech}</p>
        <p>Meaning:</p>
        `;
    })
}