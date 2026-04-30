document.addEventListener("DOMContentLoaded", function () {

  function getValidImage(post) {
    const localImage = localStorage.getItem(`blog_image_${post._id}`);

    if (localImage && localImage.startsWith("data:image")) return localImage;
    if (post?.image && post.image.startsWith("data:image")) return post.image;
    if (post?.image && post.image.startsWith("http")) return post.image;

    return "assets/images/blog/blog-image1.jpg";
  }

  fetch("https://ygn-technologies-backend.vercel.app/get-blog")
    .then((response) => response.json())
    .then((data) => {
      const blogPosts = document.getElementById("blog-posts");

      if (Array.isArray(data.data)) {
        data.data.forEach((post) => {
          const imageUrl = getValidImage(post);

          blogPosts.innerHTML += `
            <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp">
              <div class="blog__item">

                <a href="blog.html?_id=${post._id}" 
                   class="blog__image d-block image">
                  <img width="356" height="245" 
                       src="${imageUrl}" 
                       style="object-fit:cover;" />
                </a>

                <div class="blog__content">
                  <h3 class="bor-bottom pb-20 mb-20 primary-hover">
                    ${post.name || ""}
                  </h3>

                  <ul class="blog-info">
                    <li>
                      <i class="fa-regular fa-calendar-days"></i>
                      <a>${post.date ? post.date.slice(0, 10) : ""}</a>
                    </li>
                    <li>
                      <i class="fa-solid fa-file-lines"></i>
                      <a>${post.type || ""}</a>
                    </li>
                  </ul>

                </div>

              </div>
            </div>
          `;
        });
      } else {
        blogPosts.innerHTML = "Error: Invalid response from server";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("blog-posts").innerHTML =
        "Error fetching data.";
    });
});
