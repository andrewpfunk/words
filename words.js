
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    const wordSet = new Set(text.split(/\r?\n/));

    document.getElementById("statusSpan").innerText += "Ready!";    
    console.log("Words loaded: " + wordSet.size);
    
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
    
  });

