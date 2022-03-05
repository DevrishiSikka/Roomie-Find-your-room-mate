function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.style.backgroundColor = "#f7f7f7";
    a.style.fontFamily = "'Poppins', sans-serif";
    a.style.borderRadius = "5px";
    a.style.fontSize = "16px";
    a.style.padding = "10px";
    a.style.marginBottom = "10px";

    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = [
  "BBA- Bachelor of Business Administration",
  "BMS- Bachelor of Management Science",
  "BFA- Bachelor of Fine Arts",
  "BEM- Bachelor of Event Management",
  "Integrated Law Course- BA + LL.B",
  "BJMC- Bachelor of Journalism and Mass Communication",
  "BFD- Bachelor of Fashion Designing",
  "BSW- Bachelor of Social Work",
  "BBS- Bachelor of Business Studies",
  "BTTM- Bachelor of Travel and Tourism Management",
  "Aviation Courses",
  "B.Sc- Interior Design",
  "B.Sc.- Hospitality and Hotel Administration",
  "Bachelor of Design (B. Design)",
  "Bachelor of Performing Arts",
  "BA in History",
  "BE/B.Tech- Bachelor of Technology",
  "B.Arch- Bachelor of Architecture",
  "BCA- Bachelor of Computer Applications",
  "B.Sc.- Information Technology",
  "B.Sc- Nursing",
  "BPharma- Bachelor of Pharmacy",
  "B.Sc- Interior Design",
  "BDS- Bachelor of Dental Surgery",
  "Animation, Graphics and Multimedia",
  "B.Sc. – Nutrition & Dietetics",
  "BPT- Bachelor of Physiotherapy",
  "B.Sc- Applied Geology",
  "BA/B.Sc. Liberal Arts",
  "B.Sc.- Physics",
  "B.Sc. Chemistry",
  "B.Sc. Mathematics",
  "Aeronautical Engineering",
  "Automobile Engineering",
  "Civil Engineering",
  "Computer Science and Engineering",
  "Biotechnology Engineering",
  "Electrical and Electronics Engineering",
  "Electronics and Communication Engineering",
  "Automation and Robotics",
  "Petroleum Engineering",
  "Instrumentation Engineering",
  "Ceramic Engineering",
  "Chemical Engineering",
  "Structural Engineering",
  "Transportation Engineering",
  "Construction Engineering",
  "Power Engineering",
  "Robotics Engineering",
  "Textile Engineering",
  "Smart Manufacturing & Automation",
  "B.Com- Bachelor of Commerce",
  "BBA- Bachelor of Business Administration",
  "B.Com (Hons.)",
  "BA (Hons.) in Economics",
  "Integrated Law Program- B.Com LL.B.",
  "Integarted Law Program- BBA LL.B",
  "CA- Chartered Accountancy",
  "CS- Company Secretary",
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("course_name"), countries);
