document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("_id");

  function getImageUrl(post) {
    const localImage = localStorage.getItem(`blog_image_${post._id}`);

    // Custom image for Jack
    if (post.name && post.name.toLowerCase() === 'jack') {
      return 'assets/images/blog/jack.jpg';
    }

    // Custom image for Ellen McGurk
    if (post.name && post.name.toLowerCase().includes('ellen')) {
      return 'assets/images/blog/ellen.jpg';
    }

    // Custom image for Nandini Tarigopula
    if (post.name && post.name.toLowerCase().includes('nandini')) {
      return 'assets/images/blog/nandini.jpg';
    }

    // Custom image for Saikumar Musirigari
    if (post.name && post.name.toLowerCase().includes('saikumar')) {
      return 'assets/images/blog/saikumar.jpg';
    }

    // Custom image for Jasmine Shaik
    if (post.name && post.name.toLowerCase().includes('jasmine')) {
      return 'assets/images/blog/jasmine.jpg';
    }

    // Custom image for Dainel Boholo
    if (post.name && post.name.toLowerCase().includes('dainel')) {
      return 'assets/images/blog/dainel.jpg';
    }

    // Custom image for Naveen Amara
    if (post.name && post.name.toLowerCase().includes('amara')) {
      return 'assets/images/blog/naveen_amara.jpg';
    }

    // Custom image for Alingnue Abonge
    if (post.name && post.name.toLowerCase().includes('abonge')) {
      return 'assets/images/blog/alingnue.jpg';
    }

    // Custom image for Augustine Nkwah
    if (post.name && post.name.toLowerCase().includes('augustine')) {
      return 'assets/images/blog/augustine.jpg';
    }

    // Custom image for Suresh Akula
    if (post.name && post.name.toLowerCase().includes('suresh')) {
      return 'assets/images/blog/suresh.jpg';
    }

    // If backend sends full URL or base64 → use it
    if (post.image && (post.image.startsWith("http") || post.image.startsWith("data:image"))) {
      return post.image;
    }

    // If only filename → use repo images folder
    if (post.image) {
      return `assets/images/blog/${post.image}`;
    }

    if (localImage && (localImage.startsWith("http") || localImage.startsWith("data:image") || localImage.startsWith("assets/"))) {
      return localImage;
    }

    // Determine fallback image based on post ID so they are all different
    const idHash = post._id ? parseInt(post._id.slice(-6), 16) : 0;
    const fallbackNum = isNaN(idHash) ? 1 : (idHash % 6) + 1;
    return `assets/images/blog/blog-image${fallbackNum}.jpg`;
  }

  if (postId) {
    fetch(`https://ygn-technologies-backend.vercel.app/get-blog-details?_id=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        const blogPosts = document.getElementById("blog-details");

        if (typeof data.data === "object") {
          const post = data.data;
          const imageUrl = getImageUrl(post);

          blogPosts.innerHTML += `
            <div class="container pt-120">
              <div class="row g-4">
                <div class="col-lg-12 order-2 order-lg-1">
                  <div class="blog__item blog-single__left-item shadow-none">
                    <div class="entry-media hover-scale">   
                      <img width="960" height="600" src="${imageUrl}" alt="">
                    </div>
                    <div class="blog__content p-0">
                      <ul class="pb-3 pt-30 bor-bottom d-flex gap-4 flex-wrap align-items-center">
                        <li>
                          <span class="primary-hover transition">${post.name}</span>
                        </li>
                        <li>
                          <span>${post.date.slice(0, 10)}</span>
                        </li>
                        <li>
                          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4zoncc_qiJMcUrWiZLGieDv-NSUphpzcU1Z5dQHPn6g&s'
                            width='25' height='25'
                            onclick="window.location.href='${post.linkedin}';"
                            style="cursor: pointer;" />
                        </li>
                      </ul>
                      <h3 class="blog-single__title mt-20">${post.title}</h3>
                      <p class="mb-20 mt-20">${post.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        } else {
          blogPosts.innerHTML = "Error: Invalid response from server";
        }
      })
      .catch(() => {
        document.getElementById("blog-details").innerHTML =
          "Error fetching data.";
      });
  } else {
    fetch("https://ygn-technologies-backend.vercel.app/get-blog")
      .then((response) => response.json())
      .then((data) => {
        const blogPosts = document.getElementById("blog-posts");

        blogPosts.innerHTML = `
          <div class="section-header text-center mb-60">
            <h5>CASE STUDIES</h5>
            <h2>Our work speaks for itself</h2>
          </div>
        `;

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
        }
      });
  }
});
