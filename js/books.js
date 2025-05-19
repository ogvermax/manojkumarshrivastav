const books = [
  {
    type: "Novel",
    title: "Vachan Pustika",
    release: "May 27th, 2025",
    summary:
      "When the Lorem Ipsum City Police Department receives a disturbing letter from a person threatening to “dolor sit amet, consectetur adipiscing elit” in “sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,” Detective Izzy Jaynes has no idea what to think. Are duis aute irure dolor in reprehenderit in voluptate velit esse cillum in an unhinged act of retribution? As the investigation unfolds, Izzy realizes that the letter writer is ut enim ad minim veniam, and she turns to her friend Holly Gibney for help.",
    downloadurl: "./pdf/Vachan%20Pustika_5.pdf",
    coverurl: "./images//manojkumarimages/mjsbook1.png",
  },
  {
    type: "Novel",
    title: "Hiranyagarbha",
    release: "May 27th, 2025",
    summary:
      "When the Lorem Ipsum City Police Department receives a disturbing letter from a person threatening to “dolor sit amet, consectetur adipiscing elit” in “sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,” Detective Izzy Jaynes has no idea what to think. Are duis aute irure dolor in reprehenderit in voluptate velit esse cillum in an unhinged act of retribution? As the investigation unfolds, Izzy realizes that the letter writer is ut enim ad minim veniam, and she turns to her friend Holly Gibney for help.",
    downloadurl: "./pdf/Hiranyagarbha.pdf",
    coverurl: "./images//manojkumarimages/mjsbook3.png",
  },
  {
    type: "Novel",
    title: "अम्रत नाम.pdf",
    release: "May 27th, 2025",
    summary:
      "When the Lorem Ipsum City Police Department receives a disturbing letter from a person threatening to “dolor sit amet, consectetur adipiscing elit” in “sed do eiusmod tempor incididunt ut labore et dolore magna aliqua,” Detective Izzy Jaynes has no idea what to think. Are duis aute irure dolor in reprehenderit in voluptate velit esse cillum in an unhinged act of retribution? As the investigation unfolds, Izzy realizes that the letter writer is ut enim ad minim veniam, and she turns to her friend Holly Gibney for help.",
    downloadurl: "./pdf/amrtnaam.pdf",
    coverurl: "./images//manojkumarimages/mjsbook2.png",
  },
];

var booksContainer = document.querySelector(".allbookwrapper");

books.forEach((book) => {
  booksContainer.innerHTML += `
  <div class="row" style="display:flex; justify-content:end; align-items:center;">
    <div class="col-md-12 col-lg-10 col-12">
           
            <div
              class="col-12 col-sm-12 content-block coming-soon featured"
            >
              <div class="content-image">
                <div class="content-background">
                  <div
                    class="content-blur"
                    style="
                      background-image: url(${book.coverurl});
                    "
                  ></div>
                  <div class="content-blur-wrapper"></div>
                  <span class="content-splatter"> </span>
                </div>
                <img
                  src=${book.coverurl}
                  class="image-zoom"
                  alt=${book.title}
                  style="max-width: 250px"
                />
              </div>
              <div class="content-block-content">
                <p class="format">${book.type}</p>
                <h4>${book.title}</h4>
                <p class="content-date">Release Date: ${book.release}</p>
                <div class="content-description">
                  <p>
                    ${book.summary}<br />
                    <br />
                    
                    <a
  class="text-link"
  style="display: inline"
  href=${book.downloadurl}
  download
   target="_blank"
>
  Free Download
</a>

                    <br /><br />
                  </p>
                  <br /><br />
                  <span class="content-blend"></span>
                </div>
                  
              </div>

              <!--NEXT  BOOK-->
            </div>
            <!--NEXT-->
             
             
          </div>
          </div>
 `;
});
