# Stripe Payment Integration Setup Guide

This guide will help you complete the Stripe payment integration for your application.

## Step 1: Get Your Stripe Publishable Key

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers > API Keys**
3. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
4. Add it to your `.env` file:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

## Step 2: Create Stripe Products and Prices

You need to create products in Stripe for each plan. Go to **Products** in your Stripe Dashboard and create:

### Starter Plan
- **Product Name**: Starter Plan
- **Monthly Price**: £10/month
  - Copy the Price ID and replace `price_starter_monthly` in `BillingPage.tsx`
- **Yearly Price**: £9/month (billed £108/year)
  - Copy the Price ID and replace `price_starter_yearly` in `BillingPage.tsx`

### Professional Plan
- **Product Name**: Professional Plan
- **Monthly Price**: £40/month
  - Copy the Price ID and replace `price_professional_monthly` in `BillingPage.tsx`
- **Yearly Price**: £34/month (billed £408/year)
  - Copy the Price ID and replace `price_professional_yearly` in `BillingPage.tsx`

### Growth Plan
- **Product Name**: Growth Plan
- **Monthly Price**: £150/month
  - Copy the Price ID and replace `price_growth_monthly` in `BillingPage.tsx`
- **Yearly Price**: £128/month (billed £1,536/year)
  - Copy the Price ID and replace `price_growth_yearly` in `BillingPage.tsx`

### Agency Plan
- **Product Name**: Agency Plan
- **Monthly Price**: £499/month
  - Copy the Price ID and replace `price_agency_monthly` in `BillingPage.tsx`
- **Yearly Price**: £424/month (billed £5,088/year)
  - Copy the Price ID and replace `price_agency_yearly` in `BillingPage.tsx`

## Step 3: Configure Webhook

1. In your Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Set the endpoint URL to:
   ```
   https://xvnmxhhphygaeqxuvsxr.supabase.co/functions/v1/stripe-webhook
   ```
4. Select these events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

## Step 4: Add Stripe Secret Keys to Supabase

The Edge Functions need access to your Stripe secret keys. These are automatically configured in Supabase, but you need to add them in your Supabase project settings:

1. Go to your Supabase project dashboard
2. Navigate to **Settings > Edge Functions**
3. Add these secrets:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (from Developers > API Keys)
   - `STRIPE_WEBHOOK_SECRET`: Your webhook signing secret (from Step 3)

## Step 5: Test the Integration

1. Make sure all environment variables are set
2. Restart your development server
3. Log in to your application
4. Go to the Billing page
5. Click "Upgrade" on any plan
6. You'll be redirected to Stripe Checkout
7. Use Stripe's test card: `4242 4242 4242 4242`
8. After successful payment, you'll be redirected back to your billing page

## Important Notes

- The webhook endpoint is already deployed and ready to receive events
- Make sure to test in Stripe's test mode first before going live
- When ready for production, replace test keys with live keys
- All payment data is stored securely in your Supabase database

## Troubleshooting

If payments aren't working:
1. Check that all environment variables are set correctly
2. Verify webhook is receiving events in Stripe Dashboard
3. Check Supabase Edge Function logs for errors
4. Ensure Price IDs in code match those in Stripe Dashboard
