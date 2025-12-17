document.addEventListener("DOMContentLoaded", function () {
  fetch("https://ygn-technologies-backend.vercel.app/get-blog")
    .then((response) => response.json())
    .then((data) => {
      const blogPosts = document.getElementById("blog-posts");

      // Check if data is an array
      if (Array.isArray(data.data)) {
        data.data.forEach((post) => {
          // Corrected: data.data.forEach
          blogPosts.innerHTML += `
                <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms" style="
                    visibility: visible;
                    animation-duration: 1500ms;
                    animation-delay: 0ms;
                    animation-name: fadeInUp;
                ">
                    <div class="blog__item">
                        <a href="blog.html?_id=${
                          post._id
                        }" class="blog__image d-block image">
                            <img width="356" height="245" src=${
                              post?.image || "assets/images/blog/blog-image1.jpg"
                            } alt="image" style="object-fit:cover" />
                        </a>
                        <div class="blog__content">
                            <h3 class="bor-bottom pb-20 mb-20 primary-hover">
                            ${
                              post.name
                            }
                            </h3>
                            <ul class="blog-info">
                            <li>
                                <i class="fa-regular fa-calendar-days"></i>
                                <a>${post.date.slice(0, 10)}</a>
                            </li>
                            <li>
                                <i class="fa-solid fa-file-lines"></i>
                                <a>${post.type}</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                `;
        });
      } else {
        // Handle error or unexpected response
        blogPosts.innerHTML = "Error: Invalid response from server";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle error
      document.getElementById("blog-posts").innerHTML =
        "Error fetching data. Please try again later.";
    });
});
