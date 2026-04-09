document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("_id");

  // Construct the URL for fetching the specific blog post
  if (postId) {
    const fetchUrl = `https://ygn-technologies-backend.vercel.app/get-blog-details?_id=${postId}`;
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        const blogPosts = document.getElementById("blog-details");

        // Check if data is an object
        if (typeof data.data === "object") {
          const post = data.data;

          // Check localStorage for image first, fall back to backend image
          const localImage = localStorage.getItem(`blog_image_${post._id}`);
          const imageUrl = localImage || post?.image || "assets/images/blog/blog-image1.jpg";

          blogPosts.innerHTML += `
            <div class="container pt-120">
            <div class="row g-4">
              <div class="col-lg-12 order-2 order-lg-1">
                <div class="blog__item blog-single__left-item shadow-none">
                  <div class="entry-media hover-scale">   
                    <img width="960" height="600" src="${imageUrl}" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" decoding="async" sizes="(max-width: 960px) 100vw, 960px">                
                  </div>
                  <div class="blog__content p-0">
                    <ul
                      class="pb-3 pt-30 bor-bottom d-flex gap-4 flex-wrap align-items-center"
                    >
                      <li>
                        <svg
                          class="me-1"
                          width="18"
                          height="20"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.5441 5.19275C13.5441 7.69093 11.4995 9.7355 9.0013 9.7355C6.50317 9.7355 4.45859 7.69093 4.45859 5.19275C4.45859 2.69457 6.50313 0.65 9.0013 0.65C11.4995 0.65 13.5441 2.69458 13.5441 5.19275Z"
                            stroke="#3C72FC"
                            stroke-width="1.3"
                          />
                          <path
                            d="M17.2631 14.6707C17.1039 14.9459 16.9228 15.2074 16.7156 15.4768L16.7155 15.4767L16.7076 15.4874C16.419 15.879 16.0832 16.2375 15.7281 16.5925C15.4313 16.8893 15.0919 17.1862 14.7554 17.4386C13.0781 18.6912 11.0608 19.35 8.97684 19.35C6.89705 19.35 4.88376 18.6939 3.20845 17.4462C2.84457 17.1506 2.51237 16.8794 2.22556 16.5925L2.21859 16.5856L2.21141 16.5788C1.85532 16.2437 1.54107 15.8878 1.24614 15.4875L1.24616 15.4875L1.24283 15.483C1.06061 15.2401 0.8719 14.9757 0.717887 14.7171C0.834879 14.456 0.983241 14.1848 1.1439 13.9527L1.14402 13.9528L1.15153 13.9415C2.06854 12.5557 3.53574 11.6389 5.16512 11.4149L5.18469 11.4122L5.20407 11.4083C5.22956 11.4032 5.29364 11.4118 5.34417 11.4497L5.34416 11.4497L5.34817 11.4527C6.4152 12.2402 7.68499 12.6454 8.99949 12.6454C10.314 12.6454 11.5838 12.2402 12.6508 11.4527L12.6508 11.4527L12.6548 11.4497C12.6702 11.4381 12.739 11.4081 12.8479 11.4168C14.4675 11.6437 15.9108 12.5569 16.8511 13.947L16.8511 13.947L16.8551 13.9527C17.0152 14.1841 17.1543 14.4232 17.2631 14.6707Z"
                            stroke="#3C72FC"
                            stroke-width="1.3"
                          />
                        </svg>
                          <span class="primary-hover transition">${
                            post.name
                          }</span>
                      </li>
                      <li>
                        <svg
                          class="me-1"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.66406 4.79166C6.3224 4.79166 6.03906 4.50833 6.03906 4.16666V1.66666C6.03906 1.325 6.3224 1.04166 6.66406 1.04166C7.00573 1.04166 7.28906 1.325 7.28906 1.66666V4.16666C7.28906 4.50833 7.00573 4.79166 6.66406 4.79166ZM13.3307 4.79166C12.9891 4.79166 12.7057 4.50833 12.7057 4.16666V1.66666C12.7057 1.325 12.9891 1.04166 13.3307 1.04166C13.6724 1.04166 13.9557 1.325 13.9557 1.66666V4.16666C13.9557 4.50833 13.6724 4.79166 13.3307 4.79166ZM7.08073 12.0833C6.9724 12.0833 6.86406 12.0583 6.76406 12.0167C6.65573 11.975 6.5724 11.9167 6.48906 11.8417C6.33906 11.6833 6.2474 11.475 6.2474 11.25C6.2474 11.1417 6.2724 11.0333 6.31406 10.9333C6.35573 10.8333 6.41406 10.7417 6.48906 10.6583C6.5724 10.5833 6.65573 10.525 6.76406 10.4833C7.06406 10.3583 7.43906 10.425 7.6724 10.6583C7.8224 10.8167 7.91406 11.0333 7.91406 11.25C7.91406 11.3 7.90573 11.3583 7.8974 11.4167C7.88906 11.4667 7.8724 11.5167 7.8474 11.5667C7.83073 11.6167 7.80573 11.6667 7.7724 11.7167C7.7474 11.7583 7.70573 11.8 7.6724 11.8417C7.51406 11.9917 7.2974 12.0833 7.08073 12.0833ZM9.9974 12.0833C9.88906 12.0833 9.78073 12.0583 9.68073 12.0167C9.5724 11.975 9.48906 11.9167 9.40573 11.8417C9.25573 11.6833 9.16406 11.475 9.16406 11.25C9.16406 11.1417 9.18906 11.0333 9.23073 10.9333C9.2724 10.8333 9.33073 10.7417 9.40573 10.6583C9.48906 10.5833 9.5724 10.525 9.68073 10.4833C9.98073 10.35 10.3557 10.425 10.5891 10.6583C10.7391 10.8167 10.8307 11.0333 10.8307 11.25C10.8307 11.3 10.8224 11.3583 10.8141 11.4167C10.8057 11.4667 10.7891 11.5167 10.7641 11.5667C10.7474 11.6167 10.7224 11.6667 10.6891 11.7167C10.6641 11.7583 10.6224 11.8 10.5891 11.8417C10.4307 11.9917 10.2141 12.0833 9.9974 12.0833ZM12.9141 12.0833C12.8057 12.0833 12.6974 12.0583 12.5974 12.0167C12.4891 11.975 12.4057 11.9167 12.3224 11.8417L12.2224 11.7167C12.1908 11.6702 12.1656 11.6198 12.1474 11.5667C12.1233 11.5194 12.1065 11.4689 12.0974 11.4167C12.0891 11.3583 12.0807 11.3 12.0807 11.25C12.0807 11.0333 12.1724 10.8167 12.3224 10.6583C12.4057 10.5833 12.4891 10.525 12.5974 10.4833C12.9057 10.35 13.2724 10.425 13.5057 10.6583C13.6557 10.8167 13.7474 11.0333 13.7474 11.25C13.7474 11.3 13.7391 11.3583 13.7307 11.4167C13.7224 11.4667 13.7057 11.5167 13.6807 11.5667C13.6641 11.6167 13.6391 11.6667 13.6057 11.7167C13.5807 11.7583 13.5391 11.8 13.5057 11.8417C13.3474 11.9917 13.1307 12.0833 12.9141 12.0833ZM7.08073 15C6.9724 15 6.86406 14.975 6.76406 14.9333C6.66406 14.8917 6.5724 14.8333 6.48906 14.7583C6.33906 14.6 6.2474 14.3833 6.2474 14.1667C6.2474 14.0583 6.2724 13.95 6.31406 13.85C6.35573 13.7417 6.41406 13.65 6.48906 13.575C6.7974 13.2667 7.36406 13.2667 7.6724 13.575C7.8224 13.7333 7.91406 13.95 7.91406 14.1667C7.91406 14.3833 7.8224 14.6 7.6724 14.7583C7.51406 14.9083 7.2974 15 7.08073 15ZM9.9974 15C9.78073 15 9.56406 14.9083 9.40573 14.7583C9.25573 14.6 9.16406 14.3833 9.16406 14.1667C9.16406 14.0583 9.18906 13.95 9.23073 13.85C9.2724 13.7417 9.33073 13.65 9.40573 13.575C9.71406 13.2667 10.2807 13.2667 10.5891 13.575C10.6641 13.65 10.7224 13.7417 10.7641 13.85C10.8057 13.95 10.8307 14.0583 10.8307 14.1667C10.8307 14.3833 10.7391 14.6 10.5891 14.7583C10.4307 14.9083 10.2141 15 9.9974 15ZM12.9141 15C12.6974 15 12.4807 14.9083 12.3224 14.7583C12.2453 14.6801 12.1856 14.5863 12.1474 14.4833C12.1057 14.3833 12.0807 14.275 12.0807 14.1667C12.0807 14.0583 12.1057 13.95 12.1474 13.85C12.1891 13.7417 12.2474 13.65 12.3224 13.575C12.5141 13.3833 12.8057 13.2917 13.0724 13.35C13.1307 13.3583 13.1807 13.375 13.2307 13.4C13.2807 13.4167 13.3307 13.4417 13.3807 13.475C13.4224 13.5 13.4641 13.5417 13.5057 13.575C13.6557 13.7333 13.7474 13.95 13.7474 14.1667C13.7474 14.3833 13.6557 14.6 13.5057 14.7583C13.3474 14.9083 13.1307 15 12.9141 15ZM17.0807 8.2H2.91406C2.5724 8.2 2.28906 7.91666 2.28906 7.575C2.28906 7.23333 2.5724 6.95 2.91406 6.95H17.0807C17.4224 6.95 17.7057 7.23333 17.7057 7.575C17.7057 7.91666 17.4224 8.2 17.0807 8.2Z"
                            fill="#3C72FC"
                          />
                          <path
                            d="M13.3333 18.9583H6.66667C3.625 18.9583 1.875 17.2083 1.875 14.1667V7.08333C1.875 4.04166 3.625 2.29166 6.66667 2.29166H13.3333C16.375 2.29166 18.125 4.04166 18.125 7.08333V14.1667C18.125 17.2083 16.375 18.9583 13.3333 18.9583ZM6.66667 3.54166C4.28333 3.54166 3.125 4.7 3.125 7.08333V14.1667C3.125 16.55 4.28333 17.7083 6.66667 17.7083H13.3333C15.7167 17.7083 16.875 16.55 16.875 14.1667V7.08333C16.875 4.7 15.7167 3.54166 13.3333 3.54166H6.66667Z"
                            fill="#3C72FC"
                          />
                        </svg>
                        <span>${post.date.slice(0, 10)}</span>
                      </li>
                      <li>
                          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4zoncc_qiJMcUrWiZLGieDv-NSUphpzcU1Z5dQHPn6g&s' alt='linkedin' 
                            width='25' height='25' 
                            onclick="window.location.href='${post.linkedin}';" 
                            style="cursor: pointer;" />
                      </li>
                    </ul>
                    <h3 class="blog-single__title mt-20">
                      ${post.title}
                    </h3>
                    <p class="mb-20 mt-20">
                      ${post.description}
                    </p>
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
      .catch((error) => {
        console.error("Error fetching data:", error);
        document.getElementById("blog-posts").innerHTML =
          "Error fetching data. Please try again later.";
      });
  } else {
    // Handle error or unexpected response
    fetch("https://ygn-technologies-backend.vercel.app/get-blog")
      .then((response) => response.json())
      .then((data) => {
        const blogPosts = document.getElementById("blog-posts");
        blogPosts.innerHTML = `
        <div class="section-header text-center mb-60">
            <h5 class="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms" style="
                  visibility: visible;
                  animation-duration: 1500ms;
                  animation-delay: 0ms;
                  animation-name: fadeInUp;
                ">
              <img class="me-1" src="assets/images/icon/section-title.png" alt="icon" />
              CASE STUDIES
            </h5>
            <h2 class="wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms" style="
                  visibility: visible;
                  animation-duration: 1500ms;
                  animation-delay: 200ms;
                  animation-name: fadeInUp;
                ">
              Our work speaks for itself
            </h2>
          </div>
        `
        if (Array.isArray(data.data)) {
          data.data.forEach((post) => {
            // Check localStorage for image first, fall back to backend image
            const localImage = localStorage.getItem(`blog_image_${post._id}`);
            const imageUrl = localImage || post?.image || "assets/images/blog/blog-image1.jpg";

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
                                    <img width="356" height="245" src="${imageUrl}" alt="image" style="object-fit:cover"/>
                                </a>
                                <div class="blog__content">
                                    <h3 class="bor-bottom pb-20 mb-20 primary-hover">
                                    ${post.name}
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
          blogPosts.innerHTML = "Error: Invalid response from server";
        }
      });
  }
});
