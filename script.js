// Navigation functionality
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")
const navbar = document.getElementById("navbar")
const navLinksItems = document.querySelectorAll(".nav-link")

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active")
  hamburger.classList.toggle("active")
  // Prevent scrolling when menu is open
  document.body.classList.toggle("menu-open")
})

// Close mobile menu when clicking on a link
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
    hamburger.classList.remove("active")
    document.body.classList.remove("menu-open")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinksItems.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", updateActiveNav)

// Separate observers for different sections
const achievementObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const index = Array.from(target.parentNode.children).indexOf(target)
        setTimeout(() => {
          target.classList.add("animate")
        }, index * 150)

        // Unobserve after animation
        achievementObserver.unobserve(target)
      }
    })
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  },
)

const visionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const index = Array.from(target.parentNode.children).indexOf(target)
        setTimeout(() => {
          target.classList.add("animate")
        }, index * 150)

        // Unobserve after animation
        visionObserver.unobserve(target)
      }
    })
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  },
)

const mediaObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const index = Array.from(target.parentNode.children).indexOf(target)
        setTimeout(() => {
          target.classList.add("animate")
        }, index * 100)

        // Unobserve after animation
        mediaObserver.unobserve(target)
      }
    })
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  },
)

const generalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-slide-left")
        generalObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  },
)

// Observe elements by section
document.addEventListener("DOMContentLoaded", () => {
  // Observe achievement cards
  document.querySelectorAll(".achievement-card").forEach((card) => {
    achievementObserver.observe(card)
  })

  // Observe vision value items
  document.querySelectorAll(".value-item").forEach((item, index) => {
    // Add a small delay for each item to create a staggered effect
    setTimeout(() => {
      visionObserver.observe(item)
    }, index * 50)
  })

  // Observe media items
  document.querySelectorAll(".media-item").forEach((item) => {
    mediaObserver.observe(item)
  })

  // Observe general animation targets
  document.querySelectorAll(".animate-target").forEach((target) => {
    generalObserver.observe(target)
  })
})

// Modal functionality
function openModal(imageSrc) {
  const modal = document.getElementById("modal")
  const modalImage = document.getElementById("modalImage")
  const modalCaption = document.getElementById("modalCaption")
  
  // Set the image source
  modalImage.src = imageSrc
  
  // Hide the caption completely
  modalCaption.style.display = 'none'
  
  // Display the modal
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("modal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside the image
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    closeModal()
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Disable parallax effect for vision section to prevent overlap issues
// window.addEventListener("scroll", () => {
//   const scrolled = window.pageYOffset
//   const visionSection = document.getElementById("vision")
//   if (visionSection) {
//     const rate = scrolled * -0.5
//     visionSection.style.transform = `translateY(${rate}px)`
//   }
// })

// Reset animations on page reload
window.addEventListener("load", () => {
  // Reset all animation states
  document.querySelectorAll(".achievement-card, .media-item, .value-item").forEach((el) => {
    el.classList.remove("animate")
  })

  document.querySelectorAll(".animate-target").forEach((el) => {
    el.classList.remove("animate-slide-left")
  })

  // Force a small delay before re-observing elements
  setTimeout(() => {
    // Re-observe achievement cards
    document.querySelectorAll(".achievement-card").forEach((card) => {
      achievementObserver.observe(card)
    })

    // Re-observe vision value items
    document.querySelectorAll(".value-item").forEach((item) => {
      visionObserver.observe(item)
    })

    // Re-observe media items
    document.querySelectorAll(".media-item").forEach((item) => {
      mediaObserver.observe(item)
    })

    // Re-observe general animation targets
    document.querySelectorAll(".animate-target").forEach((target) => {
      generalObserver.observe(target)
    })
  }, 100)
})
