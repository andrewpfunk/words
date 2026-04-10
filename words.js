
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    const wordSet = new Set(text.split(/\r?\n/));

    document.getElementById("statusSpan").innerText = "Loading...Done!";    
    console.log("Words loaded:");
    console.log(wordSet.size);
    console.log(wordSet.has('century'));
  });

