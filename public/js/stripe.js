/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HlbLoK1ED9U7Hukekyy8LgHl4b6b9Gq4o9DcWAX5GsN6sqsLIOoyban9WUbZtd8e0BJkj6N24bJhqsk3SosCmKa00tPP4DmqY'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
      { withCredentials: true }
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
