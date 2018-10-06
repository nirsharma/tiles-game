function draw(name, left, type) {
    var el = document.createElement('div');
    var img = document.createElement('img');
    img.src = type + ".png";
    el.appendChild(img);
    el.className = type;
    el.appendChild(document.createTextNode(name));
    el.style.left = left + "px";
    return el;
  }
  
  function fileSystem(obj, left = 25) {
    var el = document.createElement('div');
    for(var key in obj) {
        if(!obj[key]) {
          el.appendChild(draw(key, left, "file"));
      } else {
          var fl = document.createElement('div');
          fl.className = "container";
          fl.appendChild(draw(key, left, "folder"));
          var files = fileSystem(obj[key], left + 25);
          files.className = 'sub';
          files.style.display = 'none';
          fl.appendChild(files);
          el.appendChild(fl);
      }
    }
    return el;
  }
  
  var files = {
      Music : {
        "tere Naam.mp3" : false,
      "humko tumse pyaar kitna.mp3" : false,
      "Agar tum saath ho to.mp3" : false
    },
    Movies : {
        "Inception.mov" : false,
      "Intersteller.mov" : false,
      "Tanu wends manu.mov" : false
    },
    Documents : {
        "resume.pdf" : false,
      "office" : {
          "2fa_events.pdf" : false,
        "localization.word" : false
      }
    },
    "details.txt" : false
  }
  
  box = fileSystem(files);
  box.addEventListener('click', (evt) => {
      var el = evt.target;
      var next = el.nextSibling;
      if(el.className == 'folder' && next.className == 'sub') {
            if(next.style.display == "none") {
                next.style.display = "block";
            } else {
                next.style.display = "none";
            }
      }
  })
  document.body.appendChild(box);

