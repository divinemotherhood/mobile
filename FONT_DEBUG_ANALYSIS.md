/**
 * FONT LINKING PROBLEM ANALYSIS
 * =================================
 * 
 * YOUR PROBLEM:
 * - Font file: Larken-Medium.ttf
 * - Code uses: fontFamily: 'Larken-Medium'
 * - Result: Text falls back to system font (NOT applying Larken)
 * 
 * ROOT CAUSE:
 * React Native uses the PostScript NAME inside the font file, NOT the file name.
 * 
 * EXAMPLE:
 * - File name: Larken-Medium.ttf
 * - PostScript name MIGHT BE: 'Larken', 'Larken-Medium', 'LarkenMedium', or something else
 * 
 * If you use fontFamily: 'Larken-Medium' but the PostScript name is 'Larken',
 * React Native won't find it and falls back to system font.
 * 
 * =================================
 */

// FILE 1: src/config/typography.ts
// PROBLEM: The mapping assumes PostScript name = file name
// This is USUALLY WRONG

export const Typography = {
  fontFamily: {
    // COMMENT: This maps to the PostScript name, but we don't know the real PostScript name
    // COMMENT: If 'Larken-Medium' is not the actual PostScript name, it will fail silently
    'Larken-Regular': 'Larken-Regular',   // ❌ MIGHT BE WRONG
    'Larken-Medium': 'Larken-Medium',     // ❌ MIGHT BE WRONG (THIS IS YOUR ISSUE)
    'Larken-Bold': 'Larken-Bold',         // ❌ MIGHT BE WRONG
  },
};

// SOLUTION:
// 1. Find the real PostScript name (see below)
// 2. Replace it here


// =================================
// HOW TO FIND POSTSCRIPT NAME ON WINDOWS:
// =================================

// METHOD 1: Right-Click Properties (EASIEST)
// 1. Go to: d:\ReactNativeApps\DivineMotherHood\src\assets\fonts\Larken-Medium.ttf
// 2. Right-click → Properties
// 3. Click "Details" tab
// 4. Look for field named:
//    - "Font name" OR
//    - "PostScript Name" OR
//    - Look at all fields - usually one will show something like "Larken" or "Larken-Medium"
// 5. That's your real PostScript name!

// METHOD 2: Use FontForge (Free tool)
// 1. Download FontForge from https://fontforge.org/
// 2. Open Larken-Medium.ttf
// 3. Go to: File → Properties → PS Names
// 4. Look at the "PostScript Name" field

// METHOD 3: Online Font Inspector
// 1. Use: https://www.fontgoggles.app/ or similar
// 2. Open the font file
// 3. Look at the Properties/Metadata tab


// =================================
// VERIFICATION CHECKLIST:
// =================================

// ✓ ANDROID: Font files are in correct location
//   Location: android/app/src/main/assets/fonts/
//   Files Found:
//   - Larken-Medium.ttf ✓
//   - Larken-Regular.ttf ✓
//   - Larken-Bold.ttf ✓
//   Status: CORRECT ✓

// ✓ iOS: Fonts are listed in Info.plist
//   Location: ios/DivineMotherHood/Info.plist
//   UIAppFonts array contains:
//   - Larken-Regular.ttf ✓
//   - Larken-Medium.ttf ✓
//   - Larken-Bold.ttf ✓
//   Status: CORRECT ✓

// ✓ react-native.config.js: Font source is configured
//   Location: react-native.config.js
//   Config: assets: ['./src/assets/fonts']
//   Status: CORRECT ✓

// ❌ PROBLEM IDENTIFIED: PostScript Name Mismatch
//   Current code: fontFamily: 'Larken-Medium'
//   Actual PostScript name: UNKNOWN ← THIS IS THE ISSUE
//   Solution: Find the real PostScript name and update typography.ts


// =================================
// EXPECTED POSTSCRIPT NAMES (Common patterns):
// =================================

// Pattern 1: Just family name (VERY COMMON)
//   File: Larken-Medium.ttf
//   PostScript: Larken
//   Fix: Change 'Larken-Medium' → 'Larken'

// Pattern 2: Family-Weight format (matched file name)
//   File: Larken-Medium.ttf
//   PostScript: Larken-Medium
//   Fix: Keep 'Larken-Medium' (but verify)

// Pattern 3: CamelCase without hyphen (SOMETIMES)
//   File: Larken-Medium.ttf
//   PostScript: LarkenMedium
//   Fix: Change 'Larken-Medium' → 'LarkenMedium'

// Pattern 4: Custom naming (RARE)
//   File: Larken-Medium.ttf
//   PostScript: SomethingCompleteDifferent
//   Fix: Must find actual name in properties


// =================================
// NEXT STEPS:
// =================================

// 1. Find the real PostScript name (use METHOD 1 above, it's easiest)
// 2. Go to src/config/typography.ts
// 3. Replace the PostScript name mapping
// 4. Rebuild the app:
//    Android: npx react-native run-android
//    iOS: npx react-native run-ios
// 5. Use FontDebugScreen.tsx to test if it works

// =================================
// WHY THIS HAPPENS:
// =================================

// React Native font linking works differently than web:
// - Web uses: font-family in CSS with file name
// - React Native uses: PostScript NAME embedded in the font file
// - These are often different!

// The PostScript name is metadata INSIDE the font file.
// When Android/iOS looks for a font, it searches by PostScript name, not file name.
// If you use the wrong name, the system can't find it and falls back to system font.

// This is why IS-Medium font might work but Larken-Medium doesn't:
// - Maybe IS-Medium's PostScript name IS actually "IS-Medium"
// - But Larken-Medium's PostScript name is just "Larken" (or something else)
