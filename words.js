class Words {

  #newWords;
  #savedWords;
  #validWords;
  
  constructor() {

    fetch('words.txt')
      .then(response => response.text())
      .then(text => {
        this.#validWords = new Set(text.split(/\r?\n/));
      });

    // TODO make this use a set instead of plain text
    this.#savedWords = new Set(JSON.parse(localStorage.getItem("savedWords")));

    document.getElementById("saveButton").addEventListener("click", () => {      
      this.#savedWords = this.#newWords;
      const savedWordsArray = Array.from(this.#savedWords);
      localStorage.setItem("savedWords", JSON.stringify(savedWordsArray));
      this.displaySavedWords();
    });

    document.getElementById("changeOneButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();
      for (let i = 0; i < inputWord.length; i++) {
        for (let c = 97; c <= 122; c++) { // a-z
          const newWord = inputWord.slice(0, i) + String.fromCharCode(c) + inputWord.slice(i + 1);
          if (newWord !== inputWord) {
            if (this.isValidWord(newWord)) {
              newWordSet.add(newWord);
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);
    }); 

    document.getElementById("changeOneAddOneButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();   
      for (let i = 0; i < inputWord.length; i++) {
        for (let c1 = 97; c1 <= 122; c1++) { // a-z
          const intermediateWord = inputWord.slice(0, i) + String.fromCharCode(c1) + inputWord.slice(i + 1);

          for (let j = 0; j <= intermediateWord.length; j++) {
            for (let c2 = 97; c2 <= 122; c2++) { // a-z
              const newWord = intermediateWord.slice(0, j) + String.fromCharCode(c2) + intermediateWord.slice(j);
              if (newWord !== inputWord) {  
                if (this.isValidWord(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
        }      
      }
      this.updateNewWords(newWordSet);
    });

    document.getElementById("changeOneRemoveOneButton").addEventListener("click", () => { 
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();   
      for (let i = 0; i < inputWord.length; i++) {
        const intermediateWord = inputWord.slice(0, i) + inputWord.slice(i + 1);

        for (let j = 0; j < intermediateWord.length; j++) {
          for (let c = 97; c <= 122; c++) { // a-z
            const newWord = intermediateWord.slice(0, j) + String.fromCharCode(c) + intermediateWord.slice(j + 1);

            if (newWord !== inputWord) {
              if (this.isValidWord(newWord)) {
                newWordSet.add(newWord);
              }
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);   
    });

    document.getElementById("addOneRemoveOneButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();
      for (let i = 0; i < inputWord.length; i++) {
          const intermediateWord = inputWord.slice(0, i) + inputWord.slice(i + 1);

          for (let j = 0; j < intermediateWord.length; j++) {
            for (let c = 97; c <= 122; c++) { // a-z
              const newWord = intermediateWord.slice(0, j) + String.fromCharCode(c) + intermediateWord.slice(j);

              if (newWord !== inputWord) {
                if (this.isValidWord(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
      }
      this.updateNewWords(newWordSet);   
    });

    // TODO fix this function
    document.getElementById("changeOneAddOneRemoveOneButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();   

      for (let i = 0; i < inputWord.length; i++) {
        for (let c1 = 97; c1 <= 122; c1++) { // a-z
          const intermediateWord1 = inputWord.slice(0, i) + String.fromCharCode(c1) + inputWord.slice(i + 1);

          for (let j = 0; j < intermediateWord1.length; j++) {
            const intermediateWord2 = intermediateWord1.slice(0, j) + intermediateWord1.slice(j + 1);
            
            for (let k = 0; k < intermediateWord2.length; k++) {
              for (let c2 = 97; c2 <= 122; c2++) { // a-z
                const newWord = intermediateWord2.slice(0, k) + String.fromCharCode(c2) + intermediateWord2.slice(k);
                
                if (newWord !== inputWord) {
                  if (this.isValidWord(newWord)) {
                    newWordSet.add(newWord);
                  }
                }
              }
            }
          }
        }      
      }
      this.updateNewWords(newWordSet);   
    });

    document.getElementById("changeOneAddTwoButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();   

      for (let i = 0; i < inputWord.length; i++) {
        for (let c1 = 97; c1 <= 122; c1++) { // a-z
          const intermediateWord = inputWord.slice(0, i) + String.fromCharCode(c1) + inputWord.slice(i + 1);

          for (let j = 0; j <= intermediateWord.length; j++) {
            for (let c2 = 97; c2 <= 122; c2++) { // a-z
              const intermediateWord2 = intermediateWord.slice(0, j) + String.fromCharCode(c2) + intermediateWord.slice(j);

              for (let k = 0; k <= intermediateWord2.length; k++) {
                for (let c3 = 97; c3 <= 122; c3++) { // a-z
                  const newWord = intermediateWord2.slice(0, k) + String.fromCharCode(c3) + intermediateWord2.slice(k);

                  if (newWord !== inputWord) {
                    if (this.isValidWord(newWord)) {
                      newWordSet.add(newWord);
                    }
                  }
                }
              }
            }
          }
        }      
      }
      this.updateNewWords(newWordSet);   
    });

    document.getElementById("changeOneRemoveTwoButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();   

      for (let i = 0; i < inputWord.length; i++) {
        const intermediateWord1 = inputWord.slice(0, i) + inputWord.slice(i + 1);

        for (let j = 0; j < intermediateWord1.length; j++) {
          const intermediateWord2 = intermediateWord1.slice(0, j) + intermediateWord1.slice(j + 1);     

          for (let k = 0; k < intermediateWord2.length; k++) {
            for (let c = 97; c <= 122; c++) { // a-z
              const newWord = intermediateWord2.slice(0, k) + String.fromCharCode(c) + intermediateWord2.slice(k + 1);
              if (newWord !== inputWord) {
                if (this.isValidWord(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);   
    });

    document.getElementById("changeTwoButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();   

      for (let i = 0; i < inputWord.length; i++) {
        for (let c1 = 97; c1 <= 122; c1++) { // a-z
          const intermediateWord = inputWord.slice(0, i) + String.fromCharCode(c1) + inputWord.slice(i + 1);

          for (let j = 0; j < intermediateWord.length; j++) {
            for (let c2 = 97; c2 <= 122; c2++) { // a-z
              const newWord = intermediateWord.slice(0, j) + String.fromCharCode(c2) + intermediateWord.slice(j + 1);

              if (newWord !== inputWord) {
                if (this.isValidWord(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);   
    }); 

    document.getElementById("addTwoButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();      

      for (let i = 0; i <= inputWord.length; i++) {
        for (let c1 = 97; c1 <= 122; c1++) { // a-z
          const intermediateWord = inputWord.slice(0, i) + String.fromCharCode(c1) + inputWord.slice(i);

          for (let j = 0; j <= intermediateWord.length; j++) {
            for (let c2 = 97; c2 <= 122; c2++) { // a-z
              const newWord = intermediateWord.slice(0, j) + String.fromCharCode(c2) + intermediateWord.slice(j);

              if (newWord !== inputWord) {
                if (this.isValidWord(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);   
    });

    document.getElementById("removeTwoButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();

      for (let i = 0; i < inputWord.length; i++) {
        const intermediateWord1 = inputWord.slice(0, i) + inputWord.slice(i + 1);

        for (let j = 0; j < intermediateWord1.length; j++) {
          const newWord = intermediateWord1.slice(0, j) + intermediateWord1.slice(j + 1);

          if (newWord !== inputWord) {
            if (this.isValidWord(newWord)) {
              newWordSet.add(newWord);
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);   
    });
    
    document.getElementById("addThreeButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();

      for (let i = 0; i <= inputWord.length; i++) {
        for (let c1 = 97; c1 <= 122; c1++) { // a-z
          const intermediateWord1 = inputWord.slice(0, i) + String.fromCharCode(c1) + inputWord.slice(i);

          for (let j = 0; j <= intermediateWord1.length; j++) {
            for (let c2 = 97; c2 <= 122; c2++) { // a-z
              const intermediateWord2 = intermediateWord1.slice(0, j) + String.fromCharCode(c2) + intermediateWord1.slice(j);

              for (let k = 0; k <= intermediateWord2.length; k++) {
                for (let c3 = 97; c3 <= 122; c3++) { // a-z
                  const newWord = intermediateWord2.slice(0, k) + String.fromCharCode(c3) + intermediateWord2.slice(k);

                  if (newWord !== inputWord) {
                    if (this.isValidWord(newWord)) {
                      newWordSet.add(newWord);
                    }
                  }
                }
              }
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);   
    });

    document.getElementById("removeThreeButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();

      for (let i = 0; i < inputWord.length; i++) {
        const intermediateWord1 = inputWord.slice(0, i) + inputWord.slice(i + 1);

        for (let j = 0; j < intermediateWord1.length; j++) {
          const intermediateWord2 = intermediateWord1.slice(0, j) + intermediateWord1.slice(j + 1);

          for (let k = 0; k < intermediateWord2.length; k++) {
            const newWord = intermediateWord2.slice(0, k) + intermediateWord2.slice(k + 1);

            if (newWord !== inputWord) {
              if (this.isValidWord(newWord)) {
                newWordSet.add(newWord);
              }
            }
          }
        }
      }      
      this.updateNewWords(newWordSet);   
    });

    this.displaySavedWords();

    document.getElementById("statusSpan").innerText += "Ready!";  

  }
  
  displayMatchingWords = () => {
    const matchingWords = Array.from(this.#newWords).filter(word => this.#savedWords.has(word));
    document.getElementById("matchingWordsSpan").innerText = matchingWords.join('\n');
  }

  displaySavedWords = () => {        
    document.getElementById("savedWordsSpan").innerText = Array.from(this.#savedWords).sort().join('\n');    
  }

  isSavedWord = (word) => {    
    return this.#savedWords.has(word);
  }

  isValidWord = (word) => {
    return this.#validWords.has(word);
  } 

  updateNewWords = (newWordSet) => {

    this.#newWords = newWordSet;

    document.getElementById("newWordsSpan").innerText = Array.from(newWordSet).sort().join('\n');

    this.displayMatchingWords();
  }

}
