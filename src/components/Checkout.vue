<template>
  <div class="checkout-container">
    <CartComponent />
    <h1>Checkout</h1>
    <form class="checkout-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">First Name</label>
        <input v-model="firstName" type="text" class="form-control" id="first_name" placeholder="Enter name" />
      </div>

      <div class="form-group">
        <label for="name">Last Name</label>
        <input v-model="lastName" type="text" class="form-control" id="last_name" placeholder="Enter last name" />
      </div>

      <div class="form-group">
        <label for="email">Email address</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" autocomplete="username" />
        <small class="form-text">It will be used to generate your new user account.</small>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password"
               autocomplete="current-password" />
        <small class="form-text">It will be used to generate your new user account.</small>
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input v-model="phone" type="text" class="form-control" id="phone" placeholder="Enter phone number" />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input v-model="address" type="text" class="form-control" id="address" placeholder="Enter address" />
      </div>

      <div class="form-group">
        <label for="payment">Payment Method</label>
        <select class="form-control" id="payment" v-model="paymentMethod" @change="togglePaymentDetails">
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bitcoin">Bitcoin</option>
        </select>
      </div>

      <div class="form-group payment-details" v-if="paymentMethod === 'Credit Card'">
        <div>
          <label>Card Number:</label>
          <input v-model="creditCardNumber" type="text" class="form-control" />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input v-model="expirationDate" type="text" class="form-control" />
        </div>
        <div>
          <label>CVV:</label>
          <input v-model="cvv" type="text" class="form-control" />
        </div>
      </div>

      <div class="form-group payment-details" v-if="paymentMethod === 'PayPal'">
        <a href="https://paypal.com" target="_blank" class="btn btn-primary">Pay with PayPal</a>
      </div>

      <div class="form-group payment-details" v-if="paymentMethod === 'Bitcoin'">
        <a href="https://google.com" target="_blank" class="btn btn-primary">Pay with Bitcoin</a>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import CartComponent from "@/components/Cart.vue";
import router from "@/router";
import Swal from "sweetalert2";

export default defineComponent({
  name: "checkout-component",
  components: { CartComponent },
  data() {
    return {
      paymentMethod: "Credit Card",
      firstName: ref(""),
      lastName: ref(""),
      email: ref(""),
      password: ref(""),
      phone: ref(""),
      address: ref(""),
      creditCardNumber: ref(""),
      expirationDate: ref(""),
      cvv: ref(""),
      missingFields: [] as string[]
    };
  },
  methods: {
    handleSubmit() {
      if (!this.validateForm()) {
        Swal.fire({
          title: "Error!",
          text: "Please fix the issues: " + this.missingFields.join(", "),
          icon: "error",
          confirmButtonText: "Ok"
        });

        return;
      }

      // Store data in localStorage
      localStorage.setItem("checkoutData", JSON.stringify({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
        cart: localStorage.getItem("cart")
      }));

      router.push("/order-summary");
    },
    validateForm() {
      this.missingFields = [];

      if (!localStorage.getItem("cart")) {
        this.missingFields.push("Cart is empty");

        return false;
      }

      if (this.paymentMethod === "Credit Card") {
        // Validate credit card details
        if (!this.creditCardNumber) {
          this.missingFields.push("Credit card number is missing");
        } else if (this.creditCardNumber.length !== 16) {
          this.missingFields.push("Credit card number is invalid");
        }

        // Validate expiration date is later than today
        if (!this.expirationDate) {
          this.missingFields.push("Expiration date is missing");
        } else if (!this.validateCreditCardDAte(this.expirationDate)) {
            this.missingFields.push("Expiration date is invalid");
        }

        // Validate CVV
        if (!this.cvv) {
          this.missingFields.push("CVV is missing");
        } else if (this.cvv.length !== 3) {
          this.missingFields.push("CVV is invalid");
        }
      }

      if (!this.firstName || !this.lastName || !this.email || !this.password || !this.phone || !this.address) {
        this.missingFields.push("Personal details are missing");
      }

      return this.missingFields.length === 0;
    },
    togglePaymentDetails() {
      // Logic to show/hide credit card details
    },
    validateCreditCardDAte(dateString: string) {
      const dateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
      if (!dateRegex.test(dateString)) {
        return false;
      }

      const [inputMonth, inputYear] = dateString.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const month = parseInt(inputMonth, 10);
      const year = parseInt(inputYear, 10);

      return year > currentYear || year === currentYear && month >= currentMonth;
    }
  }
});
</script>

<style>
.checkout-container {
  max-width: 750px;
  margin: auto;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.form-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875em;
  color: #6c757d;
}

.payment-details > div {
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>

