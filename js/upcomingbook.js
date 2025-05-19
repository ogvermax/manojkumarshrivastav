const upcomingBooks = [
    {
      type: "Novel",
      title: "Upcoming Title",
      release: "Coming Soon ...",
      summary: `When the Buckeye City Police Department receives a disturbing letter from a person threatening to “kill thirteen innocents and one guilty” in “an act of atonement for the needless death of an innocent man,” Detective Izzy Jaynes has no idea what to think. Are fourteen citizens about to be slaughtered in an unhinged act of retribution? As the investigation unfolds, Izzy realizes that the letter writer is deadly serious, and she turns to her friend Holly Gibney for help.`,
      downloadurl: "",
      coverurl: "./images/manojkumarimages/comingsoon.jpg"
    },
    {
        type: "Novel",
        title: "Upcoming Title",
        release: "Coming Soon ...",
        summary: `When the Buckeye City Police Department receives a disturbing letter from a person threatening to “kill thirteen innocents and one guilty” in “an act of atonement for the needless death of an innocent man,” Detective Izzy Jaynes has no idea what to think. Are fourteen citizens about to be slaughtered in an unhinged act of retribution? As the investigation unfolds, Izzy realizes that the letter writer is deadly serious, and she turns to her friend Holly Gibney for help.`,
        downloadurl: "",
        coverurl: "./images/manojkumarimages/comingsoon.jpg"
      }
  ];
  var upcomingBooksConatiner = document.querySelector('.allupcoming');


upcomingBooks.forEach((next) => {
    upcomingBooksConatiner.innerHTML += `
      <div class="row" style="display:flex; justify-content:end; align-items:center;">
        <div class="sidebar-spacer col-md-2 col-12"></div>
        <div class="col-md-12 col-lg-10 col-12">
          <h2 id="novels"></h2>
          <div class="col-12 col-sm-12 content-block coming-soon featured" id="never-flinch">
            <div class="content-image">
              <div class="content-background">
                <div class="content-blur" style="background-image: url(${next.coverurl});"></div>
                <div class="content-blur-wrapper"></div>
                <span class="content-splatter"></span>
              </div>
              <img src="${next.coverurl}" class="image-zoom" alt="${next.title}" style="max-width:250px">
            </div>
            <div class="content-block-content">
              <p class="format">${next.type}</p>
              <h4>${next.title}</h4>
              <p class="content-date">Release Date: ${next.release}</p>
              <div class="content-description">
                <p>${next.summary}</p>
                <br>
                <a class="text-link" style="display:inline;" href="${next.downloadurl}" download>${next.release}</a>
                <br><br>
                <span class="content-blend"></span>
              </div>
              <div class="content-links">
                <a href="stephenking.html" class="text-link">More Info</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });