
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    const wordSet = new Set(text.split(/\r?\n/));

    document.getElementById("statusSpan").innerText += "Ready!";    
    console.log("Words loaded: " + wordSet.size);
    
    document.getElementById("changeOneButton").addEventListener("click", () => {
      const inputWord = document.getElementById("wordInput").value.trim().toLowerCase();
      if (wordSet.has(inputWord)) {
        document.getElementById("resultSpan").innerText = `"${inputWord}" is a valid word!`;
      } else {
        document.getElementById("resultSpan").innerText = `"${inputWord}" is not a valid word.`;
      }
    }); 
    
  });

