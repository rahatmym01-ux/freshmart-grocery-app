# 🛒 FreshMart - Online Grocery E-Commerce Platform

This is the complete source code for **FreshMart**, a modern online grocery shopping web application built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 🇧🇩 বাংলা নির্দেশিকা (VS Code এ কীভাবে ওপেন ও রান করবেন):

১. এই ডাউনলোড করা `freshmart-grocery-app.zip` ফাইলটি আনজিপ (Extract) করুন।
২. আপনার কম্পিউটারে **Visual Studio Code (VS Code)** সফটওয়্যারটি ওপেন করুন।
৩. VS Code মেনু থেকে **File -> Open Folder...** সিলেক্ট করে আনজিপ করা ফোল্ডারটি ওপেন করুন।
   (অথবা টার্মিনাল বা কমান্ড প্রম্পটে গিয়ে `code .` লিখুন)।
৪. VS Code এ টার্মিনাল ওপেন করুন (শর্টকাট: `Ctrl + `` অথবা `Terminal -> New Terminal`)।
৫. ডিপেনডেন্সি ইন্সটল করতে নিচের কমান্ডটি লিখুন এবং Enter চাপুন:
   ```bash
   npm install
   ```
৬. এবার লোকাল ডেভেলপমেন্ট সার্ভার চালু করতে লিখুন:
   ```bash
   npm run dev
   ```
৭. আপনার ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করলেই ওয়েবসাইটটি চালু হয়ে যাবে!

### 🔑 ডেমো লগইন তথ্য:
- **অ্যাডমিন ড্যাশবোর্ড**: ইমেইল `admin` এবং পাসওয়ার্ড `102030`
- **কাস্টমার অ্যাকাউন্ট**: ইমেইল `user@freshmart.com` এবং পাসওয়ার্ড `user123`

---

## 🇺🇸 English Instructions (How to open & run in VS Code):

1. **Extract** the downloaded `freshmart-grocery-app.zip` archive.
2. Open **Visual Studio Code**.
3. Go to **File -> Open Folder...** and select the extracted folder (or run `code .` in your terminal).
4. Open the integrated terminal in VS Code (`Ctrl + `` or `Terminal -> New Terminal`).
5. Install packages:
   ```bash
   npm install
   ```
6. Start the local Vite server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Features included:
- Dual-currency: USD ($) & BDT (৳) with 1 USD = 117 BDT real-time rate.
- Bilingual localization: English & বাংলা (Bengali).
- 10 full grocery categories with 24+ items.
- Flash sale with live ticking timer (HH:MM:SS).
- Nutritional breakdowns & customer reviews.
- Multi-step checkout with USA & Bangladesh address selectors.
- Sandbox payment simulations (Stripe cards, bKash, Nagad, PayPal, Cash on Delivery).
- Enterprise Admin Suite (KPIs, Inventory control, Order dispatcher, Product management).
