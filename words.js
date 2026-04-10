
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    const wordSet = new Set(text.split(/\r?\n/));
    console.log(wordSet.has('century'));
  });

document.getElementById("statusSpan").innerText = "Loading...Done!";