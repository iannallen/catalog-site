let allPosts = []; // Menyimpan semua data post
const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");

// Fetch data JSON
fetch("posts.json")
  .then((res) => res.json())
  .then((posts) => {
    allPosts = posts;
    renderGrid(allPosts); // Render awal
  })
  .catch((err) => console.error("Gagal memuat data:", err));

// Fungsi untuk merender item ke dalam grid
function renderGrid(postsToRender) {
  grid.innerHTML = ""; // Bersihkan grid sebelum merender ulang

  if (postsToRender.length === 0) {
    grid.innerHTML = '<p class="no-results">No content found.</p>';
    return;
  }

  postsToRender.forEach((post) => {
    // Membuat container kartu
    const card = document.createElement("a");
    card.className = "card";
    card.href = post.source;
    card.target = "_blank"; // Buka di tab baru (opsional)

    // Membuat gambar
    const img = document.createElement("img");
    img.src = post.thumbnail;
    img.alt = post.title;

    // Membuat overlay info (judul)
    const info = document.createElement("div");
    info.className = "card-info";
    
    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = post.title;

    info.appendChild(title);
    card.appendChild(img);
    card.appendChild(info);
    grid.appendChild(card);
  });
}

// Event listener untuk Search Bar
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  // Filter post berdasarkan kata kunci di judul
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm)
  );
  
  renderGrid(filteredPosts); // Render ulang dengan data yang sudah difilter
});