function ScrollIntoViewWithOffset(e, offset){
  var scroll_top = e.getBoundingClientRect().top + window.pageYOffset - offset
  console.log("scroll to " + scroll_top)
  window.scrollTo({top:scroll_top, behaviour: "smooth"});
}
//Album Card Functionality

fetch('https://schwenz.uk/DigitalDesign/Assets/albums.json?v=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(albums => {
    const albumList = document.getElementById('album-list');
    albums.forEach((album, i) => {      
      // Wrap description and images in a .content div
      let content_html = `
        <div class="content hidden">
          <div class="album-desc-title"><h1>${album.title}</h1></div>
          <div class="album-images">
            ${
              album.images && album.images.length > 0
                ? album.images.map(image => `<img class="album-image" src="${image}" alt="${album.title}" />`).join('')
                : ''
            }
          </div>
          <div class="album-card-desc">${album.desc ?? ""}</div>
        </div>
      `;
      const card = document.createElement('div');
      card.className = 'album-card';
      card.innerHTML = `
        <div class="album-card-logo"></div>
        <img class="album-thumb" src="${album.thumb}" alt="${album.title}" />
        <div class="album-card-title">${album.title}</div>
        ${content_html}
      `;
      // Get references to elements inside the card
      const albumThumb = card.querySelector('.album-thumb');
      const contentDiv = card.querySelector('.content');
      card.albumThumb = albumThumb;
      card.contentDiv = contentDiv;

      card.onclick = function(e) {

        var isOpen = this.classList.contains('show-content');
        // Close all cards
        document.querySelectorAll('.album-card').forEach(otherCard => {
          otherCard.classList.remove('show-content');
          if (otherCard.albumThumb) otherCard.albumThumb.classList.remove('hidden');
          if (otherCard.contentDiv) otherCard.contentDiv.classList.add('hidden');
        });
        // Toggle this card
        if (!isOpen) {
          this.classList.add('show-content');
          if (this.albumThumb) this.albumThumb.classList.add('hidden');
          if (this.contentDiv) this.contentDiv.classList.remove('hidden');
        }
        // If it was open, it is now closed.
        setTimeout(card.scrollIntoView({behavior:"smooth", block:"center"}), 500);
      };
      
      albumList.appendChild(card);
    });
  })
  .catch(error => {
    document.getElementById('album-list').innerHTML = `<div style="color:red;text-align:center;">Failed to load albums.</div>`;
    console.error("Error loading albums.json:", error);
  });
  
    // // Modal logic
    // const modal = document.getElementById('album-modal');
    // const closeBtn = document.querySelector('.close');
    // function showModal(albums, idx) {
    //   const album = albums[idx];
    //   document.getElementById('modal-title').textContent = album.title;
    //   document.getElementById('modal-desc').textContent = album.desc;
    //   const linksDiv = document.getElementById('modal-links');
    //   linksDiv.innerHTML = '';
    //   album.links.forEach(link => {
    //     const a = document.createElement('a');
    //     a.href = link.url;
    //     a.target = '_blank';
    //     a.textContent = link.label;
    //     linksDiv.appendChild(a);
    //   });
    //   modal.classList.remove('hidden');
    // }
    // closeBtn.onclick = () => modal.classList.add('hidden');
    // modal.onclick = e => {
    //   if (e.target === modal) modal.classList.add('hidden');
    // };

