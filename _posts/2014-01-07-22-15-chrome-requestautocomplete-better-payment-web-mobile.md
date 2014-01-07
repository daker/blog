---
layout: post.html
title: Chrome’s requestAutocomplete(), for a Better Payment on the Web & Mobile
tags: [javascript]
---
Google is always trying to make the web experience very easy including the online shopping experience, filling out the 21 pieces of data can be a painful task and specialy on mobile devices. Studies have shown that most of the consumers will leave the website or the mobile app without complete checkout because they have to fill the checkout form which detailed & very long. In 2011 Google launched Google Wallet, a step forward to try to simplify the payment process and make it less time consuming.

During the last I/O Google introduced a new API called ```requestAutocomplete()```, which can auto-populate all of your payment details stored in the browser.

> Particularly for mobile applications, this solves the problem of working with long or even multi-page forms. It improves the purchase checkout flow and reduces drop-off with a secure and concise payment submission UI. For merchants, this results in improved conversion rates, sorely needed in mobile purchase scenarios.

![requestAutocomplete](/assets/posts/requestAutocomplete/1.png)

Calling the ```requestAutocomplete()``` on a form element will auto-populate the data, the browser will use the form to detect which input types to populate, which means that the form doesn’t really need to be shown to the user.

```html
<button id="checkout">Checkout</button>

<form id="checkout-form" hidden>
  <input autocomplete="cc-name" name="myname">
  <input autocomplete="cc-number" name="ccnumber">
  <input autocomplete="cc-exp" name="ccexp">
  <input autocomplete="cc-csc" name="cccvc">

  <input autocomplete="billing street-address" name="billaddress">
  <input autocomplete="billing locality" name="billtown">
  <input autocomplete="billing region" name="billstate">
  <input autocomplete="billing postal-code" name="billzip">

  <input autocomplete="shipping street-address" name="billaddress">
  <input autocomplete="shipping locality" name="billtown">
  <input autocomplete="shipping region" name="billstate">
  <input autocomplete="shipping postal-code" name="billzip">
</form>
```

```js
<script>
  (function(){
    var form = document.getElementById('checkout-form');
    var button = document.getElementById('checkout');

    if (!("requestAutocomplete" in form)) return;

    button.addEventListener('click', function(){
      form.requestAutocomplete();
    });

    form.addEventListener('autocomplete', function(){
      // The form contains the data. We could either submit it, or read the data
      form.submit();
    });
  }).call(this);
</script>
```

## Autocomplete Attributes

### Credit Card Details

The credit card data includes the following field types :

* email
* cc-name
* cc-number
* cc-exp-month
* cc-exp-year
* cc-csc

### Address Details

Both the ```shipping``` and ```billing``` addresses have the following fields :

* name
* tel
* tel-country-code
* tel-national
* street-address
* locality
* region
* postal-code
* country

## Autocomplete Events

Once ```requestAutocomplete()``` has been called, a permissions dialog will be shown to the user, so he can accept or not to share his information with the page or fill them if he didn't.

![Me](/assets/posts/requestAutocomplete/2.png)

The autocomplete process is asynchronous, so you need to listen for the ```autocomplete``` and ```autocompleteerror``` events :

* ```autocomplete``` : fired if the user has successfully submitted the all payment details
* ```autocompleteerror``` : fired if an error occurs, it provides a ```reason``` property :
    * invalid – The user's data did not pass the HTML5 form validation.
    * cancel – The user clicked cancel on the dialog.
    * disabled – The browser supports requestAutocomplete, but it’s disabled in browser preferences.

```js
form.addEventListener('autocomplete', function() {
    form.submit();
});

form.addEventListener('autocompleteerror', function(event) {
    if (event.reason == 'invalid') {
        form.submit();
    } else if (event.reason != 'cancel') {
        window.location = '/checkout/';
    } else if (event.reason == 'disabled') {
        window.location = '/checkout/';
    }
});
```
You can already start using it while being compatible with others browsers that didn't implement it yet(and hope they will standardize it), by using the ```event.reason``` as shown above and fallback to a normal checkout form.

## Conclusion
From a consumer percepective, it means that the 21 pieces of data to enter will be reduced to two or three clicks, this will dramatically improve the usability and conversion rates.

NB: The ```requestAutocomplete() ``` is only implemented on Chrome Mobile and Google Chrome for Windows & MacOS.