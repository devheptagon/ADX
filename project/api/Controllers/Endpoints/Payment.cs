using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Stripe;
using System.Collections.Generic;

namespace adx
{
    public partial class v1Controller : ControllerBase
    {

        [Authorize]
        [HttpPost("payment")]
        public RedirectResult Payment([FromBody] PaymentRequest request)
        {
            var sessionService = new Stripe.Checkout.SessionService();
            var options = new Stripe.Checkout.SessionCreateOptions()
            {
                PaymentMethodTypes = new List<string>() { "card" },
                Mode = "payment",
                SuccessUrl = "",
                CancelUrl = "",
                LineItems = new List<Stripe.Checkout.SessionLineItemOptions>()
                {
                    new Stripe.Checkout.SessionLineItemOptions()
                    {
                        Amount=1000,
                        Currency="gbp",
                        Quantity=1,
                        Description="test payment desc"
                    }
                }
            };
            var session = sessionService.Create(options);


            //var entity = request.Data;
            //entity.user_id = AppHelper.GetUserIdFromClaim(HttpContext);
            //PaymentService.AddPayment(new PaymentEntity());
            return Redirect(session.Url); // to stripe url
        }


        [HttpGet("payment")]
        public RedirectResult Payment()
        {
            var client = new StripeClient(AppHelper.stripePrivateKey);
            var sessionService = new Stripe.Checkout.SessionService(client);
            var options = new Stripe.Checkout.SessionCreateOptions()
            {
                PaymentMethodTypes = new List<string>() { "card" },
                Mode = "payment",
                SuccessUrl = "https://google.com",
                CancelUrl = "https://yahoo.com",
                LineItems = new List<Stripe.Checkout.SessionLineItemOptions>()
                {
                    new Stripe.Checkout.SessionLineItemOptions()
                    {
                        Name="test payment desc",
                        Amount=100,
                        Currency="gbp",
                        Quantity=1
                    }
                }
            };
            var session = sessionService.Create(options);


            //var entity = request.Data;
            //entity.user_id = AppHelper.GetUserIdFromClaim(HttpContext);
            //PaymentService.AddPayment(new PaymentEntity());
            return Redirect(session.Url); // to stripe url
        }

        [AllowAnonymous]
        [HttpGet("success")]
        public RedirectResult RedirectSuccess()
        {
            var paymentId = PaymentService.UpdatePayment(new PaymentEntity());
            var payment = PaymentService.GetPayment(paymentId.ToString());
            UserService.UpgradeUser(payment.user_id, paymentId.ToString(), payment.months);

            return Redirect("https://google.com"); //to client success
        }

        [AllowAnonymous]
        [HttpGet("cancel")]
        public RedirectResult RedirectCancel()
        {
            PaymentService.UpdatePayment(new PaymentEntity());
            return Redirect("https://google.com"); //to client cancel
        }

    }


}
