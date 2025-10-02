
//Album Card Functionality

fetch('https://schwenz.uk/DigitalDesign/Assets/albums.json?v=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(albums => {
    const albumList = document.getElementById('album-list');
    albums.forEach((album, i) => {      
      var images_html = '<div class = "album-images">'
      if(album.images.length > 1){
        
        album.images.forEach((image, i) => {
          var image_append= `<img class="album-image" src="${image}" alt="${album.title}" />`;
          images_html = images_html + "/n" + image_append;
        });
      }
      images_html = images_html + "</div>";
      const card = document.createElement('div');
      card.className = 'album-card';
      card.innerHTML = `
        <div class="album-card-logo"></div>
        <img class="album-thumb" src="${album.thumb}" alt="${album.title}" />
        <div class="album-card-title">${album.title}</div>
        ${images_html}
      `;
 
      card.onclick = () => showModal(albums, i);
      albumList.appendChild(card);
    });
  })
  .catch(error => {
    document.getElementById('album-list').innerHTML = `<div style="color:red;text-align:center;">Failed to load albums.</div>`;
    console.error("Error loading albums.json:", error);
  });