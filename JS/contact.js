import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY =
  "f7bd80c2-9852-4581-9b8c-d84145108809";

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    let formResult = document.querySelector("#formResult");

    if (!formResult) {
      formResult = document.createElement("p");
      formResult.id = "formResult";
      contactForm.appendChild(formResult);
    }

    if (!name || !email || !message) {
      formResult.textContent = "Please complete all fields.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formResult.textContent = "";

    // STEP 1: Save message to Firebase
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

      formResult.textContent =
        "Your message could not be saved. Please try again.";

      submitButton.disabled = false;
      submitButton.textContent = "Submit";
      return;
    }

    // STEP 2: Send notification through Web3Forms
    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: "New Contact Form Message",
            from_name: "Website Contact Form",
            name: name,
            email: email,
            message: message,
            replyto: email
          })
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Web3Forms email failed."
        );
      }

      console.log("Notification email sent!");

      // STEP 3: Show success
      contactForm.reset();
      
        window.location.href = "https://jaxxsox.com/thankyou.html";
      
      } catch (error) {
        console.error("Web3Forms error:", error);
      
        formResult.textContent =
          "Your message was saved, but the email notification failed. Please try again later.";
      
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
}
  });
}
