let currentMonth = 0;
let monthlyRevenues = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const taxRate = 0.125;

function startTaxCalculation() {
    currentMonth = 0;
    monthlyRevenues = [];
    document.getElementById('modal-header').innerText = `Enter revenue for ${months[currentMonth]}`;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function nextMonth() {
    const revenueInput = document.getElementById('revenueInput').value;

    if (revenueInput === "") {
        alert("Please enter a valid revenue amount.");
        return;
    }

    monthlyRevenues.push(parseFloat(revenueInput) * taxRate);
    currentMonth++;

    if (currentMonth < 12) {
        document.getElementById('modal-header').innerText = `Enter revenue for ${months[currentMonth]}`;
        document.getElementById('revenueInput').value = "";
    } else {
        closeModal();
        displayResults();
        remindUserToPayTaxes();
    }
}

function displayResults() {
    const totalTax = monthlyRevenues.reduce((acc, cur) => acc + cur, 0);
    const highestTax = Math.max(...monthlyRevenues);
    const lowestTax = Math.min(...monthlyRevenues);
    const averageTax = totalTax / 12;

    let resultHtml = "<h2>Tax Summary</h2>";
    resultHtml += "<p>";

    months.forEach((month, index) => {
        resultHtml += `<li>${month}: €${monthlyRevenues[index].toFixed(2)}</li>`;
    });

    resultHtml += "</p>";
    resultHtml += `<p>Highest Tax: €${highestTax.toFixed(2)}</p>`;
    resultHtml += `<p>Lowest Tax: €${lowestTax.toFixed(2)}</p>`;
    resultHtml += `<p>Average Tax: €${averageTax.toFixed(2)}</p>`;

    document.getElementById('results').innerHTML = resultHtml;
}

function remindUserToPayTaxes() {
    const warningMessage = "<p>Please pay your taxes!!</p>";
    document.getElementById('warning').innerHTML = warningMessage;
}

// Particle.js configuration
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#000000" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 9 },
            image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#000000",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});
