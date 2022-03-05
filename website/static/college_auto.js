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
  "ABES Engineering College Ghaziabad, Uttar Pradesh",
  "ABES institute of technology, Uttar Pradesh",
  "Acropolis Institute Of Technology And Research, Madhya Pradesh",
  "Aditya Engineering College, Andhra Pradesh",
  "Agnel Institute of Technology, Goa",
  "AISSMS Institute of Information Technology, Maharashtra",
  "Ajay Kumar Garg Engineering College, Uttar Pradesh",
  "AltCampus, Himachal Pradesh",
  "Amal Jyothi College of Engineering, Kerala",
  "American Embassy School, Delhi",
  "Amity University Chhattisgarh, Chhattisgarh",
  "Amity University Madhya Pradesh, Madhya Pradesh",
  "Amity University Mumbai, Maharashtra",
  "Amrita Vishwa Vidyapeetham, Kerala",
  "ANAND-ICE, Rajasthan",
  "Andhra Loyola IET, Andhra Pradesh",
  "Anurag University, Telangana",
  "Army Institute of Technology, Pune, Maharashtra",
  "Arunai Engineering College, Tamil Nadu",
  "Arya College Of Engineering and I.T., Rajasthan",
  "Assam Engineering College, Assam",
  "ATME College of Engineering, Karnataka",
  "Atmiya University, Gujarat",
  "Atria Institute of Technology, Karnataka",
  "AttainU, Karnataka",
  "B M S College of Engineering, Karnataka",
  "Baba Banda Singh Bahadur Engineering College, Punjab",
  "Babasaheb Bhimrao Ambedkar University, Uttar Pradesh",
  "Bakhtiyarpur College of Engineering, Bihar",
  "Banarsidas Chandiwala Institute of IT, Delhi",
  "Bangalore Institute of Technology (BIT), Karnataka",
  "Bannari Amman Institute of Technology, Tamil Nadu",
  "Bapuji Institute of Engineering and Technology, Karnataka",
  "Bennett University, Uttar Pradesh",
  "Bhagalpur College of Engineering, Bihar",
  "Bhagwan Parshuram Institute of Technology (BPIT), Delhi",
  "Bharati Vidyapeeth's COE, KOP, Maharashtra",
  "Bharati Vidyapeeth's College of Engineering, New Delhi, Delhi",
  "Bhilai Institute of Technology Durg, Chhattisgarh",
  "Birla Institute of Technology & Science, Pilani, Rajasthan",
  "BITS, Pilani K K Birla Goa, Goa",
  "Brainfloss Education Services - GHE, Pune",
  "BVRIT Hyderabad College of Engineering for Women, Telangana",
  "C. Abdul Hakeem College of Engineering & Technology, Tamil Nadu",
  "Central Institute of Technology Kokrajhar, Assam",
  "Chalapathi Institute of Engineering and Technology, Andhra Pradesh",
  "Chandigarh College of Engineering, Chandigarh",
  "Chandigarh College of Engineering & Technology, Punjab",
  "Chandigarh University, PUNJAB",
  "Charotar University of Science and Technology, Gujarat",
  "Chitkara University- Himachal Pradesh, Himachal Pradesh",
  "Chitkara University, Punjab, Punjab",
  "CHRIST (Deemed to be University), Karnataka",
  "CHRIST COLLEGE OF ENGINEERING, KERALA",
  "CHRIST THE KING ENGINEERING COLLEGE, Tamil Nadu",
  "CMR Institute of Technology, Telangana",
  "Cochin University of Science and Technology, Kerala",
  "Coimbatore Institute of Technology, Tamil Nadu",
  "College of Engineering Kallooppara, Kerala",
  "College of Engineering Osmanabad (Terna Public Charitable Trust), Maharashtra",
  "Crio.Do, Karnataka",
  "D Y Patil College of Engineering & Technology,Kolhapur, Maharashtra",
  "D. Y. Patil College of Engineering, Akurdi, Pune, Maharashtra",
  "Darshan University, Gujarat",
  "Dayananda Sagar College of Engineering, Karnataka",
  "Delhi Technical Campus, Uttar Pradesh",
  "Delhi Technological University, Delhi",
  "Dhirubhai Ambani Institute of Information and Communication Technology, Gujarat",
  "Digipodium, Uttar Pradesh",
  "Don Bosco Institute of Technology, Mumbai, Maharashtra",
  "Doon Business School, Uttarakhand",
  "Dps greater Faridabad, Haryana",
  "Dr B R Ambedkar National Institute of Technology, Jalandhar, Punjab",
  "Dr D Y Patil Technical Campus, Maharashtra",
  "Dr. Akhilesh Das Gupta Institute of Technology & Management, New Delhi",
  "DR. D. Y. PATIL INSTITUTE OF ENGINEERING, MANAGEMENT, Maharashtra",
  "Dr. D.Y. Patil Institute of Technology, Pimpri, Pune, Maharashtra",
  "Dr. J. J. Magdum college of engineering, Maharashtra",
  "Dr. Subhash Technical Campus, Gujarat",
  "Dr. Sudhir Chandra Sur Institute of Technology, West Bengal",
  "Dwarkadas J. Sanghvi College of Engineering, Maharashtra",
  "DY Patil Institute of Master of Computer Applications and Management, Maharashtra",
  "Er. Perumal Manimekalai College Of Engg, Tamil Nadu",
  "Fr C Rodrigues College of Engineering, Bandra, Maharashtra",
  "Fr. C. Rodrigues Institute of Technology, Maharashtra",
  "G H Patel College of Engineering, Gujarat",
  "G H Raisoni College of Engineering and Management Pune, Maharashtra",
  "G L Bajaj Group of Institutions, Uttar Pradesh",
  "G Pulla Reddy Engineering College, Andhra Pradesh",
  "Galgotias University, Uttar Pradesh",
  "Gandhinagar Institute of Technology, Gujarat",
  "Ganpat University, gujarat",
  "Gharda Institute of Technology, Maharashtra",
  "GIET University, Odisha",
  "Global Nature Care Sangathan's Group of Institutions, Jabalpur, Madhya Pradesh",
  "Government College of Engineering Srirangam, Tamil Nadu",
  "Government College of Engineering Srirangam, Thiruchirapalli, Tamil Nadu",
  "Government Engineering College, Chamarajanagar, Karnataka",
  "Government Engineering College, PATAN, Gujarat",
  "Government Model Engineering College, Kerala",
  "Govind Ballabh Pant Institute of Engineering & Technology-GBPIET, Uttarakhand",
  "Graphic Era Deemed to be University, Uttarakhand",
  "Guru Nanak College, Tamil Nadu",
  "Guru Nanak Dev Engineering College, Punjab",
  "Guru Nanak Institutions, Telangana",
  "GVM Institute of Technology and Management, Haryana",
  "Gyan Ganga Institute of Technology, Madhya Pradesh",
  "Haldia Institute of Technology, West Bengal",
  "Heritage Institute of Technology, Kolkata, West Bengal",
  "Heritage Xperiential Learning School, Haryana",
  "Himgiri Zee University, Uttarakhand",
  "HMR Institute of Technology, Delhi",
  "IIIT Bangalore, Karnataka",
  "IIMT COLLEGE OF ENGINEERING, GREATER NOIDA, Uttar Pradesh",
  "IIT Guwahati, Assam",
  "IMPS College of Engineering and Technology, West Bengal",
  "IMS Engineering College, Uttar Pradesh",
  "Indian Institute of Information Technology Guwahati, Assam",
  "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY KALYANI, West Bengal",
  "Indian Institute of Information Technology, Surat, Gujarat",
  "Indian Institute of Information Technology, Vadodara, Gujarat",
  "Indian Institute of Technology Goa, Goa",
  "Indian Institute of Technology Ropar, Punjab",
  "Indian Institute of Technology Tirupati, Andhra Pradesh",
  "Indian Institute of Technology, Ropar, Punjab",
  "Indore Institute of Science and Technology, Madhya Pradesh",
  "Institute of Advanced Research, Gujarat",
  "Institute of Engineering & Technology Devi Ahilya Vishwavidyalaya Indore, Madhya Pradesh",
  "Institute of Engineering MET, Maharastra",
  "Institute of Engineering, Chitkara University, Punjab, Punjab",
  "Institute of Informatics & Communication, DELHI",
  "International Institute of Information Technology, Hyderabad, Telangana",
  "International Institute of Professional Studies Devi Ahilya University Indore, Madhya Pradesh",
  "Invertis University Bareilly, Uttar Pradesh",
  "ITS Engineering College, Uttar Pradesh",
  "Jafari B.C.A. College, Gujarat",
  "JAIN, Karnataka",
  "Jaypee University of Engineering and Techology, Madhya Pradesh",
  "JECRC University, Rajasthan",
  "Jigsaw Academy, Karnataka",
  "JK Lakshmipat University, Rajasthan",
  "JNTUH college of engineering, Telangana",
  "Jodhpur Institute of Engineering and Technology, Rajasthan",
  "Jyothy Institue of Technology, Karnataka",
  "K J Somaiya College of Engineering, Maharashtra",
  "K L University, Andhra Pradesh",
  "Kalinga Institute of Industrial Technology (KIIT) Deemed to be University, Odisha",
  "Kalyani Government Engineering College, West Bengal",
  "Kamaraj College of Engineering - GHE, Tamil Nadu",
  "Kammavari Sangha Institute of Technology, Karnataka",
  "KANPUR INSTITUTE OF TECHNOLOGY, Uttar Pradesh",
  "Karpagam Institute of Technology, Tamil Nadu",
  "Karunya University, Tamil Nadu",
  "KCT Engineering College, Karnataka",
  "Kerala University of Digital Sciences, Innovation and Technology, Kerala",
  "KLE Institute of Technology, Karnataka",
  "KLS VISHWANATHRAO DESHPANDE INSTITUTE OF TECHNOLOGY, HALIYAL, Karnataka",
  "KLS Gogte Institute of Technology, Karnataka",
  "Krackin - iNurture Solutions, Karnataka",
  "Krishna Engineering College, Ghaziabad, Uttar Pradesh",
  "Krishna Institute of Engineering and Technology (KIET), Uttar Pradesh",
  "KSR College Of Engineering, Tamil Nadu",
  "Kumaraguru College of Technology, Tamil Nadu",
  "Kumaraguru Institutions (KCLAS), Tamil Nadu",
  "L.D. COLLEGE OF ENGINEERING, Gujarat",
  "Lokmanya Tilak College of Engineering, Maharashtra",
  "Lovely Professional University, India, Punjab",
  "Madhav Institute of Technology, Madhya Pradesh",
  "Maharaja Agrasen Institute of Technology, Delhi",
  "Maharaja Institute of Technology Mysore, KARNATAKA",
  "Mahendra College of Engineering, Tamil Nadu",
  "Malaviya National Institute of Technology Jaipur, Rajasthan",
  "Manav Rachna International Institute of Research and Studies, Haryana",
  "Mangalore Institute of Technology, Karnataka",
  "Manipal Institute of Technology, Karnataka",
  "Manipal University Jaipur, Rajasthan",
  "Mar Athanasius College of Engineering, Kerala",
  "Masai School, Karnataka",
  "MATS University, Chhattisgarh",
  "Meerut Institute of Engineering and Technology, Uttar Pradesh",
  "Meerut Institute of Technology, Uttar Pradesh",
  "MIT Academy of Engineering, Maharashtra",
  "MIT ADT University, Maharashtra",
  "MLR Institute of Technology, Telangana",
  "Model Institute of Engineering and Technology - GHE, Jammu and Kashmir",
  "Moodlakatte Institute of Technology, Kundapura, Karnataka",
  "MRA DAV Public School, Himachal Pradesh",
  "MVN University, Haryana",
  "N. K. Orchid College Of Engg. & Technology, Solapur, Maharashtra",
  "National Engineering College, Tamil Nadu",
  "National Institute of Science and Technology, Orissa",
  "National Institute of Technology Delhi, Delhi",
  "National Institute of Technology Jamshedpur, Jharkhand",
  "National Institute of Technology Patna, Bihar",
  "National Institute of Technology Raipur, Chhattisgarh",
  "National Institute of Technology Rourkela, Odisha",
  "National Institute of Technology Silchar, Assam",
  "National Institute of Technology, Calicut, Kerala",
  "National Institute of Technology, Tiruchirappalli, Tamil Nadu",
  "Navgurukul Foundation for Social Welfare, Haryana",
  "neoG Camp, Karnataka",
  "Nirmala College, Kerala",
  "NMAM Institute of Technology, Nitte, Karnataka",
  "Noida Institute of Engineering and Technology (NIET), Uttar Pradesh",
  "O.P. Jindal Global University, Haryana",
  "Parul University, Gujarat",
  "PES College of Engineering, Mandya, Karnataka",
  "Plaksha University, Haryana",
  "Praxis Business School, West Bengal",
  "Prince Shri Venkateshwara Padmavathy Engineering College, Tamil Nadu",
  "PSG College of Technology, Tamil Nadu",
  "Raghav Global School, Noida, Uttar Pradesh",
  "Rajalakshmi Engineering College, Tamil Nadu",
  "Rajasthan College of Engineering for Women, Rajasthan",
  "Rajendra Mane College of Engineering and Technology, Ratnagir, Maharashtra",
  "Rajiv Gandhi Institute of Petroleum Technology, Uttar Pradesh",
  "Rajiv Gandhi Institute of Technology, Maharashtra",
  "Ramaiah University of Applied Sciences, Karnataka",
  "Ramco Institute of Technology, Tamil Nadu",
  "Ramrao Adik Institute of Technology, Nerul, Maharashtra",
  "Rathnavel Subramaniam College of Arts, Tamil Nadu",
  "Rayat-Bahra University, Punjab",
  "RK University, Gujarat",
  "Rustamji Institute of Technology, Madhya Pradesh",
  "Sagar Institute of Science and Technology (SISTec), Madhya Pradesh",
  "Sahyadri College of Engineering, Karnataka",
  "Sambhram Institute Of Technology, Bangalore, Karnataka",
  "Sankalchand Patel College of Engineering, Gujarat",
  "Sanmati Engineering College, Maharashtra",
  "Sanskar Institute of Management and Information Technology, Gujarat",
  "Sant Gajanan Maharaj College of Engineering, Mahagaon Dist-Kolhapur, Maharashtra",
  "Santhiram Engineering College, Andhra Pradesh",
  "Sardar Vallabhbhai National Institute of Technology, Gujarat",
  "Sardar Vallabhbhai Patel Institute of Technology, Vasad, Gujarat",
  "Sathyabama Institute of Science and Technology, Tamil Nadu",
  "Scaler by InterviewBit, Maharashtra",
  "SCTR's Pune Institute of Computer Technology, Maharashtra",
  "Sengunthar Engineering College, Tamil Nadu",
  "Sharda University, Uttar Pradesh",
  "Sharnbasva University, Kalaburagi, KARNATAKA",
  "Shiv Nadar University, Greater Noida",
  "Shree Siddheshwar Womens College of Engineering, Maharashtra",
  "Shree Swami Atmanand Saraswati Institute of Technology, Gujarat",
  "Shri Govindram Seksaria Institute of Technology and Science, Indore, Madhya Pradesh",
  "Shri Guru Gobind Singhji Institute of Engineering and Technology, Maharashtra",
  "Shri Shankaracharya Institute of Professional Management, Chhattisgarh",
  "Shri Shankaracharya Technical Campus, Chhattisgarh",
  "Siddaganga Institute of Technology, Karnataka",
  "SIES GRADUATE SCHOOL OF TECHNOLOGY, Maharashtra",
  "Sikkim Manipal Institute of Technology, Sikkim",
  "Simplilearn, Karnataka",
  "Sister Nivedita University, West Bengal",
  "SKN SINHGAD COLLEGE OF ENGINEERING, PANDHARPUR, Maharashtra",
  "Sphoorthy Engineering college, Telangana",
  "Sree Sankara Vidyapeetom College, Kerala",
  "Sreenidhi Institute of Science and Technology, Telangana",
  "SreeVidyanikethan Engineering College, Andhra Pradesh",
  "Sri Manakula Vinayagar Engineering College, Pondicherry",
  "Sri Venkateshwara College of Engineering, Karnataka",
  "SRI VENKATESWARAA COLLEGE OF TECHNOLOGY, Tamil Nadu",
  "Srichaitanya college, Maharashtra",
  "Srinivas Institute of Technology (SIT), KARNATAKA",
  "Srinivasa Ramanujan Institute of Technology, Andhra Pradesh",
  "SRM Institute of science and technology, Tamil Nadu",
  "SRM University-AP, Andhra Pradesh",
  "St. Joseph's College of Engineering and Technology, Palai, Kerala",
  "St. Vincent Pallotti college of Engineering and technology, Nagpur, Maharashtra",
  "SVERIs College of Engineering, Pandharpur, Maharashtra",
  "SVKM's Institute of Technology, Maharashtra",
  "SVR ENGINEERING COLLEGE, Andhra Pradesh",
  "Swami Keshvanand Institute of Technology, Management, Rajasthan",
  "Symbiosis Institute of Computer Studies and Research, Maharashtra",
  "Techno India NJR, Rajasthan",
  "TERii, Haryana",
  "Terna Engineering College, Maharashtra",
  "Thapar Institute of Engineering and Technology, Punjab",
  "The Assam Royal Global University, Assam",
  "The Hacking School, Telangana",
  "The Maharaja Sayajirao University of Baroda, Gujarat",
  "The National Institute of Engineering, Karnataka",
  "The Northcap University, Haryana",
  "TKM College of Engineering, Kerala",
  "Toc H Institute of Science and Technology, Kerala",
  "Tula's Institute, Uttarakhand",
  "Universal College of Engineering, Maharashtra",
  "University Institute of Technology, Burdwan, West Bengal",
  "University of Petroleum, Uttarakhand",
  "Vellore Institute of Technology (VIT), Tamil Nadu",
  "Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering and Technology, Maharashtra",
  "Vidya Vihar Institute of Technology, Bihar",
  "Vidyalankar Institute of Technology, Maharashtra",
  "Vidyalankar School of Information Technology, VSIT, Maharashtra",
  "Vidyavardhaka College of Engineering, Karnataka",
  "Vidyavardhini's College of Engineering and Technology, Maharashtra",
  "Vimal Jyothi Engineering College, Kerala",
  "Vishnu Institute of Technology, Andhra Pradesh",
  "Vishwakarma Institute of Information Technology, Maharashtra",
  "Vishwakarma Institute of Technology, Pune, Maharashtra",
  "Vsb Engineering College, Tamil Nadu",
  "Xavier Institute Of Engineering, Maharashtra",
  "Yenepoya Institute of Technology, Karnataka",
  "Yeshwant Mahavidyalaya, Maharashtra",
  "Yeshwantrao Chavan College of Engineering, Maharashtra",
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("college_name"), countries);
