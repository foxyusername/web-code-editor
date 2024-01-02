let htmlValue = document.getElementById('htmlValue');
let cssValue = document.getElementById('cssValue');
let jsValue = document.getElementById('jsValue');
let display = document.getElementById('output');
let textareas = document.querySelectorAll('textarea');
const array=[textareas[0],textareas[1]];
let button = document.getElementById('saveJs');
let errorDiv=document.getElementById('errorDiv');
let errorMessage=document.querySelector('#errorMessage');
let closeBtn=document.querySelector('#closeBtn');

let errorOccured=false;


window.addEventListener('load',()=>{

if(localStorage.getItem('showAlert')===false || localStorage.getItem('showAlert')===null || localStorage.getItem('showAlert')===undefined ){
   localStorage.setItem('showAlert',true);
   alert("This website uses browser's localStorage in order to save the written code and execute it after reopening or refreshing the site");
   console.log('hit');
}

let htmlBefore=localStorage.getItem('Html');
let cssBefore=localStorage.getItem('Css');
let jsBefore=localStorage.getItem('Javascript');

if(htmlBefore) htmlValue.value=htmlBefore;
if(cssBefore) cssValue.value=cssBefore;
if(jsBefore) jsValue.value=jsBefore;

compileCode();

display.contentDocument.body.style.wordBreak='break-all';
})

closeBtn.addEventListener('click',()=>{
  errorOccured=false;
  errorDiv.style.display='none';
  errorMessage.innerText='';
})

document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        compileCode();
        saveCode();
    }
});

// Function to handle errors
window.onerror = function(message, source, lineno, colno, error) {
    // Log the error details (for demonstration purposes)
    console.error(`Error occurred: ${message} at ${source}:${lineno}:${colno}`);
    onError(message,source,lineno,colno);
 
    errorOccured=true;
};


function compileCode() {
display.contentDocument.body.innerHTML=htmlValue.value + '<style>' + cssValue.value + '</style>';
display.contentWindow.eval(jsValue.value);

if(errorOccured===true){
  errorOccured=false;
  errorDiv.style.display='none';
  errorMessage.innerText='';
}

}

function onError(message,source,lineno,colno){
  errorDiv.style.display="flex";
  errorMessage.innerText=`Error occurred: ${message} at ${source}:${lineno}:${colno}`
}

function saveCode(){
    localStorage.setItem('Html',htmlValue.value);
    localStorage.setItem('Css',cssValue.value);
    localStorage.setItem('Javascript',jsValue.value);
}