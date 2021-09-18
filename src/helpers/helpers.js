
export function checkWin(correct, wrong, word) {
  let status = 'win';
  
  let splittedWord = word.toLowerCase().split(" ")
  // console.log("aaa", correct, splittedWord)
  splittedWord.join("").split('').forEach(letter => {
    if(!correct.includes(letter)){
      status = '';
    }
  });
  if(word.length === 0){
    status="";
  }
  if(wrong.length === 6) status = 'lose';

  return status
}