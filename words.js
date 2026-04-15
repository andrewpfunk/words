
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    const wordSet = new Set(text.split(/\r?\n/));

    document.getElementById("statusSpan").innerText += "Ready!";    
    
    document.getElementById("changeOneButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const wordlist = [];
      for (let i = 0; i < inputWord.length; i++) {
        for (let c = 97; c <= 122; c++) { // a-z
          const newWord = inputWord.slice(0, i) + String.fromCharCode(c) + inputWord.slice(i + 1);
          if (newWord !== inputWord) {
            if (wordSet.has(newWord)) {
              wordlist.push(newWord);
            }
          }
        }
      }      
      document.getElementById("resultSpan").innerText = wordlist.join('\n');      
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
                if (wordSet.has(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
        }      
      }
      document.getElementById("resultSpan").innerText = Array.from(newWordSet).join('\n');      
    });

    document.getElementById("removeOneChangeOneButton").addEventListener("click", () => { 
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();   
      for (let i = 0; i < inputWord.length; i++) {
        const intermediateWord = inputWord.slice(0, i) + inputWord.slice(i + 1);

        for (let j = 0; j < intermediateWord.length; j++) {
          for (let c = 97; c <= 122; c++) { // a-z
            const newWord = intermediateWord.slice(0, j) + String.fromCharCode(c) + intermediateWord.slice(j + 1);

            if (newWord !== inputWord) {
              if (wordSet.has(newWord)) {
                newWordSet.add(newWord);
              }
            }
          }
        }
      }      
      document.getElementById("resultSpan").innerText = Array.from(newWordSet).join('\n');      
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
                if (wordSet.has(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
      }
      document.getElementById("resultSpan").innerText = Array.from(newWordSet).join('\n');
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
                if (wordSet.has(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
        }
      }      
      document.getElementById("resultSpan").innerText = Array.from(newWordSet).join('\n');    
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
                if (wordSet.has(newWord)) {
                  newWordSet.add(newWord);
                }
              }
            }
          }
        }
      }      
      document.getElementById("resultSpan").innerText = Array.from(newWordSet).join('\n');      
    });

    document.getElementById("removeTwoButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      const newWordSet = new Set();

      for (let i = 0; i < inputWord.length; i++) {
        const intermediateWord1 = inputWord.slice(0, i) + inputWord.slice(i + 1);

        for (let j = 0; j < intermediateWord1.length; j++) {
          const newWord = intermediateWord1.slice(0, j) + intermediateWord1.slice(j + 1);

          if (newWord !== inputWord) {
            if (wordSet.has(newWord)) {
              newWordSet.add(newWord);
            }
          }
        }
      }      
      document.getElementById("resultSpan").innerText = Array.from(newWordSet).join('\n');      
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
                    if (wordSet.has(newWord)) {
                      newWordSet.add(newWord);
                    }
                  }
                }
              }
            }
          }
        }
      }      
      document.getElementById("resultSpan").innerText = Array.from(newWordSet).join('\n');      
    });

  });

