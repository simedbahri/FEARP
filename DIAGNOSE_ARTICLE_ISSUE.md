# Diagnose: Why Articles Disappear After Refresh

## Step-by-Step Debug Instructions

### 1. Open Developer Console
- Press `F12` in your browser
- Go to **Console** tab
- Clear any previous messages (Ctrl+L or click the trash icon)

### 2. Reload Your Website
- Press `Ctrl+R` or click refresh button
- Watch the console for `[ArticleContext]` messages

### 3. Look for These Specific Messages

**GOOD SIGNS (you should see these):**
```
[ArticleContext] Setting up onSnapshot listener...
[ArticleContext] ✅ SUCCESS: Received X articles from Firestore
[ArticleContext] ✅ Setting X articles in state
```

**BAD SIGNS (if you see these, we have a real problem):**
```
[ArticleContext] ❌ Firebase Error:
[ArticleContext] Error Code: permission-denied
[ArticleContext] Error Message: [something about permission]
```

### 4. Test Adding an Article
1. Go to Admin Dashboard
2. Add a test article (title: "Test", content: "Test content")
3. Click "Add Article"
4. Watch console for:
   - `[ArticleContext] ➕ Adding new article:`
   - `[ArticleContext] ✅ Article added successfully`

### 5. Refresh Page
- Press F5 or Ctrl+R
- Watch console for error messages
- Check if article appears on the home page

### 6. Possible Issues & Solutions

#### Issue A: "permission-denied" Error
**Solution:** Check Firebase Console
- Go to Firestore Database → Rules
- Verify rules are **exactly** as specified
- Click **Publish**
- Wait 30 seconds
- Reload browser

#### Issue B: Articles visible before refresh, gone after
**Solution:** Check Authentication
- Articles might be using `request.auth` incorrectly
- Change rules to allow public read (already done)
- Check if user is authenticated

#### Issue C: No console errors but articles still disappear
**Solution:** Check data structure
- Article might be missing required fields
- Look in Firestore console to see actual data saved

### 7. Check Firestore Data Directly

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select **fearp-47bae** project
3. Go to **Firestore Database**
4. Click on **articles** collection
5. You should see your articles listed with:
   - Document ID (auto-generated)
   - title (text)
   - content (text)
   - date (timestamp)

If no documents appear, articles aren't being saved to Firestore.

### 8. Report Back With

When you test, please tell me:
1. ✅ Do you see `[ArticleContext] ✅ SUCCESS:` messages in console?
2. ✅ What does console show when you add an article?
3. ✅ What does console show when you refresh?
4. ✅ Do articles appear in Firestore console?
5. ✅ Are you logged in when adding articles?
