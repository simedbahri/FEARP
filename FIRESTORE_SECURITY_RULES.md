# Firestore Security Rules - Fix for Articles Disappearing

## 🔴 Problem
Articles are being saved successfully, but they disappear after you refresh the page. This is caused by **Firestore Security Rules** that don't allow reading articles.

## ✅ Solution

You need to configure your Firestore security rules to:
1. **Allow public reading** of articles (so visitors can see them)
2. **Allow authenticated writing** of articles (so only logged-in admins can create/edit/delete)

### Step-by-Step Instructions

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Sign in with your Google account
   - Select your project: **fearp-47bae**

2. **Navigate to Firestore Rules**
   - In the left sidebar, click **Firestore Database**
   - Click on the **Rules** tab (at the top)

3. **Replace the Rules**
   - Delete all existing rules
   - Copy and paste the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Articles collection: public read, authenticated write
    match /articles/{document=**} {
      allow read: if true;  // Anyone can read articles
      allow write: if request.auth != null;  // Only authenticated users can write
    }
  }
}
```

4. **Publish the Rules**
   - Click the **Publish** button
   - Wait for the confirmation message

5. **Test**
   - Refresh your website
   - Articles should now persist after refresh!

## 🔍 Understanding the Rules

### `allow read: if true;`
- **What it does**: Allows anyone (including non-logged-in users) to read articles
- **Why needed**: Your blog is public, so visitors need to read articles
- **Security**: Reading is safe - it doesn't modify data

### `allow write: if request.auth != null;`
- **What it does**: Only allows logged-in users to create, update, or delete articles
- **Why needed**: Only admins should be able to modify content
- **Security**: `request.auth != null` checks if the user is authenticated

## 🛡️ More Secure Rules (Optional)

If you want to restrict writes to specific admin users only, you can use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{document=**} {
      allow read: if true;
      // Only allow writes from specific admin email
      allow write: if request.auth != null && 
                     request.auth.token.email == 'your-admin@email.com';
    }
  }
}
```

Or if you have a custom claims system:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{document=**} {
      allow read: if true;
      // Only allow writes from users with admin role
      allow write: if request.auth != null && 
                     request.auth.token.admin == true;
    }
  }
}
```

## 🐛 Troubleshooting

### Articles still disappearing?
1. **Check the browser console** (F12) for error messages
2. **Verify rules are published**: Go back to Rules tab and confirm they're saved
3. **Check authentication**: Make sure you're logged in when adding articles
4. **Check Firestore**: Go to Firestore Database → Data tab and see if articles exist there

### Permission denied errors?
- Make sure you're logged in as an admin when trying to add/edit articles
- Check that your Firebase Authentication is set up correctly
- Verify the user email matches if you're using email-based restrictions

### Can't see articles in Firestore?
- Go to Firestore Database → Data tab
- Look for the `articles` collection
- If it doesn't exist, create it by adding your first article through the admin panel

## 📝 Current Rules Status

To check your current rules:
1. Go to Firebase Console → Firestore Database → Rules
2. Look at what's currently there
3. Compare with the rules above

## 🔗 Additional Resources

- [Firestore Security Rules Documentation](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Console](https://console.firebase.google.com)
- [Firestore Rules Playground](https://console.firebase.google.com/project/_/firestore/rules) - Test your rules before publishing

---

**Remember**: After updating the rules, always click **Publish** for the changes to take effect!

