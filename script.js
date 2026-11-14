document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        // 1. Apply Global Settings (Theme & Site Name)
        document.getElementById('site-name').innerText = data.settings.siteName;
        document.body.className = `theme-${data.settings.theme}`;
        document.getElementById('current-year').innerText = new Date().getFullYear();

        // 2. Load Portfolio Content
        if (document.getElementById('photo-grid')) {
            const grid = document.getElementById('photo-grid');
            grid.innerHTML = ''; // Clear existing
            data.photos.forEach(photo => {
                grid.innerHTML += `
                    <div class="card">
                        <img src="${photo.url}" alt="${photo.category}">
                        <p><strong>${photo.category}</strong></p>
                    </div>
                `;
            });
        }

        // 3. Load Blog Content
        if (document.getElementById('blog-list')) {
            const blogList = document.getElementById('blog-list');
            blogList.innerHTML = ''; // Clear existing
            
            if (data.posts.length === 0) {
                blogList.innerHTML = '<p>No posts yet.</p>';
            } else {
                data.posts.forEach(post => {
                    blogList.innerHTML += `
                        <div class="blog-post">
                            <small>${post.date} | ${post.category}</small>
                            <h2 style="margin: 10px 0;">${post.title}</h2>
                            <p>${post.content}</p>
                        </div>
                    `;
                });
            }
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}
