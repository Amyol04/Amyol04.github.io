
import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";

const SERVICE_ID = "service_n9dwd2s";

// Your notification template
const TEMPLATE_ID = "template_xj6ofsj";

// Your automatic reply template
const AUTOREPLY_TEMPLATE_ID = "template_p8jg76a";

const PUBLIC_KEY = "jFHl8UcOWjIgbxTJm";

const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = contactForm.querySelector('[name="name"]').value.trim();
  const email = contactForm.querySelector('[name="email"]').value.trim();
  const message = contactForm.querySelector('[name="message"]').value.trim();

  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (!name || !email || !message) {
    alert("Please complete all fields.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // Save message to Firebase
  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });

    console.log("Message saved to Firebase!");

  } catch (error) {
    console.error("Firebase error:", error);
    alert("Your message could not be saved. Please try again.");
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    return;
  }

  // Send both emails
  const templateParams = { name, email, message };

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    console.log("Notification email sent!");

  } catch (error) {
    console.error("Notification email failed:", error);
    alert("Your message was saved, but the notification email failed.");
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    return;
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      AUTOREPLY_TEMPLATE_ID,
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    console.log("Automatic reply sent!");

  } catch (error) {
    console.error("Automatic reply failed:", error);
    alert("Your message was saved, but the automatic reply could not be sent.");
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
    return;
  }

  window.location.href = "index.html";
});
