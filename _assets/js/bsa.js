var filename='http://daker.me/assets/css/bsa.css?' + new Date().getTime();
var fileref=document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", filename);
document.getElementsByTagName("head")[0].appendChild(fileref);

var demoad = document.createElement('div');
demoad.id = 'bsa_demo';
demoad.innerHTML = '<div id="bsap_1290676" class="bsarocks bsap_af6bf8f7d59e09aa41173c9e7d776de9"></div><a href="http://adpacks.com" id="bsap_aplink">via Ad Packs</a><span id="bsa_demo_remove"></span>';
document.getElementsByTagName('body')[0].appendChild(demoad);

document.getElementById('bsa_demo_remove').addEventListener('click',function(e){
    demoad.style.display = 'none';
    e.preventDefault();
});

var bsa = document.createElement('script');
bsa.type = 'text/javascript';
bsa.async = true;
bsa.src = '//s3.buysellads.com/ac/bsa.js';
document.getElementsByTagName('head')[0].appendChild(bsa);