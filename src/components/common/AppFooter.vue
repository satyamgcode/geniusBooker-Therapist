<template>
    <q-layout>
      <q-page-container>
        <q-page>
          <q-footer class="footer q-pa-md">
      <div class="footer-container row justify-between q-mx-none">
        <div class="col-12 col-md-4 footer-section middle-section">
          <h4 class="footer-title">About Us</h4>
          <p class="footer-text">
            We are committed to providing the best solutions to manage your business. Our platform makes scheduling, staff management, and client bookings a breeze.
          </p>
        </div>
  
        <div class="col-12 col-md-4 footer-section middle-section">
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
  
        <div class="col-12 col-md-4 footer-section middle-section">
          <h4 class="footer-title">Contact Us</h4>
          <p class="footer-text">
            123 Business Street, City, Country <br />
            Email: info@business.com <br />
            Phone: +123 456 7890
          </p>
          <div class="social-icons">
            <q-btn flat round  @click="goToLink('https://facebook.com')" ><q-icon name="store" size="40px" color="primary" /></q-btn>
            <q-btn flat round  @click="goToLink('https://twitter.com')" ><q-icon name="store" size="40px" color="primary" /></q-btn>
            <q-btn flat round  @click="goToLink('https://instagram.com')" ><q-icon name="store" size="40px" color="primary" /></q-btn>
            <q-btn flat round  @click="goToLink('https://linkedin.com')" ><q-icon name="store" size="40px" color="primary" /></q-btn>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom q-mt-md">
        <p class="text-center">
          &copy; {{ new Date().getFullYear() }} GeniusBooker. All rights reserved.
        </p>
      </div>
    </q-footer>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  const goToLink = (url) => {
    window.open(url, '_blank');
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #1e1e1e;
    color: white;
    padding: 40px 20px;
    border-top: 2px solid #ccc;
    position: unset !important;
  }
  
  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .footer-section {
    margin-bottom: 20px;
  }
  
  .footer-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #ffca28;
  }
  
  .footer-text {
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin: 5px 0;
  }
  
  .footer-links li a {
    color: #fff;
    text-decoration: none;
  }
  
  .footer-links li a:hover {
    color: #ffca28;
  }
  
  .social-icons q-btn {
    color: white;
    margin-right: 10px;
  }
  .middle-section {
    text-align: center;
  }
  
  .footer-bottom {
    border-top: 1px solid #444;
    padding-top: 10px;
  }
  .q-layout , .q-page-container {
    padding-bottom: unset !important;
    margin: unset !important;
    min-height: unset !important;
  }

  @media (max-width: 768px) {
    .middle-section {
      text-align: left;
    }
  }
  </style>
  