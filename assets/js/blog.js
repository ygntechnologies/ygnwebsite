document.addEventListener("DOMContentLoaded", function () {
  function getImageUrl(post) {
    const localImage = localStorage.getItem(`blog_image_${post._id}`);

    if (post.image && (post.image.startsWith("http") || post.image.startsWith("data:image"))) {
      return post.image;
    }

    if (post.image) {
      return `assets/images/blog/${post.image}`;
    }

    return (
      localImage ||
      "assets/images/blog/blog-image1.jpg"
    );
  }

  fetch("https://ygn-technologies-backend.vercel.app/get-blog")
    .then((response) => response.json())
    .then((data) => {
      const blogPosts = document.getElementById("blog-posts");

      if (Array.isArray(data.data)) {
        data.data.forEach((post) => {
          const imageUrl = getImageUrl(post);

          blogPosts.innerHTML += `
            <div class="col-xl-4 col-lg-6 col-md-6">
              <div class="blog__item">
                <a href="blog.html?_id=${post._id}" class="blog__image d-block image">
                  <img src="${imageUrl}" style="object-fit:cover"/>
                </a>
                <div class="blog__content">
                  <h3 class="bor-bottom pb-20 mb-20">${post.name}</h3>
                  <ul class="blog-info">
                    <li>${post.date.slice(0, 10)}</li>
                    <li>${post.type}</li>
                  </ul>
                </div>
              </div>
            </div>
          `;
        });
      } else {
        blogPosts.innerHTML = "Error loading blogs";
      }
    })
    .catch(() => {
      document.getElementById("blog-posts").innerHTML =
        "Error fetching data.";
    });
});
