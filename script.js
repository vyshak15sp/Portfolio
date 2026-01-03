// Smooth scroll
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
});

// Dark / Light toggle
document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('light');
};

// Project Modal
function openModal(type) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDesc');

  const data = {
    medbin: ["MedBin Solutions", "AI-powered biomedical waste segregation system using object detection."],
    ai: ["AI Adoption Study", "Research on AI adoption in Human Capital Development."],
    supply: ["Supply Chain Analytics", "Delivery performance prediction using regression models."]
  };

  title.innerText = data[type][0];
  desc.innerText = data[type][1];
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById('modal').style.display = "none";
}
